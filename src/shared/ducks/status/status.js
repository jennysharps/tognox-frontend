// Actions
const LOAD   = 'tognox/status/LOAD'

const initialState = {
  code: 200
}

// Reducer
export default function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case LOAD: return payload

    default: return state
  }
}

// Action Creators
export function loadStatus(payload) {
  return {
    type: LOAD,
    payload
  };
}

// Selectors
export function getStatus({ status }) {
  return status;
}
