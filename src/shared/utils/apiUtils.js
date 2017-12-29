import isomorphicFetch from 'isomorphic-fetch'
import hash from 'object-hash'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'
import { stringify } from 'query-string'

import { apiPaths, apiRoot } from '../config/endpoints'

function getQueryString(args) {
  return arguments ? `?${stringify(args)}` : ''
}

export function fetch(path, { page = 1, perPage = 10, ...restArgs } = {}) {
  let meta
  const queryString = getQueryString(snakecaseKeys({ ...restArgs, page, perPage }))
  return isomorphicFetch(`${path}${queryString}`)
    .then(response => {
      const total = response.headers.get('x-wp-total')
      const totalPages = response.headers.get('x-wp-totalpages')
      meta = {
        limit: perPage,
        page,
        total,
        totalPages
      }
      return response.json()
    })
    .then(data => ({
      data: camelcaseKeys(data, { deep: true }),
      meta
    }))
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
