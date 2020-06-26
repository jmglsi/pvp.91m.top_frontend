import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    document.title = to.meta.title + " | " + "苏苏的荣耀助手"
    next()
})

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

import VueMeta from 'vue-meta'
Vue.use(VueMeta)

import qs from 'qs'
Vue.prototype.$qs = qs

Vue.prototype.axios = require("axios")

import './assets/import/ant'

import './assets/import/vant'

import './assets/import/vxe-utils'
import './assets/import/vxe-table'

import './assets/js/app'
import './assets/js/bilibili'
import apiList from './assets/js/apiList'
Vue.prototype.apiList = apiList

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')