import { FETCH_PRODUCT, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_FAILUER } from '../Constants/constant'

const initialstate = {
    data:[],
    isFetching: false,
    error:false
}

export default  function productListReducer (state = initialstate,action){
    switch (action.type) {
        case FETCH_PRODUCT:
            return {
                ...state,
                data: [],
                isFetching:true
            }
        case FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isFetching:false
            }
        case FETCH_PRODUCT_FAILUER:
            return {
                ...state,
                data: action.data,
                isFetching: false
            }
        
        default:
            return state
  }   
}