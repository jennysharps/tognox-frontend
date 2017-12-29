import { fetch, getCacheData, getEndpoint } from '../../utils/apiUtils'
import { normalizePayloadItems } from '../../utils/payloadUtils'
import { getPath } from '../../utils/pathUtils'

function normalizeResource({
  content: { rendered: content } = {},
  excerpt: { rendered: excerpt } = {},
  guid: { rendered: guid } = {},
  slug,
  title: { rendered: title } = {},
  ...restResource
}) {
  return {
    ...restResource,
    content,
    excerpt,
    guid,
    link: getPath('resource', { slug }),
    slug,
    title
  }
}

// Actions
const LOAD = 'tognox/resources/LOAD'

const initialState = {
  cache: {},
  resources: {}
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
      resources: {
        ...state.resources,
        ...normalizePayloadItems(payload, normalizeResource)
      }
    }

    default: return state
  }
}

// Action Creators
export function loadResources(payload, cacheKey) {
  return {
    type: LOAD,
    cacheKey,
    payload
  };
}

const resourcesApiEndpoint = getEndpoint('resources')

// side effects, only as applicable
// e.g. thunks, epics, etc
export function fetchResources(args) {
  return async (dispatch, getState) => {
    const fetchArgs = [resourcesApiEndpoint, args]
    const { cacheKey, isCacheValid } = getCacheData(getState().resources.cache, fetchArgs)
    if (!isCacheValid) {
      await fetch(...fetchArgs)
        .then(({ data }) => dispatch(loadResources(data, cacheKey)))
    }
  }
}

export function fetchResource(slug) {
  return async (dispatch, getState) => {
    const fetchArgs = [resourcesApiEndpoint, { slug }]
    const { cacheKey, isCacheValid } = getCacheData(getState().resources.cache, fetchArgs)
    if (!isCacheValid) {
      await fetch(...fetchArgs)
        .then(({ data }) => dispatch(loadResources(data, cacheKey)))
    }
  }
}

// Selectors
export function getResource({ resources }, slug) {
  return Object.values(resources)
    .find(({ slug: itemSlug }) => slug === itemSlug)
}

export function getResources({ resources }) {
  return Object.values(resources)
}

export function getResourcesByTag({ resources }, tagSlug) {
  return Object.values(resources)
    .filter(({ tags }) => tags.find(({ slug }) => tagSlug === slug))
}
