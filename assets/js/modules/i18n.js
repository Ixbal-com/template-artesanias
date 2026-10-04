// Traducción sin compilación. El idioma base (español) vive en el HTML: es lo que
// indexa Google y lo que se ve si falla JavaScript. Cada idioma extra vive en
// i18n/<idioma>.json con las mismas claves que usa el HTML:
//
//   data-i18n="clave"                       reemplaza el contenido (admite <em>, <br>)
//   data-i18n-attr="alt:clave; href:otra"   reemplaza atributos
//
// <html data-languages="es,en"> declara los idiomas. Se elige con ?lang=en, con
// cualquier botón [data-lang-switch="en"] y se recuerda en el navegador.
// Al cambiar de idioma se emite el evento "i18n:change" en document.
const STORAGE_KEY = "idioma";

export async function initI18n() {
  const root = document.documentElement;
  const baseTag = root.lang;
  const base = baseTag.slice(0, 2);
  const available = (root.dataset.languages ?? base).split(",").map((lang) => lang.trim());
  if (available.length < 2) return;

  const originals = snapshot();
  const dictionaries = new Map();
  const switches = document.querySelectorAll("[data-lang-switch]");

  async function apply(requested) {
    let lang = available.includes(requested) ? requested : base;
    let dictionary = null;
    if (lang !== base) {
      dictionary = await load(lang, dictionaries);
      if (!dictionary) lang = base;
    }
    for (const [element, original] of originals) {
      if (original.key) element.innerHTML = dictionary?.[original.key] ?? original.html;
      for (const [attribute, key, value] of original.attributes) {
        element.setAttribute(attribute, dictionary?.[key] ?? value);
      }
    }
    root.lang = lang === base ? baseTag : lang;
    for (const button of switches) {
      button.setAttribute("aria-pressed", String(button.dataset.langSwitch === lang));
    }
    remember(lang);
    document.dispatchEvent(new CustomEvent("i18n:change", { detail: { lang } }));
  }

  for (const button of switches) {
    button.addEventListener("click", () => apply(button.dataset.langSwitch));
  }

  const fromUrl = new URLSearchParams(location.search).get("lang");
  await apply(fromUrl ?? recall() ?? base);
}

// Guarda el texto y los atributos originales para poder volver al idioma base.
function snapshot() {
  const originals = new Map();
  for (const element of document.querySelectorAll("[data-i18n], [data-i18n-attr]")) {
    const attributes = (element.dataset.i18nAttr ?? "")
      .split(";")
      .map((pair) => pair.split(":").map((part) => part.trim()))
      .filter(([attribute, key]) => attribute && key)
      .map(([attribute, key]) => [attribute, key, element.getAttribute(attribute) ?? ""]);
    originals.set(element, { key: element.dataset.i18n, html: element.innerHTML, attributes });
  }
  return originals;
}

async function load(lang, cache) {
  if (!cache.has(lang)) {
    cache.set(
      lang,
      fetch(`i18n/${lang}.json`)
        .then((response) => (response.ok ? response.json() : null))
        .catch(() => null),
    );
  }
  return cache.get(lang);
}

function remember(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Navegación privada: el idioma simplemente no se recuerda.
  }
}

function recall() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}
