import * as actionTypes from './actionTypes';
import axios from '../../axios'


export const authStart = () => {
    return {
        type:actionTypes.AUTH_START,
    }
}

export const authSuccess = (token,userId) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId,
    }
}

export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error,
    }
}

export const authLogout = () => {
    return {
        type:actionTypes.AUTH_LOGOUT,
    }
};

export const checkAuthTimeout = (expire) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expire*1000);
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
            dispatch(authSuccess(response.data.idToken,response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch((error) => {
            console.log(error);
            dispatch(authFail(error.response.data.error))
        })
    }
};