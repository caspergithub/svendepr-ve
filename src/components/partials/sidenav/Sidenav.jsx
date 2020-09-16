import React, { useState, useEffect } from 'react';
import './sidenav.scss';
import { Link } from 'react-router-dom';

function Sidenav() {
  async function doFetch(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  // fetch page
  const [productgroups, setProductgroups] = useState([]);
  // console.log('Sidenav -> productgroups', productgroups);

  async function fetchProductgroups() {
    const url = `https://api.mediehuset.net/stringsonline/`;
    let data = await doFetch(url);
    setProductgroups(data.productgroups);
  }

  useEffect(() => {
    fetchProductgroups();
  }, []);

  // fetch brands
  const [brands, setBrands] = useState([]);
  // console.log('Sidenav -> brands', brands);

  async function fetchBrands() {
    const url = `https://api.mediehuset.net/stringsonline/brands`;
    let data = await doFetch(url);
    setBrands(data);
  }

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <nav className='sidenav'>
      <div className='menu'>
        {productgroups.items
          ? productgroups.items.map((item, i) => (
              <div key={i} className='sidenavbtn'>
                <span>{item.title}</span>
                <span>
                  {item.subgroups.map((item, i) => (
                    <div key={i} className='submenu'>
                      <Link
                        to={'/productgroups/' + item.id}
                        className='sidenavsubmenubtn'
                      >
                        {item.title}
                      </Link>
                    </div>
                  ))}
                </span>
              </div>
            ))
          : null}
        <div className='sidenavbtn'>
          <span>Brands</span>
          {brands.items
            ? brands.items.map((item, i) => (
                <div key={i} className='submenu'>
                  <Link to={'/brands/' + item.id} className='sidenavsubmenubtn'>
                    {item.title}
                  </Link>
                </div>
              ))
            : null}
        </div>
      </div>
    </nav>
  );
}

export default Sidenav;
