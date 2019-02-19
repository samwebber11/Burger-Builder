import React, { Component } from 'react';
import classes from './contact.css';
import Button from '../../../components/UI/Button/button'
import axios from '../../../axios'
import Spinner from '../../../components/UI/Spinner/spinner'
import Input from '../../../components/UI/Input/input'

class Contact extends Component {

    state = {
        name:'',
        email:'',
        address: {
            postalCode:'',
            street:'',
        },
        loading:false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading:true,
        })
        const order = {
            ingredients:this.props.ingredients,
            price:this.props.totalPrice,
            customer: {
                name: 'Max Schwarzmüller',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest',
        }
        axios.post('/orders.json',order)
        .then((response) => {
            this.setState( {
                loading:false,
            });
            this.props.history.push('/');
        }).catch((error) => {
            this.setState({
                loading:false
            });
        });
        console.log(order,'here is order');
    }

    render() {
        console.log('Hello world');
        let form = (
            <form>
                    <Input inputtype="input" name="name"       type="text"  placeholder="Enter your name"       />
                    <Input inputtype="input" name="email"      type="email" placeholder="Enter your email"      />
                    <Input inputtype="input" name="postalCode" type="text"  placeholder="Enter your PostalCode" />
                    <Input inputtype="input" name="street"     type="text"  placeholder="Enter your Address"    />
                    <Button btnTypes="Success" clicked={this.orderHandler} >Order Now</Button>
                </form>
        );

        if(this.state.loading)
        {
            form = <Spinner />
        }
        return(
            <div className = {classes.Contact}>
                <h1>Enter Your Contact Details</h1>
                {form}
            </div>
        );
    }
}

export default Contact;