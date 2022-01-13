import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesAppContext from '../context/RecipesAppContext';

function ExplorarBebidas() {
  const history = useHistory();
  const { setDrinkId } = useContext(RecipesAppContext);

  async function randomDrink() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const response = await fetch(url);
    const json = await response.json();

    const { idDrink } = json.drinks[0];

    setDrinkId(idDrink);
    history.push(`/bebidas/${idDrink}`);
  }

  return (
    <>
      <Header title="Explorar Bebidas" searchBtn={ false } />
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explorar/bebidas/ingredientes') }
      >
        Por Ingredientes

      </button>

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => randomDrink() }
      >
        Me Surpreenda!

      </button>
      <Footer />
    </>
  );
}

export default ExplorarBebidas;
