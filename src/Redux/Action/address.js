import { FETCH_ADDRESS, FETCH_ADDRESS_SUCCESS, FETCH_ADDRESS_FAILUER } from '../Constants/constant'
import { api } from '../../utils/api'
import AsyncStorage from '@react-native-community/async-storage';


export const getProduct = () => {
    return {
        type: FETCH_ADDRESS,
    }
}
export const getProductSuccess = data => {
    return {
        type: FETCH_ADDRESS_SUCCESS,
        payload: data
    }
}
export const getProductFailuer = () => {
    return {
        type: FETCH_ADDRESS_FAILUER
    }
}


export const FetchAddress = (token) => {
    console.log('token<->', token)
    return async dispatch => {
        try {
            const Address = await api.fetchapi(api.baseUrl + 'getCustAddress', 'get', " ", token)
            console.log(Address, 'edr')
            dispatch(getProduct(true))
            const result = await Address.json();
            dispatch(getProductSuccess(result.customer_address))
            console.log('result', result.customer_address)

        } catch (error) {
            dispatch(getProductFailuer(error))
        }
    }
}


