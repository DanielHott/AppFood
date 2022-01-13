import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { saveInFavorites } from '../services/Functions';

export default function FavoriteButton({ recipe, id, type }) {
  const [isFavorite, setIsFavorite] = useState();

  useEffect(() => {
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (currentFavorites) {
      const isAlreadyFavorited = currentFavorites.find((recipee) => recipee.id === id);
      if (isAlreadyFavorited) setIsFavorite(true);
    } else setIsFavorite(false);
  }, [id]);

  useEffect(() => {
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (isFavorite) {
      if (currentFavorites) {
        currentFavorites.push(saveInFavorites(recipe, type));
        localStorage.setItem('favoriteRecipes', JSON.stringify(currentFavorites));
      } else {
        const newFavorite = [saveInFavorites(recipe, type)];
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
      }
    } else if (currentFavorites) {
      const newFavorites = currentFavorites.filter((recipee) => recipee.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    }
  }, [id, isFavorite, recipe, type]);

  return (
    <button
      type="button"
      onClick={ () => setIsFavorite(!isFavorite) }
    >
      {
        isFavorite
          ? (<img data-testid="favorite-btn" src={ blackHeartIcon } alt="favorited" />)
          : (<img data-testid="favorite-btn" src={ whiteHeartIcon } alt="favorite" />)
      }
    </button>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
