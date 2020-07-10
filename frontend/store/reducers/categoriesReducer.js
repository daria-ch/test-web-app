import {
    EDIT_CATEGORY_SUCCESS,
    FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_SINGLE_CATEGORY_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    categories: [],
    category: null,
    error: null
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_SUCCESS:
            return {...state, categories: action.categories};
        case FETCH_SINGLE_CATEGORY_SUCCESS:
            return {...state, category: action.category};
        case FETCH_CATEGORIES_FAILURE:
            return {...state, error: action.error};
        case FETCH_CATEGORIES_REQUEST:
            return {...state, error: null};
        case EDIT_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: {
                    ...state.categories,
                    [action.id]: action.newCategory
                }
            };
        default:
            return state;
    }
};


export default categoriesReducer();