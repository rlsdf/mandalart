import { handleActions } from 'redux-actions'
import processMandalToArray from '../../helper/processMandalToArray'
import {
  MANDAL_SUCCESS,
  UPDATE_MANDAL
} from '../actionTypes'

export interface MandalState {
  origin: object,
  list: object[]
}

const initialState: MandalState = {
  origin: {},
  list: []
}

const successMandal = (state: MandalState, action: any) => {
  const { payload } = action

  return {
    ...state,
    list: processMandalToArray(payload),
    origin: payload
  }
}

const updateMandal = (state: MandalState, action: any) => {
  const { id, todo } = action.payload
  const splitId = id.split('-')
  const mainId = splitId[0]
  const subId = splitId[1]
  const newList = [...state.list]

  newList[mainId][subId] = { todo }

  if (mainId === '4' || subId === '4') {
    newList[subId][mainId] = { todo }
  }

  return {
    ...state,
    list: newList
  }
}

const mandal = handleActions<MandalState>({
  [MANDAL_SUCCESS]: successMandal,
  [UPDATE_MANDAL]: updateMandal
}, initialState)

export default mandal
