import axios from 'axios'; 
export const api = {
    fetchapi: function (url, type, data, token) {
        if (type === 'post' || type === 'put') {
            return axios(
                url,
                {
                    method: type,
                    headers: {
                        'Content-Type': 'application/json',
                        // Authorization: token?'Bearer ' + localStorage.getItem('token'):null
                    },
                    data: data
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
                        // Authorization: token?'Bearer ' + localStorage.getItem('token'):null
                    },
                }
            )
        }
    }
}
// export default api;
// const res = await api.xttpHtmlReq(getAllCategories);
// const data = res.data.category_details.map(result => {
//     return ({ url: `${baseUrl}/${result.product_image}` })
// })