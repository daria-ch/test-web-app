import React from 'react';
import ReactDOM from 'react-dom';
import thunk from "redux-thunk";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import App from './App';
import * as serviceWorker from './serviceWorker';
import usersReducer from "./store/reducers/usersReducer";
import categoriesReducer from "./store/reducers/categoriesReducer";
import articlesReducer from "./store/reducers/articlesReducer";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    users: usersReducer,
    categories: categoriesReducer,
    articles: articlesReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();