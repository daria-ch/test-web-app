import React from 'react';
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {StyleSheet, Text, View} from 'react-native';
import usersReducer from "./store/reducers/usersReducer";
import categoriesReducer from "./store/reducers/categoriesReducer";
import articlesReducer from "./store/reducers/articlesReducer";


const rootReducer = combineReducers({
    users: usersReducer,
    categories: categoriesReducer,
    articles: articlesReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
    return (
        <Provider store={store}>
            <Text>Hi!</Text>
        </Provider>
    );
}


