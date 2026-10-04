# Plantilla Ixbal · Arte popular (bilingüe)

Plantilla para tiendas de artesanías, talleres y galerías de arte popular que atienden a turistas. Estilo **colorido mexicano**: rosa mexicano, amarillo, turquesa y naranja sobre papel, con papel picado, fotos tipo collage y notas escritas a mano.

**Incluye:** foto principal a todo lo ancho, historia del taller con línea del tiempo, carrusel de oficios, catálogo con filtros (piezas únicas y vendidas, pedido por WhatsApp con la pieza ya escrita), talleres para visitantes con fechas y cupo, libro de visitas, horario con indicador de “Abierto ahora”, mapa, datos estructurados de tienda y **español e inglés** con un botón para cambiar.

## Uso

```bash
npm run dev     # servidor local en http://localhost:4321
npm run check   # valida el sitio y que las traducciones estén completas
```

Ábrela con un servidor (no con doble clic): el inglés se carga desde `i18n/en.json`.

## Idiomas

- El **español** vive en `index.html`: es lo que indexa Google y lo que se ve si falla JavaScript.
- El **inglés** vive en `i18n/en.json`, con una clave por cada texto marcado con `data-i18n` o `data-i18n-attr`.
- El visitante cambia de idioma con el botón **ES | EN**; se recuerda en su navegador y se puede compartir con `?lang=en`.
- Para otro idioma: crea `i18n/fr.json` con las mismas claves y agrégalo a `data-languages` en `<html>`.

## Personalizar

1. **Identidad:** los cuatro colores y las tipografías en `assets/css/tokens.css` (el papel picado toma los colores de ahí).
2. **Contenido:** textos en `index.html` y su traducción en `i18n/en.json`.
3. **Imágenes:** 18 espacios de imagen listados en `imageSlots` de `template.json`, con fotos de ejemplo en `images/` generadas con IA (`gpt-image-2.5-sunburst`). Reemplázalas por fotos reales; ver [AGENTS.md](AGENTS.md#espacios-de-imagen).

Las reglas de arquitectura y la lista de datos que se repiten están en [AGENTS.md](AGENTS.md).

## Publicar

Es un sitio estático: sirve la raíz del repositorio en GitHub Pages, Netlify, Vercel o AWS Amplify.

> Antes de publicar, convierte `assets/img/og-image.svg` a PNG de 1200 × 630 y usa una URL absoluta en `og:image`: WhatsApp y Facebook no muestran vistas previas en SVG.
