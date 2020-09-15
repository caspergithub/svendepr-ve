import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/partials/navbar/Navbar'
import Frontpage from './components/pages/frontpage/Frontpage'
import Footer from './components/partials/footer/Footer'
import './app.scss'
import Terms from './components/pages/terms/Terms';
import Login from './components/pages/login/Login';
import Products from './components/pages/products/Products';

function App() {

  // useEffect to console.log the link to postman
  useEffect(() => {
    console.log("link til postman https://documenter.getpostman.com/view/6540576/T1LHHVkg")
  }, [])

  // state for saving login data
  const [loginData, setLoginData] = useState(null)

  // useEffect to store login data
  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log("SESSIONSTORAGE IS PRESENT")
      setLoginData(JSON.parse(localStorage.getItem('token')))
    }
  }, [])

  // fetch to send down to other pages
  async function doFetch(url) {
    try {
      const response = await fetch(url)
      const data = await response.json()
      return data
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <Router>
      <Navbar loginData={loginData} setLoginData={setLoginData} />
      <Switch>
        <Route path="/products">
          <Products />
        </Route>
        <Route path="/login">
          <Login loginData={loginData} setLoginData={setLoginData} />
        </Route>
        <Route path="/terms">
          <Terms />
        </Route>
        <Route path="/">
          <Frontpage doFetch={doFetch} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
