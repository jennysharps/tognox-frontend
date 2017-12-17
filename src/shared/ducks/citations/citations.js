import { fetch, getCacheData, getEndpoint } from '../../utils/apiUtils'
import { normalizePayloadItems } from '../../utils/payloadUtils'

function normalizeCitation({
  citation,
  excerpt: { rendered: excerpt } = {},
  guid: { rendered: guid } = {},
  title: { rendered: title } = {},
  ...restCitation
}) {
  return {
    ...citation,
    ...restCitation,
    excerpt,
    guid,
    title
  }
}

// Actions
const LOAD   = 'tognox/citations/LOAD'

const initialState = {
  cache: {},
  citations: {}
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
      citations: {
        ...state.citations,
        ...normalizePayloadItems(payload, normalizeCitation)
      }
    }

    default: return state
  }
}

// Action Creators
export function loadCitations(payload, cacheKey) {
  return {
    type: LOAD,
    cacheKey,
    payload
  };
}

const citationsApiEndpoint = getEndpoint('citations');

// side effects, only as applicable
// e.g. thunks, epics, etc
export function fetchCitations() {
  return async (dispatch, getState) => {
    let args = {
      per_page: 50,
      hide_empty: true
    }
    let fetchArgs = [citationsApiEndpoint, args]
    let { cacheKey, isCacheValid } = getCacheData(getState().citations.cache, fetchArgs)
    if (!isCacheValid) {
      await fetch(...fetchArgs)
        .then(async ({ data, meta }) => {
          dispatch(loadCitations(data, cacheKey))
          const { totalPages } = meta
          if (totalPages > 1) {
            for (let page = 2; page < totalPages; page++) {
              fetchArgs = [citationsApiEndpoint, { ...args, page }]
              let { cacheKey, isCacheValid } = getCacheData(getState().tags.cache, fetchArgs)
              if (!isCacheValid) {
                await fetch(...fetchArgs)
                  .then(({data}) => dispatch(loadCitations(data, cacheKey)))
              }
            }
          }
        })
    }
  }
}

// Selectors
export function getCitation({ citations }, citationSlug) {
  return Object.values(citations)
    .find(({ slug }) => slug === citationSlug)
}

export function getCitations({ citations }) {
  return Object.values(citations)
}
