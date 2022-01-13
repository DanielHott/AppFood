import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getDrinkIngredientList,
  getDrinksByIngredient, getDrinksById } from '../services/RequestDrinks';
import RecipesAppContext from '../context/RecipesAppContext';
import Categories from '../components/Categories';
import '../css/recipes.css';
import heart from '../images/heart.png';

export default function Bebidas() {
  const { drinks, setDrinksRequest, setDrinks, toggle } = useContext(RecipesAppContext);
  const [drinkDetails, setDrinkDetails] = useState({});
  const MAX_LENGTH_TITLE = 12;
// a
  useEffect(() => {
    drinks.forEach(({ idDrink }) => {
      getDrinksById(idDrink)
        .then((data) => {
          const { strCategory, strAlcoholic } = data[0];
          setDrinkDetails((drink) => (
            { ...drink, [idDrink]: { strAlcoholic, strCategory } }));
        });
    });
  }, [drinks]);
  const history = useHistory();
  return (
    <div data-testid="bebida">
      <Header title="Bebidas" searchBtn request={ setDrinksRequest } />
      { !toggle
      && <Categories
        getCategories={ getDrinkIngredientList }
        getByCategorie={ getDrinksByIngredient }
        setRequest={ setDrinksRequest }
        keyRequest={ { type: '', description: '' } }
        setElements={ setDrinks }
        img="Drinks"
        route="/bebidas"
      />}
      <div className="recipes-container">
        {
          drinks
            && drinks.map(({ idDrink, strDrink, strDrinkThumb }) => (
              <Link
                to={ `bebidas/${idDrink}` }
                style={ { display: 'block' } }
                key={ idDrink }
                className="recipe-card"
              >
                <p>{strDrink.slice(0, MAX_LENGTH_TITLE)}</p>
                { drinks.length === 1 && history.push(`/bebidas/${drinks[0].idDrink}`)}
                <img
                  className="img-card"
                  src={ strDrinkThumb }
                  alt={ strDrink }
                  width="150"
                />
                <p className="category-paragraph">
                  {
                    drinkDetails[idDrink] && drinkDetails[idDrink].strCategory
                  }
                </p>
                <div className="container-details">
                  <p
                    className="area-paragraph"
                  >
                    {drinkDetails[idDrink]
                    && (drinkDetails[idDrink].strAlcoholic !== 'Optional alcohol'
                      ? drinkDetails[idDrink].strAlcoholic : 'Opt Alcoholic')}
                  </p>
                  <img src={ heart } alt="" width="20px" />
                </div>
              </Link>))
        }
      </div>
      <Footer />
    </div>
  );
}
