import {
    EDIT_USER_SUCCESS,
    FETCH_SINGLE_USER_SUCCESS,
    FETCH_USERS_FAILURE,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    users: [],
    user: null,
    error: null
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_SUCCESS:
            return {...state, users: action.users};
        case FETCH_SINGLE_USER_SUCCESS:
            return {...state, user: action.user};
        case FETCH_USERS_FAILURE:
            return {...state, error: action.error};
        case FETCH_USERS_REQUEST:
            return {...state, error: null};
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.id]: action.newUser
                }
            };
        default:
            return state;
    }
};


export default usersReducer;