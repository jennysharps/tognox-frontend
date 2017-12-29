import React from 'react'
import { StaticRouter as Router, matchPath } from 'react-router-dom'
import Context from 'react-context-component'
import { Helmet } from 'react-helmet'
import { applyMiddleware, createStore } from 'redux'
import { renderToString } from 'react-dom/server'
import thunk from 'redux-thunk'

import { rootReducer } from '../shared/ducks'
import routes from '../shared/config/routes'
import render from './render'
import App from '../shared/App'

const ErrorPage = () => <h1>Oops there was an error</h1>

const reactApp = async (req, res) => {
  try {
    const store = createStore(rootReducer, applyMiddleware(thunk))
    const context = {}
    let HTML
    let status = 200

    const setStatus = (newStatus) => {
      status = newStatus
    }

    App.fetchData && await App.fetchData(store, App.defaultProps || {})

    const promises = []
    routes.some(route => {
      const match = matchPath(req.path, route)
      if (match && route.component.fetchData)
        promises.push(route.component.fetchData(
          store,
          {
            ...route.component.defaultProps || {},
            match
          }
        ))
      return match
    })

    await Promise.all(promises)

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
      res.status(status).send(render(HTML, store.getState(), Helmet.renderStatic()))
    }
  } catch (error) {
    console.log(error)
  }
}

export default reactApp
