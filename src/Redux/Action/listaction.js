import { GET_COROSAL_IMAGE, GET_COROSAL_IMAGE_FULFILLED, GET_COROSAL_IMAGE_REJECTED } from '../Reducer/listReducer'
import { api } from '../../utils/api'

export const fetchData = (bool) => {
    //return a action type and a loading state indicating it is getting data. 
    return {
        type: GET_COROSAL_IMAGE,
        payload: bool,
    };
}
export const fetchDataFulfilled = (data) => {
    return {
        type: GET_COROSAL_IMAGE_FULFILLED,
        payload: data,
        loading: false,
    };
}


export const fetchDataRejected = (error) => {

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
            const res = await api.fetchapi(api.baseUrl + 'getAllCategories', 'get')
            dispatch(fetchData(true))
            const people = await res.json();
            console.log('productDetail', people)
            dispatch(fetchDataFulfilled(people.category_details))
        } catch (error) {
            dispatch(fetchDataRejected(error))
        }
    }
}