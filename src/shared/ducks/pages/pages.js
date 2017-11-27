import fetch from 'isomorphic-fetch'

// Actions
const LOAD   = 'tognox/pages/LOAD'

// Reducer
export default function reducer(state = {}, { type, payload } = {}) {
  switch (type) {
    case LOAD: return {
      ...state,
      ...payload.reduce((accumulatedPages, page) => {
        return {
          ...accumulatedPages,
          [page.id]: page
        }
      }, {})
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

// side effects, only as applicable
// e.g. thunks, epics, etc
export function fetchPage (slug) {
  return dispatch =>
    fetch(`http://localhost:8888/francescotonini/wp-json/wp/v2/pages?slug=${slug}`)
      .then(response => response.json())
      .then(data => dispatch(loadPage(data)))
}


// Selectors
export function getPage(pages, slug) {
  return Object
    .values(pages)
    .find(({id}) => pages[id].slug === slug)
}
