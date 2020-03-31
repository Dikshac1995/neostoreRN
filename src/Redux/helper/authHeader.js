import AsyncStorage from '@react-native-community/async-storage';
export default async function authHeader() {
    // return authorization header with jwt token
    let user =  await AsyncStorage.getItem('token');
  console.log('::::::',user)
    if (user){
        return { 'Authorization': 'Bearer ' + user};
    } else {
        return {};
    }
} 