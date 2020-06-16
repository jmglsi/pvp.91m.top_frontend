<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" class="app-1bda80f2be4d3658e0baa43fbe7ae8c1" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" class="app-1bda80f2be4d3658e0baa43fbe7ae8c1" />

    <van-tabbar
      v-model="tabbar.active"
      v-show="tabbar.default.show"
      :z-index="2"
      fixed
      safe-area-inset-bottom
      active-color="rgb(222, 177, 81)"
      inactive-color="rgb(67, 62, 52)"
      class="app-130a360689f8d613da10c94d53527a1b"
    >
      <van-tabbar-item
        v-for="(data, index) in tabbar.default.list"
        :key="'app-e0c3b278eeb2cab05f548d7af0f2c949-' + index"
        :icon="data.icon"
        :to="data.to"
        :name="data.name"
        class="app-e0c3b278eeb2cab05f548d7af0f2c949"
      >{{ data.text }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
}

.app-1bda80f2be4d3658e0baa43fbe7ae8c1 {
  position: absolute;
  width: 100%;
  height: 100%;
}

img {
  border-radius: 10px;
  object-fit: cover;
}
</style>

<style>
div.app-b5e3c0b9ac8b718b9b4cb60f4fabe214
  div.van-grid-item__content
  i.van-icon.van-grid-item__icon
  img.van-icon__image {
  border-radius: 100%;
  width: 40px;
  height: 40px;
}
</style>

<style>
.bottom-0fc3cfbc27e91ea60a787de13dae3e3c {
  position: absolute;
  font-size: 10px;
  width: 50px;
  margin-top: -7px;
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
      tabbar: {
        active: "/",
        default: {
          show: false,
          list: [
            {
              icon: "wap-home-o",
              to: { path: "/", query: { from: "tabbar-0" } },
              name: "/",
              text: "资讯"
            },
            {
              icon: "friends-o",
              to: { path: "/ranking", query: { from: "tabbar-1" } },
              name: "/ranking",
              text: "排行"
            },
            {
              icon: "user-o",
              to: { path: "/my", query: { from: "tabbar-2" } },
              name: "/my",
              text: "我的"
            }
          ]
        }
      },
      appInfo: {
        homeInfo: {}
      }
    };
  },
  watch: {
    $route(to) {
      if (
        to.path == "/miniapp" ||
        to.path == "/bilibili" ||
        to.path.indexOf("/hero/") > -1 ||
        to.path.indexOf("/game/") > -1
      ) {
        this.tabbar.default.show = false;
      } else {
        this.tabbar.default.show = true;
        this.tabbar.active = to.path;
      }
    }
  },
  mounted() {
    this.getApp();
  },
  methods: {
    getApp: function() {
      this.axios
        .get(
          this.appApi.list.getApp +
            "&url=" +
            encodeURIComponent(location.pathname + location.search)
        )
        .then(ret => {
          this.appInfo = ret.data.data;

          let tipsInfo = this.appInfo.tipsInfo;
          if (tipsInfo) {
            this.$notification.open({
              message: tipsInfo.title,
              description: tipsInfo.des,
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