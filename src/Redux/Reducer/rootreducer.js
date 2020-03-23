import { combineReducers} from 'redux'
import auth from './authReducer'
import productListReducer from './productListReducer'
import { countReducer } from './counter'
import listReducer from './listReducer'
import registration from './registration.reducer'

const rootReducer = combineReducers({
    auth,
    productListReducer,
    listReducer,
    count: countReducer,
    registration:registration
   
})

export default rootReducer;