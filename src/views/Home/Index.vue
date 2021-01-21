<template>
  <div class="app-home">
    <div class="home-6db4dcff371b9397d894ed932d085444">
      <van-tabs
        v-model="tabsInfo.model"
        v-if="tabsInfo.model > -1"
        :border="false"
        :ellipsis="false"
        :swipeable="true"
        :sticky="true"
        @change="$appPush({ path: '/', query: { type: tabsInfo.model } })"
        duration="0.5"
        line-width="25px"
        color="orange"
        title-active-color="orange"
        class="home-5db8dca30c2d7f0c2bc225ae852c5053"
      >
        <van-tab title="推荐" class="home-e7f8cbd87d347be881cba92dad128518">
          <TuiJian />
        </van-tab>
        <van-tab title="赛事" class="home-e7f8cbd87d347be881cba92dad128518">
          <Game />
        </van-tab>
      </van-tabs>
    </div>

    <div
      @click="$appOpenUrl('是否打开外部链接?', null, { path: upyun.url })"
      class="home-72ab9e07378f988922e6c91884048db0"
    >
      本站由
      <img v-lazy="upyun.logo" width="75" height="25" />
      提供CDN加速/云储存服务
    </div>

    <AppBottomTabbar height="100px" />
  </div>
</template>

<style>
@import url("/css/app-style/home.css");
</style>

<script>
export default {
  name: "AppHome",
  components: {
    TuiJian: (resolve) => require(["@/views/Home/TuiJian.vue"], resolve),
    Game: (resolve) => require(["@/views/Home/Game.vue"], resolve),
    AppBottomTabbar: (resolve) =>
      require(["@/components/App/BottomTabbar.vue"], resolve),
  },
  data() {
    return {
      copyData: "",
      upyun: {
        url: "//console.upyun.com/register/?invite=ryM-bovMm",
        logo: "//i.loli.net/2020/12/11/3u6pTZ9VMdiaA7I.png",
      },
      tabsInfo: {
        model: 0,
      },
    };
  },
  mounted() {
    let pwa = parseInt(this.$route.query.pwa) || 0,
      type = parseInt(this.$route.query.type) || 0,
      version = parseInt(this.$route.query.v) || 1609430400;

    this.tabsInfo.model = type;

    if (pwa == 1) {
      this.$cookie.set("pwa", pwa, { expires: "1Y" });

      let updateDay = ((this.$appTs - version) / 86400).toFixed(2);
      if (updateDay >= 90) {
        this.$dialog
          .confirm({
            title: "温馨提示【" + updateDay + "】",
            message:
              "您已经很久没有更新过本站辣\r页面有可能发生了较大的变化\r建议清除缓存重新添加到桌面",
          })
          .then(() => {
            // on confirm
            this.copyData = location.origin;

            setTimeout(
              (copyData) => {
                this.$appCopyData(
                  copyData,
                  "链接已复制,请清除缓存重新添加到桌面~"
                );
              },
              750,
              this.copyData
            );
          })
          .catch(() => {
            // on cancel
          });
      }
    }
  },
};
</script>
