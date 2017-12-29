import { combineReducers } from 'redux'

import citations from './citations'
import pages from './pages'
import projects from './projects'
import resources from './resources'
import settings from './settings'
import tags from './tags'

export const rootReducer = combineReducers({
  citations,
  pages,
  projects,
  resources,
  settings,
  tags
})
