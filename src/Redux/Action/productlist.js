import { FETCH_IMAGE, FETCH_IMAGE_SUCCESS, FETECH_IMAGE_FAILUER } from '../Constants/constant'
// import getImageApi from '../api/api'
export const getImage = () => {
    return {
        type:FETCH_IMAGE
    }
}
export const getImageSuccess = data => {
    return {
        type: FETCH_IMAGE_SUCCESS,
        payload:data
    }
}
export const getImageFailuer = () => {
    console.log('');
    return {
        type: FETECH_IMAGE_FAILUER
    }
}




export const FetchImage = () => {
    console.log("ddd")
    //IN order to use await your callback must be asynchronous using async keyword.
    return async dispatch => {
        console.log('dis')
        //Then perform your asynchronous operations.
        try {
            console.log("in tey")
            //Have it first fetch data from our starwars url.
            const ProductList = await fetch('http://180.149.241.208:3022/commonProducts')
            console.log("in stay")
            dispatch(fetchData(true))
            console.log("in teydfdf")
            const commonProduct = await ProductList.json();
            dispatch(getImageSuccess(commonProduct))
            //Now when the data is retrieved dispatch an action altering redux state.
        } catch (error) {
            console.log('Getting People Error---------', error);
            dispatch(getImageFailuer(error))
        }
    }
}

export function changeCount(count) {
    return {
        type: "counter",
        payload: count
    }
}