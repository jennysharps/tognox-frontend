import About from '../containers/AboutPage'
import Home from '../containers/HomePage'
import Project from '../containers/Project'
import Projects from '../containers/Projects'
import ProjectTag from '../containers/ProjectTag'
import PageNotFound from '../containers/PageNotFoundPage'
import Publications from '../containers/Publications'

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
    path: '/projects/:projectSlug',
    component: Project
  },
  {
    path: '/publications',
    component: Publications
  },
  {
    path: '/tag/:tagSlug',
    component: ProjectTag
  },
  {
    path: '*',
    component: PageNotFound
  }
]

export default routes
