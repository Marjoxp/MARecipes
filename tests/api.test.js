import test from 'node:test';
import assert from 'node:assert/strict';
import { requestMeals, searchMeals, filterMeals, getMeal, randomMeal, getIngredients, safeUrl } from '../src/api.js';

const meal = { idMeal: '52772', strMeal: 'Teriyaki Chicken', strIngredient1: ' Chicken ', strMeasure1: ' 500 g ', strIngredient2: ' ', strIngredient20: 'Salt', strMeasure20: '' };
const response = (body, status = 200) => async () => ({ ok: status >= 200 && status < 300, status, json: async () => body });

test('devuelve recetas del servicio', async () => {
  assert.deepEqual(await searchMeals('chicken', { fetcher: response({ meals: [meal] }) }), [meal]);
});
test('codifica búsquedas con caracteres especiales sin añadir parámetros', async () => {
  await searchMeals('rice & chicken', { fetcher: async url => {
    assert.equal(url.searchParams.get('s'), 'rice & chicken');
    assert.equal([...url.searchParams].length, 1);
    return { ok: true, status: 200, json: async () => ({ meals: [] }) };
  }});
});
test('cada acción usa el endpoint y parámetro documentados', async () => {
  for (const [call, endpoint, key, value] of [
    [options => filterMeals('Seafood', options), 'filter.php', 'c', 'Seafood'],
    [options => getMeal('52772', options), 'lookup.php', 'i', '52772'],
    [options => randomMeal(options), 'random.php', null, null]
  ]) {
    await call({ fetcher: async url => {
      assert.ok(url.pathname.endsWith(endpoint));
      if (key) assert.equal(url.searchParams.get(key), value);
      else assert.equal(url.search, '');
      return { ok: true, status: 200, json: async () => ({ meals: [meal] }) };
    }});
  }
});
test('respuesta vacía o meals null produce lista vacía', async () => {
  for (const meals of [null, []]) assert.deepEqual(await requestMeals('search.php', {}, { fetcher: response({ meals }) }), []);
});
test('HTTP 429 explica el límite de peticiones', async () => {
  await assert.rejects(searchMeals('a', { fetcher: response({}, 429) }), error => error.kind === 'rate-limit' && /límite/.test(error.message));
});
test('HTTP 500 se comunica como error del servicio', async () => {
  await assert.rejects(searchMeals('a', { fetcher: response({}, 500) }), error => error.kind === 'http' && /500/.test(error.message));
});
test('rechazo de fetch comunica desconexión', async () => {
  await assert.rejects(searchMeals('a', { fetcher: async () => { throw new TypeError('Failed to fetch'); } }), error => error.kind === 'network');
});
test('el tiempo de espera aborta y permite reintentar', async () => {
  await assert.rejects(searchMeals('a', { timeout: 5, fetcher: async (url, { signal }) => new Promise((resolve, reject) => {
    signal.addEventListener('abort', () => reject(new Error('aborted')), { once: true });
  }) }), error => error.kind === 'timeout');
});
test('rechaza JSON ilegible y contratos incompletos', async () => {
  const malformed = [response({}), response(null), response({ meals: {} }), response({ meals: [null] }), response({ meals: [{ idMeal: '1' }] }), async () => ({ ok: true, status: 200, json: async () => { throw new SyntaxError(); } })];
  for (const fetcher of malformed) await assert.rejects(searchMeals('a', { fetcher }), error => error.kind === 'invalid');
});
test('recoge los 20 ingredientes, elimina huecos y respeta medidas', () => {
  assert.deepEqual(getIngredients(meal), ['500 g Chicken', 'Salt']);
});
test('no admite enlaces ejecutables ni imágenes de dominios ajenos', () => {
  assert.equal(safeUrl('javascript:alert(1)'), null);
  assert.equal(safeUrl('http://example.com'), null);
  assert.equal(safeUrl(null), null);
  assert.equal(safeUrl('https://example.com/photo.jpg', { image: true }), null);
  assert.equal(safeUrl('https://www.themealdb.com/images/media/meals/example.jpg', { image: true }), 'https://www.themealdb.com/images/media/meals/example.jpg');
  assert.equal(safeUrl('https://www.youtube.com/watch?v=test'), 'https://www.youtube.com/watch?v=test');
});
