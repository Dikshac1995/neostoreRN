import { FETCH_IMAGE, FETCH_IMAGE_SUCCESS, FETECH_IMAGE_FAILUER } from '../Constants/constant'
import getImageApi from '../api/api'
export const getImage = () => {
    return {
        type:'FETCH_IMAGE'
    }
}
export const getImageSuccess = data => {
    return {
        type: 'FETCH_IMAGE_SUCCESS',
        payload:data
    }
}
export const getImageFailuer = () => {
    return {
        type: 'FETECH_IMAGE_FAILUER'
    }
}

export const FetchImage = () => {
    return (dispatch) => {
        dispatch(getImageApi())
        getImageApi().then((json)=> {
            dispatch(getImageSuccess(json))
            console.log("bgdhhd",json)
        })
        .catch((err)=>console.log((err)))
    }
}