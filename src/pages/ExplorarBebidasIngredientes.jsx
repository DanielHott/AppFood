import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import Footer from '../components/Footer';
import { getDrinkIngredientList } from '../services/RequestDrinks';
import Header from '../components/Header';

function ExplorarBebidasIngredientes() {
  const { setDrinksRequest } = useContext(RecipesAppContext);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const MAX_LENGTH_ARRAY = 12;
    getDrinkIngredientList('i', MAX_LENGTH_ARRAY).then((data) => setIngredients(data));
  }, []);

  return (
    <>
      <Header title="Bebidas Ingredientes" />

      { ingredients.map(({ strIngredient1 }, index) => (
        <Link
          to="/bebidas"
          type="button"
          data-testid={ `${index}-ingredient-card` }
          key={ strIngredient1 }
          onClick={ () => {
            setDrinksRequest({ type: 'ingrediente', description: strIngredient1 });
          } }
        >
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
            alt=""
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{ strIngredient1 }</p>
        </Link>
      ))}
      <Footer />
    </>
  );
}

export default ExplorarBebidasIngredientes;
