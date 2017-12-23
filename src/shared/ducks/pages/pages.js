import { fetch, getEndpoint } from '../../utils/apiUtils'
import { normalizePayloadItems } from '../../utils/payloadUtils'

function normalizePage({
  content: {rendered: content} = {},
  excerpt: {rendered: excerpt} = {},
  guid: {rendered: guid} = {},
  title: {rendered: title} = {},
  ...restPage
}) {
  return {
    ...restPage,
    content,
    excerpt,
    guid,
    title
  }
}

// Actions
const LOAD   = 'tognox/pages/LOAD'

const initialState = {
  cache: {},
  pages: {}
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
      pages: {
        ...state.pages,
        ...normalizePayloadItems(payload, normalizePage)
      }
    }

    default: return state
  }
}

// Action Creators
export function loadPage(payload) {
  return {
    type: LOAD,
    payload
  };
}

const pagesApiEndpoint = getEndpoint('pages');

// side effects, only as applicable
// e.g. thunks, epics, etc
export function fetchPage(slug) {
  return async (dispatch, getState) => {
    if (!getPage(getState().pages, slug)) {
      await fetch(pagesApiEndpoint, { slug })
        .then(({ data }) => dispatch(loadPage(data)))
    }
  }
}

// Selectors
export function getPage({ pages }, slug) {
  return Object.values(pages)
    .find(({ id }) => pages[id].slug === slug)
}

export function getPages({ pages }) {
  return Object.values(pages)
}
