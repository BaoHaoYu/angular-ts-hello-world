import path from 'path'
import * as webpack from 'webpack'
import * as devserver from 'webpack-dev-server'
import common from './webpack.common.config'

/**
 * webpack-dev-server所需要的配置
 */
const webpackConfig: webpack.Configuration & {
  devServer: devserver.Configuration
} = {
  ...common,
  devServer: {
    contentBase: [path.join(__dirname, '__build__'), path.join(__dirname, 'public')],
    port: 9000,
    host: 'localhost',
  },
}

export default webpackConfig
