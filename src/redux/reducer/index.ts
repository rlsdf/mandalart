import { combineReducers } from 'redux'
import mandal, { MandalState } from './mandal'

const rootReducer = combineReducers({
  mandal
} as any)

export interface StoreState {
  mandal: MandalState
}

export default rootReducer
