import {REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAILURE } from '../Constants/constant'

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

export function register(user) {
     console.log('in registration')
    return  async dispatch => {
        dispatch(request(user));
             return await fetch('http://180.149.241.208:3022/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               user
            })
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((responseJSON) => {
                        console.log("responseJSON", responseJSON);
                        dispatch(Success(responseJSON))
                    })
                }
                else {
                    response.json().then((responseJSON) => {
                        console.log("responseJSON", responseJSON);
                        dispatch(failure(responseJSON.message))
                    })
                }
            })
            .catch((error) => {
                console.log("error", error);
                dispatch(failure(error))
            })
    }
}
