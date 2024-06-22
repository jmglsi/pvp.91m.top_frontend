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
      path: '/skin',
      name: 'skinReturnIndex',
      redirect: '/ranking',
      component: () =>
        import('./components/Ranking/SkinReturn.vue'),
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
      path: '/thank',
      name: 'thank',
      component: () =>
        import('./views/Thank/Index.vue'),
      meta: {
        title: '感谢页',
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
        title: '设置',
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
      path: '/my',
      name: 'userIndex',
      component: () =>
        import('./views/User/Index.vue'),
      meta: {
        title: '我的',
        keepAlive: true
      }
    }, {
      path: '/login',
      name: 'userLogin',
      component: () =>
        import('./views/User/Login.vue'),
      meta: {
        title: '登录',
        keepAlive: false
      }
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
            keepAlive: false
          }
        }, {
          path: ':id/replay',
          name: 'heroReplay',
          component: () =>
            import('./views/Hero/Replay.vue'),
          meta: {
            title: '回顾',
            keepAlive: false
          }
        }, {
          path: ':id/equipment',
          name: 'heroEquipment',
          component: () =>
            import('./views/Hero/Equipment.vue'),
          meta: {
            title: '备战',
            keepAlive: false
          }
        }, {
          path: 'tools',
          name: 'heroTools',
          component: () =>
            import('./views/Hero/Tools.vue'),
          meta: {
            title: '英雄-工具',
            keepAlive: false
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
            import('./views/Tools/Weekly.vue'),
          meta: {
            title: '周报',
            keepAlive: false
          }
        }, {
          path: 'xhh',
          name: 'xhh',
          component: () =>
            import('./views/Tools/Xhh.vue'),
          meta: {
            title: '小灰灰',
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
        }, {
          path: 'fishing/ground',
          name: 'toolsFishingGround',
          component: () =>
            import('./views/Tools/FishingGround.vue'),
          meta: {
            title: '梧桐路亚：杭嘉湖黑坑信息汇总',
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
    }, {
      path: '/admin',
      name: 'adminIndex',
      redirect: '/ranking',
      component: () =>
        import('./views/Admin/Index.vue'),
      children: [
        {
          path: 'home-data',
          name: 'homeData',
          component: () =>
            import('./views/Admin/Home/Data.vue'),
          meta: {
            title: '数据站:工作台',
            keepAlive: true
          }
        }, {
          path: 'web-data-492e8',
          name: 'webData-492e8',
          component: () =>
            import('./views/Admin/Web/Data-492e8.vue'),
          meta: {
            title: '数据站:苏苏的荣耀助手',
            keepAlive: true
          }
        }, {
          path: 'web-data-5533c',
          name: 'webData-5533c',
          component: () =>
            import('./views/Admin/Web/Data-5533c.vue'),
          meta: {
            title: '数据站:奶香的一刀',
            keepAlive: true
          }
        }, {
          path: 'web-data-d88e5',
          name: 'webData-d88e5',
          component: () =>
            import('./views/Admin/Web/Data-d88e5.vue'),
          meta: {
            title: '数据站:暴走的巅峰赛',
            keepAlive: true
          }
        }, {
          path: 'robot-data',
          name: 'robotData',
          component: () =>
            import('./views/Admin/Robot/Data.vue'),
          meta: {
            title: '机器人',
            keepAlive: true
          }
        }, {
          path: 'mp-data',
          name: 'mpData',
          component: () =>
            import('./views/Admin/Mp/Data.vue'),
          meta: {
            title: '公众号',
            keepAlive: true
          }
        }, {
          path: 'shop-data',
          name: 'shopData',
          component: () =>
            import('./views/Admin/Shop/Data.vue'),
          meta: {
            title: '商店',
            keepAlive: true
          }
        }, {
          path: 'system-data',
          name: 'systemData',
          component: () =>
            import('./views/Admin/System/Data.vue'),
          meta: {
            title: '系统',
            keepAlive: true
          }
        }
      ]
    }
  ]
})