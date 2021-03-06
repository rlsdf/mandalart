import React from 'react'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import Root from '../../shared/Root'

const render = (location: String, store: any) => {
  const context = {}
  return (
    <StaticRouter location={location} context={context}>
      <Provider store={store}>
        <Root/>
      </Provider>
    </StaticRouter>
  )
}

export default render
