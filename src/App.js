import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/layout'
import BurgerBuilder from './containers/BurgerBuilder'
import CheckOut from './containers/CheckOut/checkout'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Layout>
        <BurgerBuilder />
        <CheckOut />
      </Layout>
      </div>
    );
  }
}

export default App;
