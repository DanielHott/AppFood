import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import RecipesAppContext from '../context/RecipesAppContext';
import { getIngredient, getId } from '../services/Functions';
import FavoriteButton from '../components/FavoriteButton';

export default function DetalhesComidas() {
  const { idDishes, drinks, setFoodId } = useContext(RecipesAppContext);
  const { id } = useParams();
  const MAX_LENGTH_ARRAY = 6;
  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    background: 'white',
    position: 'fixed',
    bottom: '0',
    height: '30px',
    width: '30%',
  };
  const sixDrinks = drinks && drinks.slice(0, MAX_LENGTH_ARRAY);
  const history = useHistory();

  useEffect(() => { setFoodId(id); }, [setFoodId, id]);

  return (
    <div className="recipe-detail">
      {
        idDishes.map((dishe) => (
          <div key={ dishe.idMeal }>
            <img
              data-testid="recipe-photo"
              src={ `${dishe.strMealThumb}` }
              alt=""
              width="400"
            />
            <div className="shot-instruction">
              <input
                type="button"
                data-testid="share-btn"
                value="Compartilhar"
              />
              <FavoriteButton id={ id } type="comida" recipe={ dishe } />
              <h2 data-testid="recipe-title" id="title">{dishe.strMeal}</h2>
              <p data-testid="recipe-category">{dishe.strCategory}</p>
              <p data-testid="instructions">{dishe.strInstructions}</p>
              <ul>
                { getIngredient(dishe).map((ingrediente, index) => (
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
              <iframe
                data-testid="video"
                className="video"
                width="360"
                height="315"
                title="video"
                src={ `//www.youtube.com/embed/${getId(dishe.strYoutube)}` }
                frameBorder="0"
                allowFullScreen
              />
              <h4 className="acomp">Acompanhamentos:</h4>
            </div>
            <div className="foods">
              <div className="carouselWrapper">
                <div className="items">
                  { sixDrinks.map((drinksRecomendations, index) => (
                    <Link
                      className="item"
                      key={ `${index}-key` }
                      data-testid={ `${index}-recomendation-card` }
                      to={ `/bebidas/${drinksRecomendations.idDrink}` }
                    >
                      <p data-testid={ `${index}-recomendation-title` }>
                        { drinksRecomendations.strDrink }
                      </p>
                      <img
                        className="imagem"
                        src={ `${drinksRecomendations.strDrinkThumb}` }
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
                data-testid="start-recipe-btn"
                onClick={ () => history.push(`/comidas/${dishe.idMeal}/in-progress`) }
                style={ style }
                value="Iniciar Receita"
              />
            </div>
          </div>
        ))
      }
    </div>
  );
}
