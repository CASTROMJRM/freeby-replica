# 01 - Instalación

## Entorno
- Servidor local: **XAMPP** (Apache + MySQL)
- Ruta del sitio: `C:\xampp\htdocs\freeby-replica`
- URL local: `http://localhost/freeby-replica`
- Panel: `http://localhost/freeby-replica/wp-admin`
- Base de datos: `freeby_replica` (usuario `root`, servidor `localhost`, prefijo `wp_`)
- Documentación (bóveda Obsidian): `C:\xampp\htdocs\freeby-replica\docs`

## Pasos realizados
1. Descargar WordPress limpio desde es-mx.wordpress.org.
2. Copiar la carpeta `wordpress` a `htdocs` y renombrarla `freeby-replica`.
   - No se copió el sitio anterior (`misitio`) para no compartir `wp-config.php` ni base de datos.
3. Crear la base de datos `freeby_replica` en phpMyAdmin.
4. Ejecutar el instalador en `localhost/freeby-replica`.
5. Datos del sitio: título "Freeby Replica", usuario `admin`, visibilidad en buscadores desactivada.

## Ajustes generales
- Zona horaria: Ciudad de México (venía en UTC+0).
- Enlaces permanentes: "Nombre de la entrada".
- Se eliminó el contenido de ejemplo.

## Incidencias
- Error de conexión con la base de datos → ver [[Problemas y soluciones]].

Relacionado: [[02 - Configuración WooCommerce]]
