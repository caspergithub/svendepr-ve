import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/partials/navbar/Navbar'
import Frontpage from './components/pages/frontpage/Frontpage'
import Footer from './components/partials/footer/Footer'
import './app.scss'
import Terms from './components/pages/terms/Terms';
import Login from './components/pages/login/Login';

function App() {
  useEffect(() => {
    console.log("link til postman https://documenter.getpostman.com/view/6540576/T1LHHVkg")
  }, [])

  // one fetch to rule them all
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
      <Navbar />
      <Switch>
        <Route path="/login">
          <Login />
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
