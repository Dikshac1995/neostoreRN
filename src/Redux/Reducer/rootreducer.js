import { combineReducers} from 'redux'
import auth from './authReducer'
import productListReducer from './productListReducer'
import { countReducer } from './counter'
import listReducer from './listReducer'

const rootReducer = combineReducers({
    auth,
    productListReducer,
    listReducer,
    count: countReducer,
   
})

export default rootReducer;