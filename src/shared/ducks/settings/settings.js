import { fetch, getEndpoint } from '../../utils/apiUtils'

// Actions
const LOAD   = 'tognox/settings/LOAD'

const initialState = {
  ready: false,
  settings: {
    frontpage: '',
    gaId: '',
    seoTitleFormat: '%s - Francesco Tonini',
    siteDescription: 'Geospatial Data Scientist',
    siteTitle: 'Francesco Tonini'
  }
}

// Reducer
export default function reducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case LOAD: return {
      ready: true,
      settings: payload
    }

    default: return state
  }
}

// Action Creators
export function loadSettings(payload) {
  return {
    type: LOAD,
    payload
  };
}

const settingsApiEndpoint = getEndpoint('settings');

// side effects, only as applicable
// e.g. thunks, epics, etc
export function fetchSettings() {
  return async (dispatch, getState) => {
    if (!getState().settings.ready) {
      await fetch(settingsApiEndpoint)
        .then(({ data }) => dispatch(loadSettings(data)))
    }
  }
}

export function getSettings({ settings }) {
  return settings
}

