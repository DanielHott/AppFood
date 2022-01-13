import React from 'react';
import { Link } from 'react-router-dom';
import '../css/explore.css';

function SuggestionCard() {
  const MAX_LENGTH_ARRAY = 7;
  const storageObj = JSON.parse(localStorage.getItem('suggestions'));

  return (
    <div className="container-suggestion">
      {
        storageObj !== null && (
          [...Array(MAX_LENGTH_ARRAY).keys()].map((index) => (
            <Link to={ `/explorar/${index}` } key={ index }>
              <img
                className="suggestion-img"
                src={ storageObj[index][0].strMealThumb }
                alt=""
              />
            </Link>
          ))
        )
      }
    </div>
  );
}

export default SuggestionCard;
