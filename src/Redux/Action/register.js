import {REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAILURE } from '../Constants/constant'
import { api } from '../../utils/api'

export function request(user)
{
    return {
    type: REGISTER_REQUEST, user
    }
}
export function success(user)
{
    return {
        type: REGISTER_SUCCESS, user
    }
}
 export function failure(error) {
    return {
        type: REGISTER_FAILURE,
        error
    }
}
// export const register = (user) => {
//    console.log(user)
//      console.log('in registration')
//     return  async dispatch => {
//         dispatch(request(true));
//              return await fetch('http://180.149.241.208:3022/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                   user
//             })
//         })
//             .then((response) => {
//                 if (response.status === 200) {
//                     response.json().then((responseJSON) => {
//                         console.log("responseJSON", responseJSON);
//                         dispatch(Success(responseJSON))
//                     })
//                 }
//                 else {
//                     response.json().then((responseJSON) => {
//                         console.log("responseJSON", responseJSON);
//                         dispatch(failure(responseJSON.message))
//                     })
//                 }
//             })
//             .catch((error) => {
//                 console.log("error", error);
//                 dispatch(failure(error))
//             })
//     }
// }
 

export const register = (data) => {
    console.log("typeery", data)
    console.log("ddd")
    return async dispatch => {
        console.log('dis')

        try {
            console.log("in tey")
            const register = await api.fetchapi('http://180.149.241.208:3022/register' ,'post',)
            dispatch(request(data));
            console.log("in teydfdf")
            const commonProduct = await register.json();
            console.log("jjjjhh", commonProduct)
            dispatch(success(commonProduct))

        } catch (error) {
            console.log('Getting People Error---------', error);
            dispatch(failure(error))
        }
    }
}


export const addAddress = (data) => {
     console.log(data)
 }