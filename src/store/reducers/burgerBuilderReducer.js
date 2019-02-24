import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients:{
        salad:0,
        cheese:0,
        bacon:0,
        meat:0,
    },
    price:0,
    error:false,
}

const prices = {
    salad: 1.0,
    bacon: 0.5,
    cheese: 0.3,
    meat: 1.2
}

const burgerBuilderReducer = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
        return {
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingredientName]:state.ingredients[action.ingredientName]+1
            },
            price: state.price + prices[action.ingredientName]
        }
        case actionTypes.REMOVE_INGREDIENT :
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]:state.ingredients[action.ingredientName]-1
            },
            price: state.price - prices[action.ingredientName]
        }
        case actionTypes.FETCH_INGREDIENT_FAILED:
        return {
            ...state,
            error:true,
        }
        case actionTypes.SET_INGREDIENT:
        return {
            ...state,
            ingredients: {
                salad: action.ingredients.salad,
                bacon: action.ingredients.bacon,
                cheese: action.ingredients.cheese,
                meat: action.ingredients.meat
            },
            error: false,
        }
        default:
        return state;
    }
}

export default burgerBuilderReducer;