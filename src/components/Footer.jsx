import React from 'react';
import { Link } from 'react-router-dom';
import beer from '../images/beer.png';
import bussola from '../images/bussola.png';
import restaurant from '../images/restaurant.png';
import '../css/HeaderFooter.css';

function Footer() {
  const style = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: 'rgb(255, 0, 0)',
    borderRadius: '8px 8px 0px 0px',
    position: 'fixed',
    bottom: '0',
    height: '55px',
  };

  return (
    <footer data-testid="footer" className="footer" style={ style }>

      <Link
        to="/bebidas"
        style={ { display: 'block' } }
        type="button"
        data-testid="drinks-bottom-btn"
        src={ beer }
      >
        <img src={ beer } alt="food-logo" width="45px" />
      </Link>

      <Link
        to="/explorar"
        style={ { display: 'block' } }
        type="button"
        data-testid="explore-bottom-btn"
        src={ bussola }
      >
        <img src={ bussola } alt="explore-logo" width="45px" />
      </Link>

      <Link
        to="/comidas"
        style={ { display: 'block' } }
        type="button"
        data-testid="food-bottom-btn"
        src={ restaurant }
      >
        <img src={ restaurant } alt="drinks-logo" width="45px" />
      </Link>

    </footer>
  );
}

export default Footer;
