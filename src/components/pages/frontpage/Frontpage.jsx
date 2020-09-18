import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './frontpage.scss';
import '../../styles/breadcrumbs.scss';
import Sidenav from '../../partials/sidenav/Sidenav';
import HomeIcon from '../../assets/images/home-icon.png';
import HeroHeader from '../../assets/images/Acoustic001.jpg';

function Frontpage(props) {
  // fetch products
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    const url = `https://api.mediehuset.net/stringsonline/productgroups/2`;
    let data = await props.doFetch(url);
    setProducts(data.group.products);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // add to cart
  async function addToCart() {
    let formData = new FormData();

    formData.append('product_id', products ? products.map((item) => (
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
      // console.log('add to cart', data);
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
          {/* heroheader */}
          <div className='heroHeadergrid'>
            <img src={HeroHeader} alt='heroheader' className='heroheaderimg' />
            <div className='heroheadergriditem2'>
              <div className='mtab1'>
                <h2 className='fwlight fs61'>
                  Martin <span className='fwbold'>GPC-11E</span>
                </h2>
                <h4 className='fwextralight fs26'>SERIES ELECTRO ACOUSTIC</h4>
              </div>
              <div className='mtab2'>
                <h3 className='fs61 bordertopandbottom'>
                  SE DEN NYE GENERATION HALVACOUSTISKE
                </h3>
              </div>
              <p className='heroheaderreadmore'>LÆS MERE</p>
            </div>
          </div>
          {/* kundernes favoritter */}
          <h2 className='fwregular colorgrey'>
            Kundernes <span className='fwbold'>favoritter</span>
          </h2>
          <div className='productsgrid'>
            {products
              ? products.slice(0, 4).map((item, i) => (
                <div key={i} className='productgrid'>
                  <Link to={"/products/" + item.id}>
                    <img
                      src={item.image_fullpath}
                      alt='products'
                      className='productsImg'
                    />
                  </Link>
                  <div className='productgriditem2'>
                    <h3>{item.name}</h3>
                    <p className='colorgrey'>
                      {item.description_short}{' '}
                      <Link to={"/products/" + item.id} className="frontpagermlink">
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

export default Frontpage;
