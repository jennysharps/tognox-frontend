export default {
  home: {
    path: '/',
    params: {},
    slug: ''
  },
  about: {
    path: '/about',
    params: {},
    slug: 'about'
  },
  contact: {
    path: '/contact',
    params: {},
    slug: 'contact'
  },
  projects: {
    path: '/projects',
    params: {},
    slug: ''
  },
  project: {
    path: '/projects/:projectSlug',
    params: {
      slug: ':projectSlug'
    },
    slug: ''
  },
  publications: {
    path: '/publications',
    params: {},
    slug: 'publications'
  },
  resource: {
    path: '/resources/:resourceSlug',
    params: {
      slug: ':resourceSlug'
    },
    slug: ''
  },
  resources: {
    path: '/resources',
    params: {},
    slug: ''
  },
  tag: {
    path: '/tag/:tagSlug',
    params: {
      slug: ':tagSlug'
    },
    slug: ''
  }
}
