import * as types from './../constants/ActionTypes';

let data = JSON.parse(localStorage.getItem('tasks'));
let initialState = data ? data : [];
let myReducer = (state=initialState, action) => {
    switch(action.types){
        case types.LIST_ALL:
            return state;
        default : return state;
    }
};

export default myReducer;