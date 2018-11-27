import path from 'path'
import { Configuration } from 'webpack'
import webpackBar from 'webpackbar'

const config: Configuration = {
  output: {
    path: path.join(__dirname, '../build'),
    publicPath: '/'
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", '.js', '.ts', '.tsx', '.css', '.scss'],
    modules: [
      path.join(__dirname, '../node_modules'),
      path.join(__dirname, '../src')
    ]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: 'source-map-loader',
        enforce: 'pre'
      }
    ]
  },
  plugins: [
    new webpackBar()
  ]
}

export default config
