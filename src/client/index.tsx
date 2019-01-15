import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../redux/store'
import rootSaga from '../redux/sagas'
import Root from '../shared/Root'

store.runSaga(rootSaga)

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Root/>
    </Provider>
  </BrowserRouter>
)

hydrate(<App />, document.getElementById('root'))
