import isomorphicFetch from 'isomorphic-fetch'
import hash from 'object-hash'
import { stringify } from 'query-string'

import { apiPaths, apiRoot } from '../config/endpoints'

function getQueryString(args) {
  return arguments ? `?${stringify(args)}` : ''
}

export function fetch(path, { page = 1, per_page = 10, ...restArgs } = {}) {
  let meta
  return isomorphicFetch(`${path}${getQueryString({ ...restArgs, page, per_page })}`)
    .then(response => {
      const total = response.headers.get('x-wp-total')
      const totalPages = response.headers.get('x-wp-totalpages')
      meta = {
        limit: per_page,
        page,
        total,
        totalPages
      }
      return response.json()
    })
    .then(data => ({ data, meta }))
}

export function getCacheData(cache, fetchArgs) {
  const cacheKey = hash(fetchArgs, { unorderedArrays: true })
  const { expiry } = getCachedItem(cache, cacheKey) || {}
  return {
    cacheKey,
    isCacheValid: expiry && expiry > new Date().getTime()
  }
}

export function getCachedItem(cache, cacheKey) {
  return Object.values(cache)
    .find(({ id }) => id === cacheKey)
}

export function getEndpoint(apiName) {
  return `${apiRoot}/${apiPaths[apiName] || ''}`
}
