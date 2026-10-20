# Verificación del proyecto

Ejecución durante la sesión iniciada el 19 de octubre de 2026.

## Pruebas automatizadas

Comando: `node --test` (equivalente a `npm test`). Resultado observado: **11 pruebas aprobadas, 0 fallidas**.

1. Lectura de recetas devueltas por el servicio.
2. Codificación de búsquedas con espacios y `&` sin añadir parámetros inesperados.
3. Endpoints y parámetros correctos para categoría, detalle y aleatorio.
4. Respuestas `meals: null` y `meals: []` como lista vacía.
5. Mensaje específico ante HTTP 429.
6. Mensaje de indisponibilidad ante HTTP 500.
7. Error de conexión al rechazarse fetch.
8. Cancelación por tiempo de espera y mensaje correspondiente.
9. JSON inválido, formato inesperado o receta incompleta.
10. Extracción de ingredientes y cantidades, incluyendo el campo 20.
11. Rechazo de enlaces ejecutables, protocolos no HTTPS e imágenes de dominios ajenos.

Se inyectan respuestas simuladas para comprobar fallos sin saturar la API. Estas pruebas verifican la capa de datos, no sustituyen las pruebas visuales. `npm run check` también pasó para los tres archivos JavaScript de aplicación y servidor.

## Comprobaciones reales

- Servidor local: respuesta HTTP 200 en `http://127.0.0.1:5173`.
- Navegador: carga real de 25 resultados para `chicken` en esta sesión. El número puede cambiar.
- Detalle: Chicken Handi mostró ingredientes, medidas, preparación y enlace de video.
- Búsqueda `cake`: 25 resultados en esta sesión.
- Búsqueda `zzzzmarecipesnonexistent`: mensaje de ausencia de resultados.
- Categoría Pasta: 12 resultados en esta sesión.
- “Sorpréndeme”: detalle de una receta real, con ingredientes y fuente.
- Diálogo: cierre con botón y retorno al contenido.
- Revisión visual en escritorio (1280 px) y móvil (390 px).
- Se detectó un desbordamiento horizontal de la órbita decorativa: su transformación rotaba la caja de un círculo y ampliaba el área desplazable. Se quitó esa rotación; el ancho desplazable posterior no excedió la ventana en las dos vistas.

La desconexión y HTTP 429 se verificaron con simulaciones automatizadas; no se provocó un límite real del proveedor. Queda recomendado que la estudiante repita el recorrido manual, pruebe Escape y el teclado y ensaye el modo sin conexión de su propio navegador antes de exponer.

## Repetición manual

Actualización visual: se comprobó el ancho a 1920 px (contenido de aproximadamente 1790 px y cinco columnas de recetas) y a 390 px, sin desbordamiento horizontal. Las etiquetas del plato permanecen rectas y visibles en móvil. El botón de animación cambió el estado CSS entre `paused` y `running`. La hoja de estilos desactiva la animación con `prefers-reduced-motion: reduce`. Se guardaron capturas actualizadas de portada y plato en móvil. La comprobación de sintaxis pasó después de estos cambios.

1. Ejecutar `npm start`, abrir la dirección local y esperar recetas.
2. Buscar `cake`, abrir una tarjeta y comprobar ingredientes e instrucciones.
3. Cerrar con Escape y cambiar a Pasta.
4. Buscar una cadena inexistente y comprobar el mensaje vacío.
5. Activar modo sin conexión en DevTools, realizar otra búsqueda y esperar el error. Reconectar y pulsar “Volver a intentar”.
6. Ejecutar `npm test` para comprobar HTTP 429 sin enviar tráfico excesivo.
7. Probar una ventana estrecha y recorrer controles con Tab.
