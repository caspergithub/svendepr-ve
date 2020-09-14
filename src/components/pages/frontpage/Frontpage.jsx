import React, { useState, useEffect } from 'react';
import './frontpage.scss';
import Sidenav from '../../partials/sidenav/Sidenav';
import HomeIcon from '../../assets/images/home-icon.png';

function Frontpage(props) {
  // fetch page
  const [heroHeader, setHeroHeader] = useState([]);
  //   console.log('Frontpage -> heroHeader', heroHeader);

  async function fetchHeroHeader() {
    const url = `https://api.mediehuset.net/stringsonline/productgroups/2`;
    let data = await props.doFetch(url);
    setHeroHeader(data.group.products[0]);
  }

  useEffect(() => {
    fetchHeroHeader();
  }, []);

  return (
    <section className='mainSection'>
      <div className='breadcrumbsDiv'>
        <img src={HomeIcon} alt='homeicon' /> <span>Forside</span>
      </div>
      <div className='maincontentgrid'>
        <Sidenav />
        <div>
          <img
            src={heroHeader ? heroHeader.image_fullpath : null}
            alt='heroHeader'
            className='heroHeaderImg'
          />
        </div>
      </div>
    </section>
  );
}

export default Frontpage;
