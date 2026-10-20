// Servidor de desarrollo sin dependencias. Solo sirve archivos públicos conocidos.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const allowed = new Map([
  ['/', ['index.html', 'text/html']],
  ['/index.html', ['index.html', 'text/html']],
  ['/styles.css', ['styles.css', 'text/css']],
  ['/src/app.js', ['src/app.js', 'text/javascript']],
  ['/src/api.js', ['src/api.js', 'text/javascript']]
]);
const port = Number(process.env.PORT || 5173);
createServer(async (request, response) => {
  const entry = allowed.get(new URL(request.url, 'http://localhost').pathname);
  if (!entry || !['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(404); response.end('No encontrado'); return;
  }
  try {
    const content = await readFile(path.join(root, entry[0]));
    response.writeHead(200, { 'Content-Type': `${entry[1]}; charset=utf-8`, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch { response.writeHead(500); response.end('No se pudo leer el archivo.'); }
}).listen(port, '127.0.0.1', () => console.log(`MARecipes: http://127.0.0.1:${port}`));
