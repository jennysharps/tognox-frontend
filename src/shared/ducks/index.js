import { combineReducers } from 'redux'

import pages from './pages'
import projects from './projects'

export const rootReducer = combineReducers({
  pages,
  projects
})
