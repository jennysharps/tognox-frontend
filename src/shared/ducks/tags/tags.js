import { fetch, getCacheData, getEndpoint } from '../../utils/apiUtils'
import { normalizePayloadItems } from '../../utils/payloadUtils'

// Actions
const LOAD   = 'tognox/tags/LOAD'

const initialState = {
  cache: {},
  tags: {}
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
      tags: {
        ...state.tags,
        ...normalizePayloadItems(payload)
      }
    }

    default: return state
  }
}

// Action Creators
export function loadTags(payload, cacheKey) {
  return {
    type: LOAD,
    cacheKey,
    payload
  };
}

// side effects, only as applicable
// e.g. thunks, epics, etc
const tagsApiEndpoint = getEndpoint('tags')

export function fetchTags() {
  return async (dispatch, getState) => {
    let args = {
      per_page: 50,
      hide_empty: true
    }
    let fetchArgs = [tagsApiEndpoint, args]
    let { cacheKey, isCacheValid } = getCacheData(getState().tags.cache, fetchArgs)
    if (!isCacheValid) {
      await fetch(...fetchArgs)
        .then(async ({ data, meta }) => {
          dispatch(loadTags(data, cacheKey))
          const { totalPages } = meta
          if (totalPages > 1) {
            for (let page = 2; page < totalPages; page++) {
              fetchArgs = [tagsApiEndpoint, { ...args, page }]
              let { cacheKey, isCacheValid } = getCacheData(getState().tags.cache, fetchArgs)
              if (!isCacheValid) {
                await fetch(...fetchArgs)
                  .then(({data}) => dispatch(loadTags(data, cacheKey)))
              }
            }
          }
        })
    }
  }
}

// Selectors
export function getTag({ tags }, tagSlug) {
  return Object.values(tags)
    .find(({ slug }) => slug === tagSlug)
}
