import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router' ;
import PropTypes from 'prop-types';
import App from './App';
import configureStore, {history} from "./store/configureStore";
import {loadState, saveState} from "./store/localStorage";
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore(loadState());

store.subscribe(() => {
    saveState({
        users: {
            login: store.getState().users.login
        }
    });
});

const Application = ({history}) => {
    return (
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>

    )
};

Application.propTypes = {
    history: PropTypes.object,
};


const app = (
    <Provider store={store}>
        <Application history={history}/>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

