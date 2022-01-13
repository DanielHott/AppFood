import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';
import RequisitionFood, {
  RequisitionFoodFirstName,
  RequisitionFoodName, getFoodByArea,
  RequisitionIdFood,
} from '../services/RequestDishes';
import RequisitionDrink,
{ getDrinksByIngredient, getDrinksById } from '../services/RequestDrinks';

function RecipesAppProvider({ children }) {
  const [dishesResquest, setDishesRequest] = useState({ type: '', description: '' });
  const [drinksResquest, setDrinksRequest] = useState({ type: '', description: '' });
  const [foodId, setFoodId] = useState();
  const [drinkId, setDrinkId] = useState();
  const [idDishes, setIdDishes] = useState([]);
  const [idDrinks, setIdDrinks] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [suggestionDishes, setSuggestionDishes] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [inProgressRecipes, setInProgress] = useState({ cocktails: {}, meals: {} });
  const [toggle, setToggle] = useState(false);
  const firstLetter = 'primeira-letra';

  useEffect(() => {
    const { description, type } = dishesResquest;
    if (description === '') {
      RequisitionFood('', 'i').then((response) => setDishes(response));
    }
    if (type === 'ingrediente') {
      RequisitionFood(description, 'i').then((response) => setDishes(response));
    }
    if (description === 'area') {
      getFoodByArea(type).then((response) => setDishes(response));
    }
    if (type === 'nome') {
      RequisitionFoodName(description)
        .then((response) => setDishes(response));
    }
    if (type === firstLetter
      && description.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else if (type === firstLetter && description) {
      RequisitionFoodFirstName(description)
        .then((response) => setDishes(response));
    }
  }, [dishesResquest]);

  useEffect(() => {
    const { description, type } = drinksResquest;
    if (description === '') {
      RequisitionDrink(description, 's').then((response) => setDrinks(response));
    }
    if (type === 'nome') {
      RequisitionDrink(description, 's').then((response) => setDrinks(response));
    }
    if (type === firstLetter
      && description.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else if (type === firstLetter
        && description) {
      RequisitionDrink(description, 'f').then((response) => setDrinks(response));
    }
    if (type === 'ingrediente') {
      getDrinksByIngredient(description, 'i').then((response) => setDrinks(response));
    }
  }, [drinksResquest]);

  useEffect(() => {
    if (foodId) RequisitionIdFood(foodId).then((response) => setIdDishes(response));
  }, [foodId]);

  useEffect(() => {
    if (drinkId) {
      getDrinksById(drinkId).then((response) => {
        if (response) setIdDrinks(response);
      });
      RequisitionFoodName('')
        .then((response) => setSuggestionDishes(response));
    }
  }, [drinkId]);

  useEffect(() => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgress) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      console.log('localStorage', inProgressRecipes);
    }
  }, [inProgressRecipes]);

  return (
    <RecipesAppContext.Provider
      value={ {
        dishesResquest,
        setDishesRequest,
        drinksResquest,
        setDrinksRequest,
        dishes,
        drinks,
        toggle,
        setToggle,
        setDrinks,
        setDishes,
        setFoodId,
        setDrinkId,
        idDishes,
        idDrinks,
        suggestionDishes,
        inProgressRecipes,
        setInProgress,
      } }
    >
      { children }
    </RecipesAppContext.Provider>
  );
}

RecipesAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesAppProvider;
