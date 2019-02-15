import React from 'react';
import classes from './toggler.css'

const toggler = (props) => (
    <div onClick = {props.clicked}
    className = {classes.DrawerToggle}>
    <div></div>
    <div></div>
    <div></div>
    </div>
);

export default toggler;