import React from 'react';
import classes from './navigation.css'
import NavItem from '../Navigation Bar/NavigationItem/navigationItem'

const navBar = (props)=> (
    <ul className = {classes.NavigationItems}>
    <NavItem link="/" active>Burger Builder</NavItem>
    {
      props.isAuthenticate ? <NavItem link="/orders">Orders</NavItem>:null
    }
    {
    !props.isAuthenticate
    ? <NavItem link = "/auth">Authentication</NavItem> :
      <NavItem link = "/logout">Logout</NavItem>
    }
    </ul>
);

export default navBar;
