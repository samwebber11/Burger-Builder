import React,{Component} from 'react';
import * as actionTypes from '../../store/actions/index'

import Input from '../../components/UI/Input/input';
import classes from './auth.css';
import Button from '../../components/UI/Button/button';
import { connect } from 'react-redux';


class Auth extends Component {

    state = {
        authForm: {
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Enter You Mail',
                },
                validation: {
                    required:true,
                    isEmail:true,
                },
                touched:false,
                valid:false,

                value:'',
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Enter Password',
                },
                validation: {
                    required:true,
                    minLength:6,
                    maxLength:6,
                },
                touched:false,
                valid:false,

                value:'',
            },
        },
        isSignUp:true,
    }


    inputValidity = (value,rules) => {
        let valid = true;

        if(rules.required)
        {
            valid = value.trim() !== '' && valid;
        }
        if(rules.minLength)
        {
            valid = value.length >= rules.minLength && valid;
        }
        if(rules.maxLength)
        {
            valid = value.length <= rules.maxLength && valid;
        }
        if(rules.isEmail)
        {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            valid = pattern.test(value) && valid;
        }
        if(rules.isNumeric)
        {
            const pattern = /^\d+$/;
            valid = pattern.test(value) && valid;
        }

        return valid;
    }

    changedInputHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.authForm,
            [controlName]: {
                ...this.state.authForm[controlName],
                value: event.target.value,
                valid: this.inputValidity(event.target.value, this.state.authForm[controlName].validation),
                touched: true
            }
        };
        this.setState({authForm: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.authForm.email.value,this.state.authForm.password.value,this.state.isSignUp)
    }

    switchAuthHandler = () => {
        this.setState((prevState) => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }


    render () {
        const formElementsArray = [];
        for ( let key in this.state.authForm ) {
            formElementsArray.push( {
                id: key,
                config: this.state.authForm[key]
            } );
        }

        const form = formElementsArray.map((key) => (
                <Input
                    key = {key.id}
                    elementtype = {key.config.elementType}
                    elementconfig = {key.config.elementConfig}
                    value = {key.config.value}
                    invalid = {!key.config.valid}
                    touched = {key.config.touched}
                    shouldValidate = {key.config.validation}
                    changed = {(event) => this.changedInputHandler(event,key.id)}
                    validInputType = {key.id} />
                ))
        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnTypes="Success">SUBMIT</Button>
                </form>
                <Button
                    clicked = {this.switchAuthHandler}
                    btnTypes = 'Danger'>Switch to {this.state.isSignUp ? 'SIGNIN':'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth:(email,password,isSignUp) => dispatch(actionTypes.authProcess(email,password,isSignUp))
    }
}

export default connect(null,mapDispatchToProps)(Auth);