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
            name: 'match',
            redirect: '/match'
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
            path: '/bilibili',
            name: 'Bilibili',
            component: resolve => require(['./views/Bilibili/Index.vue'], resolve),
            meta: {
                type: 1,
                title: 'bilibili',
                keepAlive: true
            }
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
            component: resolve => require(['./views/Ranking/Index.vue'], resolve),
            meta: {
                type: 1,
                title: '排行',
                keepAlive: true
            }
        }, {
            path: '/changelog',
            name: 'Changelog',
            component: resolve => require(['./views/Changelog.vue'], resolve),
            meta: {
                type: 1,
                title: '更新记录',
                keepAlive: true
            }
        }, {
            path: '/setting',
            name: 'Setting',
            component: resolve => require(['./views/Setting.vue'], resolve),
            meta: {
                type: 1,
                title: '设置',
                keepAlive: true
            }
        },
        {
            path: '/about',
            name: 'About',
            component: resolve => require(['./views/About.vue'], resolve),
            meta: {
                type: 1,
                title: '关于',
                keepAlive: true
            }
        },
        {
            path: '/hero',
            component: resolve => require(['./views/Hero/Dashboard.vue'], resolve),
            children: [{
                    path: ':id/info',
                    name: 'HeroInfo',
                    component: resolve => require(['./views/Hero/Info.vue'], resolve),
                    meta: {
                        type: 1,
                        title: '信息'
                    }
                },
                {
                    path: ':id/replay',
                    name: 'HeroReplay',
                    component: resolve => require(['./views/Hero/Replay.vue'], resolve),
                    meta: {
                        type: 1,
                        title: '回顾'
                    }
                }
            ]
        },
        {
            path: '/match',
            component: resolve => require(['./views/Match/Dashboard.vue'], resolve),
            children: [{
                path: '/',
                name: 'MatchHome',
                component: resolve => require(['./views/Match/Home.vue'], resolve),
                meta: {
                    type: 2,
                    title: '首页',
                    keepAlive: true
                }
            }, {
                path: 'add',
                name: 'MatchAdd',
                component: resolve => require(['./views/Match/Add.vue'], resolve),
                meta: {
                    type: 2,
                    title: '添加',
                    keepAlive: true
                }
            }, {
                path: 'more',
                name: 'MatchMore',
                component: resolve => require(['./views/Match/More.vue'], resolve),
                meta: {
                    type: 2,
                    title: '更多',
                    keepAlive: true
                }
            }, {
                path: ':id',
                name: 'MatchInfo',
                component: resolve => require(['./views/Match/Info.vue'], resolve),
                meta: {
                    type: 2,
                    title: '详情'
                }
            }]
        }
    ]
})