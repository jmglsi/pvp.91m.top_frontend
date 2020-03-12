<template>
  <div class="ranking">
    <van-tabs
      :border="false"
      v-model="active"
      @change="onChange"
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
      点击&nbsp;<van-tag
        round
        type="danger"
      >上方数据</van-tag>&nbsp;查看更多信息
    </van-divider>
  </div>
</template>

<script>
export default {
  name: "Ranking",
  components: {
    DianFengSai: resolve =>
      require(["@/components/Ranking/DianFengSai.vue"], resolve),
    GuanXi: resolve => require(["@/components/Ranking/GuanXi.vue"], resolve),
    WanJia: resolve => require(["@/components/Ranking/WanJia.vue"], resolve)
  },
  data () {
    return {
      active: 0
    };
  },
  mounted () {
    let type = Number(this.$route.query.type);
    if (type) this.active = type;
  },
  methods: {
    onChange: function (e) {
      this.$router.push({ path: "/ranking", query: { type: e } });
    }
  }
};
</script>