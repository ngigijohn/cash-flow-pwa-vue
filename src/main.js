import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faUser,
  faHome,
  faBars,
  faCog,
  faChartBar,
  faList,
  faInfoCircle,
  faPlusCircle,
  faEdit



} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

import {
  dom
  //convert i to fontawesome icons
} from '@fortawesome/fontawesome-svg-core'

import './registerServiceWorker'

dom.watch()

library.add(
  faUser, faHome, faBars, faCog, faChartBar, faList,
  faPlusCircle, faInfoCircle, faEdit)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')