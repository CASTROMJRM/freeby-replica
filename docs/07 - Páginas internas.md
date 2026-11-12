# 07 - Páginas internas (secciones del menú)

Réplica de las 5 secciones del menú de freeby.mx, hechas en **Elementor** con el mismo header y footer que la portada.
Script que generó las páginas: [[Código/build-pages.js]] · Portada: [[06 - Página de inicio]]

## Mapa de navegación
| Menú | URL local | Página (ID) | Plantilla |
|---|---|---|---|
| Inicio (logo) | `/` | Inicio (95) | Elementor Canvas |
| Tienda | `/tienda/` | Tienda (10) | Elementor Canvas |
| ¿Quieres Vender? | `/quieres-vender/` | ¿Quieres Vender? (96) | Elementor Canvas |
| Envía Nacionalmente | `/envios/` | Envía Nacionalmente (97) | Elementor Canvas |
| ¡Síguenos en redes! | `/redes/` | ¡Síguenos en redes! (98) | Elementor Canvas |
| Marketplace | `/marketplaces/` | Marketplace (99) | Elementor Canvas |

- El menú resalta en naranja la sección actual (script `fb-navjs` dentro del header).
- El footer ("Nosotros" y "Categorías"), el logo y los botones enlazan a estas mismas URLs.
- Verificado: todos los enlaces del header, footer, banners y categorías responden **200**.

## Estructura común de cada página
1. **Header** (copia del de la portada): barra superior, logo, buscador, lista de deseos, rastreo, carrito y menú.
2. **CSS de páginas internas**: widget HTML `<style id="fb-pages">` (+ `fb-shopfix` en Tienda y Redes).
3. **Contenido** de la sección.
4. **Footer** (copia del de la portada) + redes laterales + WhatsApp flotante.

> ⚠️ Como Elementor gratis no tiene header/footer globales, están **copiados en cada página**. Si se cambia el menú o el footer, hay que actualizarlo en las 6 páginas (o reimportar con el script).

## Secciones

### Tienda (`/tienda/`)
- Migas de pan (Inicio > Tienda).
- "Buscar por categorías": carrusel con flechas y las 9 categorías.
- Barra: total de resultados, **ordenar por** (de WooCommerce) y botones **cuadrícula / lista**.
- Productos: shortcode `[products limit="24" columns="6" paginate="true"]` → 6 por fila en tarjetas grises, con paginación.
- La página de tienda de WooCommerce se movió a `/catalogo/` (ID 179) para poder diseñar `/tienda/` con Elementor.


**Capturas:**

![[tienda-01-categorias.jpg|900]]
![[tienda-02-productos.jpg|900]]
![[movil-tienda.jpg|320]]

### ¿Quieres Vender? (`/quieres-vender/`)
- Encabezado con degradado durazno, puntos decorativos y foto en forma orgánica.
- Cinta naranja en movimiento: material de apoyo, envíos, grupos, comisiones, plataformas, marketing.
- Tarjeta "Comienza en 3 Sencillos Pasos" + botón "¡Quiero vender!" + foto.
- Tarjeta naranja "Vende fácil" + lista de 4 beneficios con palomita.
- "¡Escríbenos para más info!" + botón.
- 4 iconos: Envíos nacionales · Comisión · Soporte 24/7 · Seguro y Confiable.
- Carrusel de testimonios "Lo que dicen nuestros clientes".


**Capturas:**

![[vender-01-encabezado.jpg|900]]
![[vender-02-pasos.jpg|900]]
![[vender-03-vende-facil.jpg|900]]
![[vender-04-iconos.jpg|900]]
![[movil-vender.jpg|320]]

### Envía Nacionalmente (`/envios/`)
- Encabezado "¡Nos encargamos de tus envíos, de principio a fin!" + foto.
- Franja de paqueterías (FedEx, DHL, Estafeta, UPS, 99 minutos) escritas como texto, sin logotipos.
- Tarjeta naranja "Así cuidamos cada envío" + 4 pasos del proceso.
- Botón "¡Quiero enviar!".
- 4 iconos: Envíos nacionales · Ahorra costos · Soporte 24/7 · Entrega segura.
- Carrusel de testimonios.


**Capturas:**

![[envios-01-encabezado.jpg|900]]
![[envios-02-cuidados.jpg|900]]
![[movil-envios.jpg|320]]

### ¡Síguenos en redes! (`/redes/`)
- Migas de pan y título "¡Síguenos en nuestras redes!".
- Tarjeta estilo Instagram: perfil con degradado + cuadrícula de 6 publicaciones (las de video llevan ícono de play).
- Tarjeta estilo TikTok con video destacado.
- Muro estilo Facebook: portada, perfil y 3 publicaciones.
- Son **maquetas estáticas** (no embeds reales); para conectar redes reales se necesita la cuenta y un plugin de feeds.


**Capturas:**

![[redes-01-instagram-tiktok.jpg|900]]
![[redes-02-facebook.jpg|900]]
![[movil-redes.jpg|320]]

### Marketplace (`/marketplaces/`)
- Migas de pan.
- Encabezado con degradado lila "Tu tienda en grandes marketplace" + foto.
- 2 tarjetas: **Mercado Libre** y **Facebook** (íconos genéricos, sin logotipos oficiales).


**Capturas:**

![[marketplace-01-encabezado.jpg|900]]
![[marketplace-02-tarjetas.jpg|900]]
![[movil-marketplace.jpg|320]]

## Responsive (verificado a 390 px)
| Página | Resultado |
|---|---|
| Tienda | Categorías deslizables con flechas; productos en 2 columnas |
| ¿Quieres Vender? | Encabezado en una columna; tarjetas apiladas |
| Envía Nacionalmente | Tarjeta naranja y pasos apilados; paqueterías en 2 filas |
| ¡Síguenos en redes! | Instagram, TikTok y publicaciones en una columna |
| Marketplace | Tarjetas una debajo de otra |

Escritorio: contenido a 1120 px; con zoom de 125 % en pantallas ≥ 1500 px (igual que la portada).

## Diferencias intencionales con freeby.mx
- Textos redactados con palabras propias (misma estructura y títulos).
- Sin logotipos de paqueterías, Mercado Libre ni Facebook (se usan texto e íconos genéricos).
- Fotos de stock; teléfono, enlaces de WhatsApp y redes son de ejemplo (`#`).

## Pendiente
- [ ] Poner número real de WhatsApp en "Escríbenos", "¡Quiero vender!" y "¡Quiero enviar!".
- [ ] Páginas de categoría, producto, carrito y checkout siguen con el header de Astra.
- [ ] Lista de deseos real (plugin).
