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
    redirect: '/ranking'
  }, {
    path: '/bp',
    redirect: '/game/new/bp'
  }, {
    path: '/skin/encore',
    redirect: '/skin/return'
  }, {
    path: '/bilibili',
    name: 'bilibili',
    component: () =>
      import('./views/Bilibili/Index.vue'),
    meta: {
      title: 'bilibili',
      keepAlive: true
    }
  }, {
    path: '/',
    name: 'home',
    component: () =>
      import('./views/Home/Index.vue'),
    meta: {
      title: '首页',
      keepAlive: true
    }
  }, {
    path: '/miniapp',
    name: 'miniApp',
    component: () =>
      import('./views/MiniApp/Index.vue'),
    meta: {
      title: '小程序',
      keepAlive: true
    }
  }, {
    path: '/ranking',
    name: 'ranking',
    component: () =>
      import('./views/Ranking/Index.vue'),
    meta: {
      title: '排行',
      keepAlive: true
    }
  }, {
    path: '/search',
    name: 'search',
    component: () =>
      import('./views/Search/Index.vue'),
    meta: {
      title: '搜索',
      keepAlive: true
    }
  }, {
    path: '/login',
    name: 'login',
    component: () =>
      import('./views/User/Login.vue'),
    meta: {
      title: '登录',
      keepAlive: true
    }
  }, {
    path: '/setting',
    name: 'setting',
    component: () =>
      import('./views/Setting/Index.vue'),
    meta: {
      title: '通用',
      keepAlive: true
    }
  }, {
    path: '/friends',
    name: 'friends',
    component: () =>
      import('./views/Friends/Index.vue'),
    meta: {
      title: '扩列',
      keepAlive: false
    }
  }, {
    path: '/my',
    name: 'my',
    component: () =>
      import('./views/User/Index.vue'),
    meta: {
      title: '我的',
      keepAlive: false
    }
  }, {
    path: '/skin',
    name: 'skin',
    redirect: '/skin/return',
    component: () =>
      import('./views/Ranking/FanChang.vue'),
    children: [{
      path: 'return',
      name: 'skinReturn',
      meta: {
        title: '趋势',
        keepAlive: true
      }
    }]
  }, {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/web-data',
    component: () =>
      import('./views/Admin/Index.vue'),
    children: [{
      path: 'web-data',
      name: 'webData',
      component: () =>
        import('./views/Admin/Web/Data.vue'),
      meta: {
        title: '网站数据',
        keepAlive: true
      }
    }, {
      path: 'web-setting',
      name: 'webSetting',
      component: () =>
        import('./views/Admin/Web/Setting.vue'),
      meta: {
        title: '网站设置',
        keepAlive: true
      }
    }, {
      path: 'robot-data',
      name: 'robotData',
      component: () =>
        import('./views/Admin/Robot/Data.vue'),
      meta: {
        title: '机器人数据',
        keepAlive: true
      }
    }, {
      path: 'robot-setting',
      name: 'robotSetting',
      component: () =>
        import('./views/Admin/Robot/Setting.vue'),
      meta: {
        title: '机器人设置',
        keepAlive: true
      }
    }, {
      path: 'mp-data',
      name: 'mpData',
      component: () =>
        import('./views/Admin/Mp/Data.vue'),
      meta: {
        title: '公众号数据',
        keepAlive: true
      }
    }, {
      path: 'system-assignment',
      name: 'systemAssignment',
      component: () =>
        import('./views/Admin/System/Assignment.vue'),
      meta: {
        title: '系统任务',
        keepAlive: true
      }
    }]
  }, {
    path: '/hero',
    name: 'hero',
    redirect: '/ranking',
    component: () =>
      import('./views/Hero/Index.vue'),
    children: [{
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
        keepAlive: false
      }
    }, {
      path: ':id/view',
      name: 'heroView',
      component: () =>
        import('./views/Hero/View.vue'),
      meta: {
        title: '预览',
        keepAlive: false
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
    path: '/game',
    name: 'game',
    redirect: '/game/new/bp',
    component: () =>
      import('./views/Game/Index.vue'),
    children: [{
      path: 'team',
      name: 'gameTeam',
      component: () =>
        import('./views/Game/Team.vue'),
      meta: {
        title: '队伍',
        keepAlive: true
      }
    }, {
      path: 'engage',
      name: 'gameEngage',
      component: () =>
        import('./views/Game/Engage.vue'),
      meta: {
        title: '交战',
        keepAlive: true
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
    }]
  }]
})