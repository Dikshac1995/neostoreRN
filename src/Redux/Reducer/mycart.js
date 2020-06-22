const initialState = {

    data: [],

    loading: true,
    //Have state for error message for recieving an error.
    errorMessage: '',
}


export const GET_CART_DATA = 'GET_CART_DATA';

export const GET_CART_DATA_FULFILLED = 'GET_CART_DATA_FULFILLED';

export const GET_CART_DATA_REJECTED = 'GET_CART_DATA_REJECTED';



const mycartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_DATA:
            console.log('load reducer ', action.payload)
            return { ...state, loading: action.payload };
        case GET_CART_DATA_FULFILLED:
            console.log("d reducer", action.payload)
            return { ...state, data: action.payload, loading: action.loading };
        case GET_CART_DATA_REJECTED:
            return { ...state, errorMessage: action.payload, loading: action.loading };
        default:
            return state;
    }
}


export default mycartReducer;