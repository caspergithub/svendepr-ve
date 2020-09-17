import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';
import { HiArrowRight } from 'react-icons/hi';
import NavbarLogo from '../../assets/images/header-bg.png';
import MailIcon from '../../assets/images/mail-icon.png';
import PhoneIcon from '../../assets/images/phone-icon.png';
import CartIcon from '../../assets/images/cart-icon.png';

function Navbar(props) {
  //Log out function
  const logOut = () => {
    props.setLoginData(null);
    localStorage.removeItem('token');
  };

  // search function
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');
  console.log('Navbar -> searchResult', searchResult);

  async function getSearchResult() {
    try {
      const url = `https://api.mediehuset.net/stringsonline/search/${query}`;
      const response = await fetch(url);
      const data = await response.json();
      setSearchResult(data.items);
    } catch (error) {
      console.log(error);
    }
  }

  function clearSearch() {
    setSearchResult('')
  }

  return (
    <header className='header'>
      <div className='contactInfoandBasket'>
        <img src={MailIcon} alt='mailicon' className='contactIcon' />
        <span>SALES@STRINGSONLINE.COM</span>
        <img src={PhoneIcon} alt='phoneicon' className='contactIcon' />
        <span>+45 98 12 22 68</span>
        <Link to='/cart'>
          <img src={CartIcon} alt='carticon' className='contactIcon' />
        </Link>
      </div>
      <nav className='navbar'>
        <div className='navbarGrid'>
          <Link to="/frontpage" className="logolink">
            <img src={NavbarLogo} alt='navbarLogo' className='navbarLogo' />
          </Link>
          <div className='navbarLinks'>
            <Link to='/frontpage' className='navbarLink'>
              Forside
            </Link>
            <Link to='/terms' className='navbarLink'>
              Salgs- og Handelbetingelser
            </Link>
            {props.loginData ? (
              <span onClick={() => logOut()} className='navbarlogoutbtn'>
                Log ud
              </span>
            ) : (
                <Link to='/login' className='navbarLoginLink'>
                  Login
                </Link>
              )}
          </div>
        </div>
        <div className='navbarSearchGrid'>
          <input
            type='text'
            placeholder='Indtast søgeord'
            className='navbarSearchInput'
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={() => {
              getSearchResult();
            }}
            className='navbarSearchButton'
          >
            <HiArrowRight />
          </button>
        </div>
      </nav>


      {searchResult ? <div className="searchresultdiv">
        <div className="searchXdiv">
          <p className="searchX" onClick={() => clearSearch()}>X</p>
        </div>
        {searchResult.map((item, i) => (
          <Link to={'/products/' + item.id} className='searchproductlink' onClick={() => clearSearch()}>
            <div key="i" className="searchresultinnerdiv">
              <img src={item.image_fullpath} alt="searchimg" className="searchproductimage" />
              <div className="searchresulttextdiv">
                <h3>
                  {item.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div> : null}


    </header>
  );
}

export default Navbar;
