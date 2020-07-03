import { GET_COROSAL_IMAGE, GET_COROSAL_IMAGE_FULFILLED, GET_COROSAL_IMAGE_REJECTED } from '../Reducer/listReducer'
import { api } from '../../utils/api'

export const fetchData = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: GET_COROSAL_IMAGE,
        payload: bool,
    };
}
//Define a action creator to set your loading state to false, and return the data when the promise is resolved
export const fetchDataFulfilled = (data) => {
    //Return a action type and a loading to false, and the data.
    return {
        type: GET_COROSAL_IMAGE_FULFILLED,
        payload: data,
        loading: false,
    };
}

//Define a action creator that catches a error and sets an errorMessage
export const fetchDataRejected = (error) => {
    //Return a action type and a payload with a error
    return {
        type: GET_COROSAL_IMAGE_REJECTED,
        payload: error,
        loading: false,
    };
}

export const getImage = () => {
    return async dispatch => {
        //Then perform your asynchronous operations.
        try {
            const res = await api.fetchapi('http://180.149.241.208:3022/getAllCategories', 'get')
            dispatch(fetchData(true))
            const people = await res.json();
            dispatch(fetchDataFulfilled(people.category_details))
        } catch (error) {
            dispatch(fetchDataRejected(error))
        }
    }
}