import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesAppContext from '../context/RecipesAppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarComidasOrigem() {
  const { setDishesRequest, dishes, setFoodId } = useContext(RecipesAppContext);

  useEffect(() => {
    setDishesRequest({ type: '', description: '' });
  }, [setDishesRequest]);

  return (
    <>
      <Header title="Comidas Por Origem" />

      <label htmlFor="countries">
        <select
          data-testid="explore-by-area-dropdown"
          id="countries"
          onChange={ ({ target }) => {
            if (target.value === 'All') {
              setDishesRequest({ type: '', description: '' });
            } else {
              setDishesRequest({ type: target.value, description: 'area' });
            }
          } }
        >

          { countries.map((name) => (
            <option
              data-testid={ `${name}-option` }
              value={ name }
              key={ name }
            >
              {name}
            </option>
          ))}
        </select>
      </label>
      <div>
        {
          dishes
            ? dishes.map((dishe, index) => (
              <Link
                to={ `/comidas/${dishe.idMeal}` }
                key={ dishe.idMeal }
                data-testid={ `${index}-recipe-card` }
                style={ { display: 'block' } }
                onClick={ () => setFoodId(dishe.idMeal) }
              >
                <p data-testid={ `${index}-card-name` }>{dishe.strMeal}</p>
                <img
                  src={ dishe.strMealThumb }
                  alt={ dishe.strMeal }
                  width="150"
                  data-testid={ `${index}-card-img` }
                />
              </Link>))
            : <div> Não encontramos resultados pra sua pesquisa</div>
        }
      </div>
      <Footer />
    </>
  );
}

export default ExplorarComidasOrigem;
