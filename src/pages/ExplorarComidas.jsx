import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesAppContext from '../context/RecipesAppContext';

function ExplorarComidas() {
  const history = useHistory();
  const { setFoodId } = useContext(RecipesAppContext);

  async function randomFood() {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const response = await fetch(url);
    const json = await response.json();

    const { idMeal } = json.meals[0];

    setFoodId(idMeal);
    history.push(`/comidas/${idMeal}`);
  }

  return (
    <>
      <Header title="Explorar Comidas" />

      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/comidas/ingredientes') }
      >
        Por Ingredientes

      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ () => history.push('/explorar/comidas/area') }
      >
        Por Local de Origem

      </button>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => randomFood() }
      >
        Me Surpreenda!

      </button>
      <Footer />
    </>
  );
}

export default ExplorarComidas;
