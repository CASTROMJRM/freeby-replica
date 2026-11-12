# 06 - Página de inicio (Elementor)

- Página: **Inicio** (ID 95), plantilla **Elementor Canvas** (sin header/footer de Astra; el header y footer están dentro de la página).
- Configurada como portada en Ajustes → Lectura.
- Construida con Elementor 4.4.0. La estructura se generó con IA en un script y se importó al editor (ver [[#Cómo se construyó]]).

## Versión 2 (réplica fiel)
Reconstruida tras medir los estilos reales de freeby.mx (tamaños, márgenes, colores y tarjetas). Script: [[Código/build-home-v2.js]].

Cambios principales respecto a la v1:
- **Iconos SVG de línea** en lugar de emojis (teléfono, buscador, lista de deseos, rastreo, carrito, beneficios, flechas).
- **Redes sociales y WhatsApp** con widgets nativos de Elementor (*Iconos sociales* e *Icono*) en posición fija.
- Ancho de contenido **1120 px** (contenedor de 1150 px), igual que Freeby.
- Títulos de sección **Lexend 700 · 32 px**; slider **52 px**; beneficios **20 px** con iconos de 40 px.
- Header: cajas de icono **40×40** fondo `#F1F2FE`, carrito **70×70**, buscador **347×50**.
- Slider con **vista previa del siguiente banner** y bucle infinito.
- Ofertas en **tarjetas grises** `#F4F4F4` (radio 10 px) con degradado naranja detrás del producto; sin botón y solo precio final.
- Precios con formato **“MXN $”**.
- Destacados en **tarjetas blancas** con botón "AÑADIR AL CARRITO" e icono de bolsa.
- Paquetes: tarjeta naranja + producto + botón grande **"Agregar al carrito"**.
- Testimonios en **carrusel** (9 reseñas de ejemplo, 3 visibles, flechas, avance automático cada 5 s que se pausa al pasar el mouse) con avatar superpuesto, insignia, estrellas y "Leer más" que despliega el texto.
- Botón "Ir arriba" (el de Astra se ocultó para no encimarse con WhatsApp).
- Ajustes para celular: header en 2 filas, menú deslizable, productos en 2 columnas, footer en 1 columna.

Los parches de CSS posteriores están en el primer widget HTML, en los bloques `<style id="fb-fix">`, `fb-mob`, `fb-mob2` y `fb-mob3`.

## Estilo (igual a freeby.mx)
| Elemento | Valor |
|---|---|
| Naranja principal | `#FFA500` |
| Texto oscuro / títulos | `#222529` |
| Texto gris | `#777777` |
| Fondo de tarjetas | `#F4F4F4` |
| Títulos | Lexend 700 (32 px) |
| Texto | Poppins |

## Secciones (en orden)
1. Barra superior: "👀 OJITO… Envío GRATIS en compras mayores a $999", teléfono y botón Escríbenos — *HTML*
2. Header: logo, buscador de productos, lista de deseos, rastrear pedido, carrito con contador — *HTML*
3. Menú: Tienda · ¿Quieres Vender? · Envía Nacionalmente · ¡Síguenos en redes! · Marketplace — *HTML*
4. Slider de 3 banners con flechas y cambio automático (6 s) — *HTML + JS*
5. Beneficios: Envío nacional · Compra rápida · Tienda 24/7 · Pago seguro — *widgets Icon Box*
6. Buscar por categorías (9 categorías con imagen y conteo) — *Título + HTML*
7. Ofertas del mes con cuenta regresiva al fin de mes — *HTML + JS + shortcode `[products tag="oferta"]`*
8. Compra sin complicaciones: banners Belleza & Skincare / Calidad Absoluta — *HTML*
9. Cinta naranja en movimiento — *HTML + CSS*
10. Productos destacados con pestañas Hogar / Belleza / Moda — *HTML (botones) + 3 contenedores con shortcode `[products category="…"]`*
11. Productos en paquete — *HTML + shortcode `[products tag="kit"]`*
12. Últimas noticias (4 entradas del blog) — *HTML*
13. Casos de éxito (3 testimonios de ejemplo) — *HTML*
14. Footer: logo, dirección, redes, Nosotros, Categorías, suscripción, métodos de pago — *HTML*
15. Botones flotantes: redes laterales y WhatsApp — *HTML*

El CSS de toda la página está en el primer widget HTML (barra superior), dentro de `<style>`.

## Contenido creado
- **Categorías (9):** las mismas de Freeby.
- **Productos (24):** de ejemplo, con precios similares. Etiqueta `oferta` (5 con precio rebajado), etiqueta `kit` (1), destacados en Hogar/Belleza/Moda.
- **Entradas del blog (4)** en la categoría Recomendaciones.
- **Páginas:** ¿Quieres Vender?, Envía Nacionalmente, ¡Síguenos en redes!, Marketplace, Lista de deseos, Rastrear pedido (`[woocommerce_order_tracking]`).
- **Menú principal** asignado al tema (para las páginas internas).
- **Imágenes:** fotos libres de Unsplash, subidas a la biblioteca de medios.

## Diferencias intencionales con freeby.mx
- Logo hecho con texto y CSS (no se copió el logo original).
- Teléfono, dirección y redes son de ejemplo.
- Testimonios inventados (no se copiaron reseñas reales).
- Imágenes de stock en lugar de las fotos de Freeby.

## Cómo se construyó
1. Se analizó freeby.mx (colores, tipografías y secciones) con capturas y lectura de estilos.
2. Se crearon categorías, productos y entradas con la API REST de WordPress/WooCommerce.
3. El script [[Código/build-home.js]] genera el JSON de Elementor (contenedores y widgets).
4. En el editor de Elementor se importó con `$e.run('document/elements/import', …)` y se publicó.

## Cómo editar
- **Textos de títulos y beneficios:** clic directo en Elementor.
- **Slider, categorías, banners, testimonios, footer:** editar el widget HTML correspondiente.
- **Productos de cada sección:** cambiar etiquetas/categorías del producto en WooCommerce (los shortcodes los muestran solos).
- **Pestañas Belleza/Moda:** en el editor están ocultas; para editarlas, quitar temporalmente la clase `fb-pane` en Avanzado → Clases CSS.

## Pendiente
- [ ] Revisar en celular y ajustar.
- [ ] Estilo de páginas internas (tienda, producto, carrito, checkout) con Astra.
- [ ] Lista de deseos real (plugin) y botón de WhatsApp con número.

## Ajustes v2.1 (revisión de César / Juan Manuel)
- **Tamaño general más grande:** la portada se escala con `zoom` (bloque `<style id="fb-zoom">`): 125 % en pantallas de 1500 px o más y 110 % entre 1280 y 1499 px. Así se ve como freeby.mx en el navegador del equipo.
- **Slider:** las fotos ahora se funden con el fondo naranja como productos recortados (filtro de brillo/contraste + `mix-blend-mode: multiply` + bordes difuminados, bloque `fb-slimg`). Tercer banner con lentes de sol.
- **Flechas:** ya no se ponen azules al pasar el mouse (Astra pintaba los botones).
- **Carrusel de testimonios:** calcula el avance con `offsetWidth` para funcionar bien con el zoom.

## Ajustes v2.2 — Slider y banners con PNG sin fondo
- El truco de fundir fotos con `mix-blend-mode` se veía mal en algunos equipos (recuadro azul). Se reemplazó por **PNG sin fondo**, igual que Freeby.
- Los recortes se hicieron en el navegador con un script de *canvas* (relleno por inundación desde los bordes) y se subieron a Medios:
  - `png-reloj-inteligente.png` → slider 1
  - `png-perfume.png` → slider 2
  - `png-maquillaje.png` → slider 3 y banner "Belleza & Skincare"
  - `png-reloj-blanco.png` → banner "Calidad Absoluta"
- El slider ahora muestra **un banner a la vez a todo el ancho** (ya no se asoma el siguiente), bloque `<style id="fb-full">`.


## Capturas (escritorio)
### Header y slider
![[inicio-01-header-slider.jpg|900]]
### Categorías y ofertas del mes
![[inicio-02-categorias-ofertas.jpg|900]]
### Banners, cinta y productos destacados
![[inicio-03-banners-destacados.jpg|900]]
### Productos en paquete y últimas noticias
![[inicio-04-paquetes-noticias.jpg|900]]
### Testimonios y footer
![[inicio-05-testimonios-footer.jpg|900]]

## Captura (celular, 390 px)
![[movil-inicio.jpg|320]]
