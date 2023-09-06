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
  routes: [
    {
      path: '*',
      redirect: '/ranking'
    }, {
      path: '/bp',
      redirect: '/game/new/bp'
    }, {
      path: '/n/home',
      redirect: '/tools/n/home'
    }, {
      path: '/skin/encore',
      redirect: '/skin/return'
    }, {
      path: '/',
      name: 'appIndex',
      component: () =>
        import('./views/Home/Index.vue'),
      meta: {
        title: '首页',
        keepAlive: true
      }
    }, {
      path: '/miniapp',
      name: 'miniAppIndex',
      component: () =>
        import('./views/MiniApp/Index.vue'),
      meta: {
        title: '小程序',
        keepAlive: true
      }
    }, {
      path: '/my',
      name: 'userIndex',
      component: () =>
        import('./views/User/Index.vue'),
      meta: {
        title: '我的',
        keepAlive: false
      }
    }, {
      path: '/login',
      name: 'userLogin',
      component: () =>
        import('./views/User/Login.vue'),
      meta: {
        title: '登录',
        keepAlive: true
      }
    }, {
      path: '/ranking',
      name: 'rankingIndex',
      component: () =>
        import('./views/Ranking/Index.vue'),
      meta: {
        title: '排行',
        keepAlive: true
      }
    }, {
      path: '/search',
      name: 'searchIndex',
      component: () =>
        import('./views/Search/Index.vue'),
      meta: {
        title: '搜索',
        keepAlive: true
      }
    }, {
      path: '/setting',
      name: 'settingIndex',
      component: () =>
        import('./views/Setting/Index.vue'),
      meta: {
        title: '通用',
        keepAlive: true
      }
    }, {
      path: '/friends',
      name: 'friendsIndex',
      component: () =>
        import('./views/Friends/Index.vue'),
      meta: {
        title: '扩列',
        keepAlive: false
      }
    }, {
      path: '/skin',
      name: 'skinReturnIndex',
      redirect: '/ranking',
      component: () =>
        import('./views/Ranking/FanChang.vue'),
      children: [
        {
          path: 'return',
          name: 'skinReturn',
          meta: {
            title: '趋势',
            keepAlive: true
          }
        }
      ]
    }, {
      path: '/hero',
      name: 'heroIndex',
      redirect: '/ranking',
      component: () =>
        import('./views/Hero/Index.vue'),
      children: [
        {
          path: ':id/info',
          name: 'heroInfo',
          component: () =>
            import('./views/Hero/Info.vue'),
          meta: {
            title: '英雄',
            keepAlive: true
          }
        }, {
          path: ':id/replay',
          name: 'heroReplay',
          component: () =>
            import('./views/Hero/Replay.vue'),
          meta: {
            title: '回顾',
            keepAlive: true
          }
        }, {
          path: ':id/equipment',
          name: 'heroEquipment',
          component: () =>
            import('./views/Hero/Equipment.vue'),
          meta: {
            title: '备战',
            keepAlive: true
          }
        },
      ]
    }, {
      path: '/tools',
      name: 'toolsIndex',
      redirect: '/ranking',
      component: () =>
        import('./views/Tools/Index.vue'),
      children: [
        {
          path: 'hero/:id/view',
          name: 'toolsHeroView',
          component: () =>
            import('./views/Tools/HeroView.vue'),
          meta: {
            title: '预览',
            keepAlive: false
          }
        }, {
          path: 'weekly',
          name: 'toolsWeekly',
          component: () =>
            import('./views/Tools/weekly.vue'),
          meta: {
            title: '周报',
            keepAlive: false
          }
        }, {
          path: 'n/home',
          name: 'toolsNHome',
          component: () =>
            import('./views/Tools/NHome.vue'),
          meta: {
            title: '逆水寒-队伍编辑器',
            keepAlive: false
          }
        },
      ]
    }, {
      path: '/game',
      name: 'gameIndex',
      redirect: '/ranking',
      component: () =>
        import('./views/Game/Index.vue'),
      children: [
        {
          path: 'team',
          name: 'gameTeam',
          component: () =>
            import('./views/Game/Team.vue'),
          meta: {
            title: '队伍',
            keepAlive: false
          }
        }, {
          path: 'engage',
          name: 'gameEngage',
          component: () =>
            import('./views/Game/Engage.vue'),
          meta: {
            title: '交战',
            keepAlive: false
          }
        }, {
          path: ':id/bp',
          name: 'gameGlobalBP',
          component: () =>
            import('./views/Game/GlobalBP.vue'),
          meta: {
            title: '全局BP模拟器',
            keepAlive: false
          }
        }
      ]
    }
  ]
})