import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import RecipesAppContext from '../context/RecipesAppContext';
import { getIngredient } from '../services/Functions';

export default function BebidasEmProgresso() {
  const { idDrinks, setDrinkId, setInProgress } = useContext(RecipesAppContext);
  const { drinkId } = useParams();
  setDrinkId(drinkId);
  const [drink] = idDrinks;

  const history = useHistory();
  const [checks, setCheck] = useState(0);
  const [ingredientsUsed, setIngredientsUsed] = useState([]);

  useEffect(() => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgress && inProgress.cocktails[drinkId]) {
      setInProgress(inProgress);
      setIngredientsUsed(inProgress.cocktails[drinkId]);
    }
  }, [drinkId, setInProgress]);

  useEffect(() => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgress) {
      inProgress.cocktails[drinkId] = ingredientsUsed;
      setInProgress(inProgress);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    }
    setCheck(ingredientsUsed.length);
  }, [ingredientsUsed, drinkId, setInProgress]);

  const finishRecipe = () => {
    let doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      doneRecipes.push({
        id: drinkId,
        type: 'bebida',
        area: '',
        category: drink.strCategory,
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
        tags: [],
      });
    } else {
      doneRecipes = [{
        id: drinkId,
        type: 'bebida',
        area: '',
        category: drink.strCategory,
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
        tags: [],
      }];
    }

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push('/receitas-feitas');
  };

  return (
    <div>
      { drink
        && (
          <div>
            <img
              data-testid="recipe-photo"
              src={ `${drink.strDrinkThumb}` }
              alt=""
              width="400"
            />
            <p data-testid="recipe-title">{drink.strDrink}</p>
            <p>{drink.strAlcoholic}</p>
            <p data-testid="recipe-category">
              {drink.strCategory}
              {drink.strAlcoholic}
            </p>
            <p data-testid="instructions">{drink.strInstructions}</p>
            { getIngredient(drink).map((ingredient) => (
              <div key={ ingredient.nome }>
                <label
                  data-testid={ `${ingredient.index - 1}-ingredient-step` }
                  htmlFor={ ingredient.nome }
                  className={
                    ingredientsUsed.includes(ingredient.index) ? 'stepDone' : null
                  }
                >
                  <input
                    type="checkbox"
                    id={ ingredient.nome }
                    checked={ ingredientsUsed.includes(ingredient.index) }
                    onChange={ async ({ target }) => {
                      const text = target.parentElement;
                      text.classList.toggle('stepDone');
                      if (target.checked) {
                        setIngredientsUsed([...ingredientsUsed, ingredient.index]);
                      } else {
                        const index = ingredientsUsed.indexOf(ingredient.index);
                        ingredientsUsed.splice(index, 1);
                        setIngredientsUsed([...ingredientsUsed]);
                      }
                    } }
                  />
                  {`${ingredient.nome} - ${ingredient.quantidade}`}
                </label>
              </div>
            ))}

            <input
              type="button"
              data-testid="share-btn"
              value="Compartilhar"
            />
            <FavoriteButton id={ drinkId } type="bebida" recipe={ drink } />
            <input
              type="button"
              data-testid="finish-recipe-btn"
              value="Finalizar Receita"
              disabled={ (checks !== getIngredient(drink).length) }
              onClick={ finishRecipe }
            />
          </div>)}
    </div>
  );
}
