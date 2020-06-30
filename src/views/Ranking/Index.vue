<template>
  <div class="ranking-home">
    <div class="ranking-a9b4432c8e9b49bafa0a23e52d970016">
      <van-tabs
        v-model="tabsModel"
        :border="false"
        :ellipsis="false"
        :sticky="true"
        @change="$router.push({query: { type: tabsModel, from: 'ee240fe51687ee66cca7493aedcc3c24' }})"
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
        :style="{ padding: '0 16px', marginTop: '2px', color: 'rgb(222, 177, 81)', borderColor: 'rgb(222, 177, 81)' }"
        @click="$message.warning('警告:1003,你在摸哪里,是上面啊喂 (lll￢ω￢)')"
      >
        点击&nbsp;
        <van-tag round type="danger">上方数据</van-tag>&nbsp;查看更多信息
      </van-divider>
    </div>
  </div>
</template>

<style>
.app-e4d23e841d8e8804190027bce3180fa5 {
  position: absolute;
  left: 0;
  z-index: 1;
  margin-top: -13px;
}

div.vxe-table--main-wrapper {
  margin-top: -3px;
}

td.vxe-body--column {
  padding: 12px 0;
}

td.vxe-body--column div.vxe-cell {
  font-size: 15px;
}

td.vxe-body--cloumn .vxe-table.virtual--x .col--ellipsis .vxe-cell,
.vxe-table.virtual--y .col--ellipsis .vxe-cell {
  max-height: unset;
}

.ranking-a260d093db7878f26c178fc3d23829c6 {
  margin-top: -6px;
}

div.ranking div.van-dropdown-menu__bar {
  height: 54px;
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
  name: "RankingHome",
  components: {
    DianFengSai: resolve =>
      require(["@/views/Ranking/DianFengSai.vue"], resolve),
    GuanXi: resolve => require(["@/views/Ranking/GuanXi.vue"], resolve),
    WanJia: resolve => require(["@/views/Ranking/WanJia.vue"], resolve)
  },
  data() {
    return {
      tabsModel: 0
    };
  },
  mounted() {
    let type = parseInt(this.$route.query.type);

    if (!type) {
      type = 0;
    }
    this.tabsModel = type;
  }
};
</script>