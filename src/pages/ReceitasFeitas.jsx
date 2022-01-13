import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ShareButton from '../components/ShareButton';
import profileIcon from '../images/profileIcon.svg';

function ReceitasFeitas() {
  const [categories, setCategories] = useState('All');
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const [hasDoneRecipes, setHasDoneRecipes] = useState(false);
  const history = useHistory();

  function renderUrl(type, id) {
    const URL = window.location.href.replace('/receitas-feitas', '');
    const TYPE = `${type}s`;
    return `${URL}/${TYPE}/${id}`;
  }

  useEffect(() => {
    if (doneRecipes) setHasDoneRecipes(true);
  }, [doneRecipes]);

  return (
    <div>
      <header>
        <h1 data-testid="page-title">Receitas Feitas</h1>
        <button
          type="button"
          onClick={ () => history.push('/perfil') }
          data-testid="profile-top-btn"
        >
          <img src={ profileIcon } alt="Profile Icon" />
        </button>
      </header>
      <hr />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setCategories('All') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setCategories('food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setCategories('drink') }
      >
        Drinks
      </button>
      { hasDoneRecipes
        ? doneRecipes.filter((recipe) => {
          if (categories === 'All' || recipe.type === categories) return true;
          return false;
        }).map((recipe, index) => (
          <div key={ recipe.id }>
            <Link
              to={ recipe.type === 'comida'
                ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}` }
            >
              <img
                width="250px"
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              { `${recipe.area || recipe.alcoholicOrNot} - ${recipe.category}` }
            </p>
            <Link
              to={ recipe.type === 'comida'
                ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}` }
            >
              <p data-testid={ `${index}-horizontal-name` }>
                { recipe.name }
              </p>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>
              { recipe.doneDate }
            </p>
            <div>
              {recipe.tags.map((tagName) => (
                <p
                  key={ tagName.tags }
                  data-testid={ `${index}-${tagName}-horizontal-tag` }
                >
                  { tagName }
                </p>
              ))}
            </div>
            <ShareButton
              index={ index }
              url={ renderUrl(recipe.type, recipe.id) }
            />
          </div>
        ))
        : <h3>Não há receitas feitas!</h3> }
    </div>
  );
}

export default ReceitasFeitas;
