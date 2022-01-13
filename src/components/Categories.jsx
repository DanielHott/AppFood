import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Categories(
  { getCategories, getByCategorie, setElements, setRequest, keyRequest, route, img },
) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const MAX_LENGTH_ARRAY = 10;
    getCategories('c', MAX_LENGTH_ARRAY).then((data) => setCategories(data));
  }, [getCategories]);

  async function setHooks(category) {
    if (category === 'All') {
      setRequest(keyRequest);
    } else {
      getByCategorie(category, 'c').then((data) => setElements(data));
    }
  }
  return (
    <div className="container-categories">
      {
        [{ strCategory: 'All' }, ...categories].map(({ strCategory }) => (
          <Link
            to={ `${route}` }
            key={ strCategory }
            className="categories"
            onClick={ () => setHooks(strCategory) }
          >
            <img
              src={ `/${img}/${strCategory.replace(/\s+/g, '').replaceAll('/', '')}.png` }
              alt=""
              className="category-img"
            />
            <p className="description">{strCategory}</p>
            { console.log(`/${img}/${strCategory.replace(/\s+/g, '').replaceAll('/', '')}.png`) }
          </Link>
        ))
      }
    </div>
  );
}

Categories.propTypes = {
  getCategories: PropTypes.func.isRequired,
  getByCategorie: PropTypes.func.isRequired,
  setElements: PropTypes.func.isRequired,
  setRequest: PropTypes.func.isRequired,
  route: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  keyRequest: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Categories;
