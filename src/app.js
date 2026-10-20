import { searchMeals, filterMeals, getMeal, randomMeal, getIngredients, safeUrl } from './api.js';

const $ = selector => document.querySelector(selector);
const recipes = $('#recipes');
const status = $('#status');
const dialog = $('#recipe-dialog');
const detail = $('#recipe-detail');
let requestVersion = 0;
let detailVersion = 0;
let retryAction;
let selectedCategory = '';
let lastDetailButton;

// textContent evita interpretar los datos externos como HTML ejecutable.
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function mealImage(meal, className) {
  const url = safeUrl(meal.strMealThumb, { image: true });
  if (!url) return element('div', className);
  const image = element('img', className);
  image.src = url;
  image.alt = meal.strMeal;
  image.loading = 'lazy';
  image.addEventListener('error', () => image.replaceWith(element('div', className)), { once: true });
  return image;
}

function selectCategory(button) {
  $('#categories').querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
}

function renderCards(meals) {
  recipes.replaceChildren();
  meals.forEach(meal => {
    const card = element('article', 'recipe-card');
    const copy = element('div', 'card-copy');
    copy.append(element('span', 'card-category', [meal.strCategory || selectedCategory || 'Receta', meal.strArea].filter(Boolean).join(' · ')));
    copy.append(element('h4', '', meal.strMeal));
    const button = element('button', '', 'Ver receta');
    button.type = 'button';
    button.setAttribute('aria-label', `Ver receta: ${meal.strMeal}`);
    button.append(element('span', '', '↗'));
    button.addEventListener('click', () => openRecipe(meal.idMeal, button));
    copy.append(button);
    card.append(mealImage(meal, 'recipe-image'), copy);
    recipes.append(card);
  });
}

async function loadRecipes(loader, title) {
  // Solo la última consulta puede actualizar la pantalla si llegan fuera de orden.
  const version = ++requestVersion;
  retryAction = () => loadRecipes(loader, title);
  $('#retry-button').hidden = true;
  $('#results-title').textContent = title;
  $('#result-count').textContent = '';
  recipes.replaceChildren();
  recipes.setAttribute('aria-busy', 'true');
  status.className = 'status';
  status.textContent = 'Buscando algo rico…';
  try {
    const meals = await loader();
    if (version !== requestVersion) return;
    $('#result-count').textContent = `${meals.length} ${meals.length === 1 ? 'receta' : 'recetas'}`;
    status.textContent = meals.length ? '' : 'No encontramos recetas. Prueba otro nombre en inglés, como pasta o chicken, o elige una categoría.';
    renderCards(meals);
  } catch (error) {
    if (version !== requestVersion) return;
    status.className = 'status error';
    status.textContent = error.message;
    $('#retry-button').hidden = false;
  } finally {
    if (version === requestVersion) recipes.setAttribute('aria-busy', 'false');
  }
}

function renderDetail(meal) {
  const copy = element('div', 'detail-copy');
  const title = element('h2', '', meal.strMeal);
  title.id = 'detail-title';
  copy.append(element('p', 'eyebrow', 'DE LA IDEA A TU MESA'), title);
  copy.append(element('p', 'detail-meta', [meal.strCategory, meal.strArea].filter(Boolean).join(' · ')));
  copy.append(element('p', 'detail-meta', 'Contenido original de TheMealDB, generalmente en inglés.'));
  copy.append(element('h3', '', 'Ingredientes'));
  const list = element('ul');
  const ingredients = getIngredients(meal);
  ingredients.forEach(ingredient => list.append(element('li', '', ingredient)));
  copy.append(ingredients.length ? list : element('p', '', 'Esta receta no incluye una lista de ingredientes.'));
  copy.append(element('h3', '', 'Preparación'));
  const steps = (meal.strInstructions || '').split(/\r?\n/).map(step => step.trim()).filter(Boolean);
  const instructions = element('ol');
  steps.forEach(step => instructions.append(element('li', '', step)));
  copy.append(steps.length ? instructions : element('p', '', 'La API no incluye instrucciones para esta receta.'));
  const links = element('div', 'detail-links');
  [[meal.strYoutube, 'Ver video ↗'], [meal.strSource, 'Fuente original ↗']].forEach(([value, label]) => {
    const url = safeUrl(value);
    if (!url) return;
    const link = element('a', 'secondary', label);
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    links.append(link);
  });
  copy.append(links);
  detail.replaceChildren(mealImage(meal, 'detail-hero'), copy);
}

async function openRecipe(id, button, loader = () => getMeal(id)) {
  const version = ++detailVersion;
  lastDetailButton = button || lastDetailButton;
  const heading = element('h2', '', 'Tu receta');
  heading.id = 'detail-title';
  const content = element('div', 'detail-copy');
  content.append(heading, element('p', 'status', 'Cargando ingredientes y preparación…'));
  detail.replaceChildren(content);
  if (!dialog.open) dialog.showModal();
  try {
    const meals = await loader();
    if (version !== detailVersion || !dialog.open) return;
    if (!meals.length) throw new Error('Esta receta ya no está disponible. Prueba otra.');
    renderDetail(meals[0]);
  } catch (error) {
    if (version !== detailVersion || !dialog.open) return;
    content.replaceChildren(heading, element('p', 'status error', error.message));
    const retry = element('button', 'secondary', 'Volver a intentar');
    retry.type = 'button';
    retry.addEventListener('click', () => openRecipe(id, button, loader));
    content.append(retry);
  }
}

$('#search-form').addEventListener('submit', event => {
  event.preventDefault();
  const query = $('#query').value.trim();
  if (!query) { $('#query').value = ''; $('#query').reportValidity(); return; }
  selectedCategory = '';
  selectCategory(null);
  loadRecipes(() => searchMeals(query), `Resultados para “${query}”`);
});
$('#categories').addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button) return;
  selectCategory(button);
  $('#query').value = '';
  selectedCategory = button.dataset.category || '';
  if (selectedCategory) {
    const category = selectedCategory;
    loadRecipes(() => filterMeals(category), `Recetas: ${button.textContent}`);
  } else loadRecipes(() => searchMeals('chicken'), 'Ideas con pollo para empezar');
});
$('#random-button').addEventListener('click', event => openRecipe(null, event.currentTarget, () => randomMeal()));
$('#retry-button').addEventListener('click', () => retryAction?.());
$('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { ++detailVersion; lastDetailButton?.focus(); });
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
loadRecipes(() => searchMeals('chicken'), 'Ideas con pollo para empezar');
