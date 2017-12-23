import About from '../containers/AboutPage'
import ContactForm from '../components/ContactForm'
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
    exact: true,
    key: 'home'
  },
  {
    path: `/about`,
    component: About,
    exact: true,
    key: 'about'
  },
  {
    path: `/contact`,
    component: ContactForm,
    exact: true,
    key: 'contact'
  },
  {
    path: `/projects`,
    component: Projects,
    exact: true,
    key: 'projects'
  },
  {
    path: '/projects/:projectSlug',
    component: Project,
    key: 'project'
  },
  {
    path: '/publications',
    component: Publications,
    key: 'publications'
  },
  {
    path: '/resources',
    component: Publications,
    key: 'resources'
  },
  {
    path: '/tag/:tagSlug',
    component: ProjectTag,
    key: 'tag'
  },
  {
    path: '*',
    component: PageNotFound,
    key: '404'
  }
]

export default routes
