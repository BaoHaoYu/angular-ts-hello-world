import fse from 'fs-extra'
import * as webpack from 'webpack'
import common from './webpack.common.config'

fse.emptyDirSync('__build__')
fse.copySync('public', '__build__')

/**
 * 生产环境编译所需要webpack配置
 */
const webpackConfig: webpack.Configuration = {
  ...common,
}

export default webpackConfig
