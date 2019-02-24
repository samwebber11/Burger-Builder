import React, {Component} from 'react';
import Summary from '../../components/Order/CheckOutSummary/summary'
import Contact from './ContactInfo/contact';
import { Route,Redirect } from 'react-router-dom';
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
        let summary = <Redirect to="/" />
        if(this.state.continueClicked)
        {
            redirect = <Route
            pathname={this.props.match.path + '/contact-info'}
            component = {Contact}
            />
        }
        if(this.props.ings)
        {

            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
            <div>
                {purchasedRedirect}
                <Summary
                ingredients = {this.props.ings}
                continue = {this.purchaseContinueHandler}
                cancel = {this.purchaseCancelHandler} />
                {redirect}
            </div>)
        }
        console.log(this.props.match.path);
        return summary;
    }
}

const mapStateToProps = state => {
    return {
    ings:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.price,
    purchased:state.order.purchased,
    }
}

export default connect(mapStateToProps)(CheckOut);