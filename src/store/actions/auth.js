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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('localId');
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
            const expirationTime = new Date(new Date().getTime() + response.data.expiresIn*1000);
            localStorage.setItem('token',response.data.idToken);
            localStorage.setItem('expirationDate',expirationTime);
            localStorage.setItem('localId',response.data.localId);
            dispatch(authSuccess(response.data.idToken,response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch((error) => {
            console.log(error);
            dispatch(authFail(error.response.data.error))
        })
    }
}

export const onRedirectPath = (path) => {
    return {
        type: actionTypes.SET_REDIRECT_PATH,
        path: path,
    }
}

export const checkAuthStatus = () => {
    return dispatch => {
    const token = localStorage.getItem('token');
    if(!token)
    {
        dispatch(authLogout())
    }
    else
    {
        const expirationTime = new Date(localStorage.getItem('expirationDate'));
        if(expirationTime <= new Date())
        {
            dispatch(authLogout());
        }
        const localId = localStorage.getItem('localId');
        dispatch(authSuccess(token,localId));
        dispatch(checkAuthTimeout((expirationTime.getTime()-new Date().getTime())/1000));
    }
}
}