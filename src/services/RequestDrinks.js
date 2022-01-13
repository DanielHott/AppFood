export default async function RequisitionDrink(drink, letter) {
  const MAX_LENGTH_ARRAY = 12;

  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${letter}=${drink}`;
  const responseApi = await fetch(url);
  const json = await responseApi.json();

  if (json.drinks !== null) {
    const myDrinks = { ...json };
    const drinks = myDrinks.drinks.slice(0, MAX_LENGTH_ARRAY);
    return drinks;
  }
  global
    .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
}

export async function getDrinkIngredientList(letter, MAX_LENGTH_ARRAY) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?${letter}=list`;
  const response = await fetch(url);
  const json = await response.json();

  const myAllIngredients = { ...json };
  const allIngredients = myAllIngredients.drinks.slice(0, MAX_LENGTH_ARRAY);

  return allIngredients;
}

export async function getDrinksByIngredient(ingredient, letter) {
  const MAX_LENGTH_ARRAY = 12;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${letter}=${ingredient}`;
  const response = await fetch(url);
  const json = await response.json();

  const myAllIngredients = { ...json };
  const allIngredients = myAllIngredients.drinks.slice(0, MAX_LENGTH_ARRAY);

  return allIngredients;
}

export async function getDrinksById(id) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const json = await response.json();

  return json.drinks;
}
