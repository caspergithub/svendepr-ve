import React from 'react';
import Sidenav from '../../partials/sidenav/Sidenav';
import HomeIcon from '../../assets/images/home-icon.png';
import { Link } from 'react-router-dom';

function Orderhistory(props) {
    return (
        <section className="mainSection">


            <div className='breadcrumbsdiv'>
                <Link to='/frontpage' className='bclink'>
                    <img src={HomeIcon} alt='homeicon' />
                    <span className='bcmarginleft'>Forside</span>
                </Link>

                <div className="breadcrumbsgrid">
                    <span><span className='colorgrey'>\</span> Ordrehistorik</span>
                    {props.loginData ? (
                        <span className='ordrehistorikbc'>Ordrehistorik</span>
                    ) : (null
                        )}
                </div>
            </div>


            <div className='maincontentgrid'>
                <Sidenav />
                <div>
                    <h2>Order history</h2>
                </div>
            </div>
        </section>
    )
}

export default Orderhistory
