import React, { Component } from 'react';
import './App.css';

import Switch from 'react-router-dom/Switch';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout/layout'

import BurgerBuilder from './containers/BurgerBuilder'
import CheckOut from './containers/CheckOut/checkout'
import Orders from './containers/Orders/orders'
import Auth from './containers/Auth/auth';
import Logout from './containers/Auth/Logout/logout';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Layout>
        <Switch>
          <Route path = "/" exact component = {BurgerBuilder} />
          <Route path="/orders" component={Orders} />
          <Route path = "/checkout" component={CheckOut} />
          <Route path = "/auth" component = {Auth} />
          <Route path = "/logout" component = {Logout} />
        </Switch>
      </Layout>
      </div>
    );
  }
}

export default App;
