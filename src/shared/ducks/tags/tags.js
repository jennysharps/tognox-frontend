import { fetch, getCacheData, getEndpoint } from '../../utils/apiUtils'
import { normalizePayloadItems } from '../../utils/payloadUtils'
import { getPath } from '../../utils/pathUtils'

function normalizeTag({
  slug,
  ...restTag
}) {
  return {
    ...restTag,
    link: getPath('tag', { slug }),
    slug,
  }
}

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
        ...normalizePayloadItems(payload, normalizeTag)
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
      perPage: 50,
      hideEmpty: true
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

export function getTags({ tags }, tagSlugs) {
  return Object.values(tags)
    .filter(({ slug }) => tagSlugs.contains(slug))
}
