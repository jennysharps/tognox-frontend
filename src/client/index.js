import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import Context from 'react-context-component'
import thunk from 'redux-thunk'
import { BrowserRouter as Router } from 'react-router-dom'

import App from '../shared/App';
import { rootReducer } from '../shared/ducks'
import registerServiceWorker from './registerServiceWorker'

import './index.scss'

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(thunk))
)

ReactDOM.hydrate(
  <Context store={store}>
    <Router>
      <App />
    </Router>
  </Context>,
  document.getElementById('root')
);

registerServiceWorker();
