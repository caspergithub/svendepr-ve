import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';
import { HiArrowRight } from 'react-icons/hi';
import NavbarLogo from '../../assets/images/header-bg.png';
import MailIcon from '../../assets/images/mail-icon.png';
import PhoneIcon from '../../assets/images/phone-icon.png';
import CartIcon from '../../assets/images/cart-icon.png';

function Navbar() {
  return (
    <header className='header'>
      <div className='contactInfoandBasket'>
        <img src={MailIcon} alt='mailicon' className='contactIcon' />
        <span>SALES@STRINGSONLINE.COM</span>
        <img src={PhoneIcon} alt='phoneicon' className='contactIcon' />
        <span>+45 98 12 22 68</span>
        <img src={CartIcon} alt='carticon' className='contactIcon' />
      </div>
      <nav className='navbar'>
        <div className='navbarGrid'>
          <img src={NavbarLogo} alt='navbarLogo' className='navbarLogo' />
          <div className='navbarLinks'>
            <Link to='/frontpage' className='navbarLink'>
              Forside
            </Link>
            <Link to='/terms' className='navbarLink'>
              Salgs- og Handelbetingelser
            </Link>
            <Link to='/login' className='navbarLoginLink'>
              Login
            </Link>
          </div>
        </div>
        <div className='navbarSearchGrid'>
          <input
            type='text'
            placeholder='Indtast søgeord'
            className='navbarSearchInput'
          />
          <button className='navbarSearchButton'>
            <HiArrowRight />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
