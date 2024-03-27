<template>
  <div class="game-line">
    <div class="game-4ab266e6ed1b47485fec1e603c659269">
      <ve-line
        :after-config="afterConfig"
        :data="lineData.result"
        :extend="lineData.extend"
        :loading="lineData.loading"
        :mark-line="lineData.markLine"
        :mark-point="lineData.markPoint"
        :settings="lineData.settings"
        width="99.2%"
        height="250px"
        class="game-7a0c936f40819c94d6d605e89f223e45"
      />
    </div>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";

import "echarts/lib/component/dataZoom";
import "echarts/lib/component/markLine";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/title";

import "v-charts/lib/style.css";

export default {
  name: "ChartsGameLine",
  components: {
    VeLine,
  },
  props: {
    arrData: {
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
      const { arrData, trendType } = this;
      return { arrData, trendType };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (!newValue.arrData) return;

        this.lineData.result = [];

        this.getGamePrediction(newValue.arrData, newValue.trendType);
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
        result: {
          rows: [],
        },
      },
    };
  },
  methods: {
    afterConfig: function (e) {
      if (!e.series) {
        return e;
      }

      Array.from(e.series, (x) => {
        x.symbol = "none";

        return x;
      });

      return e;
    },
    getGamePrediction: function (arrData, aid) {
      this.lineData = {
        loading: true,
        result: {
          rows: [],
        },
      };

      this.$axios
        .post(
          this.$appApi.game.getGamePrediction + "&aid=" + aid,
          this.$qs.stringify({
            arrData: arrData,
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