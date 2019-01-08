import root from 'window-or-global'
import configureStore from './configureStore'

export default configureStore(root.__PRELOADED_STATE__)
