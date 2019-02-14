import React from 'react';
import classes from './control.css'

const control = (props)=> (
    <div className = {classes.control}>
        <div className = {classes.label}>{props.label}</div>
        <button className = {classes.Less}
        onClick = {props.removeLess}
        disabled = {props.disabled}>Less</button>
        <button className = {classes.More}
        onClick = {props.addMore}>More</button>
    </div>
);
export default control;