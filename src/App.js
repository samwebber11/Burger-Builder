import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actions from './store/actions/index'
import './App.css';

import Switch from 'react-router-dom/Switch';
import { Route,withRouter,Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/layout'

import BurgerBuilder from './containers/BurgerBuilder'
import CheckOut from './containers/CheckOut/checkout'
import Orders from './containers/Orders/orders'
import Auth from './containers/Auth/auth';
import Logout from './containers/Auth/Logout/logout';

class App extends Component {


  componentDidMount() {
    this.props.checkAuthStatus();
  }

  render() {
    // let routes = (
    //   <Switch>
    //     <Route path = "/auth" component = {Auth} />
    //     <Route path = "/" exact component = {BurgerBuilder} />
    //     <Redirect to = "/" />
    //   </Switch>
    // );


    //   if(!this.props.isAuthenticated)
    //   {
    //   routes = (
    //     <Switch>
    //       <Route path = "/checkout" component = {CheckOut} />
    //       <Route path = "/orders" component = {Orders} />
    //       <Route path = "/logout" component = {Logout} />
    //       <Route path = "/" exact component = {BurgerBuilder} />
    //     </Switch>
    //   );
    //   }

    return (
      <div className="App">
      <Layout>
      <Switch>
          <Route path = "/checkout" component = {CheckOut} />
          <Route path = "/orders" component = {Orders} />
          <Route path = "/logout" component = {Logout} />
          <Route path = "/auth" component = {Auth} />
          <Route path = "/" exact component = {BurgerBuilder} />
        </Switch>
      </Layout>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     isAuthenticated:state.auth.token !== null,
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    checkAuthStatus:() => dispatch(actions.checkAuthStatus()),
  }
}

export default withRouter(connect(null,mapDispatchToProps)(App));
