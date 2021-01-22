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
        v-model="tableData.result.model"
        v-if="showInfo.tabbar == true"
        fixed
        safe-area-inset-bottom
        active-color="orange"
        class="app-130a360689f8d613da10c94d53527a1b"
      >
        <van-tabbar-item
          v-for="(data, index) in tableData.result.rows"
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
      script: this.tableData.homeInfo.script || [],
      link: this.tableData.homeInfo.link || [],
    };
  },
  data() {
    return {
      tableData: {
        result: {
          model: "/",
          rows: [
            {
              icon: "/img/app-icons/dynamic.png",
              to: "/",
              name: "/",
              text: "首页",
            },
            {
              icon: "/img/app-icons/ranking.png",
              to: "/ranking",
              name: "/ranking",
              text: "排行",
            },
            {
              icon: "/img/app-icons/search.png",
              to: "/search",
              name: "/search",
              text: "发现",
            },
            {
              icon: "/img/app-icons/friends.png",
              to: "/friends",
              name: "/friends",
              text: "扩列",
            },
            {
              icon: "/img/app-icons/user.png",
              to: "/my",
              name: "/my",
              text: "我的",
            },
          ],
        },
        homeInfo: {
          script: [],
          link: [],
        },
        tipsInfo: {},
      },
      showInfo: {
        tabbar: true,
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
        this.showInfo.tabbar = false;
      } else {
        this.showInfo.tabbar = true;
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
          let data = res.data.data,
            tipsInfo = data.tipsInfo;

          this.tableData = data;
          this.tableData.result.model = this.$route.path;

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
