import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import VueParticles from 'vue-particles'
Vue.use(VueParticles)

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
import appApiList from './assets/js/apiList'
Vue.prototype.appApi = appApiList

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')