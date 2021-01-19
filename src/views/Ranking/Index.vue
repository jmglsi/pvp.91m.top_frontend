<template>
  <div class="ranking-home">
    <div class="ranking-a9b4432c8e9b49bafa0a23e52d970016">
      <van-tabs
        v-model="tabsInfo.model"
        :border="false"
        :ellipsis="false"
        :sticky="true"
        @change="
          $appPush({ path: '/ranking', query: { type: tabsInfo.model } })
        "
        duration="0.5"
        line-width="25px"
        color="rgb(243,189,103)"
        title-active-color="rgb(243,189,103)"
      >
        <van-tab title="巅峰赛 (顶端局)">
          <DianFengSai />
        </van-tab>

        <van-tab title="关系和克制 (上周)">
          <GuanXi :heroName="heroName" />
        </van-tab>

        <van-tab title="玩家 (非实时)">
          <WanJia />
        </van-tab>

        <van-tab title="装备 (上周)">
          <ZhuangBei />
        </van-tab>
      </van-tabs>
    </div>

    <div class="ranking-ebf09abeb7c3db44741d328324915725">
      <van-divider
        :style="{
          padding: '0 16px',
          color: 'rgb(243,189,103)',
          marginTop: '-3px',
          borderColor: 'rgb(243,189,103)',
        }"
        @click="$message.info(this.$appMsg.info[1012])"
        ><van-tag
          round
          type="danger"
          class="ranking-4d09fbef1438e2b23375b87ba3e02942"
          >游客部分功能将受限,登录后解锁</van-tag
        >
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
    ZhuangBei: (resolve) => require(["@/views/Ranking/ZhuangBei.vue"], resolve),
  },
  data() {
    return {
      heroName: "",
      tabsInfo: {
        model: 0,
      },
    };
  },
  mounted() {
    this.heroName = this.$route.query.heroName || "";
    this.tabsInfo.model = parseInt(this.$route.query.type) || 0;
  },
};
</script>
