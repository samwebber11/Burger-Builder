import React from 'react';
import Burger from '../../Burger/burger';
import classes from './summary.css'
import Button from '../../UI/Button/button'

const summary = (props) => {
    console.log(props.ingredients);
    return (
        <div className = {classes.Summary}>
            <h1>Hope You Like Your Burger...</h1>
            <Burger
            style = {{width:'100%',margin:'auto'}}
            ingredients = {props.ingredients}
            />
            <Button
            btnTypes = 'Success'
            clicked = {props.continue}>
            Continue </Button>
            <Button
            btnTypes = 'Danger'
            clicked = {props.cancel}>
            Cancel </Button>
        </div>
    );
}

export default summary;