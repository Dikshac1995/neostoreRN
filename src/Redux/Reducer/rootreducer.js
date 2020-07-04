import { combineReducers } from 'redux'
import auth from './authReducer'
import productListReducer from './productListReducer'
import { countReducer } from './counter'
import listReducer from './listReducer'
import registration from './registrationreducer'
import mycartReducer from './mycart'
import AddressReducer from './addressReducer'

const rootReducer = combineReducers({
    auth,
    productListReducer,
    listReducer,
    count: countReducer,
    registration: registration,
    mycartReducer,
    AddressReducer

})

export default rootReducer;