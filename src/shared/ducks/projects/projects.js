import fetch from 'isomorphic-fetch'

import { normalizePayloadItems } from '../../utils/payloadUtils'

function normalizeProject({
  citations = [],
  content: {rendered: content} = {},
  excerpt: {rendered: excerpt} = {},
  guid: {rendered: guid} = {},
  title: {rendered: title} = {},
  ...restPage
}) {
  return {
    ...restPage,
    citations: citations.map(({rendered}) => rendered),
    content,
    excerpt,
    guid,
    title
  }
}

// Actions
const LOAD   = 'tognox/projects/LOAD'

// Reducer
export default function reducer(state = {}, { type, payload } = {}) {
  switch (type) {
    case LOAD: return {
      ...(payload.length === 1 ? state : {}),
      ...normalizePayloadItems(payload, normalizeProject)
    }

    default: return state
  }
}

// Action Creators
export function loadProjects(payload) {
  return {
    type: LOAD,
    payload
  };
}

const apiRoot = 'http://localhost:8888/francescotonini/wp-json/wp/v2';

// side effects, only as applicable
// e.g. thunks, epics, etc
export function fetchProjects() {
  return async (dispatch) => {
    await fetch(`${apiRoot}/projects`)
      .then(response => response.json())
      .then(data => dispatch(loadProjects(data)))
  }
}

// Selectors
export function getProject(projects, slug) {
  return Object
    .values(projects)
    .find(({ id }) => projects[id].slug === slug)
}
