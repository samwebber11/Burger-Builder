import React from 'react';
import classes from './logo.css'
import buildImage from '../../assets/Images/burger.png';

const logo = (props) => (
    <div
    className = {classes.logo}>
    <img src = {buildImage} alt = "MyBurger"/>
    </div>
)

export default logo;