<template>
  <div class="ranking-home">
    <div class="ranking-a9b4432c8e9b49bafa0a23e52d970016">
      <van-tabs
        v-model="tabsModel"
        :border="false"
        :ellipsis="false"
        :sticky="true"
        @change="appPush('', $options.name, tabsModel)"
        color="rgb(222,177,81)"
      >
        <van-tab title="巅峰赛 (日榜)">
          <DianFengSai />
        </van-tab>

        <van-tab title="关系 (周榜)">
          <GuanXi />
        </van-tab>

        <van-tab title="玩家 (日榜)">
          <WanJia />
        </van-tab>
      </van-tabs>
    </div>

    <div class="ranking-ebf09abeb7c3db44741d328324915725">
      <van-divider
        :style="{ padding: '0 16px', color: 'rgb(222, 177, 81)', marginTop: '-3px', borderColor: 'rgb(222, 177, 81)' }"
        @click="$message.warning('警告:1003,你在摸哪里,是上面啊喂 (lll￢ω￢)')"
      >
        点击&nbsp;
        <van-tag round type="danger" class="ranking-4d09fbef1438e2b23375b87ba3e02942">上方</van-tag>&nbsp;查看更多信息
      </van-divider>
    </div>
  </div>
</template>

<style>
@import url("/css/app-style/ranking.css");
</style>

<script>
export default {
  name: "RankingHome",
  components: {
    DianFengSai: (resolve) =>
      require(["@/views/Ranking/DianFengSai.vue"], resolve),
    GuanXi: (resolve) => require(["@/views/Ranking/GuanXi.vue"], resolve),
    WanJia: (resolve) => require(["@/views/Ranking/WanJia.vue"], resolve),
  },
  data() {
    return {
      tabsModel: 0,
    };
  },
  mounted() {
    let type = parseInt(this.$route.query.type);

    if (!type) {
      type = 0;
    }
    this.tabsModel = type;
  },
};
</script>