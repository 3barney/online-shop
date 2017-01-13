/*eslint-disable import/default */

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import {Provider} from 'react-redux';
import routes from './routes';
import configureStore from './store/configureStore';

import  '../node_modules/toastr/build/toastr.min.css';
import '../node_modules/semantic-ui-css/semantic.css';
import './styles/styles.css';

const store = configureStore(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('app')
);
/*

render (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);

import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = configureStore(); // create store instance
// We not passing initial State as our reducers hanldle that eg courseReducer has an empty Array

store.dispatch(loadCourses()); // pass action to dispatch
store.dispatch(loadAuthors());

*/
