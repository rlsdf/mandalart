import path from 'path'
import webpack, { Configuration } from 'webpack'
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
  output: {
    filename: 'app.server.js',
    libraryTarget: 'commonjs2'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'tslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'css-loader/locals',
          options: {
            modules: true,
            localIdentName: '[name]__[local]--[hash:base64:5]'
          }
        },
          'postcss-loader'],
        exclude: /node_modules/
      }

    ]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
})

export default config
