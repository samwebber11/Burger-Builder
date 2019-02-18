import React from 'react';
import classes from './navigationItem.css';
import {NavLink} from 'react-router-dom'

const navigate = (props) => (
    <li className = {classes.NavigationItem}>
        <NavLink
            to={props.link}
            exact = {props.exact}
            activeClassName={classes.active}>
            {props.children}
        </NavLink>
    </li>
)

export default navigate;
