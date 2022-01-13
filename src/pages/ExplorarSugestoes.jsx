import React from 'react';
import '../css/recipes.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';
import heart from '../images/heart.png';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarSugestoes() {
  const { id } = useParams();
  const storageCard = JSON.parse(localStorage.getItem('suggestions'))[id];

  return (
    <div className="main-screen">
      <Header />
      {storageCard.map((e) => (
        <div className="recipes-container" key={ e.idMeal }>
          <Link
            to={ `comidas/${e.idMeal}` }
            style={ { display: 'block' } }
            className="recipe-card"
          >
            <img
              className="img-card"
              src={ e.strMealThumb }
              alt={ e.strMeal }
              width="150"
            />
            <p>{e.strMeal}</p>
            <p className="category-paragraph">{ e.strCategory }</p>
            <div className="container-details">
              <p className="area-paragraph">{ e.strArea }</p>
              <img src={ heart } alt="" width="20px" />
            </div>
          </Link>
        </div>
      ))}
      <Footer />
    </div>
  );
}

export default ExplorarSugestoes;
