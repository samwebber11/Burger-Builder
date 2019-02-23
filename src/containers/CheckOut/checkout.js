import React, {Component} from 'react';
import Summary from '../../components/Order/CheckOutSummary/summary'
import Contact from './ContactInfo/contact';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'

class CheckOut extends Component {

    state = {
        continueClicked:false,
    }

    purchaseContinueHandler = () => {
        this.props.history.replace('/checkout/contact-info');
        this.setState({
            continueClicked:true,
        })
    }

    purchaseCancelHandler = () => {
        this.props.history.goBack();
        this.setState({
            continueClicked:false,
        })
    }


    render () {
        let redirect = null;
        if(this.state.continueClicked)
        {
            redirect = <Route
            pathname={this.props.match.path + '/contact-info'}
            component = {Contact}
            />
        }
        console.log(this.props.match.path);
        return (
            <div>
            <Summary
            ingredients = {this.props.ings}
            continue = {this.purchaseContinueHandler}
            cancel = {this.purchaseCancelHandler} />
            {redirect}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    ings:state.ingredients,
    price:state.price,
    }
}

export default connect(mapStateToProps)(CheckOut);