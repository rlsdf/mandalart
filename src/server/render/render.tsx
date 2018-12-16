import React from 'react'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import App from '../../shared/App'

const render = (location: String, store: any) => {
  const context = {}
  return (
    <StaticRouter location={location} context={context}>
      <Provider store={store}>
        <App/>
      </Provider>
    </StaticRouter>
  )
}

export default render
