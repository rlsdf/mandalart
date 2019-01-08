process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

import path from 'path'
import webpack, { Configuration } from 'webpack'
import merge from 'webpack-merge'
import common from './common'

const config: Configuration = merge(common, {
  mode: 'production',
  name: 'client',
  target: 'web',
  entry: [
    '@babel/polyfill',
    path.join(__dirname, '../src/client/index')
  ],
  devtool: 'hidden-source-map',
  output: {
    filename: 'app.client.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BABEL_ENV': JSON.stringify('production'),
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
})

export default config
