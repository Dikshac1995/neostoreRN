import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../Constants/constant'

const INITIAL_STATE = {
    registering:true
}
export default function registration(state = INITIAL_STATE , action) {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                registering: true
            };
        case REGISTER_SUCCESS:
            return {

            };
        case REGISTER_FAILURE:
            return {

            };
        default:
            return state
    }
}