//Define your initialState
const initialState = {
    //Have a people array responsible for getting the data and setting to the array.
    people: [],
    //Have the loading state indicate if it's done getting data.
    loading: true,
    //Have state for error message for recieving an error.
    errorMessage: '',
}

//Define your action types 
//Initiate the api call
export const GET_PEOPLE = 'GET_PEOPLE';
//Gets the players on api call is fullfilled
export const GET_PEOPLE_FULFILLED = 'GET_PEOPLE_FULFILLED';
//When there is a error return an errror action type. 
export const GET_PEOPLE_REJECTED = 'GET_PEOPLE_REJECTED';


//Define your reducer that will return the initialState by default
const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PEOPLE:
            console.log('load reducer ',action.payload)
            return { ...state, loading: action.payload };
        case GET_PEOPLE_FULFILLED:
            console.log("d reducer",action.payload)
            return { ...state, people: action.payload, loading: action.loading };
        case GET_PEOPLE_REJECTED:
            return { ...state, errorMessage: action.payload, loading: action.loading };
        default:
            return state;
    }
}


export default listReducer;