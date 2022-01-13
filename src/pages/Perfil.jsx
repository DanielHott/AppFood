import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'));
  const [avatar, setAvatar] = useState();
  const { email } = user !== null && user;
  const hash = md5(email).toString();
  useEffect(() => {
    if (email) fetch(`https://www.gravatar.com/avatar/${hash}`).then((response) => setAvatar(response));
  }, []);
  console.log(avatar);
  return (
    <>
      <Header title="Perfil" />
      <h3 data-testid="profile-email">
        Email:
        {email || 'User'}
      </h3>
      { avatar
     && <img src={ avatar.url } alt="" width="200" className="Perfil-img" />}

      <button
        data-testid="profile-favorite-btn"
        className="receitas-perfil"
        type="button"
        onClick={ () => history.push('/receitas-favoritas') }
      >
        Receitas Favoritas
      </button>

      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => {
          history.push('/');
          localStorage.clear();
        } }
      >
        Sair
      </button>

      <Footer />
    </>
  );
}

export default Perfil;
