# Checklist de cumplimiento de MARecipes

Revisión basada en las tres páginas de Tarea-3.pdf, los archivos actuales, el historial Git y las comprobaciones registradas en PRUEBAS.md. La fecha de inicio de la sesión es el 19 de octubre de 2026. Los estados describen evidencia disponible, no una calificación del docente.

**Resultado:** aplicación implementada y comprobada; entrega académica todavía incompleta por evidencias y trabajo personal pendientes.

## Requisitos y entregables del PDF

| Estado | Requisito | Evidencia o acción pendiente |
| --- | --- | --- |
| Pendiente | Captura de GitHub Pro o estado de solicitud | La autora comunicó una denegación anterior y una segunda solicitud en revisión. Todavía no hay captura entregada en esta conversación o en el repositorio. Usar el estado actual, no declarar Pro activo. |
| Pendiente | Avisar al docente si sigue en revisión | La autora debe informar al docente; no se ha enviado un mensaje desde este proyecto. |
| Cumplido | Enlace al perfil de GitHub | https://github.com/Marjoxp, incluido en README. |
| Cumplido | Aplicación que consume al menos una API externa | TheMealDB mediante fetch en src/api.js; resultados reales comprobados en navegador. No se exige una API de IA. |
| Cumplido | Mostrar resultados en pantalla | Tarjetas, imágenes, ingredientes, cantidades e instrucciones. |
| Cumplido | Manejar falta de conexión | Mensaje de conexión y reintento; rechazo de fetch probado mediante simulación. |
| Cumplido | Manejar respuesta vacía | meals null y lista vacía cubiertos por pruebas; búsqueda inexistente verificada en navegador. |
| Cumplido | Manejar límite de peticiones | HTTP 429 tiene mensaje específico y reintento manual. Comprobado con simulación, sin provocar un límite real. |
| Cumplido | Interfaz clara y usable | Diseño adaptable, formulario etiquetado, filtros, estado de carga, diálogo y teclado. Se comprobó apertura por imagen y por “Ver receta”. La valoración final de facilidad de uso corresponde a usuarios y docente. |
| Cumplido | Repositorio de GitHub y enlace | https://github.com/Marjoxp/MARecipes. |
| Cumplido con asistencia declarada | Commits durante el desarrollo bajo la identidad de la autora | Historial con etapas de planificación, interfaz, API, pruebas y ajustes. Identidad Git Marjoxp. Los commits los ejecutó Codex por autorización; el código asistido se declara en README. No equivalen a trabajo escrito sin IA ni a días distintos de desarrollo. |
| Cumplido | README con instrucciones de ejecución | Node.js 20+, npm start, dirección local, alternativa npm.cmd y explicación de módulos. |
| Cumplido | Declarar herramientas de IA y su uso | README identifica Codex de OpenAI para código, documentación, depuración y pruebas. |
| Cumplido | Declarar qué hizo la autora sin IA | Elección del tema y creación del repositorio, según lo comunicado. También se registran sus decisiones de diseño y solicitudes de mejora, implementadas con IA. |
| Cumplido en los archivos revisados | No publicar claves privadas | La API usa únicamente su clave pública educativa 1; no se usan credenciales privadas. No hay archivos .env entre los archivos versionados y .gitignore los excluye. |
| Parcial | Bitácora con cinco prompts reales copiados literalmente | Hay cuatro entradas reales, incluida esta solicitud; una trata del Student Pack. Falta al menos otra entrada real y conviene priorizar consultas de programación. No inventar ni dividir un prompt para aumentar el conteo. |
| Parcial | Respuesta, éxito al primer intento y ajustes por prompt | Las entradas actuales describen los resultados observados. La autora debe revisarlas y completar su propia experiencia. |
| Parcial | Un error de IA detectado y cómo se resolvió | Se documentó el hallazgo de la autora: las imágenes no permitían abrir recetas. Se corrigió con un botón de imagen y se verificó. Falta que la autora explique con sus palabras cómo lo detectó y comprobó. Los otros fallos detectados por la IA no se atribuyen a ella. |
| Pendiente | Aprendizaje y qué cambiaría al pedir ayuda | Falta reflexión personal de la autora. |
| Pendiente | Bitácora breve, de 1 a 2 páginas | El archivo actual es un borrador de trabajo. Al finalizar, condensar y revisar su extensión en el formato de entrega. El PDF permite entregarla dentro del repositorio. |
| Parcial | Demostración en clase o video de máximo tres minutos | Existe docs/DEMOSTRACION.md con guion y preguntas. Falta ensayar y realizar la exposición o grabación. |
| Pendiente de comprobación personal | Poder explicar cualquier línea del código | Revisar README y código, ejecutar las pruebas y practicar las preguntas del guion. El funcionamiento automático no demuestra la comprensión de la autora. |

## Eficiencia y calidad técnica

| Comprobación | Resultado y límite |
| --- | --- |
| Dependencias | Sin bibliotecas JavaScript externas ni instalación de paquetes para ejecutar; servidor local sencillo y aplicación estática. |
| Peticiones | Se consulta al enviar el formulario o elegir una acción, no en cada pulsación. El detalle se pide al abrir una receta. Pulsar la imagen realiza la misma consulta que el botón, sin duplicar eventos. |
| Imágenes | Carga diferida con loading=lazy y sustitución visual si falla una imagen. No se descargan todas de forma anticipada. |
| Concurrencia | Identificadores de solicitud evitan que una respuesta anterior sustituya una consulta más reciente. No hay caché ni cancelación inmediata de búsquedas sustituidas; podrían añadirse si el uso crece. No son requisitos de esta tarea. |
| Espera y recuperación | Tiempo máximo de 12 segundos, errores legibles y reintento manual. No se repite automáticamente un 429 en un bucle. |
| Datos externos | Se muestran con textContent y se verifican protocolos de enlaces e imágenes. Esta revisión no equivale a una auditoría exhaustiva de seguridad. |
| Accesibilidad | Imagen dentro de un botón nativo, nombre de receta, foco visible y regreso del foco al cerrar. Conserva el segundo botón. El giro tiene pausa y la hoja CSS respeta movimiento reducido. |
| Pruebas | 11 pruebas de la capa API aprobadas y revisión de sintaxis aprobada. La nueva interacción se comprobó en navegador con clic, Enter y Escape. No se añadieron dependencias ni una prueba que solo repita la implementación. |
| Límites del producto | Dependencia de internet y de TheMealDB; recetas normalmente en inglés. Son límites documentados. No se prometen traducción ni uso sin conexión. |

**Conclusión técnica:** la solución es proporcionada para una aplicación académica pequeña. No se observaron fallos que impidan las funciones comprobadas. Esto no garantiza que todos los dispositivos o condiciones del proveedor se comporten igual.

## Orden para cerrar la entrega

- [ ] Adjuntar captura del estado actual del Student Pack e informar al docente.
- [ ] Realizar una consulta real adicional de programación y registrar prompt, respuesta y ajustes.
- [ ] Escribir reflexión personal y explicar el hallazgo de la imagen no interactiva.
- [ ] Condensar la bitácora a 1–2 páginas sin perder los cinco prompts literales ni sus resultados.
- [ ] Ejecutar el proyecto y recorrerlo personalmente; practicar la explicación del código.
- [ ] Ensayar y realizar la demostración de hasta tres minutos.
- [ ] Entregar perfil, repositorio, evidencia, README y bitácora final.

Publicar en GitHub Pages es opcional: el PDF exige repositorio y ejecución documentada, no alojamiento público. El enlace 127.0.0.1 funciona únicamente en el equipo donde está corriendo el servidor.
