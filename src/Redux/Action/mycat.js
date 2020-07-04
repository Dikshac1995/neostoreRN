import { GET_CART_DATA, GET_CART_DATA_FULFILLED, GET_CART_DATA_REJECTED } from '../Reducer/mycart'
import { api } from '../../utils/api'

export const fetchData = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: GET_CART_DATA,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchDataFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: GET_CART_DATA_FULFILLED,
        payload: data,
        loading: false,
    };
}

//Define a action creator that catches a error and sets an errorMessage
export const fetchDataRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: GET_CART_DATA_REJECTED,
        payload: error,
        loading: false,
    };
}

export const getCartData = (token) => {
    console.log("ddd", token)
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