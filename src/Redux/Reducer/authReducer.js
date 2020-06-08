
import AsyncStorage from '@react-native-community/async-storage';
let token = AsyncStorage.getItem('token');
const INITIAL_STATE = token ? { isLoading: false, isLoggedIn: true, token, userData: {}, error: undefined } : {};

// const INITIAL_STATE = {
//   isLoggedIn:false,
//   isLoading:false,
//   userData:{},
//   error:undefined
// }

export default function auth(state = INITIAL_STATE, action) {
  console.log(action.type);
  switch (action.type) {
    case 'LOGIN_ATTEMPT':
      return {
        ...state,
        isLoading: true,
        isLoggedIn: false,
        token: action.token
      }
      break;
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        userData: action.userData,
        token: action.token,
        error: undefined
      }
      break;
    case 'LOGIN_FAILED':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        error: action.error
      }
      break;
    case 'LOGOUT':
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false
      }
      break;
    default:
      return state
  }
}