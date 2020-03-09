const URL = 'http://180.149.241.208:3022/getAllCategories'
export default () => {
    return fetch(URL)
    .then (response=> Promise.all(response.json()))
}