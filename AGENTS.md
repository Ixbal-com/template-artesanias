# Guía para agentes de IA

Este sitio es una plantilla de Ixbal: HTML, CSS y JavaScript sin dependencias ni paso de compilación. Lo que ves en `index.html` es exactamente lo que se publica.

## Reglas

- **No agregues frameworks, bundlers ni dependencias de npm.** El entorno no ejecuta `npm install`.
- **Valida siempre** con `npm run check` después de cada cambio. Debe terminar en `✓`.
- **Colores, tipografía y espacios solo en `assets/css/tokens.css`.** Los títulos usan `--font-display` y el texto `--font-sans`. No escribas colores hexadecimales fuera de ese archivo; usa `var(--color-…)`.
- **Un archivo CSS por componente o sección.** Si creas uno nuevo, impórtalo en `assets/css/main.css` dentro de su capa (`components` o `sections`).
- **Clases con convención BEM:** `bloque__elemento--modificador` (por ejemplo `service-card__title`, `button--primary`).
- **JavaScript en módulos** dentro de `assets/js/modules/`, registrados en `assets/js/main.js`. Los módulos localizan elementos con atributos `data-*` y no fallan si no los encuentran.
- **Íconos** en el sprite `assets/img/icons.svg`; agrega un `<symbol id="…">` y úsalo con `<use href="assets/img/icons.svg#…">`.

## Datos que se repiten

Cuando cambies uno de estos datos, cámbialo en **todos** sus lugares:

| Dato | Dónde aparece |
|---|---|
| Nombre del negocio | `<title>`, `og:title`, `.brand__name`, `aria-label` del logo, JSON-LD, pie de página, `alt` de imágenes y `og-image.svg`, **en español y en `i18n/en.json`** |
| WhatsApp | Todos los enlaces con `data-contact="whatsapp"` (formato `https://wa.me/52XXXXXXXXXX`) **y todas las claves `…href` de `i18n/en.json`** |
| Teléfono | Enlaces con `data-contact="phone"` (formato `tel:+52XXXXXXXXXX`) y `telephone` del JSON-LD |
| Dirección | Sección `#visitanos`, `src` del mapa y `address` del JSON-LD |
| Horario | Tabla `[data-hours]` en `#visitanos` (y los textos de los días en `i18n/en.json`) (atributos `data-days`, `data-open`, `data-close`) y `openingHoursSpecification` del JSON-LD |
| Color principal | `--color-primary` en `tokens.css`, `theme-color`, `logo.svg`, `favicon.svg`, `og-image.svg`, `placeholder.svg` |
| Colores de marca | Los cuatro `--color-primary/secondary/tertiary/quaternary` en `tokens.css` (el papel picado los usa solo), `theme-color`, `logo.svg`, `favicon.svg`, `og-image.svg` y `placeholder.svg` |
| Precio de una pieza o taller | `.product__price` o `.workshop__details` (los precios en MXN no se traducen) |

`npm run check` detecta WhatsApp o teléfonos distintos entre sí, archivos que no existen, anclas rotas, imágenes sin `alt` y JSON-LD inválido.

## Idiomas

El sitio es bilingüe sin duplicar páginas:

- **Español en `index.html`.** Es el idioma base: lo que indexa Google y lo que se ve sin JavaScript.
- **Inglés en `i18n/en.json`.** Un objeto plano `"clave": "texto"`.
- Cada texto traducible lleva `data-i18n="clave"` (reemplaza el contenido; admite `<em>` y `<br>`). Los atributos usan `data-i18n-attr="alt:clave; href:otra"`.
- Una etiqueta lleva **un solo** `data-i18n` y **un solo** `data-i18n-attr` (varios atributos van separados por `;` dentro del mismo). No anides elementos con `data-i18n` dentro de otro con `data-i18n`.
- Los enlaces de WhatsApp traducen su `href` para que el mensaje prellenado salga en el idioma del visitante: el número debe ser el mismo en ambos.
- Las notas del libro de visitas se dejan en el idioma original de quien las escribió (sin `data-i18n`).

Al **cambiar o agregar un texto** visible, actualiza el español en el HTML **y** su traducción en `i18n/en.json`. Al **crear** un texto nuevo, inventa una clave con el formato `seccion.elemento` (por ejemplo `shop.producto-9.name`). `npm run check` falla si falta una traducción, si sobra una clave o si un WhatsApp no coincide.

## Espacios de imagen

Cada foto del sitio vive en un espacio declarado en `template.json` → `imageSlots`:

```html
<figure class="media media--square" data-slot="galeria-1" data-placeholder data-hint="Foto del local · 1:1">
  <img src="assets/img/placeholder.svg" alt="Descripción de la foto" width="1200" height="1200" loading="lazy">
</figure>
```

Para poner una foto real en un espacio:

1. Cambia el `src` del `<img>` por la ruta de la foto. Las fotos que se suben desde Ixbal llegan a `images/` (por ejemplo `images/fachada.jpg`); usa esa ruta tal cual, sin mover ni renombrar el archivo.
2. Escribe un `alt` que describa la foto real y actualiza `width` y `height` con sus medidas.
3. Borra `data-placeholder` y `data-hint` del `<figure>`. Así desaparece la etiqueta de relleno.
4. No cambies la clase `media--…` ni el `data-slot`: CSS recorta la foto a la proporción del espacio.

Las fotos de `images/` que trae la plantilla son de ejemplo (generadas con IA para Tlapalli): reemplázalas por las del negocio real siguiendo los mismos pasos, y borra del repositorio las de ejemplo que ya no se usen.

Si la persona sube varias fotos sin decir dónde van, asígnalas según la `label` de cada espacio en `imageSlots`. `npm run check` dice cuántos espacios siguen con imagen de relleno.

## Estructura

```
index.html                 Página única, dividida en secciones con comentarios ============
assets/css/main.css        Orden de capas e imports
assets/css/tokens.css      Identidad visual (edita aquí primero)
assets/css/base.css        Reset y elementos HTML
assets/css/layout.css      Contenedores, secciones, rejillas
assets/css/components/     Piezas reutilizables (botón, tarjeta, encabezado…)
assets/css/sections/       Estilos propios de cada sección de la página
assets/css/utilities.css   Clases de una sola responsabilidad
assets/js/main.js          Registra los módulos
assets/js/modules/         Comportamiento (menú, horario, año, filtros del catálogo, idiomas)
i18n/en.json               Textos en inglés (el español vive en index.html)
assets/img/                Logo, íconos e imágenes de relleno
images/                    Fotos que sube la persona desde Ixbal (se crea al subir la primera)
template.json              Metadatos para la galería de plantillas de Ixbal
scripts/check.mjs          Validador sin dependencias
```

## Tareas comunes

- **Agregar una pieza:** copia un `<li class="product">` completo con un `data-slot` nuevo (`producto-9`, agrégalo a `imageSlots`), un `data-category` existente y sus claves nuevas en `i18n/en.json` (`shop.producto-9.name`, `.origin`, `.alt`, `.href`).
- **Marcar una pieza como vendida:** agrega la clase `product--sold` y el badge `shop.badge.sold`, y cambia el botón por `<span class="product__sold-note" data-i18n="shop.soldNote">`. Borra su clave `.href` de `i18n/en.json`.
- **Nueva categoría:** agrega un botón `data-filter` con su clave `shop.filter.…` y úsala en el `data-category` de las piezas.
- **Agregar un taller:** copia un `<article class="workshop">` (las filas se alternan solas) con un `data-slot` nuevo y sus claves en `i18n/en.json`.
- **Quitar el inglés:** borra `data-languages` de `<html>`, el bloque `.lang-switch` y la carpeta `i18n/`; los `data-i18n` que queden no estorban.
- **Quitar una sección:** borra el `<section>` completo y su enlace en `.site-nav__list`.
- **Nueva sección:** crea el `<section class="section" id="…">`, su archivo en `assets/css/sections/`, impórtalo en `main.css` y agrega el enlace al menú.
- **Cambiar fotos:** sigue los pasos de "Espacios de imagen".
- **Nuevo espacio de imagen:** agrega el `<figure class="media" data-slot="…">` y su entrada en `imageSlots` de `template.json`.
