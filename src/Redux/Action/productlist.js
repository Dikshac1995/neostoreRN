import { FETCH_PRODUCT, FETCH_PRODUCT_SUCCESS, FETECH_PRODUCT_FAILUER } from '../Constants/constant'
import { api } from '../../utils/api'
import AsyncStorage from '@react-native-community/async-storage';


export const getProduct = () => {
    return {
        type: FETCH_PRODUCT,


    }
}
export const getProductSuccess = data => {
    return {
        type: FETCH_PRODUCT_SUCCESS,
        payload: data
    }
}
export const getProductFailuer = () => {

    return {
        type: FETECH_PRODUCT_FAILUER
    }
}




export const FetchProductList = (type) => {

    return async dispatch => {


        try {

            const ProductList = await api.fetchapi(api.baseUrl + type, 'get')
            dispatch(getProduct(true))

            const commonProduct = await ProductList.json();
            dispatch(getProductSuccess(commonProduct))

        } catch (error) {
            dispatch(getProductFailuer(error))
        }
    }
}







export function changeCount(count) {
    return {
        type: "counter",
        payload: count
    }
}