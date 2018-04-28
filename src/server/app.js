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
import { loadStatus } from '../shared/ducks/status/status'
import App from '../shared/App'
import ErrorPage from '../shared/containers/ErrorPage'

const reactApp = async (req, res) => {
  try {
    const store = createStore(rootReducer, applyMiddleware(thunk))
    const context = {}
    let HTML

    const setStatus = (newStatus) => {
      store.dispatch(loadStatus({ code: newStatus }))
    }

    try {
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
    } catch (error) {
      setStatus(500)
    }

    HTML = renderToString(
      <Context setStatus={setStatus} store={store}>
        <Router context={{}} location={req.url}>
          <App />
        </Router>
      </Context>
    )

    const { status: { code } } = store.getState()

    if (context.url) {
      res.redirect(301, context.url)
    } else {
      res.status(code).send(render(HTML, store.getState(), Helmet.renderStatic()))
    }
  } catch (error) {
    console.log(error)
  }
}

export default reactApp
