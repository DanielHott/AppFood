export default async function RequisitionFood(food, letter) {
  const MAX_LENGTH_ARRAY = 12;

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?${letter}=${food}`;
  const responseApi = await fetch(url);
  const json = await responseApi.json();

  const myDishes = { ...json };
  const dishes = myDishes.meals.slice(0, MAX_LENGTH_ARRAY);

  return dishes;
}

export async function getFoodIngredients(letter, MAX_LENGTH_ARRAY) {
  const url = `https://www.themealdb.com/api/json/v1/1/list.php?${letter}=list`;
  const response = await fetch(url);
  const json = await response.json();

  const myAllIngredients = { ...json };
  const allIngredients = myAllIngredients.meals.slice(0, MAX_LENGTH_ARRAY);

  return allIngredients;
}

export async function RequisitionFoodName(food) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`;
  const responseApi = await fetch(url);
  const json = await responseApi.json();

  return json.meals;
}

export async function RequisitionFoodFirstName(food) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${food}`;
  const responseApi = await fetch(url);
  const json = await responseApi.json();

  return json.meals;
}

export async function getFoodByArea(area) {
  const MAX_LENGTH_ARRAY = 12;
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
  const response = await fetch(url);
  const json = await response.json();

  const myAllIngredients = { ...json };
  const allIngredients = myAllIngredients.meals.slice(0, MAX_LENGTH_ARRAY);

  return allIngredients;
}

export async function RequisitionIdFood(id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const responseApi = await fetch(url);
  const json = await responseApi.json();
  return json.meals;
}
