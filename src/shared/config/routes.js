import About from '../containers/AboutPage'
import Home from '../containers/HomePage'
import Projects from '../containers/Projects'
import PageNotFound from '../containers/PageNotFoundPage'

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: `/about`,
    component: About,
    exact: true
  },
  {
    path: `/projects`,
    component: Projects,
    exact: true
  },
  {
    path: '*',
    component: PageNotFound
  }
]

export default routes
