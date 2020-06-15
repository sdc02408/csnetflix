import React from 'react';
import '../App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './views/LandingPage/LandingPage'
import LoginPage from './views/LoginPage/LoginPage'
import RegisterPage from './views/RegisterPage/RegisterPage'
import SearchPage from './views/SearchPage/SearchPage'
import Auth from '../hoc/auth'
import NavBar from './views/NavBar/NavBar'
import TrendContainer from '../container/TrendContainer'
import Layout from '../container/Layout'
function App() {
  return (
    <Router>
      {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <NavBar />
        <div style={{paddingTop: '1px', minHeight: 'calc(100vh -80px'}}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/searchpage" component={SearchPage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

