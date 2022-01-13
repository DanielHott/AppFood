function randomize(json) {
  return json[Math.floor(Math.random() * json.length)];
}

export async function getFoodById(id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const responseApi = await fetch(url);
  const json = await responseApi.json();
  return json.meals;
}

export default async function getBreakfasts() {
  const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=breakfast';
  const responseApi = await fetch(url);
  const json = await responseApi.json();
  const result = await getFoodById(randomize(json.meals).idMeal);

  return result;
}

export async function getRandomFoods() {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const responseApi = await fetch(url);
  const { meals } = await responseApi.json();

  const a = [randomize(meals), randomize(meals)];

  return a;
}

export async function getRandomFood(foodId) {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const responseApi = await fetch(url);
  const { meals } = await responseApi.json();

  let meal = randomize(meals);

  if (foodId === meal.idMeal) {
    meal = meals.find(({ idMeal }) => idMeal !== meal.idMeal);
  }

  return meal;
}

export async function getRandomDrinks() {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const responseApi = await fetch(url);
  const { drinks } = await responseApi.json();
  const
    { idDrink, strDrinkThumb, strDrink, strCategory, strAlcoholic } = randomize(drinks);
  const obj = { idMeal: idDrink,
    strMealThumb: strDrinkThumb,
    strMeal: strDrink,
    strCategory,
    strArea: strAlcoholic };

  return obj;
}

export async function getPerfectObject() {
  const food = await getRandomFoods();
  const drink = await getRandomDrinks();
  const breakfast = await getBreakfasts();
  return [...food, ...breakfast, drink];
}
