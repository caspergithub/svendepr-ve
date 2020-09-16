import React, { useState, useEffect } from 'react';
import Sidenav from '../../partials/sidenav/Sidenav';
import HomeIcon from '../../assets/images/home-icon.png';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './products.scss';

function Products(props) {
  const history = useHistory();

  let pathurl = window.location.pathname;

  const urlId = pathurl.split('/').pop();
  console.log('Products -> urlId', urlId);

  // fetch products
  const [products, setProducts] = useState([]);
  console.log('Products -> products', products);

  // function to fetch products from products id
  async function fetchProducts() {
    const url = `https://api.mediehuset.net/stringsonline/products/` + urlId;
    let data = await props.doFetch(url);
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, [urlId]);

  useEffect(() => {
    return history.listen((location) => {
      console.log(`You changed the page to: ${location.pathname}`);
      fetchProducts();
    });
  }, [history]);

  // add to cart
  async function addToCart() {
    let formData = new FormData();

    formData.append('product_id', urlId);
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
      <div className='breadcrumbsDiv'>
        <span>
          <Link to='/frontpage' className='bclink'>
            <img src={HomeIcon} alt='homeicon' />
            <span className='bcmarginleft'>Forside</span>
          </Link>
          <span className='colorgrey'>\</span>
          {products.item ? products.item.name : null}
        </span>
      </div>
      <div className='maincontentgrid'>
        <Sidenav />
        <div>
          <div className='productsGrids'>
            <div>
              <img
                src={products.item ? products.item.image.fullpath : null}
                alt=''
                className='productImg'
              />
              {products.item
                ? products.item.gallery.map((item, i) => (
                  <div key={i} className='singleproductgrid'>
                    <div>
                      <img
                        src={item.fullpath}
                        alt='productimage'
                        className='productImg'
                      />
                    </div>
                  </div>
                ))
                : null}
            </div>
            <div>
              <h2>{products.item ? products.item.name : null}</h2>
              <p>{products.item ? products.item.description_long : null}</p>
            </div>
            <div className='productrightgrid'>
              <img src={products.item ? products.item.brand_image : null} alt="brandlogo" className="productsbrandlogo" />
              <p className='productprice'>
                <span className='marginright'>Pris: DKK</span>
                {products.item ? products.item.price : null}
              </p>
              <p className='productatb' onClick={() => addToCart()}>
                Læg i kurv
              </p>
              <p>{products.item ? products.item.stock : null} på lager</p>
              <p>{products.item ? products.item.rating : null} ud af 5 stjerner</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;
