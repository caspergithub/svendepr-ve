import React, { useState } from 'react';
import './login.scss';
import '../../styles/breadcrumbs.scss'
import Sidenav from '../../partials/sidenav/Sidenav';
import HomeIcon from '../../assets/images/home-icon.png';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Login(props) {
  const { register, errors, handleSubmit } = useForm({
    // by setting validateCriteriaMode to 'all',
    // all validation errors for single field will display at once
    criteriaMode: 'all',
    mode: 'onChange',
  });
  const onSubmit = (data) => console.log(data);
  //   console.log(errors);

  //   Login
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const sendLoginRequest = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    let url = 'https://api.mediehuset.net/token';

    console.log(formData);
    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => handleSessionData(json))
      .catch((error) => console.log(error));
  };

  const handleSessionData = (key) => {
    if (!key.message) {
      props.setLoginData(key);
      console.log(key);
      localStorage.setItem('token', JSON.stringify(key));
    }
  };
  //   Login

  return (
    <section className='mainSection'>

      <div className='breadcrumbsdiv'>

        <Link to='/frontpage' className='bclink'>
          <img src={HomeIcon} alt='homeicon' />
          <span className='bcmarginleft'>Forside</span>
        </Link>

        <div className="breadcrumbsgrid">
          <span><span className='colorgrey'>\</span> Login</span>
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
        {props.loginData ? (
          <div>
            <p>Du er logget ind som {props.loginData.username}</p>
          </div>
        ) : (
            <div>
              <h2 className='loginh2'>Login</h2>
              <h3 className='loginh3'>
                Indtast brugernavn og adgangskode for at logge på
            </h3>
              <form
                onSubmit={handleSubmit(onSubmit)}
                autoComplete='off'
                className='loginform'
              >
                <label className='loginlabel'>Brugernavn:</label>
                <input
                  type='text'
                  placeholder='username'
                  name='username'
                  ref={register({ required: true, minLength: 1 })}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  className='logininput'
                />
                {errors?.username?.types?.required && (
                  <p className='loginerrormsg'>username required</p>
                )}
                {errors?.username?.types?.minLength && (
                  <p className='loginerrormsg'>username minLength 10</p>
                )}
                <label className='loginlabel'>Adgangskode:</label>
                <input
                  type='password'
                  placeholder='password'
                  name='password'
                  ref={register({ required: true, minLength: 1 })}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className='logininput'
                />
                {errors?.password?.types?.required && (
                  <p className='loginerrormsg'>password required</p>
                )}
                {errors?.password?.types?.minLength && (
                  <p className='loginerrormsg'>password minLength 10</p>
                )}

                <button
                  type='submit'
                  className='loginbtn'
                  onClick={(e) => sendLoginRequest(e)}
                >
                  Login
              </button>
              </form>
            </div>
          )}
      </div>
    </section>
  );
}

export default Login;
