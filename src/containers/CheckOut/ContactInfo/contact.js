import React, { Component } from 'react';
import classes from './contact.css';
import Button from '../../../components/UI/Button/button'
import axios from '../../../axios'
import Spinner from '../../../components/UI/Spinner/spinner'
import Input from '../../../components/UI/Input/input'
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';
import ErrorHandler from '../../../hoc/ErrorHandler/errorHandler'
import { inputValidity } from '../../../store/global/validation';

class Contact extends Component {

    state = {
        orderForm: {
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name',
                },
                validation: {
                    required:true,
                },
                touched:false,
                valid:false,

                value:'',
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email',
                },
                validation: {
                    required:true,
                    isEmail:true,
                },
                touched:false,
                valid:false,

                value:'',
            },
            postalCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Postal Code',
                },
                validation: {
                    required:true,
                    minLength:5,
                    maxLength:5,
                    isNumeric:true,
                },
                touched:false,
                valid:false,

                value:'',
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Street',
                },
                validation: {
                    required:true,
                },
                touched:false,

                valid:false,
                value:'',
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {
                            value:'fastest',
                            displayValue:'Fastest'},
                        {
                            value:'cheapest',
                            displayValue:'Cheapest',
                        }
                    ]
                },
                value:'fastest',
                validation:{},
                valid:true,
                touched:false,
            },
        },
        formValidity:false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        let formElement = {};
        for(let identifier in this.state.orderForm)
        {
            formElement[identifier] = this.state.orderForm[identifier].value;
        }
        const order = {
            ingredients:this.props.ings,
            price:this.props.price,
            customer:formElement,
            userId: this.props.userId,
        }
        this.props.onOrderBurger(order,this.props.token);
    }

    changedInputHandler = (event,inputIdentifier) => {
        const updatedForm = {
            ...this.state.orderForm
        }
        const updatedValue = {
            ...updatedForm[inputIdentifier]
        }
        updatedValue.value = event.target.value;
        updatedValue.valid = inputValidity(updatedValue.value,updatedValue.validation);
        updatedValue.touched = true;
        updatedForm[inputIdentifier] = updatedValue;

        let formValidity = true;
        for(let validity in updatedForm)
        {
            formValidity = updatedForm[validity].valid && formValidity;
        }

        this.setState({
            orderForm:updatedForm,
            formValidity:formValidity,
        })
    }
    render() {

        const formElementArray = [];
        for(let key in this.state.orderForm)
        {
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key],
            })
        }

        let form = (
            <form onSubmit = {this.orderHandler}>

                {
                    formElementArray.map((key) => (
                        <Input
                        key = {key.id}
                        elementtype = {key.config.elementType}
                        elementconfig = {key.config.elementConfig}
                        value = {key.config.value}
                        invalid = {!key.config.valid}
                        touched = {key.config.touched}
                        shouldValidate = {key.config.validation}
                        changed = {(event) => this.changedInputHandler(event,key.id)}
                        validInputType = {key.id}
                        />
                    ))
                }

                <Button btnTypes="Success" disabled = {!this.state.formValidity}>Order Now</Button>
            </form>
        );

        if(this.props.loading)
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

const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.price,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData,token) => dispatch(action.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ErrorHandler(Contact,axios));