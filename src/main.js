import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

import 'vant/lib/index.less'
// less

import './assets/import/ant'
import './assets/import/vant'
import './assets/import/vxe-utils'
import './assets/import/vxe-table'
// js

Vue.config.productionTip = false

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
axios.interceptors.request.use(function(config) {
    let data = qs.parse(config.data)

    config.url += "&host=" + location.host

    if (config.method == "post") {
        const openId = cookie.get("openId")
        const accessToken = cookie.get("accessToken")

        const tempOpenId = cookie.get("tempOpenId")
        const tempAccessToken = cookie.get("tempAccessToken")

        config.data = qs.stringify({
            openId: openId || tempOpenId,
            accessToken: accessToken || tempAccessToken,
            ...data
        })
    }

    return config;
}, function(error) {
    return Promise.reject(error);
})
Vue.prototype.$axios = axios

import './assets/js/app.config'
import './assets/js/bilibili.config'

import appApi from './assets/js/api.config'
Vue.prototype.$appApi = appApi

import appMsg from './assets/js/code.config'
Vue.prototype.$appMsg = appMsg

router.beforeEach((to, from, next) => {
    Vue.prototype.$appLastUrl = from;

    document.title = to.meta.title + " | " + Vue.prototype.$appConfigInfo.appInfo.name
    document.body.scrollTop = document.documentElement.scrollTop = 0

    next()
})

new Vue({
    router,
    render: h => h(App),
    mounted() {
        document.dispatchEvent(new Event('render-event'));
    }
}).$mount('#app')