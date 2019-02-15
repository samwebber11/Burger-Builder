import React from 'react'
import Aux from '../../hoc/Aux'
import Button from '../UI/Button/button'


const orderSummary = (props) => {

    const orderList = Object.keys(props.ingredients).map(
        (key) => {
            return (
                <li key = {key}>
                <span style={{textTransform:'capitalize'}}>{key}</span> : {props.ingredients[key]}
                </li>
            )
        }
        );
    return (
        <Aux>
            <h3>Your Order Summary is:</h3>
            <p>Your delicious burger will have following ingredients</p>
            <ul>
                {orderList}
            </ul>
            <h3>You have an order worth Rs. {props.price}</h3>
            <h3>You want to check out or continue for some more order?</h3>
            <Button btnTypes = "Danger" clicked = {props.purchaseCancelled}>Cancel</Button>
            <Button btnTypes = "Success" clicked = {props.purchaseContinue}>Continue</Button>
        </Aux>
    )

}

export default orderSummary;