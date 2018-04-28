import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet as ReactHelmet } from 'react-helmet'
import routes from './config/routes'
import { fetchSettings, getSettings } from './ducks/settings/settings'
import Header from './components/Header'
import ErrorPage from './containers/ErrorPage'

const App = connect(({ status }) => ({ status }))(({ status: { code } }) => (
  <div className="App">
    <Route path="/" component={({ match }) => ([
        <Helmet key="App-helmet" />,
        <Header key="App-header" />,
        <main key="content" className="App-content">
          {code > 200
            ? (<ErrorPage />)
            : (
              <Switch>
                {routes.map(route => (<Route {...route} />))}
              </Switch>
            )
          }
        </main>
    ])}/>
  </div>
))

const Helmet = connect(({ settings, status }) => {
  const {
    seoTitleFormat,
    siteTitle
  } = getSettings(settings)

  return {
    seoTitleFormat,
    siteTitle,
    status
  }
})(({ seoTitleFormat, siteTitle }) => (
  <ReactHelmet
    defaultTitle={siteTitle}
    titleTemplate={seoTitleFormat}
  >
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="theme-color" content="#000000" />
  </ReactHelmet>
))

App.fetchData = async ({ dispatch }, props) => await dispatch(fetchSettings())

export default App
