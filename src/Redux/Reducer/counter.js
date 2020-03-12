const initialState = {
    count: 0
};
 export const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case "counter":
            return {
                ...state,
                count: 0
            };
        default:
            return state;
    }
}