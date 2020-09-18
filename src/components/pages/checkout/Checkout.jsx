import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import './checkout.scss'
import HomeIcon from '../../assets/images/home-icon.png'
import Sidenav from '../../partials/sidenav/Sidenav'

function Checkout(props) {
    const [completed, setCompleted] = useState(false)

    const { register, handleSubmit, errors } = useForm();
    console.log("Checkout -> register", register)

    const onSubmit = values => {

        let formData = new FormData();
        formData.append('firstname', values.firstname)
        formData.append('lastname', values.lastname)
        formData.append('address', values.address)
        formData.append('zipcode', values.zipcode)
        formData.append('city', values.city)
        formData.append('email', values.email)
        formData.append('phone', values.phone)
        formData.append('status', 1);

        let options = {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${props.loginData.access_token}`
            }
        }
        try {
            const url = "https://api.mediehuset.net/stringsonline/orders"
            fetch(url, options)
                .then(response => response.json())
                .then(data => setMyorderId(data.order_id))
            setCompleted(true)

        }
        catch (error) {
            console.error(error);
        }

    }

    // fetch myorder with order id for the receipt
    const [myorderId, setMyorderId] = useState('')
    // console.log("Checkout -> myorderId", myorderId)
    const [myorder, setMyorder] = useState('')
    console.log("Checkout -> myorder", myorder)

    const getMyorder = async () => {
        console.log(myorderId)
        let options = {
            headers: {
                'Authorization': `Bearer ${props.loginData.access_token}`
            }
        }
        try {
            if (myorderId) {
                const url = `https://api.mediehuset.net/stringsonline/orders/` + myorderId;
                const response = await fetch(url, options);
                const data = await response.json();
                setMyorder(data);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMyorder()
    }, [myorderId])

    return (
        <section className="mainSection">

            <div className='breadcrumbsdiv'>

                <Link to='/frontpage' className='bclink'>
                    <img src={HomeIcon} alt='homeicon' />
                    <span className='bcmarginleft'>Forside</span>
                </Link>

                <div className="breadcrumbsgrid">
                    <span><span className='colorgrey'>\</span> Kasse</span>
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
                    {!props.loginData.access_token ? <div><p>Du skal være logget ind for at kunne gennemføre en ordre.</p><Link to="/login"><button>Log Ind</button></Link></div> :
                        <div>
                            {completed == false && <div>
                                <h2>Kasse</h2>
                                <form onSubmit={handleSubmit(onSubmit)} className="checkoutform" autoComplete="off">
                                    <div>
                                        <div>
                                            <p>Fakturerings- & leveringsadresse</p>
                                            <input type="text" name="firstname" placeholder="Fornavn"
                                                ref={register({
                                                    required: true,
                                                    minLength: { message: "too short", value: 2 },
                                                    maxLength: { message: "too long", value: 30 },
                                                })}></input>
                                            {errors.firstname && <p className="error">Indtast fornavn</p>}
                                        </div>
                                        <div>
                                            <input type="text" name="lastname" placeholder="Efternavn"
                                                ref={register({
                                                    required: true,
                                                    minLength: { message: "too short", value: 2 },
                                                    maxLength: { message: "too long", value: 30 },
                                                })}></input>
                                            {errors.lastname && <p className="error">Indtast efternavn</p>}
                                        </div>
                                        <div>
                                            <input type="text" name="address" placeholder="Gade/vej og husnummer"
                                                ref={register({
                                                    required: true,
                                                    minLength: { message: "too short", value: 2 },
                                                    maxLength: { message: "too long", value: 30 },
                                                })}></input>
                                            {errors.address && <p className="error">Indtast addresse</p>}
                                        </div>
                                        <div>
                                            <input type="number" name="zipcode" placeholder="Postnr."
                                                ref={register({
                                                    required: true,
                                                    minLength: { message: "too short", value: 2 },
                                                    maxLength: { message: "too long", value: 30 },
                                                    pattern: {
                                                        value: /^[0-9]+$/i,
                                                        message: "Can only be a number"
                                                    }
                                                })}></input>
                                            {errors.zipcode && <p className="error">Indtast postnummer</p>}
                                        </div>
                                        <div>
                                            <input type="text" name="city" placeholder="By"
                                                ref={register({
                                                    required: true,
                                                    minLength: { message: "too short", value: 2 },
                                                    maxLength: { message: "too long", value: 30 },
                                                })}></input>
                                            {errors.city && <p className="error">Indtast by</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <p>Email & telefon</p>
                                        <div>
                                            <input type="text" name="email" placeholder="Emailadresse"
                                                ref={register({
                                                    required: true,
                                                    minLength: { message: "too short", value: 2 },
                                                    maxLength: { message: "too long", value: 30 },
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "invalid email address"
                                                    }
                                                })}></input>
                                            {errors.email && <p className="error">Indtast email</p>}
                                        </div>
                                        <div>
                                            <input type="number" name="phone" placeholder="Telefonnummer"
                                                ref={register({
                                                    required: true,
                                                    minLength: { message: "too short", value: 2 },
                                                    maxLength: { message: "too long", value: 30 },
                                                    pattern: {
                                                        value: /^[0-9]+$/i,
                                                        message: "Can only be a number"
                                                    }
                                                })}></input>
                                            {errors.phone && <p className="error">Indtast telefonnummer</p>}
                                        </div>
                                        <div className="disclaimer">
                                            <p>Med dit telefonnumer kan vi kontakte dig
                                            i tilfælde af spørgsmål eller problemer. Hvis
                                            du oplyser dit telefonnummer, kan vi også
                                            sende dig en forsendelsesbekræftigelse via SMS.</p>
                                        </div>
                                    </div>
                                    <input className="checkoutsubmitbtn" type="submit" value="BETAL" />
                                </form>
                            </div>
                            }
                            {completed == true &&
                                <div className="thankyougrid">
                                    <div className="thankyou">
                                        <h2 className="thankyouh2">Tak for din bestilling</h2>
                                        <p>Ordrenr. <span className="colorgreen">{myorder.order && myorder.order.id}</span></p>
                                        <p>Product <span>{myorder.order && myorder.order.orderlines.map((item, i) => (
                                            <span key={i} className="pnameandprice">
                                                <span className="colorgreen">
                                                    {item.name}
                                                </span>
                                                <span className="textalignend">
                                                    DKK {item.price}
                                                </span>
                                            </span>
                                        ))}</span></p>

                                        <p>I alt {myorder.order && myorder.order.total}</p>
                                    </div>
                                    <div className="deliveryinfo">
                                        <h3>Faktureringsadresse</h3>
                                        <p className="margin2px0">
                                            {myorder.order && myorder.order.firstname}
                                            <span className="marginLeft">
                                                {myorder.order && myorder.order.lastname}
                                            </span>
                                        </p>
                                        <p className="margin2px0">
                                            {myorder.order && myorder.order.address}
                                        </p>
                                        <p className="margin2px0">
                                            {myorder.order && myorder.order.zipcode}
                                            <span className="marginLeft">
                                                {myorder.order && myorder.order.city}
                                            </span>
                                        </p>
                                        <h3>leveringsadresse</h3>
                                        <p className="margin2px0">
                                            {myorder.order && myorder.order.firstname}
                                            <span className="marginLeft">
                                                {myorder.order && myorder.order.lastname}
                                            </span>
                                        </p>
                                        <p className="margin2px0">
                                            {myorder.order && myorder.order.address}
                                        </p>
                                        <p className="margin2px0">
                                            {myorder.order && myorder.order.zipcode}
                                            <span className="marginLeft">
                                                {myorder.order && myorder.order.city}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default Checkout