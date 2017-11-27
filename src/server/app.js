import React from 'react'
import { StaticRouter as Router } from 'react-router-dom'
import Context from 'react-context-component'
import { applyMiddleware, createStore } from 'redux'
import { renderToString } from 'react-dom/server'
import thunk from 'redux-thunk'

import { rootReducer } from '../shared/ducks'
import render from './render'
import App from '../shared/App'

const ErrorPage = () => <h1>Oops there was an error</h1>

const reactApp = (req, res) => {
  const store = createStore(rootReducer, applyMiddleware(thunk))
  const context = {}
  let HTML
  let status = 200

  const setStatus = (newStatus) => {
    status = newStatus
  }

  try {
    HTML = renderToString(
      <Context setStatus={setStatus} store={store}>
        <Router context={{}} location={req.url}>
          <App />
        </Router>
      </Context>
    )
  } catch (error) {
    HTML = renderToString(ErrorPage)
    status = 500
  }

  if (context.url) {
    res.redirect(301, context.url)
  } else {
    res.status(status).send(render(HTML, store.getState()))
  }
}

export default reactApp
