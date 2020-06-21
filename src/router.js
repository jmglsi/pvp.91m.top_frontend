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
            path: '/hero',
            name: 'hero',
            redirect: '/ranking'
        }, {
            path: '/game',
            name: 'game',
            redirect: '/ranking'
        }, {
            path: '/heroInfo/:id',
            name: 'heroInfo',
            redirect: '/hero/:id/info'
        }, {
            path: '/heroReplay/:id',
            name: 'heroReplay',
            redirect: '/hero/:id/replay'
        }, {
            path: '/',
            name: 'Home',
            component: resolve => require(['./views/AppHome.vue'], resolve),
            meta: {
                title: '首页',
                keepAlive: true
            }
        }, {
            path: '/miniapp',
            name: 'MiniApp',
            component: resolve => require(['./views/MiniApp.vue'], resolve),
            meta: {
                title: '小程序',
                keepAlive: true
            }
        }, {
            path: '/ranking',
            name: 'Ranking',
            component: resolve => require(['./views/Ranking.vue'], resolve),
            meta: {
                title: '排行',
                keepAlive: true
            }
        }, {
            path: '/my',
            name: 'My',
            component: resolve => require(['./views/My.vue'], resolve),
            meta: {
                title: '我的',
                keepAlive: true
            }
        },
        {
            path: '/hero',
            component: resolve => require(['./views/Hero.vue'], resolve),
            children: [{
                    path: ':id/info',
                    name: 'HeroInfo',
                    component: resolve => require(['./components/Hero/Info.vue'], resolve),
                    meta: {
                        title: '信息'
                    }
                },
                {
                    path: ':id/replay',
                    name: 'HeroReplay',
                    component: resolve => require(['./components/Hero/Replay.vue'], resolve),
                    meta: {
                        title: '回顾'
                    }
                }
            ]
        },
        {
            path: '/game',
            component: resolve => require(['./views/GameHome.vue'], resolve),
            children: [{
                path: ':id/bp',
                name: 'GameBp',
                component: resolve => require(['./components/Game/GlobalBP.vue'], resolve),
                meta: {
                    title: '全局BP模拟器'
                }
            }]
        }, {
            path: '/bilibili',
            name: 'Bilibili',
            component: resolve => require(['./views/Bilibili.vue'], resolve),
            meta: {
                title: 'bilibili',
                keepAlive: true
            }
        }
    ]
})