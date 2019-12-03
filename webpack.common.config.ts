import { AngularCompilerPlugin } from '@ngtools/webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
// @ts-ignore
import precss from 'precss'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import webpack from 'webpack'
const isProduction = process.env.NODE_ENV === 'production'

/**
 * 通用的webpack配置
 */
const webpackConfig: Partial<webpack.Configuration> = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.component\.html?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'raw-loader',
          },
        ],
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]__[hash:base64:5]',
              },
              sourceMap: !isProduction,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProduction,
              plugins() {
                return [precss]
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(__dirname, 'tsconfig.app.json'),
      }),
    ],
  },
  optimization: {
    splitChunks: {
      maxAsyncRequests: 1,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'verdor',
          chunks: 'initial',
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],
  output: {
    filename: `[name]${isProduction ? '.[hash:8]' : ''}.js`,
    chunkFilename: `[name]${isProduction ? '.[hash:8]' : ''}.chunk.js`,
    path: path.join(__dirname, '__build__'),
  },
}

export default webpackConfig
