import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from '../../shared/App'

const context = {}
const render = (location: String, data: String) => ReactDOMServer.renderToString(
  <StaticRouter location={location} context={context}>
    <App data={data} />
  </StaticRouter>
)

export default render
