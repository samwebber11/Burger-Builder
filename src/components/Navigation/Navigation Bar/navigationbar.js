import React from 'react';
import classes from './navigation.css'
import NavItem from '../Navigation Bar/NavigationItem/navigationItem'

const navBar = ()=> (
    <ul className = {classes.NavigationItems}>
    <NavItem link="/" active>Burger Builder</NavItem>
    <NavItem link="/">CheckOut</NavItem>
    </ul>
);

export default navBar;