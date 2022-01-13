import React, { useContext, useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import FavoriteButton from '../components/FavoriteButton';
import RecipesAppContext from '../context/RecipesAppContext';
import { getIngredient } from '../services/Functions';

export default function ComidasEmProgresso() {
  const {
    idDishes,
    setFoodId,
    setInProgress,
  } = useContext(RecipesAppContext);
  const { dishId } = useParams();
  setFoodId(dishId);
  const [dish] = idDishes;

  const history = useHistory();
  const [checks, setCheck] = useState(0);
  const [ingredientsUsed, setIngredientsUsed] = useState([]);

  useEffect(() => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgress && inProgress.meals[dishId]) {
      setInProgress(inProgress);
      setIngredientsUsed(inProgress.meals[dishId]);
    }
  }, [dishId, setInProgress]);

  useEffect(() => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgress) {
      inProgress.meals[dishId] = ingredientsUsed;
      setInProgress(inProgress);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    }
    setCheck(ingredientsUsed.length);
  }, [ingredientsUsed, dishId, setInProgress]);

  const finishRecipe = () => {
    let doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      doneRecipes.push({
        id: dishId,
        type: 'comida',
        area: dish.strArea,
        category: dish.strCategory,
        alcoholicOrNot: '',
        name: dish.strMeal,
        image: dish.strMealThumb,
        tags: dish.strTags.split(','),
      });
    } else {
      doneRecipes = [{
        id: dishId,
        type: 'comida',
        area: dish.strArea,
        category: dish.strCategory,
        alcoholicOrNot: '',
        name: dish.strMeal,
        image: dish.strMealThumb,
        tags: dish.strTags.split(','),
      }];
    }
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    history.push('/receitas-feitas');
  };

  return (
    <div>
      <h2>In Progress</h2>
      <div className="recipe-detail">
        {
          dish && (
            <div>
              <img
                data-testid="recipe-photo"
                src={ `${dish.strMealThumb}` }
                alt=""
                width="400"
              />
              <div className="shot-instruction">
                <h2 data-testid="recipe-title" id="title">{dish.strMeal}</h2>
                <p data-testid="recipe-category">{dish.strCategory}</p>
                <p data-testid="instructions">{dish.strInstructions}</p>
              </div>
              <div id="checks">
                { getIngredient(dish).map((ingredient) => (
                  <div
                    key={ ingredient.index }
                  >
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
              </div>
              <input
                type="button"
                data-testid="share-btn"
                value="Compartilhar"
              />
              <FavoriteButton recipe={ dish } type="comida" id={ dishId } />
              <input
                type="button"
                data-testid="finish-recipe-btn"
                disabled={ (checks !== getIngredient(dish).length) }
                onClick={ finishRecipe }
                value="Finalizar-Receita"
              />
            </div>
          )
        }
      </div>
    </div>
  );
}
