import { combineReducers} from 'redux'
import auth from './authReducer'
import imageReducer from './imageReducer'
import { countReducer } from './counter'
import listReducer from './listReducer'

const rootReducer = combineReducers({
    auth,
    imageReducer,
    listReducer,
    count: countReducer,
   
})

export default rootReducer;