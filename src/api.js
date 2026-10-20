// Clave pública de prueba documentada por TheMealDB para uso educativo.
// Una clave privada nunca debe ponerse en JavaScript enviado al navegador.
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

export class ApiError extends Error {
  constructor(message, kind) {
    super(message);
    this.name = 'ApiError';
    this.kind = kind;
  }
}

export async function requestMeals(endpoint, params = {}, { fetcher = fetch, timeout = 12000 } = {}) {
  const url = new URL(endpoint, BASE_URL);
  url.search = new URLSearchParams(params).toString();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetcher(url, { signal: controller.signal });
    if (response.status === 429) {
      throw new ApiError('La API alcanzó su límite de peticiones. Espera un momento antes de volver a intentar.', 'rate-limit');
    }
    if (!response.ok) {
      throw new ApiError(`El servicio de recetas no está disponible (HTTP ${response.status}). Inténtalo más tarde.`, 'http');
    }
    let data;
    try { data = await response.json(); }
    catch { throw new ApiError('El servicio devolvió una respuesta que no se pudo leer.', 'invalid'); }
    if (!data || !Object.hasOwn(data, 'meals') || (data.meals !== null && !Array.isArray(data.meals))) {
      throw new ApiError('El servicio devolvió un formato inesperado.', 'invalid');
    }
    const meals = data.meals ?? [];
    if (meals.some(meal => !meal || typeof meal.idMeal !== 'string' || typeof meal.strMeal !== 'string')) {
      throw new ApiError('Algunas recetas llegaron incompletas. Inténtalo otra vez.', 'invalid');
    }
    return meals;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (controller.signal.aborted) {
      throw new ApiError('La solicitud tardó demasiado. Revisa tu conexión y vuelve a intentar.', 'timeout');
    }
    throw new ApiError('No pudimos conectar con TheMealDB. Comprueba tu conexión a internet e inténtalo otra vez.', 'network');
  } finally { clearTimeout(timer); }
}

export const searchMeals = (query, options) => requestMeals('search.php', { s: query }, options);
export const filterMeals = (category, options) => requestMeals('filter.php', { c: category }, options);
export const getMeal = (id, options) => requestMeals('lookup.php', { i: id }, options);
export const randomMeal = options => requestMeals('random.php', {}, options);

export function getIngredients(meal) {
  return Array.from({ length: 20 }, (_, index) => {
    const ingredient = meal[`strIngredient${index + 1}`]?.trim();
    const measure = meal[`strMeasure${index + 1}`]?.trim();
    return ingredient ? [measure, ingredient].filter(Boolean).join(' ') : null;
  }).filter(Boolean);
}

export function safeUrl(value, { image = false } = {}) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return null;
    if (image && url.hostname !== 'www.themealdb.com') return null;
    return url.href;
  } catch { return null; }
}
