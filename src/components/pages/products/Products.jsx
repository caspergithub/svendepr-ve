import React, { useState, useEffect } from 'react';
import Sidenav from '../../partials/sidenav/Sidenav';
import HomeIcon from '../../assets/images/home-icon.png';
import { Link } from 'react-router-dom';

const getParams = (url) => {
  console.log('getParams -> url', url);
  return url
    .split('?')[1]
    .split('&')
    .reduce((obj, keyvals) => {
      const [key, val] = keyvals.split('=');
      obj[key] = val;
      console.log(obj);
      return obj;
    }, {});
};

function Products(props) {
  const { id } = getParams(props.location);
  console.log('News -> id', id);

  const [data, setData] = useState(null);
  console.log('Products -> data', data);

  useEffect(() => {
    if (!data && id) {
      fetch('https://api.mediehuset.net/stringsonline/products/group/' + id)
        .then((res) => res.json())
        .then((apidata) => setData(apidata));
    }
  }, [data, setData, id]);

  return (
    <section className='mainSection'>
      <div className='breadcrumbsDiv'>
        <Link to='/frontpage' className='bclink'>
          <img src={HomeIcon} alt='homeicon' />
          <span className='bcmarginleft'>Forside</span>
        </Link>
      </div>
      <div className='maincontentgrid'>
        <Sidenav />
        <div>
          <h2>Products</h2>
        </div>
      </div>
    </section>
  );
}

export default Products;
