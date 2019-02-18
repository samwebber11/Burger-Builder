import React, {Component} from 'react';
import Summary from '../../components/Order/CheckOutSummary/summary'

class CheckOut extends Component {
    state = {
        ingredients : {
            salad:1,
            cheese:1,
            meat:1,
            bacon:1,
        }
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = [];
        console.log('ComponentMounted show the following queries ',query);
        for(let param of query.entries())
        {
            ingredients[param[0]] = +param[1];
        }
        this.setState({
            ingredients:ingredients,
        })
    }
    purchaseContinueHandler = () => {
        this.props.history.replace('/contact-info');
    }
    purchaseCancelHandler = () => {
        this.props.history.goBack();
    }
    render () {
        return (
            <Summary
            ingredients = {this.state.ingredients}
            continue = {this.purchaseContinueHandler}
            cancel = {this.purchaseCancelHandler} />

        );
    }
}

export default CheckOut;