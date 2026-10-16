# CV dinámica — guía rápida

## Editar desde tu equipo

1. Instala Python 3 si aún no lo tienes.
2. Abre una terminal en la carpeta del proyecto.
3. Ejecuta `python editor_local.py` (Windows también puede usar `py editor_local.py`).
4. Abre `http://127.0.0.1:8765/editor.html` si no se abrió automáticamente.
5. En las pestañas **Experiencias**, **Proyectos**, **Referencias**, **Formación**, **Idiomas**, **Información personal** y **Perfil**, crea, edita, borra o reordena registros.
6. Pulsa **Guardar JSON y Markdown**. Esto actualiza a la vez `data.json` y `hoja_vida.md`.
7. Revisa tu página con el botón **Ver página**.
8. Publica los cambios con Git:

```bash
git add data.json hoja_vida.md
git commit -m "Actualizar hoja de vida"
git push origin Menu
```

GitHub Actions publica la versión actualizada en GitHub Pages cuando llega un push a la rama `Menu`.

## Fuente de verdad

- `data.json` es la única fuente editable de información.
- `script.js` dibuja la CV pública a partir de `data.json`.
- `generar_md.py` regenera `hoja_vida.md`.
- El botón **Imprimir Hoja de Vida** usa el archivo Markdown generado para abrir la impresión del navegador; allí puedes elegir **Guardar como PDF**.
- El workflow también ejecuta `python3 generar_md.py` antes de publicar para evitar versiones desactualizadas en línea.

## Regenerar sin editor

Si editas `data.json` manualmente, ejecuta `python generar_md.py` antes de hacer commit. Puedes cambiar las descripciones y agregar cuantos registros necesites sin editar HTML.

## Seguridad y limitaciones

El editor local se escucha solo en `127.0.0.1` y no se incluye en el sitio publicado por Pages. No requiere credenciales ni tiene una API pública para escribir información. **Guardar** modifica archivos en tu PC, no hace automáticamente un commit ni un push. Debes subir los cambios a GitHub para verlos en línea.

Para cerrar el editor, usa `Ctrl+C` en la terminal. Si el puerto 8765 está ocupado, detén el otro proceso que lo está usando.
