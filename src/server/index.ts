// import events from 'events'
import app from './app'

const configureDevelopment = (app) => {
  const clientConfig = require('../../webpack/client.dev')
  const serverConfig = require('../../webpack/server.dev')
  const { publicPath, path } = clientConfig.default.output
  const multiCompiler = require('webpack')([clientConfig.default, serverConfig.default])
  const clientCompiler = multiCompiler.compilers[0]
  const webpackDevMiddleware = require('webpack-dev-middleware')(
    multiCompiler,
    { publicPath }
  )
  const webpackHotMiddleware = require('webpack-hot-middleware')(clientCompiler)
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware')(
    multiCompiler,
    { serverRendererOptions: { outputPath: path } }
  )

  app.use(webpackDevMiddleware)
  app.use(webpackHotMiddleware)
  app.use(webpackHotServerMiddleware)

  // const eventEmitter = new events.EventEmitter()
  // clientCompiler.plugin('done', () => eventEmitter.emit('doneInitial'))
  // eventEmitter.once('doneInitial', () => {
  //   app.listen(9999, () => {
  //     console.log('Example app listening on port 9999!')
  //   })
  // })
}

if (process.env.NODE_ENV === 'development') {
  configureDevelopment(app)
}

app.listen(9999, () => {
  console.log('Example app listening on port 9999!')
})
