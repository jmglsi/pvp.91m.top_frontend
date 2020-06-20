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
            path: '/bp',
            name: 'game',
            redirect: '/game'
        }, {
            path: '/hero',
            name: 'hero',
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
            component: resolve => require(['./views/Home.vue'], resolve),
            meta: {
                type: 1,
                title: '首页',
                keepAlive: true
            }
        }, {
            path: '/miniapp',
            name: 'MiniApp',
            component: resolve => require(['./views/MiniApp.vue'], resolve),
            meta: {
                type: 1,
                title: '小程序',
                keepAlive: true
            }
        }, {
            path: '/ranking',
            name: 'Ranking',
            component: resolve => require(['./views/Ranking.vue'], resolve),
            meta: {
                type: 1,
                title: '排行',
                keepAlive: true
            }
        }, {
            path: '/my',
            name: 'My',
            component: resolve => require(['./views/My.vue'], resolve),
            meta: {
                type: 1,
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
                        type: 1,
                        title: '信息'
                    }
                },
                {
                    path: ':id/replay',
                    name: 'HeroReplay',
                    component: resolve => require(['./components/Hero/Replay.vue'], resolve),
                    meta: {
                        type: 1,
                        title: '回顾'
                    }
                }
            ]
        },
        {
            path: '/game',
            component: resolve => require(['./components/Game/Home.vue'], resolve),
            children: [{
                path: '/',
                name: 'GameHome',
                component: resolve => require(['./components/Home/Game/Index.vue'], resolve),
                meta: {
                    type: 2,
                    title: '首页',
                    keepAlive: true
                }
            }, {
                path: 'more',
                name: 'GameMore',
                component: resolve => require(['./components/Game/More.vue'], resolve),
                meta: {
                    type: 2,
                    title: '更多',
                    keepAlive: true
                }
            }, {
                path: ':id',
                name: 'GameInfo',
                component: resolve => require(['./components/Game/Info.vue'], resolve),
                meta: {
                    type: 2,
                    title: '详情'
                }
            }]
        }, {
            path: '/bilibili',
            name: 'Bilibili',
            component: resolve => require(['./views/Bilibili.vue'], resolve),
            meta: {
                type: 1,
                title: 'bilibili',
                keepAlive: true
            }
        }
    ]
})