import React from 'react';
import Burger from '../../Burger/burger';
import classes from './summary.css'
import Button from '../../UI/Button/button'

const summary = (props) => {
    return (
        <div className = {classes.Summary}>
            <h1>Hope You Like Your Burger...</h1>
            <Burger
            style = {{width:'100%',margin:'auto'}}
            ingredients = {props.ingredients}
            />
            <Button
            btnTypes = 'Success'
            clicked>
            Continue </Button>
            <Button
            btnTypes = 'Danger'
            clicked>
            Cancel </Button>
        </div>
    );
}

export default summary;