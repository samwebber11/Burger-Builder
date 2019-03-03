import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';
// import { fetchIngredientFailed } from '../actions/burgerBuilder';

const initialState = {
    ingredients:{
        salad:0,
        cheese:0,
        bacon:0,
        meat:0,
    },
    price:0,
    error:false,
    building:false,
}

const prices = {
    salad: 1.0,
    bacon: 0.5,
    cheese: 0.3,
    meat: 1.2
}

const addIngredient = (state,action) => {
    const updatedIngredient = {[action.ingredientName]:state.ingredients[action.ingredientName]+1};
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
    const updatedState = {
        ingredients:updatedIngredients,
        price:state.price + prices[action.ingredientName],
        building: true,
    }

    return updateObject(state,updatedState);
}

const removeIngredient = (state,action) => {
    const updatedIngredient = {[action.ingredientName]:state.ingredients[action.ingredientName]-1};
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
    const updatedState = {
        ingredients:updatedIngredients,
        price:state.price - prices[action.ingredientName],
        building: true,
    }

    return updateObject(state,updatedState);
}

const setIngredients = (state,action) => {
    return updateObject( state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        price:0,
        error:false,
        building:false,
    })
}

const fetchIngredientFail = (state,action) => {
    return updateObject( state , {error:true});
}


const burgerBuilderReducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
        return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT :
        return removeIngredient(state,action);
        case actionTypes.FETCH_INGREDIENT_FAILED:
        return fetchIngredientFail(state,action);
        case actionTypes.SET_INGREDIENT:
        return setIngredients(state,action);
        default:
        return state;
    }
}

export default burgerBuilderReducer;