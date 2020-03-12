import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '*',
            name: '404',
            redirect: '/ranking'
        }, {
            path: '/bilibili',
            name: 'Bilibili',
            component: resolve => require(['./views/Bilibili/Index.vue'], resolve),
            meta: {
                title: 'bilibili',
                keepAlive: true
            }
        }, {
            path: '/bp',
            name: 'Bp',
            component: resolve => require(['./views/Bp/Index.vue'], resolve),
            meta: {
                title: '全局BP模拟器(观赛助手)',
                keepAlive: true
            }
        }, {
            path: '/',
            name: 'Home',
            component: resolve => require(['./views/Home.vue'], resolve),
            meta: {
                title: '首页',
                keepAlive: true
            }
        }, {
            path: '/ranking',
            name: 'Ranking',
            component: resolve => require(['./views/Ranking/Index.vue'], resolve),
            meta: {
                title: '排行',
                keepAlive: true
            }
        }, {
            path: '/changelog',
            name: 'Changelog',
            component: resolve => require(['./views/Changelog.vue'], resolve),
            meta: {
                title: '更新记录',
                keepAlive: true
            }
        }, {
            path: '/setting',
            name: 'Setting',
            component: resolve => require(['./views/Setting.vue'], resolve),
            meta: {
                title: '设置',
                keepAlive: true
            }
        },
        {
            path: '/about',
            name: 'About',
            component: resolve => require(['./views/About.vue'], resolve),
            meta: {
                title: '关于',
                keepAlive: true
            }
        },
        {
            path: '/heroInfo/:id',
            name: 'HeroInfo',
            component: resolve => require(['./views/Hero/Info.vue'], resolve),
            meta: {
                title: '信息'
            }
        },
        {
            path: '/heroReplay/:id',
            name: 'HeroReplay',
            component: resolve => require(['./views/Hero/Replay.vue'], resolve),
            meta: {
                title: '回顾'
            }
        }
    ]
})