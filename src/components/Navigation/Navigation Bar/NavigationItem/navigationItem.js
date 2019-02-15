import React from 'react';
import classes from './navigationItem.css';

const navigate = (props) => (
    <li className = {classes.NavigationItem}>
        <a href = {props.links}
        className = {props.active ? classes.active:null}>
        {props.children}
        </a>
    </li>
)

export default navigate;