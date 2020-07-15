import { GET_CART_DATA, GET_CART_DATA_FULFILLED, GET_CART_DATA_REJECTED } from '../Reducer/mycart'
import { api } from '../../utils/api'

export const fetchData = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: GET_CART_DATA,
        payload: bool,
    };
}
export const fetchDataFulfilled = (data) => {
    return {
        type: GET_CART_DATA_FULFILLED,
        payload: data,
        loading: false,
    };
}

export const fetchDataRejected = (error) => {
    return {
        type: GET_CART_DATA_REJECTED,
        payload: error,
        loading: false,
    };
}

export const getCartData = (token) => {
    //IN order to use await your callback must be asynchronous using async keyword.
    return async dispatch => {
        //Then perform your asynchronous operations.
        try {
            const res = await api.fetchapi(api.baseUrl + 'getCartData', 'get', ' ', token)
            dispatch(fetchData(true))
            const people = await res.json();
            dispatch(fetchDataFulfilled(people.product_details))
        } catch (error) {
            dispatch(fetchDataRejected(error))
        }
    }
}