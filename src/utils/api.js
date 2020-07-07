import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
export const api = {

    baseUrl:
        'http://180.149.241.208:3022/',
    // 'https://dbe6d59fca1d.ngrok.io',
    // 'https://8bee45f97401.ngrok.io',/

    fetchapi: function (url, type, data, token) {
        console.log("in api", data, token)
        if (type === 'post' || type === 'put') {
            return fetch(
                url,
                {
                    method: type,
                    headers: {
                        // 'Content-Type': 'multipart/form-data',
                        'Content-Type': 'application/json',
                        Authorization: token ? 'Bearer ' + token : null
                    },
                    body: data
                }
            )
        }
        else {
            console.log("in api1234", token)
            return fetch(
                url,
                {
                    method: type,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token ? 'Bearer ' + token : null
                    },
                }
            )
        }
    }
}



// import axios from 'axios';
// // import AsyncStorage from '@react-native-community/async-storage';
// export const api = {
//     fetchapi: function (url, type, data, token) {
//         if (type === 'post' || type === 'put') {
//             return axios(
//                 url, 
//                 {
//                     method: type,
//                     headers: {
//                         'Content-Type': 'application/json',
//                         // Authorization: token?'Bearer ' + AsyncStorage.getItem('token'):null
//                     },
//                     data: data
//                 }
//             )
//         }
//         else {
//             return axios (
//                 url,
//                 {
//                     method: type,
//                     headers: {
//                         'Content-Type': 'application/json',
//                         //  Authorization: token?'Bearer ' + AsyncStorage.getItem('token'):null
//                     },
//                 }
//             )
//         }
//     }
// }
// // export default api;
// // const res = await api.xttpHtmlReq(getAllCategories);
// // const data = res.data.category_details.map(result => {
// //     return ({ url: `${baseUrl}/${result.product_image}` })
// // })