import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.png';
import searchIcon from '../images/searchIcon.png';
import RecipesAppContext from '../context/RecipesAppContext';
import '../css/HeaderFooter.css';

function Header({ request, title }) {
  const { toggle, setToggle } = useContext(RecipesAppContext);
  const [values, setValues] = useState({ description: '' });
  const history = useHistory();

  function setToggleInput() {
    setToggle(!toggle);
  }

  return (
    <>
    <header className="header">
      <button
        type="button"
        onClick={ () => history.push('/perfil') }
        data-testid="profile-top-btn"
      >
        <img src={ profileIcon } alt="Profile Icon" />
      </button>
      <h1 data-testid="page-title" id="title">{title}</h1>
      <button
        type="button"
        onClick={ setToggleInput }
        data-testid="search-top-btn"
        >
        <img src={ searchIcon } alt="Profile Icon" />
      </button>
        </header>
        <div className="search" >

          <form
            onSubmit={ (event) => {
              event.preventDefault();
              request(values);
            } }
          >
            <input
              type="text"
              data-testid="search-input"
              onChange={ (e) => setValues({ ...values, description: e.target.value }) }
            />
            <button
              type="submit"
              data-testid="exec-search-btn"
              name="exec-btn"
              value="Pesquisar"
              style={ { backgroundColor: 'white', border: '2px outset white', height: '29px' } }
            >
              Pesquisar
            </button>
          <hr />
            <label className="radio-select" htmlFor="ingredient-search-radio">
              <input
                id="ingredient-search-radio"
                className="radio-select"
                type="radio"
                data-testid="ingredient-search-radio"
                onChange={ (e) => setValues({ ...values, type: e.target.value }) }
                name="method"
                value="ingrediente"
              />
              Ingrediente
            </label>
            <label className="radio-select"htmlFor="name-search-radio">
              <input
                id="name-search-radio"
                className="radio-select"
                type="radio"
                data-testid="name-search-radio"
                onChange={ (e) => setValues({ ...values, type: e.target.value }) }
                name="method"
                value="nome"
              />
              Nome
            </label>
            <label className="radio-select" htmlFor="first-letter-search-radio">
              <input
                id="first-letter-search-radio"
                type="radio"
                className="radio-select"
                data-testid="first-letter-search-radio"
                onChange={ (e) => setValues({ ...values, type: e.target.value }) }
                name="method"
                value="primeira-letra"
              />
              Primeira letra
            </label>
          </form>
        </div>
    </>
  );
}

Header.propTypes = {
  request: PropTypes.func,
  title: PropTypes.string.isRequired,
};
Header.defaultProps = {
  request: undefined,
};

export default Header;
