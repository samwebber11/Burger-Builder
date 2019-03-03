import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const purchaseBurgerStart = () => {
    return {
    type:actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurgerSuccess = (id,orderData) => {
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error:error,
    }
}

export const purchaseBurger = (orderData,token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart() );
        axios.post('/orders.json?auth=' + token,orderData)
        .then((response) => {
            dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        })
        .catch((error) => {
            dispatch(purchaseBurgerFail(error))
        });
    };
};

export const purchaseInit = () => {
    return  {
        type:actionTypes.PURCHASE_INIT,
    };
};

export const fetchOrderStart = () => {
    return {
        type:actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrderFail = (error) => {
    return {
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error,
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders,
    }
}

export const fetchOrder = (token,userId) => {
    console.log(userId);
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+queryParams)
        .then((response) => {
            const fetchOrders = [];
            for(let key in response.data) {
                fetchOrders.push({
                    ...response.data[key],
                    id:key
                });
            }
            dispatch(fetchOrderSuccess(fetchOrders));
        })
        .catch((error) => {
            dispatch(fetchOrderFail(error));
        })
    }
};
