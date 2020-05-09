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

export const getPeople = () => {
    console.log("ddd")
    //IN order to use await your callback must be asynchronous using async keyword.
    return async dispatch => {
        console.log('dis')
        //Then perform your asynchronous operations.
        try {
            console.log("in tey")
            //Have it first fetch data from our starwars url.
            //const res = await fetch('http://180.149.241.208:3022/getAllCategories');
            const res = await api.fetchapi('http://180.149.241.208:3022/getAllCategories', 'get')
            dispatch(fetchData(true))
            const people = await res.json();
            console.log('people-----------', people);
            
            dispatch(fetchDataFulfilled(people.category_details))
        } catch (error) {
            console.log('Getting People Error---------', error);
            dispatch(fetchDataRejected(error))
        }
    }
}