import React, { useState, useEffect } from 'react';
import Sidenav from '../../partials/sidenav/Sidenav';
import HomeIcon from '../../assets/images/home-icon.png';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './productgroups.scss';

function Products(props) {
  const history = useHistory();

  let pathurl = window.location.pathname;

  const urlId = pathurl.split('/').pop();
  console.log('Products -> urlId', urlId);

  // fetch productgroups
  const [productGroups, setProductGroups] = useState([]);
  console.log("Products -> productGroups", productGroups)
  console.log(productGroups.products ? productGroups.products.map((item, i) => (
    item.id
  )) : null)


  // function to fetch productgroups from group id
  async function fetchProductGroups() {
    const url =
      `https://api.mediehuset.net/stringsonline/products/group/` + urlId;
    let data = await props.doFetch(url);
    setProductGroups(data);
  }

  useEffect(() => {
    fetchProductGroups();
  }, [urlId]);

  useEffect(() => {
    return history.listen((location) => {
      console.log(`You changed the page to: ${location.pathname}`);
      fetchProductGroups();
    });
  }, [history]);

  // add to cart
  async function addToCart() {
    let formData = new FormData();

    formData.append('product_id', productGroups.products ? productGroups.products.map((item, i) => (
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
      <div className='breadcrumbsDiv'>
        <span>
          <Link to='/frontpage' className='bclink'>
            <img src={HomeIcon} alt='homeicon' />
            <span className='bcmarginleft'>Forside</span>
          </Link>
          {/* <span className='colorgrey'>\</span> */}
          {/* {parentGroup ? parentGroup.items.title : null} */}
          <span className='colorgrey'>\</span>
          {productGroups.group ? productGroups.group.title : null}
        </span>
      </div>
      <div className='maincontentgrid'>
        <Sidenav />
        <div>
          <div className='sortselects'>
            <select name='' id='' className='sortselect'>
              <option value='poducent' className='sortoption'>
                Producent
              </option>
              <option value='poducent' className='sortoption'>
                Producent1
              </option>
              <option value='poducent' className='sortoption'>
                Producent2
              </option>
            </select>
            <select name='' id='' className='sortselect'>
              <option value='' className='sortoption'>
                Sorter efter ...
              </option>
              <option value='' className='sortoption'>
                Pris 'lav til høj'
              </option>
              <option value='' className='sortoption'>
                Pris 'høj til lav'
              </option>
            </select>
          </div>
          <div className='productGroupsgrid'>
            {productGroups.products
              ? productGroups.products.map((item, i) => (
                <div key={i} className='productgrid'>
                  <Link to={"/products/" + item.id}>
                    <img
                      src={item.image_fullpath}
                      alt='productimage'
                      className='productsImg'
                    />
                  </Link>
                  <div className='productgriditem2'>
                    <h3>{item.name}</h3>
                    <p className='colorgrey'>
                      {item.description_short}{' '}
                      <Link to={'/products/' + item.id} className='productrm'>
                        læs mere
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

export default Products;
