import React from 'react';
import classes from './input.css'

const inputElement =(props) => {

    let inputElement = null;
    switch(props.elementtype)
    {
        case('input'):
        inputElement = <input
        className={classes.InputElement}
        onChange = {props.changed}
        {...props.elementconfig}
        value = {props.value} />
        break;
        case('textarea'):
        inputElement = <textarea
        className={classes.InputElement}
        onChange = {props.changed}
        {...props.elementconfig}
        value = {props.value} />
        break;
        case('select'):
        inputElement = (
            <select className = {classes.InputElement}
            onChange = {props.changed}
            value = {props.value}>
            {
                props.elementconfig.options.map((option) => (
                <option key = {option.value}
                value = {option.value}>
                {option.displayValue}
                </option>
            ))
            }
            </select>
        );
        break;
        default:
        inputElement = <input className={classes.InputElement}
        {...props.elementconfig}
        value = {props.value}
        onChange = {props.changed} />
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default inputElement;