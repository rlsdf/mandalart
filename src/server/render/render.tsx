import React from 'react'
import { renderToString } from 'react-router-server'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from '../../redux/configureStore'
import App from '../../shared/App'

const render = async (location: String) => {
  const context = {}
  const store = configureStore()
  const { html } = await renderToString(
    <StaticRouter location={location} context={context}>
      <Provider store={store}>
        <App/>
      </Provider>
    </StaticRouter>
  )

  return {
    html,
    state: store.getState()
  }
}

export default render
