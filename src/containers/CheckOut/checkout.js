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

    render () {
        return (
            <Summary ingredients = {this.state.ingredients}/>
        );
    }
}

export default CheckOut;