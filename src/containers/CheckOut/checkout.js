import React, {Component} from 'react';
import Summary from '../../components/Order/CheckOutSummary/summary'
import Contact from './ContactInfo/contact';
import { Route } from 'react-router-dom';

class CheckOut extends Component {

    state = {
        ingredients : null,
        continueClicked:false,
        price:0,
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        let ingredient = {};
        console.log('Component Mounted show the following queries ',query);
        let price = 0;
        for(let param of query.entries())
        {
            if(param[0]==='price')
            {
                price = param[1];
            }
            else{
            ingredient[param[0]] = +param[1];
            }
        }
        console.log(ingredient);
        this.setState({
            ingredients:ingredient,
            price: price,
        })
        console.log(this.state.ingredients);
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
            render={(props) => (<Contact
                ingredients={this.state.ingredients}
                totalPrice={this.state.price}
                 {...props} />)
            } />
        }
        console.log(this.props.match.path);
        return (
            <div>
            <Summary
            ingredients = {this.state.ingredients}
            continue = {this.purchaseContinueHandler}
            cancel = {this.purchaseCancelHandler} />
            {redirect}
            </div>
        );
    }
}

export default CheckOut;