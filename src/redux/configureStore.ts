import root from 'window-or-global'
import { createStore, applyMiddleware, compose } from 'redux'
import Reducer from './reducer'

const isDevelopment = process.env.NODE_ENV === 'development'
const devtool = root.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const composeEnhancers = isDevelopment ? (devtool || compose) : compose

const configureStore = (preloadedState?: object) => createStore(
  Reducer,
  preloadedState,
  composeEnhancers(applyMiddleware())
)

export default configureStore
