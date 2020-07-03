import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
export function isLoading(bool) {
  return {
    type: 'LOGIN_ATTEMPT',
    isLoading: bool
  }
}

export function loginSuccess(userData, token) {
  return {
    type: 'LOGIN_SUCCESS',
    userData,
    token
  }
}

export function loginFailed(error) {
  return {
    type: 'LOGIN_FAILED',
    error
  }
};



export function login(data) {
  console.log("data", data)
  if (data == ' ') {
    return Alert.alert('fill the proper data ss')
  } else {
    return async dispatch => {
      dispatch(isLoading(true));
      return await fetch('http://180.149.241.208:3022/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": data.email,
          "pass": data.pass
        })
      })
        .then((response) => {
          dispatch(isLoading(false))
          response.json().then(async (responseJSON) => {
            if (responseJSON.success) {
              await AsyncStorage.setItem('token', responseJSON.token)
              const customerDetail = responseJSON
              await AsyncStorage.setItem("customerDetail", JSON.stringify(customerDetail))
              dispatch(loginSuccess(responseJSON, responseJSON.token))
            }
            else {
              dispatch(loginFailed(responseJSON.message))
            }
            const value = await AsyncStorage.getItem('token')
            const value1 = await AsyncStorage.getItem('customerDetail')

          })
        })
        .catch((error) => {
          console.log("error", error);
          dispatch(isLoading(false))
          dispatch(loginFailed(error))
        })
    }
  }


}

