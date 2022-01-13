export function getId(url) {
  const NUMBER_ELEVEN = 11;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === NUMBER_ELEVEN)
    ? match[2]
    : null;
}

export function getIngredientsAndMesure() {
}

export function getIngredient(dishe) {
  const ingredientes = [];
  const vinte = 20;
  for (let i = 1; i <= vinte; i += 1) {
    ingredientes.push({
      nome: dishe[`strIngredient${i}`],
      quantidade: dishe[`strMeasure${i}`],
      index: i,
    });
  }
  return ingredientes.filter((ingrediente) => ingrediente.nome);
}

export function saveInFavorites(recipe, type) {
  if (type === 'comida') {
    const dish = {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };
    return dish;
  }
  const drink = {
    id: recipe.idDrink,
    type: 'bebida',
    area: '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic,
    name: recipe.strDrink,
    image: recipe.strDrinkThumb,
  };
  return drink;
}
