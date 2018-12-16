import root from 'window-or-global'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import Reducer from './reducer'

const configureStore = (preloadedState?: object) => {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const devtool = root.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  const composeEnhancers = isDevelopment ? (devtool || compose) : compose
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  const store: any = createStore(
    Reducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)

  return store
}

export default configureStore
