process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

import path from 'path'
import webpack, { Configuration } from 'webpack'
import merge from 'webpack-merge'
import common from './common'

const config: Configuration = merge(common, {
  mode: 'development',
  name: 'client',
  target: 'web',
  entry: [
    '@babel/polyfill',
    path.join(__dirname, '../src/client/index'),
    'react-hot-loader/patch',
    'webpack-hot-middleware/client'
  ],
  devtool: 'inline-source-map',
  output: {
    filename: 'app.client.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

export default config
