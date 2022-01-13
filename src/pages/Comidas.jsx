import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Categories from '../components/Categories';
import RecipesAppContext from '../context/RecipesAppContext';
import RequisitionFood, {
  getFoodIngredients, RequisitionIdFood } from '../services/RequestDishes';
import '../css/recipes.css';
import heart from '../images/heart.png';

export default function Comidas() {
  const { dishes, setDishesRequest, setDishes, toggle } = useContext(RecipesAppContext);
  const [foodDetails, setFoodDetails] = useState({});

  useEffect(() => {
    dishes.forEach(({ idMeal }) => {
      RequisitionIdFood(idMeal)
        .then((data) => {
          const { strCategory, strArea } = data[0];
          setFoodDetails((food) => ({ ...food, [idMeal]: { strArea, strCategory } }));
        });
    });
  }, [dishes]);
  const MAX_STRING_LENGTH = 18;
  const history = useHistory();
  return (
    <>
      <div data-testid="comida">
        <Header title="Comidas" searchBtn request={ setDishesRequest } />
        { !toggle
      && <Categories
        getCategories={ getFoodIngredients }
        getByCategorie={ RequisitionFood }
        setRequest={ setDishesRequest }
        keyRequest={ { type: '', description: '' } }
        setElements={ setDishes }
        img="Dishes"
        route="/comidas"
      />}
        <div className="recipes-container">
          {
            dishes
              ? dishes.map(({ idMeal, strMealThumb, strMeal }) => (
                <Link
                  to={ `comidas/${idMeal}` }
                  style={ { display: 'block' } }
                  key={ idMeal }
                  className="recipe-card"
                >
                  <img
                    className="img-card"
                    src={ strMealThumb }
                    alt={ strMeal }
                    width="150"
                  />
                  <p>{`${strMeal.slice(0, MAX_STRING_LENGTH)}`}</p>
                  <p className="category-paragraph">
                    { foodDetails[idMeal] && foodDetails[idMeal].strCategory }
                  </p>
                  <div className="container-details">
                    <p className="area-paragraph">
                      { foodDetails[idMeal] && foodDetails[idMeal].strArea }
                    </p>
                    <img src={ heart } alt="" width="20px" />
                  </div>
                  { dishes.length === 1
                    && (dishes[0].idMeal !== '52968'
                    && history.push(`comidas/${dishes[0].idMeal}`)) }
                </Link>
              ))
              : global
                .alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
          }
        </div>
      </div>
      <Footer />
    </>
  );
}
