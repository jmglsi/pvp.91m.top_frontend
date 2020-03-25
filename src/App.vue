<template>
  <div id="app">
    <vue-particles
      color="#000"
      :particleOpacity="0.7"
      :particlesNumber="30"
      shapeType="star"
      :particleSize="4"
      linesColor="#000"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      v-show="particlesShow"
      class="app-data app-particles"
    />

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" class="app-data" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" class="app-data" />

    <van-tabbar
      fixed
      :z-index="2"
      :border="false"
      v-model="tabbarActive"
      safe-area-inset-bottom
      active-color="rgb(222,177,81)"
      inactive-color="rgb(67,62,52)"
    >
      <van-tabbar-item icon="flag-o" :to="{ path:'/', query: { from: 'tabbar-0' } }" name="/home">发现</van-tabbar-item>
      <van-tabbar-item
        :icon="rankingIcon"
        :to="{ path:'/ranking', query: { from: 'tabbar-1' } }"
        name="/ranking"
      >排行</van-tabbar-item>
      <van-tabbar-item
        icon="setting-o"
        :to="{ path:'/setting', query: { from: 'tabbar-2' } }"
        name="/setting"
      >设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.app-data {
  position: absolute;
}

.app-particles {
  position: fixed;
  margin-top: -50px;
}

.app-data,
.app-particles {
  width: 100%;
  height: 100%;
}
</style>

<style>
.dfs-tag,
.wj-tag {
  position: absolute;
  left: 0;
  z-index: 1;
  margin-top: -13px;
}

.app-action-sheet {
  text-align: left;
}

.bottom-num {
  position: absolute;
  font-size: 10px;
  width: 50px;
  margin-top: -7px;
}

.app-img {
  border-radius: 10px;
}

div.van-tabs__nav.van-tabs__nav--line {
  height: auto;
}

div.van-circle__text {
  font-size: 10px;
}

div.van-nav-bar,
div.van-grid-item__content {
  background-color: transparent;
}

div.van-nav-bar__title {
  font-size: 20px;
}

td.vxe-body--column {
  padding: 13px 0;
}

div.vxe-table--main-wrapper {
  margin-top: -3px;
}

div.vxe-cell {
  text-align: center;
}

td.vxe-body--column div.vxe-cell {
  font-size: 15px;
}

td.col-red {
  color: red;
}

td.col-blue {
  color: blue;
}

td.col-green {
  color: green;
}

td.col-red div.vxe-cell,
td.col-blue div.vxe-cell,
td.col-green div.vxe-cell {
  font-size: 20px;
}
</style>

<script>
export default {
  name: "App",
  metaInfo() {
    return {
      script: this.appInfo.homeInfo.script,
      link: this.appInfo.homeInfo.link
    };
  },
  data() {
    return {
      viewKey: 0,
      tabbarActive: "/home",
      particlesShow: true,
      rankingIcon: "friends-o",
      appInfo: {
        homeInfo: {}
      }
    };
  },
  mounted() {
    this.init();

    let pName = location.pathname,
      pSearch = location.search;

    if (pName == "/") pName = "/home";
    this.tabbarActive = pName;
    this.getApp(pName + pSearch);

    setInterval(() => {
      this.rankingIcon == "friends-o"
        ? (this.rankingIcon = "friends")
        : (this.rankingIcon = "friends-o");
    }, 1000 * 10);
  },
  methods: {
    init: function() {
      let lzbg = this.$cookie.get("lz-bg");

      lzbg == "true"
        ? (this.particlesShow = true)
        : (this.particlesShow = false);
    },
    getApp: function(e) {
      this.axios
        .get(this.appApi.list.getApp + "&url=" + encodeURIComponent(e))
        .then(ret => {
          this.appInfo = ret.data.data;

          let tipsInfo = this.appInfo.tipsInfo;
          if (tipsInfo) {
            this.$notification.open({
              message: tipsInfo.title,
              description: tipsInfo.text,
              onClick: () => {
                if (tipsInfo.url) {
                  this.$dialog
                    .confirm({
                      title: "是否打开链接?",
                      message: tipsInfo.url
                    })
                    .then(() => {
                      // on confirm
                      window.open(tipsInfo.url);
                    })
                    .catch(() => {
                      // on cancel
                      this.$message.error("已取消");
                    });
                }
              }
            });
          }
        });
    }
  }
};
</script>