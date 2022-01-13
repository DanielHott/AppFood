import React, { useContext, useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import SuggestionCard from '../components/SuggestionCard';
import CountriesCard from '../components/CountriesCard';
import RecipesAppContext from '../context/RecipesAppContext';
import RequisitionFood, { getFoodIngredients } from '../services/RequestDishes';
import { getDrinkIngredientList,
  getDrinksByIngredient } from '../services/RequestDrinks';
import '../css/explore.css';
import arrow from '../images/circular-arrow.png';
import { getPerfectObject } from '../services/RequestDiscover';
import Header from '../components/Header';

function Explorar() {
  const { setDishesRequest,
    setDishes, setDrinksRequest, setDrinks } = useContext(RecipesAppContext);
  const MAX_LENGTH_ARRAY = 8;
  const [storage, setStorage] = useState(true);

  useEffect(() => {
    function acb() {
      [...Array(MAX_LENGTH_ARRAY).keys()].forEach((_, index) => {
        getPerfectObject().then((data) => {
          const storageObj = JSON.parse(localStorage.getItem('suggestions'));
          if (storageObj) {
            localStorage
              .setItem('suggestions', JSON.stringify({ ...storageObj, [index]: data }));
          }
        });
        setStorage(false);
      });
    }
    if (storage)acb();
  }, [storage]);

  return (
    // agr vai
    <>
      <Header title="Discover" />
      <button
        type="button"
        className="reload"
        onClick={ () => {
          if (JSON.parse(localStorage.getItem('suggestions'))) {
            setStorage(true);
          }
        } }
      >
        <img src={ arrow } alt="" width="20px" />
      </button>
      <SuggestionCard />
      <h1 className="descript-categ">Categorias</h1>
      <h2 className="names-categ">Bebidas</h2>
      <Categories
        getCategories={ getDrinkIngredientList }
        getByCategorie={ getDrinksByIngredient }
        setRequest={ setDrinksRequest }
        keyRequest={ { type: '', description: '' } }
        setElements={ setDrinks }
        route="/bebidas"
        img="Drinks"
      />
      <h2 className="names-categ">Comidas</h2>
      <Categories
        getCategories={ getFoodIngredients }
        getByCategorie={ RequisitionFood }
        setRequest={ setDishesRequest }
        keyRequest={ { type: '', description: '' } }
        setElements={ setDishes }
        route="/comidas"
        img="Dishes"
      />
      <CountriesCard />
      <Footer />
    </>
  );
}

export default Explorar;
