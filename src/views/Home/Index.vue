<template>
  <div class="home">
    <div class="home-6db4dcff371b9397d894ed932d085444">
      <van-tabs
        v-model="tabsModel"
        :border="false"
        :ellipsis="false"
        :swipeable="true"
        :sticky="true"
        @change="appPush('', $options.name, tabsModel)"
        color="rgb(222, 177, 81)"
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

    <AppBottomTabbar :height="100" />
  </div>
</template>

<style>
@import url("/css/app-style/home.css");
</style>

<script>
export default {
  name: "Home",
  components: {
    TuiJian: (resolve) => require(["@/views/Home/TuiJian.vue"], resolve),
    Game: (resolve) => require(["@/views/Home/Game.vue"], resolve),
    AppBottomTabbar: (resolve) =>
      require(["@/components/App/BottomTabbar.vue"], resolve),
  },
  data() {
    return {
      tabsModel: 0,
    };
  },
  mounted() {
    let pwa = this.$route.query.pwa,
      type = parseInt(this.$route.query.type);

    if (pwa) {
      this.$cookie.set("pwa", 1, { expires: "1Y" });
    }

    if (!type) {
      type = 0;
    }
    this.tabsModel = type;
  },
};
</script>