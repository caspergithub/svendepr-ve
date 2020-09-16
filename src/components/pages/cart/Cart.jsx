import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import HomeIcon from '../../assets/images/home-icon.png'
import Sidenav from '../../partials/sidenav/Sidenav'
import './cart.scss'


function Cart(props) {
  // fetch cart
  const [cart, setCart] = useState([])
  console.log("Cart -> cart", cart)

  const getCart = async () => {
    let options = {
      headers: {
        'Authorization': `Bearer ${props.loginData.access_token}`
      }
    }
    try {
      const url = `https://api.mediehuset.net/stringsonline/cart`
      const response = await fetch(url, options);
      const data = await response.json();
      setCart(data);
    }
    catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCart()
  }, [])


  return (
    <section className="mainSection">
      <div className='breadcrumbsDiv'>
        <span>
          <Link to='/frontpage' className='bclink'>
            <img src={HomeIcon} alt='homeicon' />
            <span className='bcmarginleft'>Forside</span>
          </Link>
          {/* <span className='colorgrey'>\</span> */}
          {/* {parentGroup ? parentGroup.items.title : null} */}
          <span className='colorgrey'>\</span>
          <span>cart</span>
        </span>
      </div>
      <div className='maincontentgrid'>
        <Sidenav />
        <div>
          {cart.cartlines ? cart.cartlines.map((item, i) => (
            <div key={i} className="cartlinegrid">
              <div>
                <img src={item.image_fullpath} alt="cartlineimg" className="cartlineimg" />
              </div>
              <div>
                <p>
                  {item.name}
                </p>
              </div>
              <div className="cartlinepricediv">
                <p>
                  {item.price}
                </p>
              </div>
            </div>
          )) : null}

        </div>
      </div>
    </section>
  );
}

export default Cart;
