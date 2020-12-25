<template>
  <div class="game-line">
    <div class="game-4ab266e6ed1b47485fec1e603c659269">
      <ve-line
        :extend="lineData.extend"
        :settings="lineData.settings"
        :mark-line="lineData.markLine"
        :mark-point="lineData.markPoint"
        :data="lineData.result"
        :loading="lineData.loading"
        :after-config="afterConfig"
        height="250px"
        width="99.2%"
        class="game-7a0c936f40819c94d6d605e89f223e45"
      />
    </div>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";

import "echarts/lib/component/title";
import "echarts/lib/component/markLine";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/dataZoom";

import "v-charts/lib/style.css";

export default {
  name: "GameLine",
  components: {
    VeLine,
  },
  props: {
    gameBPData: {
      type: String,
      default: "",
    },
    trendType: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { gameBPData, trendType } = this;
      return { gameBPData, trendType };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (newValue.gameBPData == "") return;

        this.lineData.result = [];

        this.getGamePrediction(newValue.gameBPData, newValue.trendType);
      },
    },
  },
  data() {
    return {
      lineData: {
        markLine: {},
        markPoint: {},
        extend: {},
        settings: {},
        loading: true,
        result: [],
      },
    };
  },
  methods: {
    afterConfig: function (e) {
      e.series.map((x) => {
        x.symbol = "none";
      });
      //去除折线图上的小圆点
      return e;
    },
    getGamePrediction: function (gameBPData, aid) {
      this.lineData = {};
      this.lineData.loading = true;

      this.axios
        .post(
          this.apiList.game.getGamePrediction + "&aid=" + aid,
          this.$qs.stringify({
            gameBPData: gameBPData,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.lineData = data;
            this.lineData.loading = false;
          } else {
            this.$message.error(status.msg);
          }
        });
    },
  },
};
</script>
