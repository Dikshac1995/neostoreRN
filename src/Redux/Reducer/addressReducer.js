import { FETCH_ADDRESS, FETCH_ADDRESS_SUCCESS, FETCH_ADDRESS_FAILUER } from '../Constants/constant'

const initialstate = {
    data: [],
    isFetching: false,
    error: false
}

export default function productListReducer(state = initialstate, action) {
    switch (action.type) {
        case FETCH_ADDRESS:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_ADDRESS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isFetching: false
            }
        case FETCH_ADDRESS_FAILUER:
            return {
                ...state,
                data: action.data,
                isFetching: false
            }

        default:
            return state
    }
}