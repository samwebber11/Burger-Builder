import React from 'react';
import classes from './button.css'

const button = (props) => (
    <button
    disabled = {props.disabled}
    onClick = {props.clicked}
    className = {[classes.Button,classes[props.btnTypes]].join(' ')}>
    {props.children}
    </button>
)

export default button;