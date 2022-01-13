import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getFoodIngredients } from '../services/RequestDishes';
import RecipesAppContext from '../context/RecipesAppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarComidasIngredientes() {
  const [ingredients, setIngredients] = useState([]);
  const { setDishesRequest } = useContext(RecipesAppContext);

  const history = useHistory();

  useEffect(() => {
    const MAX_LENGTH_ARRAY = 12;
    getFoodIngredients('i', MAX_LENGTH_ARRAY).then((data) => setIngredients(data));
  }, []);

  return (
    <>
      <Header title="Comidas Ingredientes" />

      { ingredients.map(({ strIngredient }, index) => (
        <button
          type="button"
          data-testid={ `${index}-ingredient-card` }
          key={ strIngredient }
          onClick={ () => {
            history.push('/comidas');
            setDishesRequest({ description: strIngredient, type: 'ingrediente' });
          } }
        >
          <img src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` } alt="" data-testid={ `${index}-card-img` } />
          <p data-testid={ `${index}-card-name` }>{ strIngredient }</p>
        </button>
      ))}
      <Footer />
    </>
  );
}

export default ExplorarComidasIngredientes;
