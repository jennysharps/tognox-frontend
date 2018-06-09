import { fetch, getCacheData, getEndpoint } from '../../utils/apiUtils'
import { normalizePayloadItems } from '../../utils/payloadUtils'
import { fetchTags, getTag } from '../tags/tags'
import { getPath } from '../../utils/pathUtils'

function normalizeProject({
  citations = [],
  content: { rendered: content } = {},
  excerpt: { rendered: excerpt } = {},
  guid: { rendered: guid } = {},
  slug,
  title: { rendered: title } = {},
  ...restPage
}) {
  return {
    ...restPage,
    citations,
    content,
    excerpt,
    link: getPath('project', { slug }),
    guid,
    slug,
    title
  }
}

// Actions
const LOAD = 'tognox/projects/LOAD'

const initialState = {
  cache: {},
  projects: {}
}

// Reducer
export default function reducer(state = initialState, { cacheKey, type, payload } = {}) {
  switch (type) {
    case LOAD: return {
      ...state,
      cache: {
        ...state.cache,
        [cacheKey]: {
          id: cacheKey,
          expiry: new Date().getTime() + 60 * 60 * 12 * 1000 // 12 hours
        }
      },
      projects: {
        ...state.projects,
        ...normalizePayloadItems(payload, normalizeProject)
      }
    }

    default: return state
  }
}

// Action Creators
export function loadProjects(payload, cacheKey) {
  return {
    type: LOAD,
    cacheKey,
    payload
  };
}

const projectsApiEndpoint = getEndpoint('projects')

// side effects, only as applicable
// e.g. thunks, epics, etc
export function fetchProjects(args) {
  return async (dispatch, getState) => {
    const fetchArgs = [projectsApiEndpoint, args]
    const { cacheKey, isCacheValid } = getCacheData(getState().projects.cache, fetchArgs)
    if (!isCacheValid) {
      await fetch(...fetchArgs)
        .then(({ data }) => dispatch(loadProjects(data, cacheKey)))
    }
  }
}

export function fetchProjectsByTag(tagSlug) {
  return async (dispatch, getState) => {
    await dispatch(fetchTags())
    const { id: tagId } = getTag(getState().tags, tagSlug) || {}

    if (tagId) {
      const fetchArgs = [projectsApiEndpoint, { tags: [tagId] }]
      const { cacheKey, isCacheValid } = getCacheData(getState().projects.cache, fetchArgs)
      if (!isCacheValid) {
        await fetch(...fetchArgs)
          .then(({ data }) => dispatch(loadProjects(data, cacheKey)))
      }
    }
  }
}

export function fetchProject(slug) {
  return async (dispatch, getState) => {
    const fetchArgs = [projectsApiEndpoint, { slug }]
    const { cacheKey, isCacheValid } = getCacheData(getState().projects.cache, fetchArgs)
    if (!isCacheValid) {
      await fetch(...fetchArgs)
        .then(({ data }) => {
          dispatch(loadProjects(data, cacheKey))
        })
    }
  }
}

// Selectors
export function getProject({ projects }, slug) {
  return Object.values(projects)
    .find(({ slug: itemSlug }) => slug === itemSlug)
}

export function getProjects({ projects }) {
  return Object.values(projects)
}

export function getProjectsByTag({ projects }, tagSlug) {
  return Object.values(projects)
    .filter(({ tags }) => tags.find(({ slug }) => tagSlug === slug))
}
