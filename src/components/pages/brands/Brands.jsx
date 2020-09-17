import React, { useState, useEffect } from 'react';
import HomeIcon from '../../assets/images/home-icon.png';
import { Link } from 'react-router-dom';
import Sidenav from '../../partials/sidenav/Sidenav';
import { useHistory } from 'react-router-dom';
import './brands.scss';
import '../../styles/breadcrumbs.scss'

function Brands(props) {
  const history = useHistory();

  let pathurl = window.location.pathname;

  const urlId = pathurl.split('/').pop();

  // fetch brands
  const [brands, setBrands] = useState([]);
  console.log('Brands -> brands', brands);
  // console.log(brands.item ? brands.item.products.map((item, i) => (
  //   item.id
  // )) : null)

  async function fetchBrands() {
    const url = `https://api.mediehuset.net/stringsonline/brands/` + urlId;
    let data = await props.doFetch(url);
    setBrands(data);
  }

  useEffect(() => {
    fetchBrands();
  }, [urlId]);

  useEffect(() => {
    return history.listen((location) => {
      console.log(`You changed the page to: ${location.pathname}`);
      fetchBrands();
    });
  }, [history]);

  // add to cart
  async function addToCart() {
    let formData = new FormData();

    formData.append('product_id', brands.item ? brands.item.products.map((item, i) => (
      item.id
    )) : null);
    formData.append('quantity', 1);

    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${props.loginData.access_token}`,
      },
    };

    try {
      const url = `https://api.mediehuset.net/stringsonline/cart`;
      const response = await fetch(url, options);
      const data = await response.json();
      console.log('add to cart', data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className='mainSection'>

      <div className='breadcrumbsdiv'>
        <Link to='/frontpage' className='bclink'>
          <img src={HomeIcon} alt='homeicon' />
          <span className='bcmarginleft'>Forside</span>
        </Link>

        <div className="breadcrumbsgrid">
          <span><span className='colorgrey'>\</span>{brands.item ? brands.item.title : null}</span>
          {props.loginData ? (
            <Link to="/orderhistory" className="ohlink">
              <span className='ordrehistorikbc'>Ordrehistorik</span>
            </Link>
          ) : (null
            )}
        </div>
      </div>

      <div className='maincontentgrid'>
        <Sidenav />
        <div>
          <div className='brandgrid'>
            <img
              src={brands.item ? brands.item.image_fullpath : null}
              alt='brandsimg'
              className='brandlogo'
            />
            <div className='brandgriditem2'>
              <h2 className='brandsh2'>
                {brands.item ? brands.item.title : null}
              </h2>
              <p>{brands.item ? brands.item.description : null}</p>
            </div>
          </div>
          <h3>{brands.item ? brands.item.title : null} produkter</h3>
          <div className='productsgrid'>
            {brands.item
              ? brands.item.products.map((item, i) => (
                <div key={i} className='productgrid'>
                  <Link to={"/products/" + item.id}>
                    <img
                      src={item.image_fullpath}
                      alt='productimage'
                      className='productsImg'
                    />
                  </Link>
                  <div className='productgriditem2'>
                    <h3 className='brandsh3'>{item.name}</h3>
                    <p className='colorgrey'>
                      {item.description_short}{' '}
                      <Link to={"/products/" + item.id} className="brandsrmlink">
                        <span className='productrm'>læs mere</span>
                      </Link>
                    </p>
                    <div className='pricegrid'>
                      <p className='price'>Pris: DKK {item.price}</p>
                      <p className='productatb' onClick={() => addToCart()}>Læg i kurv</p>
                    </div>
                  </div>
                </div>
              ))
              : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Brands;
