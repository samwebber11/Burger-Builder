import * as actionTypes from './action';

const initialState = {
    ingredients:{
        salad:0,
        cheese:0,
        bacon:0,
        meat:0,
    },
    price:0,
}

const prices = {
    salad: 1.0,
    bacon: 0.5,
    cheese: 0.3,
    meat: 1.2
}

const reducer = (state=initialState,action) => {
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
        default:
        return state;
    }
}

export default reducer;