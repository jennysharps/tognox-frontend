// Actions
const CACHE   = 'tognox/cache/CACHE'

const defaultExpiry = 60 * 60 * 12 * 1000 // 12 hours

// Reducer
export default function reducer(state = {}, { type, cacheKey, expiry } = {}) {
  switch (type) {
    case CACHE: return {
      ...state,
      [cacheKey]: {
        id: cacheKey,
        expiry: expiry || new Date().getTime() + defaultExpiry
      }
    }

    default: return state
  }
}

// Action Creators
export function addToCache(cacheKey, expiry) {
  return {
    type: CACHE,
    cacheKey,
    expiry
  };
}

// Selectors
export function getCachedItem(cache, cacheKey) {
  return Object.values(cache)
    .find(({ id }) => id === cacheKey)
}
