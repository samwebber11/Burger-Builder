import React,{Component} from 'react'
import Aux from '../../hoc/Aux/Aux'
import Button from '../UI/Button/button'


class OrderSummary extends Component {

componentWillUpdate() {
    console.log('Component will update');
}

render() {
const orderList = Object.keys(this.props.ingredients).map(
(key) => {
    return (
        <li key = {key}>
        <span style={{textTransform:'capitalize'}}>{key}</span> : {this.props.ingredients[key]}
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
        <h3>You have an order worth Rs. {this.props.price}</h3>
        <h3>You want to check out or continue for some more order?</h3>
        <Button btnTypes = "Danger" clicked = {this.props.purchaseCancelled}>Cancel</Button>
        <Button btnTypes = "Success" clicked = {this.props.purchaseContinue}>Continue</Button>
    </Aux>
);
}

}

export default OrderSummary;