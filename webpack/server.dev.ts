import path from 'path'
import { Configuration } from 'webpack'
import merge from 'webpack-merge'
import common from './common'

const config: Configuration = merge(common, {
  mode: 'development',
  name: 'server',
  target: 'node',
  entry: [
    '@babel/polyfill',
    path.join(__dirname, '../src/server/render/render.tsx')
  ],
  devtool: 'inline-source-map',
  output: {
    filename: 'app.server.js',
    libraryTarget: 'commonjs2'
  }
})

export default config
