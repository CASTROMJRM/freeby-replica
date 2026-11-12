# Proyecto: Freeby Réplica

Réplica de https://freeby.mx/ con WordPress + WooCommerce en local (XAMPP), para la estadía.

## Contexto
- Sitio: `C:\xampp\htdocs\freeby-replica` → http://localhost/freeby-replica
- Base de datos: `freeby_replica`
- Stack: WordPress, WooCommerce, tema Astra, Elementor.
- Toda la documentación está en `docs/` (bóveda de Obsidian). Empieza leyendo `docs/00 - Índice.md`.

## Reglas
- Antes de trabajar, lee `docs/00 - Índice.md` y la bitácora más reciente en `docs/Bitácora/`.
- Al terminar una tarea, actualiza la documentación:
  - Agrega o actualiza la nota del día en `docs/Bitácora/AAAA-MM-DD.md`.
  - Errores y su solución → `docs/Problemas y soluciones.md`.
  - Decisiones técnicas → `docs/04 - Decisiones.md`.
  - Plugins nuevos → `docs/05 - Plugins usados.md`.
  - Marca el avance en `docs/00 - Índice.md`.
- Usa enlaces de Obsidian `[[Nombre de nota]]` entre notas.
- No modifiques archivos del núcleo de WordPress (`wp-admin`, `wp-includes`). Los cambios de código van en un tema hijo o en plugins.
- Escribe la documentación en español.
