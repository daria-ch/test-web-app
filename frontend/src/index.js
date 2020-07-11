import React from 'react';
import ReactDOM from 'react-dom';
import thunk from "redux-thunk";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import usersReducer from "./store/reducers/usersReducer";
import categoriesReducer from "./store/reducers/categoriesReducer";
import articlesReducer from "./store/reducers/articlesReducer";
import {loadState, saveState} from "./store/localStorage";


const rootReducer = combineReducers({
    users: usersReducer,
    categories: categoriesReducer,
    articles: articlesReducer
});

export default function configureStore(preloadedState) {
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        rootReducer,
        preloadedState,
        composeEnhancer(
            applyMiddleware(
                thunk
            ),
        ),
    );
    return store;
};

const store = configureStore(loadState());

store.subscribe(() => {
    saveState({
        users: {
            login: store.getState().users.login,
        }
    });
});

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();