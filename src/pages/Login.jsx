import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/login.css';

export default function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const MIN_PASS_LENGTH = 6;
    const checkEmail = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi.test(email);
    const checkPassword = password.length > MIN_PASS_LENGTH;
    if (checkEmail && checkPassword) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  }

  return (
    <div className="background-login">
      <form className="login">
        <h1>AppFood</h1>
        <label htmlFor="email-input">
          <input
            data-testid="email-input"
            onChange={ (e) => setEmail(e.target.value) }
            id="email-input"
            className="input-login"
            placeholder="Email"
            type="email"
            value={ email }
          />
        </label>
        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            onChange={ (e) => setPassword(e.target.value) }
            id="password-input"
            className="input-login"
            placeholder="Senha"
            type="password"
            value={ password }
          />
        </label>
        <button
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          className="button-login"
          style={ { display: 'block' } }
          onClick={ handleSubmit }
          type="submit"
        >
          Avançar
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
