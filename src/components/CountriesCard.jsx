import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import countries from '../data';
import RecipesAppContext from '../context/RecipesAppContext';

function CountriesCard() {
  const { setDishesRequest } = useContext(RecipesAppContext);
  return (
    <>
      <h2 className="names-categ">Viagem pelo Mundo</h2>
      <div className="container-categories">
        { countries.map((country) => (
          <Link
            to="/comidas"
            className="country-card"
            key={ country }
            onClick={ () => {
              if (country === 'All') {
                setDishesRequest({ type: '', description: '' });
              } else {
                setDishesRequest({ type: country, description: 'area' });
              }
            } }
          >
            <img src={ `./Flags/${country}.png` } alt="" className="country-img" />
            <p className="description">{country}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

export default CountriesCard;
