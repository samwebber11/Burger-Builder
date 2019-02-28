import * as actionTypes from './actionTypes';
import axios from '../../axios'


export const authStart = () => {
    return {
        type:actionTypes.AUTH_START,
    }
}

export const authSuccess = (authData) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        authData:authData,
    }
}

export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error,
    }
}

export const authProcess = (email,password,isSignUp) => {
    return dispatch => {
        dispatch(authStart);
        const authData = {
            email:email,
            password:password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB1mYzqrZ8fIOrx9naNqJ3AKuTZnuuD-kc';
        if(!isSignUp)
        {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB1mYzqrZ8fIOrx9naNqJ3AKuTZnuuD-kc'
        }
        axios.post(url,authData)
        .then((response) => {
            dispatch(authSuccess(response.data.idToken,response.data.userId))
        })
        .catch((error) => {
            console.log(error);
            dispatch(authFail(error))
        })
    }
};