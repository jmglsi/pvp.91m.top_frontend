<template>
  <div class="home">
    <van-tabs
      v-model="homeTabsActive"
      :border="false"
      :ellipsis="false"
      :swipeable="true"
      color="rgb(222, 177, 81)"
      class="home-5db8dca30c2d7f0c2bc225ae852c5053"
    >
      <!--<van-tab title="关注">即将上线</van-tab>-->
      <van-tab title="推荐" class="home-e7f8cbd87d347be881cba92dad128518">
        <TuiJian />
      </van-tab>
      <!--
      <van-tab title="赛事" class="home-e7f8cbd87d347be881cba92dad128518">
        <Game />
      </van-tab>
      -->
      <!--<van-tab title="舆论">即将上线</van-tab>-->

      <AppBottomTabbar :height="100" />
    </van-tabs>
  </div>
</template>

<style>
.tuijian-a1b6d48bbb668c1f71ac1fdd39fc7f4e {
  width: 15px;
  height: 15px;
  margin-top: -3px;
}
</style>

<script>
export default {
  name: "Home",
  components: {
    TuiJian: resolve =>
      require(["@/components/Home/TuiJian/Index.vue"], resolve),
    Game: resolve => require(["@/components/Home/Game/Index.vue"], resolve),
    AppBottomTabbar: resolve =>
      require(["@/components/App/BottomTabbar.vue"], resolve)
  },
  data() {
    return {
      homeTabsActive: 0
    };
  },
  mounted() {
    let from = this.$route.query.from;
    if (from) {
      this.$cookie.set("from", from, { expires: "1Y" });
    }
  }
};
</script>