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
            component: (resolve) => require(['./views/Home/Index.vue'], resolve),
            meta: {
                title: '首页',
                keepAlive: true
            }
        }, {
            path: '/miniapp',
            name: 'MiniApp',
            component: (resolve) => require(['./components/Home/TuiJian/MiniApp.vue'], resolve),
            meta: {
                title: '小程序',
                keepAlive: true
            }
        }, {
            path: '/ranking',
            name: 'Ranking',
            component: (resolve) => require(['./views/Ranking/Index.vue'], resolve),
            meta: {
                title: '排行',
                keepAlive: true
            }
        }, {
            path: '/my',
            name: 'My',
            component: (resolve) => require(['./views/User/My.vue'], resolve),
            meta: {
                title: '我的',
                keepAlive: true
            }
        }, {
            path: '/login',
            name: 'Login',
            component: (resolve) => require(['./views/User/Login.vue'], resolve),
            meta: {
                title: '登录',
                keepAlive: true
            }
        },
        {
            path: '/hero',
            component: (resolve) => require(['./views/Hero/Index.vue'], resolve),
            children: [{
                    path: ':id/info',
                    name: 'HeroInfo',
                    component: (resolve) => require(['./views/Hero/Info.vue'], resolve),
                    meta: {
                        title: '信息'
                    }
                },
                {
                    path: ':id/replay',
                    name: 'HeroReplay',
                    component: (resolve) => require(['./views/Hero/Replay.vue'], resolve),
                    meta: {
                        title: '回顾'
                    }
                },
                {
                    path: ':id/fightpower',
                    name: 'FightPower',
                    component: (resolve) => require(['./views/Hero/FightPower.vue'], resolve),
                    meta: {
                        title: '战力'
                    }
                }
            ]
        },
        {
            path: '/game',
            component: (resolve) => require(['./views/Game/Index.vue'], resolve),
            children: [{
                path: 'team',
                name: 'GameTeam',
                component: (resolve) => require(['./views/Game/Team.vue'], resolve),
                meta: {
                    title: '队伍'
                }
            }, {
                path: 'engage',
                name: 'GameEngage',
                component: (resolve) => require(['./views/Game/Engage.vue'], resolve),
                meta: {
                    title: '交战'
                }
            }, {
                path: ':id/bp',
                name: 'GameBp',
                component: (resolve) => require(['./views/Game/GlobalBP.vue'], resolve),
                meta: {
                    title: '全局BP模拟器'
                }
            }]
        }, {
            path: '/bilibili',
            name: 'Bilibili',
            component: (resolve) => require(['./views/Bilibili/Index.vue'], resolve),
            meta: {
                title: 'bilibili',
                keepAlive: true
            }
        }
    ]
})