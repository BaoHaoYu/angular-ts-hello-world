import 'core-js/es6/reflect'
import 'core-js/es7/reflect'
import 'zone.js'
import '!style-loader!css-loader!normalize.css'

import AppModule from './App/App.module'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err))

// 热加载，参考 https://medium.com/@kubal5003/angular-4-hot-module-reload-explained-e832ea616304
// @ts-ignore
const hot = module.hot
if (hot) {
  hot.accept()
  console.log('[HMR] Accepting module hot update.')
  const applicationTagName = 'app-root'
  tryRemoveApplicationNode(applicationTagName)
  tryBootstrapNewApplication(applicationTagName)
}

function tryRemoveApplicationNode(tagName: string) {
  const currentApplicationNode = document.getElementsByTagName(tagName)[0]
  if (currentApplicationNode) {
    const parent = currentApplicationNode.parentNode
    parent && parent.removeChild(currentApplicationNode)
  }
}

function tryBootstrapNewApplication(tagName: string) {
  const newNode = document.createElement(tagName)
  document.getElementsByTagName('body')[0].insertAdjacentElement('beforeend', newNode)

  const newAppModule = require('./App/App.module').default
  platformBrowserDynamic().bootstrapModule(newAppModule)
}
