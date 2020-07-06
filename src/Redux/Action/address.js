import { FETCH_ADDRESS, FETCH_ADDRESS_SUCCESS, FETCH_ADDRESS_FAILUER } from '../Constants/constant'
import { api } from '../../utils/api'
import AsyncStorage from '@react-native-community/async-storage';


export const getAddress = (bool) => {
    return {
        type: FETCH_ADDRESS,
        payload: bool
    }
}
export const getAddressSuccess = data => {
    return {
        type: FETCH_ADDRESS_SUCCESS,
        payload: data
    }
}
export const getAddressFailuer = () => {
    return {
        type: FETCH_ADDRESS_FAILUER
    }
}


export const FetchAddress = (token) => {
    console.log('token<->', token)
    return async dispatch => {
        try {
            dispatch(getAddress(true))
            const Address = await api.fetchapi(api.baseUrl + 'getCustAddress', 'get', " ", token)
            console.log(Address, 'edr')
            dispatch(getAddress(false))
            const result = await Address.json();
            console.log('result', result.customer_address)

            dispatch(getAddressSuccess(result.customer_address))
            console.log('result', result.customer_address)

        } catch (error) {
            dispatch(getAddressFailuer(error))
        }
    }
}


