import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject);
    }

    return originalPush.call(this, location).catch(err => err);
}

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '*',
            name: '404',
            redirect: '/ranking'
        }, {
            path: '/bp',
            name: 'bp',
            redirect: '/my'
        }, {
            path: '/hero',
            name: 'hero',
            redirect: '/ranking'
        }, {
            path: '/game',
            name: 'game',
            redirect: '/ranking'
        }, {
            path: '/skin/encore',
            name: 'skinEncore',
            redirect: '/skin/return'
        }, {
            path: '/',
            name: 'home',
            component: (resolve) => require(['./views/Home/Index.vue'], resolve),
            meta: {
                title: '首页',
                keepAlive: true
            }
        }, {
            path: '/friends',
            name: 'friends',
            component: (resolve) => require(['./views/Friends/Index.vue'], resolve),
            meta: {
                title: '扩列',
                keepAlive: false
            }
        }, {
            path: '/skin/return',
            name: 'skinReturn',
            component: (resolve) => require(['./views/Hero/SkinReturn.vue'], resolve),
            meta: {
                title: '趋势',
                keepAlive: true
            }
        }, {
            path: '/miniapp',
            name: 'miniApp',
            component: (resolve) => require(['./components/Home/TuiJian/MiniApp.vue'], resolve),
            meta: {
                title: '小程序',
                keepAlive: true
            }
        }, {
            path: '/ranking',
            component: (resolve) => require(['./views/Ranking/Index.vue'], resolve),
            meta: {
                title: '排行',
                keepAlive: false
            }
        }, {
            path: '/search',
            name: 'search',
            component: (resolve) => require(['./views/Search/Index.vue'], resolve),
            meta: {
                title: '搜索',
                keepAlive: true
            }
        }, {
            path: '/my',
            name: 'my',
            component: (resolve) => require(['./views/User/My.vue'], resolve),
            meta: {
                title: '我的',
                keepAlive: false
            }
        }, {
            path: '/login',
            name: 'login',
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
                    name: 'heroInfo',
                    component: (resolve) => require(['./views/Hero/Info.vue'], resolve),
                    meta: {
                        title: '英雄',
                        keepAlive: false
                    }
                },
                {
                    path: ':id/replay',
                    name: 'heroReplay',
                    component: (resolve) => require(['./views/Hero/Replay.vue'], resolve),
                    meta: {
                        title: '回顾',
                        keepAlive: false
                    }
                }
            ]
        },
        {
            path: '/game',
            component: (resolve) => require(['./views/Game/Index.vue'], resolve),
            children: [{
                path: 'team',
                name: 'gameTeam',
                component: (resolve) => require(['./views/Game/Team.vue'], resolve),
                meta: {
                    title: '队伍',
                    keepAlive: false
                }
            }, {
                path: 'engage',
                name: 'gameEngage',
                component: (resolve) => require(['./views/Game/Engage.vue'], resolve),
                meta: {
                    title: '交战',
                    keepAlive: false
                }
            }, {
                path: ':id/bp',
                name: 'gameGlobalBP',
                component: (resolve) => require(['./views/Game/GlobalBP.vue'], resolve),
                meta: {
                    title: '全局BP模拟器',
                    keepAlive: false
                }
            }]
        }, {
            path: '/bilibili',
            name: 'bilibili',
            component: (resolve) => require(['./views/Bilibili/Index.vue'], resolve),
            meta: {
                title: 'bilibili',
                keepAlive: true
            }
        }
    ]
})