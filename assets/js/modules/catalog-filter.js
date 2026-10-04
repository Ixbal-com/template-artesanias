// Filtros del catálogo: cada botón [data-filter] muestra los productos cuyo
// data-category coincide; "all" muestra todos. Sin JavaScript se ven todos los
// productos y los filtros siguen ocultos.
export function initCatalogFilter() {
  const group = document.querySelector("[data-filters]");
  const buttons = [...document.querySelectorAll("[data-filter]")];
  const items = [...document.querySelectorAll("[data-category]")];
  if (!group || !buttons.length || !items.length) return;

  group.hidden = false;
  for (const button of buttons) {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      for (const other of buttons) other.setAttribute("aria-pressed", String(other === button));
      for (const item of items) item.hidden = filter !== "all" && item.dataset.category !== filter;
    });
  }
}
