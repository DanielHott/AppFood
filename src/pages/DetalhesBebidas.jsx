import React, { useContext, useEffect } from 'react';
import '../css/detalhes.css';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import FavoriteButton from '../components/FavoriteButton';
import RecipesAppContext from '../context/RecipesAppContext';
import { getIngredient } from '../services/Functions';

export default function DetalhesBebidas() {
  const { idDrinks,
    setDrinkId,
    suggestionDishes,
  } = useContext(RecipesAppContext);
  const { id } = useParams();
  const MAX_LENGTH_ARRAY = 6;
  const style = {
    display: 'flex',
    justifyContent: 'center',
    background: 'white',
    position: 'fixed',
    bottom: '0',
    height: '30px',
    width: '30%',
  };
  const sixDishes = suggestionDishes && suggestionDishes.slice(0, MAX_LENGTH_ARRAY);
  const history = useHistory();

  useEffect(() => { setDrinkId(id); }, [setDrinkId, id]);

  return (
    <div className="recipe-detail">
      { idDrinks
        && idDrinks.map((drink) => (
          <div key={ drink.idDrink }>
            <img
              data-testid="recipe-photo"
              src={ `${drink.strDrinkThumb}` }
              alt=""
              width="400"
            />
            <div className="shot-instruction">
              <input
                type="button"
                data-testid="share-btn"
                value="Compartilhar"
              />

              <FavoriteButton id={ id } type="bebida" recipe={ drink } />
              <h2 data-testid="recipe-title" id="title">{drink.strDrink}</h2>
              <p className="alcohol">{drink.strAlcoholic}</p>
              <p data-testid="recipe-category">
                {drink.strCategory}
              </p>
              <p data-testid="instructions">{drink.strInstructions}</p>
              <ul>
                { getIngredient(drink).map((ingrediente, index) => (
                  <li
                    key={ ingrediente.nome }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {ingrediente.nome}
                    -
                    {ingrediente.quantidade}
                  </li>
                ))}
              </ul>
              <h4 className="acomp">Acompanhamentos:</h4>
            </div>
            <div className="foods">
              <div className="carouselWrapper">
                <div className="items">
                  { sixDishes.map((MealRecomendation, index) => (
                    <Link
                      className="item"
                      data-testid={ `${index}-recomendation-card` }
                      key={ index }
                      to={ `/comidas/${MealRecomendation.idMeal}` }
                    >
                      <p
                        key={ `${index}-key` }
                        data-testid={ `${index}-recomendation-title` }
                      >
                        { MealRecomendation.strMeal}
                      </p>
                      <img
                        className="imagem"
                        src={ `${MealRecomendation.strMealThumb}` }
                        alt=""
                      />
                    </Link>
                  )) }
                </div>
              </div>
            </div>
            <div className="buttons">

              <input
                type="button"
                className="start-button"
                style={ style }
                data-testid="start-recipe-btn"
                value="Iniciar Receita"
                onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
              />
            </div>
          </div>
        ))}
    </div>
  );
}
