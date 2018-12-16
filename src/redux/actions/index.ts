import { createAction } from 'redux-actions'
import {
  MANDAL_REQUEST,
  MANDAL_SUCCESS,
  MANDAL_FAILURE
} from '../actionTypes'

export const requestMandal = createAction(MANDAL_REQUEST)
export const successMandal = createAction(MANDAL_SUCCESS)
export const failureMandal = createAction(MANDAL_FAILURE)
