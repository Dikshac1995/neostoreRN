import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
export const api = {

    baseUrl:
        'https://1d81591afa0d.ngrok.io/',

    // 'https://5295a84fd1ed.ngrok.io/',

    // 'http://180.149.241.208:3022/',
    fetchapi: function (url, type, data, token) {
        if (type === 'post' || type === 'put' || type === 'Delete') {
            console.log(url, 'url', data)
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