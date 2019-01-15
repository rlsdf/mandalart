import axios from 'axios'
import { take, put, call, fork, all } from 'redux-saga/effects'
import {
  MANDAL_REQUEST,
  UPDATE_MANDAL_REQUEST
} from '../actionTypes'
import {
  successMandal,
  failureMandal,
  updateSuccessMandal,
  updateFailureMandal
} from '../actions'

const callApi = (params = {}) =>
  axios(params)
    .then(response => ({ payload: response.data.data }))
    .catch(error => ({ error }))

function* watchFetchUpdateMandal(): IterableIterator<any> {
  while (true) {
    const action = yield take(UPDATE_MANDAL_REQUEST)
    const { params } = action.payload
    const { payload, error } = yield call(callApi, params)

    if (payload && !error) {
      yield put(updateSuccessMandal(payload))
    } else {
      yield put(updateFailureMandal(error))
    }
  }
}

function* watchFetchMandal(): IterableIterator<any> {
  while (true) {
    const action = yield take(MANDAL_REQUEST)
    const { params } = action.payload
    const { payload, error } = yield call(callApi, params)

    if (payload && !error) {
      yield put(successMandal(payload))
    } else {
      yield put(failureMandal(error))
    }
  }
}

export default function* rootSaga(): IterableIterator<any> {
  yield all([
    fork(watchFetchMandal),
    fork(watchFetchUpdateMandal)
  ])
}
