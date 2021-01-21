<template>
  <div id="app">
    <div class="app-63c4cfbde5ad50f3f537c2540374995e">
      <keep-alive>
        <router-view
          v-if="$route.meta.keepAlive"
          class="app-1bda80f2be4d3658e0baa43fbe7ae8c1"
        />
      </keep-alive>
      <router-view
        v-if="!$route.meta.keepAlive"
        class="app-1bda80f2be4d3658e0baa43fbe7ae8c1"
      />
    </div>

    <div class="app-ad7786f9368e7c2dc1cde095284ca39f">
      <van-tabbar
        v-model="tabbar.active"
        v-if="tabbar.default.show"
        fixed
        safe-area-inset-bottom
        active-color="orange"
        class="app-130a360689f8d613da10c94d53527a1b"
      >
        <van-tabbar-item
          v-for="(data, index) in tabbar.default.list"
          :key="'app-531814e80e16a27a837887308ee7c9ad-' + index"
          :icon="data.icon"
          :to="data.to"
          :name="data.name"
          class="app-e0c3b278eeb2cab05f548d7af0f2c949"
          >{{ data.text }}</van-tabbar-item
        >
      </van-tabbar>
    </div>
  </div>
</template>

<style>
@import url("/css/app-style/app.css");
</style>

<script>
export default {
  name: "App",
  metaInfo() {
    return {
      script: this.appInfo.homeInfo.script,
      link: this.appInfo.homeInfo.link,
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
              icon: "/img/app-icons/dynamic.png",
              to: {
                path: "/",
              },
              name: "/",
              text: "动态",
            },
            {
              icon: "/img/app-icons/ranking.png",
              to: {
                path: "/ranking",
              },
              name: "/ranking",
              text: "排行",
            },
            {
              icon: "/img/app-icons/search.png",
              to: {
                path: "/search",
              },
              name: "/search",
              text: "搜索",
            },
            {
              icon: "/img/app-icons/friends.png",
              to: {
                path: "/friends",
              },
              name: "/friends",
              text: "扩列",
            },
            {
              icon: "/img/app-icons/user.png",
              to: {
                path: "/my",
              },
              name: "/my",
              text: "我的",
            },
          ],
        },
      },
      appInfo: {
        homeInfo: {},
      },
    };
  },
  watch: {
    $route(to) {
      if (
        to.path == "/login" ||
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
    },
  },
  mounted() {
    this.getAppInfo();
  },
  methods: {
    getAppInfo: function () {
      this.$axios
        .post(
          this.$appApi.pvp.getAppInfo +
            "&url=" +
            encodeURIComponent(location.pathname + location.search)
        )
        .then((res) => {
          let appInfo = res.data.data,
            tipsInfo = appInfo.tipsInfo;

          this.appInfo = appInfo;

          if (tipsInfo) {
            this.$notification.open({
              message: tipsInfo.title,
              description: tipsInfo.description,
              onClick: () => {
                if (tipsInfo.to) {
                  this.$appOpenUrl(
                    "是否打开内部链接?",
                    null,
                    {
                      path: tipsInfo.to,
                    },
                    1
                  );
                }

                if (tipsInfo.url) {
                  this.$appOpenUrl("是否打开外部链接?", null, {
                    path: tipsInfo.url,
                  });
                }
              },
            });
          }
        });
    },
  },
};
</script>
