import React from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from './config/routes'
import Header from './components/Header'

const App = () => (
  <div className="App">
    <Route path="/" component={({match}) => (
      <div>
        <Header/>
        <Switch>
          {routes.map(route => (
            <Route
              key={new Date().getTime()}
              {...route}
            />
          ))}
        </Switch>
      </div>
    )}/>
  </div>
)

export default App
