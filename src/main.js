import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import './assets/import/ant'
import './assets/import/vant'
import './assets/import/vxe-utils'
import './assets/import/vxe-table'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    document.title = to.meta.title + " | 苏苏的荣耀助手"
    document.body.scrollTop = document.documentElement.scrollTop = 0

    next()
})

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import VueMeta from 'vue-meta'
Vue.use(VueMeta)

import qs from 'qs'
Vue.prototype.$qs = qs

import md5 from 'js-md5'
Vue.prototype.$md5 = md5

import cookie from 'vue-cookie'
Vue.prototype.$cookie = cookie

import axios from 'axios'
axios.interceptors.request.use(function (config) {
    let data = qs.parse(config.data)

    if (config.method == "post") {
        const openId = cookie.get("openId")
        const accessToken = cookie.get("accessToken")

        config.data = qs.stringify({
            openId: openId,
            accessToken: accessToken,
            ...data
        })
    }

    return config;
}, function (error) {
    return Promise.reject(error);
})
Vue.prototype.$axios = axios

import './assets/js/app.config'
import './assets/js/bilibili.config'

import appApi from './assets/js/api.config'
Vue.prototype.$appApi = appApi

import appMsg from './assets/js/code.config'
Vue.prototype.$appMsg = appMsg

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')