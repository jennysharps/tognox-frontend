export default {
  home: {
    path: '/',
    params: {}
  },
  about: {
    path: '/about',
    params: {}
  },
  contact: {
    path: '/contact',
    params: {}
  },
  projects: {
    path: '/projects',
    params: {}
  },
  project: {
    path: '/projects/:projectSlug',
    params: {
      slug: ':projectSlug'
    }
  },
  publications: {
    path: '/publications',
    params: {}
  },
  resource: {
    path: '/resources/:resourceSlug',
    params: {
      slug: ':resourceSlug'
    }
  },
  resources: {
    path: '/resources',
    params: {}
  },
  tag: {
    path: '/tag/:tagSlug',
    params: {
      slug: ':tagSlug'
    }
  }
}
