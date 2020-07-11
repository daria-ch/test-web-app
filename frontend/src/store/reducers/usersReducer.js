import {
    EDIT_USER_SUCCESS,
    FETCH_SINGLE_USER_SUCCESS,
    FETCH_USERS_FAILURE,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER
} from "../actions/actionTypes";

const initialState = {
    users: [],
    user: null,
    error: null,
    login: null,
    loginError: null
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
        case LOGIN_USER_SUCCESS:
            return {...state, login: action.login, loginError: null};
        case LOGIN_USER_FAILURE:
            return {...state, loginError: action.error};
        case LOGOUT_USER:
            return {...state, login: null};
        default:
            return state;
    }
};


export default usersReducer;