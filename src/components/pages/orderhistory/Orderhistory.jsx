import React, { useEffect, useState } from 'react';
import Sidenav from '../../partials/sidenav/Sidenav';
import HomeIcon from '../../assets/images/home-icon.png';
import { Link } from 'react-router-dom';
import './orderhistory.scss';

function Orderhistory(props) {
    const [orderHistory, setOrderHistory] = useState([])
    // console.log("Orderhistory -> orderHistory", orderHistory)


    const convertTime = (timestamp) => {
        let date = new Date(timestamp * 1000)
        let converted = date.toLocaleString("en-GB")
        return converted
    }

    const getOrderHistory = async () => {
        let options = {
            headers: {
                'Authorization': `Bearer ${props.loginData.access_token}`
            }
        }
        try {
            const url = `https://api.mediehuset.net/stringsonline/orders`
            const response = await fetch(url, options);
            const data = await response.json();
            setOrderHistory(data);
        }
        catch (error) {
            console.log(error)
        }
    }

    const orderSort = async () => {
        await getOrderHistory()
        sortById({ Data: orderHistory.items })
    }

    useEffect(() => {
        if (props.loginData.access_token) {
            orderSort()
        }
    }, [])

    // sort array so that newest orders are at the top
    const sortById = ({ Data }) => {
        if (Data) {
            const sortData = Data.map((i) => { return i })
            const fromZtoA = sortData.sort((b, a) => a.id.localeCompare(b.id));
            setOrderHistory(fromZtoA);
        }
    };

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
                <div className="orderhistorydiv">
                    {orderHistory.items ? orderHistory.items.map((item, i) => (
                        <div key={i} className="orderhistoryinnerdiv">
                            <div className="orderhistorypdiv1">
                                <p>{convertTime(item.created)}</p>
                            </div>
                            <div className="orderhistorypdiv2">
                                <p>DKK {item.total}</p>
                            </div>
                            <div className="orderhistorypdiv3">
                                <p>Ordrenr.<span className="theorderid">{item.id}</span></p>
                            </div>
                        </div>
                    )) : null}
                </div>
            </div>
        </section>
    )
}

export default Orderhistory
