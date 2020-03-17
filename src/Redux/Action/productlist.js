import { FETCH_PRODUCT, FETCH_PRODUCT_SUCCESS, FETECH_PRODUCT_FAILUER } from '../Constants/constant'
import {api}  from '../../utils/api'
export const getProduct = () => {
    return {
        type: FETCH_PRODUCT,
    
    }
}
export const getProductSuccess = data => {
    return {
        type: FETCH_PRODUCT_SUCCESS,
        payload:data
    }
}
export const getProductFailuer = () => {
    console.log('');
    return {
        type: FETECH_PRODUCT_FAILUER
    }
}




export const FetchProductList = (type) => {
    console.log("typeery",type)
    console.log("ddd")
    return async dispatch => {
        console.log('dis')
      
        try {
            console.log("in tey")
            const ProductList = await api.fetchapi('http://180.149.241.208:3022/'+type, 'get')
            dispatch(getProduct(true))
            console.log("in teydfdf")
            const commonProduct = await ProductList.json();
            console.log("jjjjhh", commonProduct)
            dispatch(getProductSuccess(commonProduct))
           
        } catch (error) {
            console.log('Getting People Error---------', error);
            dispatch(getProductFailuer(error))
        }
    }
}

export const FetchProductDetail = (type) => {
    console.log("typeery", type)
    console.log("ddd")
    return async dispatch => {
        console.log('dis')

        try {
            console.log("in tey")
            const ProductList = await api.fetchapi('http://180.149.241.208:3022/' + type, 'get')
            dispatch(getProduct(true))
            console.log("in teydfdf")
            const commonProduct = await ProductList.json();
            console.log("jjjjhh", commonProduct)
            dispatch(getProductSuccess(commonProduct))

        } catch (error) {
            console.log('Getting People Error---------', error);
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