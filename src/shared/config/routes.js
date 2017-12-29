import About from '../containers/AboutPage'
import ContactForm from '../components/ContactForm'
import Home from '../containers/HomePage'
import Project from '../containers/ProjectPage'
import Projects from '../containers/ProjectsPage'
import PageNotFound from '../containers/PageNotFoundPage'
import Publications from '../containers/PublicationsPage'
import Resource from '../containers/ResourcePage'
import Resources from '../containers/ResourcesPage'
import Tag from '../containers/TagPage'
import { getPath } from '../utils/pathUtils'

const routes = [
  {
    path: getPath('home'),
    component: Home,
    exact: true,
    key: 'home'
  },
  {
    path: getPath('about'),
    component: About,
    exact: true,
    key: 'about'
  },
  {
    path: getPath('contact'),
    component: ContactForm,
    exact: true,
    key: 'contact'
  },
  {
    path: getPath('projects'),
    component: Projects,
    exact: true,
    key: 'projects'
  },
  {
    path: getPath('project'),
    component: Project,
    key: 'project'
  },
  {
    path: getPath('publications'),
    component: Publications,
    key: 'publications'
  },
  {
    path: getPath('resource'),
    component: Resource,
    key: 'resource'
  },
  {
    path: getPath('resources'),
    component: Resources,
    key: 'resources'
  },
  {
    path: getPath('tag'),
    component: Tag,
    key: 'tag'
  },
  {
    path: '*',
    component: PageNotFound,
    key: '404'
  }
]

export default routes
