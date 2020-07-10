import {
    EDIT_ARTICLE_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_SINGLE_ARTICLE_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    articles: [],
    article: null,
    error: null
};

const articlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTICLES_SUCCESS:
            return {...state, articles: action.articles};
        case FETCH_SINGLE_ARTICLE_SUCCESS:
            return {...state, article: action.article};
        case FETCH_ARTICLES_FAILURE:
            return {...state, error: action.error};
        case FETCH_ARTICLES_REQUEST:
            return {...state, error: null};
        case EDIT_ARTICLE_SUCCESS:
            return {
                ...state,
                articles: {
                    ...state.articles,
                    [action.id]: action.newArticle
                }
            };
        default:
            return state;
    }
};


export default articlesReducer;