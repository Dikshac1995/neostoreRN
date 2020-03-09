import { combineReducers} from 'redux'
import auth from './authReducer'
import imageReducer from './imageReducer'

const rootReducer = combineReducers({
    auth,
    imageReducer
})

export default rootReducer;