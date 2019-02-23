import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const addIngredient = (name) => {
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    };
};

export const removeIngredient = (name) => {
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
}

export const fetchIngredientFailed = ()  => {
    return {
        type:actionTypes.FETCH_INGREDIENT_FAILED,
    }
}

export const setIngredient = (ingredient) => {
    return {
        type:actionTypes.SET_INGREDIENT,
        ingredients:ingredient
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get('https://burger-builder-b9a7a.firebaseio.com/ingredients.json')
        .then((response) => {
            dispatch(setIngredient(response.data));
        })
        .catch((error) => {
            dispatch(fetchIngredientFailed());
        })
    }
}