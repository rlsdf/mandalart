import { createAction } from 'redux-actions'
import {
  MANDAL_REQUEST,
  MANDAL_SUCCESS,
  MANDAL_FAILURE,
  UPDATE_MANDAL,
  UPDATE_MANDAL_REQUEST,
  UPDATE_MANDAL_SUCCESS,
  UPDATE_MANDAL_FAILURE
} from '../actionTypes'

export const requestMandal = createAction(MANDAL_REQUEST)
export const successMandal = createAction(MANDAL_SUCCESS)
export const failureMandal = createAction(MANDAL_FAILURE)

export const updateMandal = createAction(UPDATE_MANDAL)
export const updateRequestMandal = createAction(UPDATE_MANDAL_REQUEST)
export const updateSuccessMandal = createAction(UPDATE_MANDAL_SUCCESS)
export const updateFailureMandal = createAction(UPDATE_MANDAL_FAILURE)
