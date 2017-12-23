import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import routes from './config/routes'
import Header from './components/Header'

const App = () => (
  <div className="App">
    <Helmet
      defaultTitle="Francesco Tonini"
      titleTemplate="%s - Francesco Tonini"
    />
    <Route path="/" component={({match}) => (
      <div>
        <Header/>
        <Switch>
          {routes.map(route => (<Route {...route} />))}
        </Switch>
      </div>
    )}/>
  </div>
)

export default App
