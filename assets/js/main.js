// Punto de entrada. Cada módulo busca sus propios elementos con data-* y no hace
// nada si no los encuentra, así que borrar una sección del HTML nunca rompe el sitio.
// i18n va al final: al aplicar el idioma avisa a los demás con "i18n:change".
import { initNavigation } from "./modules/navigation.js";
import { initOpeningHours } from "./modules/opening-hours.js";
import { initCurrentYear } from "./modules/current-year.js";
import { initCatalogFilter } from "./modules/catalog-filter.js";
import { initI18n } from "./modules/i18n.js";

initNavigation();
initOpeningHours();
initCurrentYear();
initCatalogFilter();
initI18n();
