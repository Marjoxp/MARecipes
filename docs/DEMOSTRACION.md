# Demostración de hasta tres minutos

Ensaya con tus propias palabras. Comprueba que puedes explicar el código antes de entregar.

| Tiempo | Qué mostrar y explicar |
| --- | --- |
| 0:00–0:20 | “MARecipes es mi proyecto de recetas. Elegí el tema y utilicé Codex para ayudarme a desarrollar y probar la aplicación. Consulta TheMealDB.” |
| 0:20–0:55 | Buscar `chicken` o `cake`. Mostrar tarjetas y seleccionar una categoría. Aclarar que las recetas originales suelen estar en inglés. |
| 0:55–1:25 | Abrir una receta, mostrar ingredientes, medidas y preparación. Cerrar con Escape y probar “Sorpréndeme”. |
| 1:25–1:50 | Buscar un nombre inexistente. Explicar el estado vacío. Si lo ensayaste, usar el modo sin conexión de DevTools y mostrar el mensaje de error y reintento al reconectar. |
| 1:50–2:30 | Abrir `src/api.js`: explicar URLSearchParams, fetch, await, response.ok, HTTP 429 y meals null. Abrir `src/app.js` y explicar por qué usamos textContent. |
| 2:30–3:00 | Mostrar historial de GitHub, README y bitácora completa. Explicar algo que aprendiste y una corrección real. |

## Preguntas para practicar

1. ¿Qué diferencia hay entre HTML, CSS y JavaScript en este proyecto?
2. ¿Qué devuelve fetch y por qué hay que llamar a response.json()?
3. ¿Por qué una búsqueda sin resultados no es igual que un error de red?
4. ¿Qué hace AbortController cuando tarda demasiado la API?
5. ¿Por qué el filtro por categoría necesita otra petición para mostrar el detalle?
6. ¿Qué es un commit y cómo verificas que está en GitHub?
7. ¿Por qué una clave privada no puede incluirse en el JavaScript público?

Si no puedes explicar alguna parte, revísala con la IA y registra tu pregunta literal y el aprendizaje en la bitácora.
