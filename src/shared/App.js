import React from 'react'

import {
  Route,
  Switch
} from 'react-router-dom'
import About from './containers/AboutPage'
import Home from './containers/HomePage'
import PageNotFound from './containers/PageNotFoundPage'
import Header from './components/Header'

const App = () => (
  <div className="App">
    <Route path="/" component={({match}) => (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/about" component={About}/>
          <Route component={PageNotFound}/>
        </Switch>
      </div>
    )}/>
  </div>
)

export default App
