<template>
  <div class="ranking">
    <van-tabs
      v-model="rankingTabsActive"
      :border="false"
      @change="onRankingChange"
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

    <van-divider
      :style="{ padding: '0 16px', marginTop: '2px', color: 'rgb(222, 177, 81)', borderColor: 'rgb(222, 177, 81)' }"
      @click="$message.warning('你在摸哪里，是上面啊喂 (lll￢ω￢)')"
    >
      点击&nbsp;
      <van-tag round type="danger">上方数据</van-tag>&nbsp;查看更多信息
    </van-divider>
  </div>
</template>

<style>
.app-e4d23e841d8e8804190027bce3180fa5 {
  position: absolute;
  left: 0;
  z-index: 1;
  margin-top: -13px;
}

div.van-tabs__nav.van-tabs__nav--line {
  height: auto;
}

div.ranking div.van-dropdown-menu__bar {
  height: 54px;
}

/*
div.van-nav-bar,
div.van-cell-group,
div.van-grid-item__content {
  background-color: transparent;
}
*/

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

td.col-bda9643ac6601722a28f238714274da4 {
  color: red;
}

td.col-48d6215903dff56238e52e8891380c8f {
  color: blue;
}

td.col-9f27410725ab8cc8854a2769c7a516b8 {
  color: green;
}

td.col-bda9643ac6601722a28f238714274da4 div.vxe-cell,
td.col-48d6215903dff56238e52e8891380c8f div.vxe-cell,
td.col-9f27410725ab8cc8854a2769c7a516b8 div.vxe-cell {
  font-size: 20px;
}
</style>

<script>
export default {
  name: "Ranking",
  components: {
    DianFengSai: resolve =>
      require(["@/components/Ranking/DianFengSai.vue"], resolve),
    GuanXi: resolve => require(["@/components/Ranking/GuanXi.vue"], resolve),
    WanJia: resolve => require(["@/components/Ranking/WanJia.vue"], resolve)
  },
  data() {
    return {
      rankingTabsActive: 0
    };
  },
  mounted() {
    let type = Number(this.$route.query.type);
    if (type) this.rankingTabsActive = type;
  },
  methods: {
    onRankingChange: function(e) {
      this.$router.push({ path: "/ranking", query: { type: e } });
    }
  }
};
</script>