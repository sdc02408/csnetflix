import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import 'antd/dist/antd.css';

import { Provider } from "react-redux";

import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import './static/sass/style.scss';
// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(Reducer, composeEnhancer(applyMiddleware(thunk)));
//
// createStoreWithMiddleware(Reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ &&
//   window.__REDUX_DEVTOOLS_EXTENSION__()
ReactDOM.render(//리덕스 연결
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
