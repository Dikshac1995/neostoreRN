import { FETCH_IMAGE, FETCH_IMAGE_SUCCESS, FETCH_IMAGE_FAILUER } from '../Constants/constant'

const initialstate = {
    data:[],
    isFetching: false,
    error:false
}

export default  function imageReducer (state = initialstate,action){
    switch (action.type) {
        case FETCH_IMAGE:
            return {
                ...state,
                data: [],
                isFetching:true
            }
        case FETCH_IMAGE_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isFetching:false
            }
        case FETCH_IMAGE_FAILUER:
            return {
                ...state,
                data: action.data,
                isFetching: false
            }
        
        default:
            return state
  }   
}