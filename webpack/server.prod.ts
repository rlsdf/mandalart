process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'
process.env.APP_ENV = 'server'

import path from 'path'
import webpack, { Configuration } from 'webpack'
import merge from 'webpack-merge'
import common from './common'

const config: Configuration = merge(common, {
  mode: 'production',
  name: 'server',
  target: 'node',
  entry: [
    '@babel/polyfill',
    path.join(__dirname, '../src/server/render/render.tsx')
  ],
  devtool: 'hidden-source-map',
  output: {
    filename: 'app.server.js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BABEL_ENV': JSON.stringify('production'),
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.APP_ENV': JSON.stringify('production')
    })
  ]
})

export default config
