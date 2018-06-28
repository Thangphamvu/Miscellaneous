let initialState = {
        by : 'status',
        value : 1
    };

let myReducer = (state = initialState, action) => {
    if(action.type === 'SORT'){
        let {by, value} = action.sort;
        let status = state;
        return {
            status : status,
            sort : {
                by : by,
                value : value
            }
        }
    }
    return state;
};

export default myReducer;