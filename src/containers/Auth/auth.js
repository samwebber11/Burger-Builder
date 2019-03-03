import React,{Component} from 'react';
import * as actionTypes from '../../store/actions/index'

import Input from '../../components/UI/Input/input';
import classes from './auth.css';
import Button from '../../components/UI/Button/button';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/spinner';
import { Redirect } from 'react-router-dom';

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

    componentWillMount() {
        console.log(this.props.authRedirect);
    }

    componentDidMount() {
        console.log(this.props.building);
        if(!this.props.building && this.props.authRedirect !== '/')
        {
            this.props.onSetRedirect();
        }
        console.log(this.props.authRedirect);
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
        let redirection = null;
        // console.log(this.props.onSetRedirect());
        console.log(this.props.authRedirect," hello world");
        console.log(this.props.isAuthenticated);
        if(this.props.isAuthenticated)
        {
            console.log(this.props.authRedirect,'final');
            redirection = <Redirect to={this.props.authRedirect} />
        }
        let form = formElementsArray.map((key) => (
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
        if(this.props.loading)
        {
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error)
        {
            errorMessage =
            <p>{this.props.error.message}</p>
        }


        return (
            <div className={classes.Auth}>
            {redirection}
            {errorMessage}
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

const mapStateToProps = state => {
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token !== null,
        building:state.burgerBuilder.building,
        authRedirect:state.auth.redirectPath,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth:(email,password,isSignUp) => dispatch(actionTypes.authProcess(email,password,isSignUp)),
        onSetRedirect: () => dispatch(actionTypes.onRedirectPath('/')),
    }
}

export default connect(mapStateToProps ,mapDispatchToProps)(Auth);