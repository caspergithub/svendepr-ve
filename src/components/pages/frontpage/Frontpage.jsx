import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './frontpage.scss';
import Sidenav from '../../partials/sidenav/Sidenav';
import HomeIcon from '../../assets/images/home-icon.png';
import HeroHeader from '../../assets/images/Acoustic001.jpg';

function Frontpage(props) {
  // fetch products
  const [products, setProducts] = useState([]);
  //   console.log('Frontpage -> products', products);

  async function fetchProducts() {
    const url = `https://api.mediehuset.net/stringsonline/productgroups/2`;
    let data = await props.doFetch(url);
    setProducts(data.group.products);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

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
                    <img
                      src={item.image_fullpath}
                      alt='products'
                      className='productsImg'
                    />
                    <div className='productgriditem2'>
                      <h3>{item.name}</h3>
                      <p className='colorgrey'>
                        {item.description_short}{' '}
                        <span className='productrm'>læs mere</span>
                      </p>
                      <div className='pricegrid'>
                        <p className='price'>Pris: DKK {item.price}</p>
                        <p className='productatb'>Læg i kurv</p>
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
