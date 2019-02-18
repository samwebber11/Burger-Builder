import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/layout'
import BurgerBuilder from './containers/BurgerBuilder'
import CheckOut from './containers/CheckOut/checkout'
import Switch from 'react-router-dom/Switch';
import { Route } from 'react-router-dom';
import Orders from './containers/Orders/orders'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Layout>
        <Switch>
          <Route path = "/" exact component = {BurgerBuilder} />
          <Route path="/orders" component={Orders} />
          <Route path = "/checkout" component={CheckOut} />
        </Switch>
      </Layout>
      </div>
    );
  }
}

export default App;
