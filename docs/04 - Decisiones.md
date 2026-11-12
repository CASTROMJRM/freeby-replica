# 04 - Decisiones

## Tema Astra + Elementor (en lugar de Porto)
- Freeby usa **Porto**, que es de pago.
- **Astra** (gratis): constructor de header/footer y buena integración con WooCommerce.
- **Elementor** (gratis): página de inicio y páginas informativas.
- Elementor gratis no edita header/footer ni plantillas de tienda (eso es Pro); Astra cubre esa parte.
- No se usan Starter Templates: el reto es hacerlo con IA, sin plantillas.

## Rol de la IA (Claude Code)
- CSS personalizado para igualar el estilo de Freeby.
- Generar CSV de categorías y productos.
- Tema hijo si hace falta.
- Mantener esta documentación actualizada.

## Sitio local
- Trabajo en local (XAMPP). No publicar con la marca ni el logo de Freeby.
- Si algún día se sube a un servidor, no subir la carpeta `docs`.

## Plugins extra del asistente de WooCommerce
- Omitidos. Solo se instalará lo necesario. Ver [[05 - Plugins usados]].

## Header y footer dentro de la página de inicio
- Elementor gratis no permite editar el header/footer globales.
- La portada usa la plantilla **Elementor Canvas** y trae su propio header y footer en widgets HTML, para que quede igual a Freeby.
- Las páginas internas usan el header de Astra con el "Menú principal".

## Secciones complejas con widget HTML
- Slider con texto, cuenta regresiva, pestañas y cinta en movimiento no existen en Elementor gratis.
- Se hicieron con HTML/CSS/JS dentro de widgets HTML de Elementor.
- Los productos se muestran con el widget Shortcode de Elementor y shortcodes de WooCommerce, así se actualizan solos.

## Contenido de ejemplo
- No se copiaron logo, fotos, reseñas ni datos de contacto de Freeby. Se usaron imágenes libres y datos de prueba.

## Páginas internas con el mismo header/footer
- Cada sección del menú es una página Elementor Canvas con copia del header y footer de la portada (Elementor gratis no tiene plantillas globales).
- La tienda de WooCommerce se movió a `/catalogo/` para diseñar `/tienda/` con Elementor + shortcode `[products paginate="true"]`.
