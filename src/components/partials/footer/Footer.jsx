import React from 'react';
import './footer.scss';
import FooterLogo from '../../assets/images/footer.png';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footerGrid'>
        <img src={FooterLogo} alt='' className='footerLogo' />
      </div>
    </footer>
  );
}

export default Footer;
