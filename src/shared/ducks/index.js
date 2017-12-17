import { combineReducers } from 'redux'

import citations from './citations'
import pages from './pages'
import projects from './projects'
import tags from './tags'

export const rootReducer = combineReducers({
  citations,
  pages,
  projects,
  tags
})
