import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token:null,
    userId:null,
    error:null,
    loading:false,
    redirectPath:'/',
}

const authStart = (state,action) => {
    return updateObject(state, {
        error:null,
        loading:true,
    })
}

const authSuccess = (state,action) => {
    return updateObject (state, {
        userId:action.userId,
        token:action.idToken,
        error:null,
        loading:false,
    });
}

const authFail = (state,action) => {
    return updateObject(state,{
        error:action.error,
        loading:false,
    })
}

const authLogout = (state,action) => {
    return updateObject(state, {
        token:null,
        userId:null,
    })
}

const onRedirect = (state,action) => {
    return updateObject(state, {
        redirectPath:action.path
    })
}

const authReducer = (state = initialState,action) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state,action);
        case actionTypes.AUTH_FAIL: return authFail(state,action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state,action);
        case actionTypes.SET_REDIRECT_PATH: return onRedirect(state,action);
        default:
            return state;
    }
};

export default authReducer;