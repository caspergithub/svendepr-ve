import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import HomeIcon from '../../assets/images/home-icon.png'
import Sidenav from '../../partials/sidenav/Sidenav'
import './cart.scss'
import '../../styles/breadcrumbs.scss'


function Cart(props) {
  // fetch cart
  const [cart, setCart] = useState([])
  console.log("Cart -> cart", cart)

  // ----- get total price of all products in cart
  const [allPrices, setAllPrices] = useState('')
  // console.log("Cart -> allPrices", allPrices)

  // add all the prices to a total sum
  let sum = 0;

  if (allPrices) {
    for (let num of allPrices) {
      sum = sum + num
    }
  }

  // to get . after every third digit put 'de-DE' in as a parameter
  let sumwithcommas = sum.toLocaleString('de-DE');
  // console.log(sumwithcommas)
  // ----- get total price of all products in cart

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
      setAllPrices(data.cartlines ? data.cartlines.map((item) => (
        // to make the array with strings of numbers into actual numbers use parseInt
        parseInt(item.price, 10)
      )) : null)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (props.loginData.access_token) {
      getCart()
    }
  }, [props.loginData])

  // remove product from cart item id
  const deleteItem = async (selectedID) => {

    let formData = new FormData()
    formData.append("product_id", selectedID)

    let options = {
      method: "DELETE",
      body: formData,
      headers: {
        'Authorization': `Bearer ${props.loginData.access_token}`
      }
    }
    try {
      const url = `https://api.mediehuset.net/stringsonline/cart/${selectedID}`
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data)
      getCart()
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="mainSection">


      <div className='breadcrumbsdiv'>
        <Link to='/frontpage' className='bclink'>
          <img src={HomeIcon} alt='homeicon' />
          <span className='bcmarginleft'>Forside</span>
        </Link>

        <div className="breadcrumbsgrid">
          <span><span className='colorgrey'>\</span> Indkøbskurv</span>
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
                  <button onClick={() => { deleteItem(item.id) }} className="deleteitembtn">X</button>
                </p>
              </div>
            </div>
          )) : (<div className="borderdiv"><h2>Din kurv er tom</h2></div>)}
          <h3 className="totalamount">BELØB DKK {sumwithcommas},00</h3>
          {cart.cartlines ?
            <Link to="/checkout" className="linktocheckout">
              <h3 className="h3link">TIL KASSEN</h3>
            </Link>
            : null}
        </div>
      </div>
    </section>
  );
}

export default Cart;
