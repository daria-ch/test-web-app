import axiosApi from "../../axiosApi";
import {
    EDIT_CATEGORY_SUCCESS, FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_SINGLE_CATEGORY_SUCCESS,
    POST_CATEGORY_SUCCESS
} from "./actionTypes";

export const fetchCategoriesSuccess = categories => ({type: FETCH_CATEGORIES_SUCCESS, categories});
export const postCategorySuccess = () => ({type: POST_CATEGORY_SUCCESS});
export const editCategorySuccess = (id, newCategory) => ({type: EDIT_CATEGORY_SUCCESS, id, newCategory});
export const fetchSingleCategorySuccess = category => ({type: FETCH_SINGLE_CATEGORY_SUCCESS, category});
export const fetchCategoriesFailure = error => ({type: FETCH_CATEGORIES_FAILURE, error});
export const fetchCategoriesRequest = () => ({type: FETCH_CATEGORIES_REQUEST});

export const fetchCategories = () => {
    return async dispatch => {
        const response = await axiosApi.get('/categories');
        dispatch(fetchCategoriesSuccess(response.data));
    }
};

export const postCategory = category => {
    return async dispatch => {
        await axiosApi.post('/categories', category);
        dispatch(postCategorySuccess());
    }
};

export const fetchSingleCategory = id => {
    return async (dispatch) => {
        const response = await axiosApi.get('/categories/' + id);
        dispatch(fetchSingleCategorySuccess(response.data));
    }
};

export const deleteCategory = id => {
    return async dispatch => {
        try {
            await axiosApi.delete('/categories/' + id);
            const response = await axiosApi.get('/categories');
            const categories = response.data;
            dispatch(fetchCategoriesSuccess(categories));
        } catch (e) {
            dispatch(fetchCategoriesFailure(e));
        }
    }
};

export const editCategory = (id, newCategory) => {
    return async dispatch => {
        try {
            dispatch(fetchCategoriesRequest());
            await axiosApi.put('/categories/' + id, newCategory);
            dispatch(editCategorySuccess(id, newCategory));
        } catch (e) {
            dispatch(fetchCategoriesFailure(e));
        }
    }
}