# Guía de Uso - CV Dinámico

## Estructura

Tu CV ahora funciona con un sistema dinámico basado en JSON. Todos los datos se cargan automáticamente desde el archivo `data.json`.

### Archivos principales:

- **data.json** - Contiene toda la información de tu CV en formato estructurado
- **index.html** - Plantilla HTML que carga los datos dinámicamente
- **script.js** - Script que procesa el JSON y renderiza el contenido
- **cv-style.css** - Estilos para impresión
- **hoja_vida.md** - Versión Markdown (opcional, para impresión)

## Cómo agregar nuevos items

### 1. Agregar una nueva formación académica

Abre `data.json` y busca la sección `"formacion"`. Agrega un nuevo objeto dentro del array:

```json
{
  "titulo": "Nombre del curso/carrera",
  "institucion": "Nombre de la institución",
  "año": "2025",
  "descripcion": "Breve descripción del programa"
}
```

### 2. Agregar nueva experiencia laboral

En la sección `"experiencia"` del archivo `data.json`:

```json
{
  "puesto": "Tu puesto",
  "empresa": "Nombre de la empresa",
  "periodo": "Mes Año - Mes Año",
  "descripcion": "Descripción breve de tus funciones"
}
```

### 3. Agregar un nuevo proyecto

En la sección `"proyectos"`:

```json
{
  "nombre": "Nombre del proyecto",
  "descripcion": "Descripción del proyecto y tecnologías utilizadas",
  "repositorio": "https://github.com/usuario/repo",
  "video": "https://www.youtube.com/watch?v=xxxxx"
}
```

**Campos opcionales:**
- `"repositorio"` - Link al repositorio (GitHub, GitLab, etc.) - dejar vacío `""` si no aplica
- `"video"` - Link al video o demostración (YouTube, Vimeo, etc.) - dejar vacío `""` si no aplica

### 4. Agregar una nueva referencia

En la sección `"referencias"`:

```json
{
  "nombre": "Nombre completo",
  "puesto": "Su posición en la empresa",
  "empresa": "Nombre de la empresa",
  "descripcion": "Su rol o relación contigo"
}
```

### 5. Agregar un idioma

En la sección `"idiomas"`:

```json
{
  "idioma": "Nombre del idioma",
  "nivel": "Nivel de dominio (ej: Nativo, Intermedio, Avanzado)"
}
```

## Editar información personal

En la sección `"personal"` del archivo `data.json`:

```json
"personal": {
  "nombre": "Tu nombre completo",
  "titulo": "Tu título profesional",
  "email": "tu@email.com",
  "telefono": "+57 XXX XXXXXXX",
  "direccion": "Tu dirección",
  "foto": "images/foto.jpg"
}
```

## Editar perfil profesional

Encuentra la sección `"perfil"` y actualiza el texto completo con tu descripción.

## Estructura del data.json

```json
{
  "personal": { /* Tu información */ },
  "perfil": "Tu descripción profesional",
  "formacion": [ /* Array de estudios */ ],
  "experiencia": [ /* Array de trabajos */ ],
  "proyectos": [ /* Array de proyectos */ ],
  "referencias": [ /* Array de referencias */ ],
  "idiomas": [ /* Array de idiomas */ ]
}
```

## Características

- ✅ Cargando dinámico de datos
- ✅ No requiere editar HTML
- ✅ Fácil de expandir
- ✅ Compatible con Bootstrap
- ✅ Diseño responsivo
- ✅ Opción de impresión en PDF

## Tips

1. Mantén los campos de texto concisos y relevantes
2. Usa líneas vacías entre puntos en descripciones para mejor legibilidad
3. Verifica el navegador (F12) si algo no se carga correctamente
4. El orden en el JSON determina el orden en la página
5. Puedes tener tantos items como necesites en cada sección

## Estructura recomendada del JSON

```json
{
  "personal": {
    "nombre": "Nombre Completo",
    "titulo": "Tu Título",
    "email": "email@example.com",
    "telefono": "+57 XXX XXXXXXX",
    "direccion": "Dirección completa",
    "foto": "images/foto.jpg"
  },
  "perfil": "Texto de perfil...",
  "formacion": [...],
  "experiencia": [...],
  "proyectos": [...],
  "referencias": [...],
  "idiomas": [...]
}
```

---

**Nota:** Asegúrate de guardar los cambios en `data.json` y recarga la página del navegador (Ctrl+R) para ver los cambios actualizados.
