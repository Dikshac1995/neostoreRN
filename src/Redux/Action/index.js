import { FETCH_IMAGE, FETCH_IMAGE_SUCCESS, FETECH_IMAGE_FAILUER } from '../Constants/constant'
import getImageApi from '../api/api'
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
    console.log("in fetchimage");
    return (dispatch) => {
        console.log("in dispatch")
        dispatch(getImageApi())
        getImageApi().then((json) => {
            console.log(json)
            dispatch(getImageSuccess(json))
            console.log("bgdhhd",json)
        })
        .catch((err)=>console.log((err)))
    }
}


export function changeCount(count) {
    return {
        type: "counter",
        payload: count
    }
}