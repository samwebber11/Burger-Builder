import React, { Component } from 'react';
import classes from './contact.css';
import Button from '../../../components/UI/Button/button'
import axios from '../../../axios'
import Spinner from '../../../components/UI/Spinner/spinner'
import Input from '../../../components/UI/Input/input'

class Contact extends Component {

    state = {
        orderForm: {
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name',
                },
                value:'',
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email',
                },
                value:'',
            },
            postalCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Postal Code',
                },
                value:'',
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Street',
                },
                value:'',
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {
                            value:'cheapest',
                            displayValue:'Cheapest',
                        }
                    ]
                }
            },
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

    changedInputHandler = (event,inputIdentifier) => {
        const updatedForm = {
            ...this.state.orderForm
        }
        const updatedValue = {
            ...updatedForm[inputIdentifier]
        }
        updatedValue.value = event.target.value;
        updatedForm[inputIdentifier] = updatedValue;
        this.setState({
            orderForm:updatedForm
        })
    }
    render() {
        console.log('Hello world');
        const formElementArray = [];
        for(let key in this.state.orderForm)
        {
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key],
            })
        }
        let form = (
            <form>

                {
                    formElementArray.map((key) => (
                        <Input
                        key = {key.id}
                        elementtype = {key.config.elementType}
                        elementconfig = {key.config.elementConfig}
                        value = {key.config.value}
                        changed = {(event) => this.changedInputHandler(event,key.id)}
                        />
                    ))
                }
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