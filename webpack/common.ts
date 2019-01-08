import path from 'path'
import { Configuration } from 'webpack'
import webpackBar from 'webpackbar'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const config: Configuration = {
  output: {
    path: path.join(__dirname, '../build'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.css', '.scss'],
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
    new webpackBar(),
    new MiniCssExtractPlugin({
      filename: 'static/style.css'
    })
  ]
}

export default config
