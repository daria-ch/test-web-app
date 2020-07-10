import axiosApi from "../../../axiosApi";
import {
    EDIT_ARTICLE_SUCCESS, FETCH_ARTICLES_FAILURE, FETCH_ARTICLES_REQUEST,
    FETCH_ARTICLES_SUCCESS,
    FETCH_SINGLE_ARTICLE_SUCCESS,
    POST_ARTICLE_SUCCESS
} from "./actionTypes";


export const fetchArticlesSuccess = articles => ({type: FETCH_ARTICLES_SUCCESS, articles});
export const postArticleSuccess = () => ({type: POST_ARTICLE_SUCCESS});
export const editArticleSuccess = (id, newArticle) => ({type: EDIT_ARTICLE_SUCCESS, id, newArticle});
export const fetchSingleArticleSuccess = article => ({type: FETCH_SINGLE_ARTICLE_SUCCESS, article});
export const fetchArticlesFailure = error => ({type: FETCH_ARTICLES_FAILURE, error});
export const fetchArticlesRequest = () => ({type: FETCH_ARTICLES_REQUEST});

export const fetchArticles = () => {
    return async dispatch => {
        try {
            const response = await axiosApi.get('/articles');
            dispatch(fetchArticlesSuccess(response.data));
        } catch (e) {
            dispatch(fetchArticlesFailure(e));
        }
    }
};

export const postArticle = article => {
    return async dispatch => {
        await axiosApi.post('/articles', article);
        dispatch(postArticleSuccess());
    }
};

export const fetchSingleArticle = id => {
    return async (dispatch) => {
        const response = await axiosApi.get('/articles/' + id);
        dispatch(fetchSingleArticleSuccess(response.data));
    }
};

export const deleteArticle = id => {
    return async dispatch => {
        try {
            await axiosApi.delete('/articles/' + id);
            const response = await axiosApi.get('/articles');
            const articles = response.data;
            dispatch(fetchArticlesSuccess(articles));
        } catch (e) {
            dispatch(fetchArticlesFailure(e));
        }
    }
};

export const editArticle = (id, newArticle) => {
    return async dispatch => {
        try {
            dispatch(fetchArticlesRequest());
            await axiosApi.put('/articles/' + id, newArticle);
            dispatch(editArticleSuccess(id, newArticle));
        } catch (e) {
            dispatch(fetchArticlesFailure(e));
        }
    }
}

