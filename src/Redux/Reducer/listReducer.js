//import { GET_COROSAL_IMAGE, GET_COROSAL_IMAGE_FULFILLED, GET_COROSAL_IMAGE_REJECTED } from '../Constants/constant'

//Define your initialState

const initialState = {
    //Have a people array responsible for getting the data and setting to the array.
    data: [],
    //Have the loading state indicate if it's done getting data.
    loading: true,
    //Have state for error message for recieving an error.
    errorMessage: '',
}


export const GET_COROSAL_IMAGE = 'GET_COROSAL_IMAGE';

export const GET_COROSAL_IMAGE_FULFILLED = 'GET_COROSAL_IMAGE_FULFILLED';

export const GET_COROSAL_IMAGE_REJECTED = 'GET_COROSAL_IMAGE_REJECTED';



const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COROSAL_IMAGE:
            return { ...state, loading: action.payload };
        case GET_COROSAL_IMAGE_FULFILLED:

            return { ...state, data: action.payload, loading: action.loading };
        case GET_COROSAL_IMAGE_FULFILLED:
            return { ...state, errorMessage: action.payload, loading: action.loading };
        default:
            return state;
    }
}


export default listReducer;