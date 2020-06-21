import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    let hello = "苏苏的荣耀助手"

    document.title = to.meta.title + " | " + hello

    document.body.scrollTop = document.documentElement.scrollTop = 0;
    next()
})

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import VueCookie from 'vue-cookie'
Vue.use(VueCookie)

import VueMeta from 'vue-meta'
Vue.use(VueMeta)

Vue.prototype.axios = require("axios")

import './assets/import/ant'

import './assets/import/vant'

import './assets/import/vxe-utils'
import './assets/import/vxe-table'

import './assets/js/app'
import './assets/js/bilibili'
import appApiList from './assets/js/apiList'
Vue.prototype.appApi = appApiList

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')