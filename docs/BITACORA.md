# Bitácora de programación con IA — borrador

Fecha de inicio: 19 de octubre de 2026. Herramienta: Codex de OpenAI.
Este archivo contiene cuatro entradas reales, aún no satisface los cinco prompts ni sustituye la reflexión de la estudiante. Al cerrar el proyecto, resumir a 1–2 páginas.

## Entrada 1 — petición inicial real

**Prompt literal:**

> Tengo un proyecto de realizar una página web, en este caso decidí usar el ejemplo de página web de recetas de cocina, hay que consumir una API como requisito, necesito ayuda con una buena opción, te voy a adjuntar un pdf con las instrucciones, realízalo en orden para poder cumplir con todos los pasos y requisitos para realizar este proyecto de manera adecuada, todo el desarrollo se debe reflejar mediante githuib, modificaciones y demás, he creado el  repositorio, te dejo el link, para empezar a trabajar con el proyecto: [https://github.com/Marjoxp/MARecipes.git](https://github.com/Marjoxp/MARecipes.git)

**Respuesta:** revisión del PDF, selección de TheMealDB, clonación del repositorio vacío y planificación por etapas. **¿Funcionó a la primera?** La lectura del PDF y selección de API sí; la clonación necesitó acceso de red autorizado por el entorno. La aplicación aún estaba pendiente en esta etapa. **Ajuste:** registrar la asistencia de IA y distinguir los entregables personales del código generado.

## Entrada 2 — actualización real de la estudiante

**Prompt literal:**

> espera, ya la r4ealicé, pero me denegaron. así que adjuntaré la captura de esa notificación, para así poder seguir trabajando en el proyecto, ya he vuelto a realizar el proceso, ando en espera de que me lo aprueben, podemos seguir realizando el proyecto

**Respuesta:** actualización del plan: solicitud anterior denegada y nueva solicitud en revisión; continuar el desarrollo. **¿Funcionó a la primera?** Se registró el estado comunicado; falta verificarlo mediante captura. **Ajuste:** no presentar Pro como activo.

**Resultado de la implementación posterior:** aplicación en HTML, CSS y JavaScript, peticiones a TheMealDB, búsqueda, categorías, detalle y aleatorio. Las 11 pruebas automatizadas pasaron. Se verificaron consultas reales en navegador. En la revisión visual, la IA detectó y corrigió un desbordamiento horizontal de la decoración; el detalle está en PRUEBAS.md. Este hallazgo lo detectó la IA, por lo que no se atribuye a la estudiante.

## Entrada 3 — ajuste visual solicitado por la estudiante

**Prompt literal:**

> Muy bien, unos detalles, aprovecha todo el espacio de la pantalla, está todo muy centrado en ele medio, los textos de "Hecho con curiosidad" y "Tu próxima receta está aquí" ponlos de una manera  uniforme y derecha, puede ser a un lado, o que esté al rededor del plato siguiendo su forma, es decir circular, y creo que podemos agregar alguna animación con ese plato, como que gire o cambien, lo que se adapte mejor

**Respuesta:** se eliminó el ancho máximo general de 1180 px, se amplió la portada y se adaptaron las columnas de recetas al ancho disponible. Los dos textos quedaron horizontales y centrados encima y debajo del plato. Se agregó giro lento con botón de pausa y respeto a la preferencia de movimiento reducido.

**¿Funcionó a la primera?** La revisión inicial confirmó el nuevo ancho y la pausa. Al convertir las medidas del plato a porcentajes, la IA también convirtió por error el interlineado del limón y desplazó su símbolo. Se corrigió centrando ese símbolo con CSS Grid. Fue un fallo detectado por la IA durante su revisión, no por la estudiante. Se repitieron las comprobaciones visuales y de ancho después del ajuste.

**Aportación de la estudiante:** revisión visual de la primera versión, identificación del exceso de espacio lateral y propuesta de alinear los textos y animar el plato.

## Entrada 4 — interacción de imágenes y checklist

**Prompt literal:**

> haz que igual al dar click sobre la imagen de cada receta se pueda acceder, simplemente siento que es más intuitivo, no quites el botón de ver receta de todas maneras, y hagamos un checklis del proyecto para ver si se realizaron todos los requisitos y de manera eficiente y completa

**Respuesta:** imagen dentro de un botón nativo que abre el mismo detalle y conserva “Ver receta”. Se añadió un checklist de requisitos con evidencias y pendientes, más una revisión de eficiencia acorde al alcance de la tarea.

**¿Funcionó a la primera?** La sintaxis y las 11 pruebas API pasaron. En navegador se comprobó apertura desde imagen, apertura con Enter, cierre con Escape y retorno del foco; también se comprobó que “Ver receta” sigue abriendo ingredientes. No fue necesario corregir esta interacción después de esas comprobaciones.

**Hallazgo de la autora y corrección:** la versión generada por IA solo abría el detalle desde “Ver receta”; la imagen no era interactiva. La autora señaló esa limitación de usabilidad. Se envolvió la imagen en un botón con nombre accesible, foco visible y el mismo manejador de apertura, sin retirar la acción anterior. Falta que la autora describa en sus palabras su detección y validación.

## Próximas entradas — pendientes

Registrar al menos un prompt adicional que la estudiante realmente envíe durante revisión, pruebas o aprendizaje del código. Para cada uno: texto literal, respuesta resumida, si funcionó a la primera y cambio necesario. Si el docente espera cinco prompts técnicos, usar cinco consultas reales sobre programación y conservar las entradas administrativas como contexto.

## Error de IA detectado por la estudiante — pendiente

La entrada 4 registra una limitación de usabilidad señalada por la autora y su corrección. Completar con una explicación personal de cómo la identificaste y verificaste. No inventar un fallo para llenar el requisito. Los problemas del entorno (por ejemplo acceso de red) no constituyen por sí mismos un error del código generado por IA.

## Reflexión personal — pendiente

Explicar con tus propias palabras qué aprendiste sobre fetch, JSON, async/await, DOM, estados HTTP y Git. Indicar qué pedirías de forma más precisa la próxima vez. Este apartado debe completarlo la estudiante a partir de su experiencia.
