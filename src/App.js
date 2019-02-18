import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/layout'
import BurgerBuilder from './containers/BurgerBuilder'
import CheckOut from './containers/CheckOut/checkout'
import Switch from 'react-router-dom/Switch';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component = {BurgerBuilder} />
          <Route path = "/checkout" exact component={CheckOut} />
        </Switch>
      </Layout>
      </div>
    );
  }
}

export default App;
