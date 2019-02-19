import React from 'react';
import classes from './input.css'

const inputElement =(props) => {

    let inputElement = null;
    let inputClasses = [classes.InputElement];
    if(props.invalid && props.shouldValidate && props.touched)
    {
        inputClasses.push(classes.Invalid);
    }
    switch(props.elementtype)
    {
        case('input'):
        inputElement = <input
        className={inputClasses.join(' ')}
        onChange = {props.changed}
        {...props.elementconfig}
        value = {props.value} />
        break;
        case('textarea'):
        inputElement = <textarea
        className={inputClasses.join(' ')}
        onChange = {props.changed}
        {...props.elementconfig}
        value = {props.value} />
        break;
        case('select'):
        inputElement = (
            <select className = {inputClasses.join(' ')}
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
        inputElement = <input className = {inputClasses.join(' ')}
        {...props.elementconfig}
        value = {props.value}
        onChange = {props.changed} />
    }

    let validationError = null;
    if(props.invalid && props.touched)
    {
        validationError = <p className = {classes.Validation}>Please enter the Valid {props.validInputType}</p>
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default inputElement;