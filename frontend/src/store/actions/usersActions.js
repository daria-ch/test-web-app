import {
    EDIT_USER_SUCCESS,
    FETCH_SINGLE_USER_SUCCESS,
    FETCH_USERS_FAILURE, FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS,
    POST_USER_SUCCESS
} from "./actionTypes";
import axiosApi from "../../../axiosApi";


export const fetchUsersSuccess = users => ({type: FETCH_USERS_SUCCESS, users});
export const postUserSuccess = () => ({type: POST_USER_SUCCESS});
export const editUserSuccess = (id, newUser) => ({type: EDIT_USER_SUCCESS, id, newUser});
export const fetchSingleUserSuccess = user => ({type: FETCH_SINGLE_USER_SUCCESS, user});
export const fetchUsersFailure = error => ({type: FETCH_USERS_FAILURE, error});
export const fetchUsersRequest = () => ({type: FETCH_USERS_REQUEST});

export const loginUserSuccess = login => ({type: LOGIN_USER_SUCCESS, login});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const loginUser = userData => {
    return async dispatch => {
        try {
            dispatch(loginUserSuccess(userData))
        } catch (e) {
            dispatch(loginUserFailure(e));
        }
    }
};

export const fetchUsers = () => {
    return async dispatch => {
        const response = await axiosApi.get('/users');
        dispatch(fetchUsersSuccess(response.data));
    }
};

export const postUser = user => {
    return async dispatch => {
        await axiosApi.post('/users', user);
        dispatch(postUserSuccess());
    }
};

export const fetchSingleUser = id => {
    return async (dispatch) => {
        const response = await axiosApi.get('/users/' + id);
        dispatch(fetchSingleUserSuccess(response.data));
    }
};

export const deleteUser = id => {
    return async dispatch => {
        try {
            await axiosApi.delete('/users/' + id);
            const response = await axiosApi.get('/users');
            const users = response.data;
            dispatch(fetchUsersSuccess(users));
        } catch (e) {
            dispatch(fetchUsersFailure(e));
        }
    }
};

export const editUser = (id, newUser) => {
    return async dispatch => {
        try {
            dispatch(fetchUsersRequest());
            await axiosApi.put('/users/' + id, newUser);
            dispatch(editUserSuccess(id, newUser));
        } catch (e) {
            dispatch(fetchUsersFailure(e));
        }
    }
}

