<template>
  <div class="game-line">
    <div class="game-4ab266e6ed1b47485fec1e603c659269">
      <ve-line
        :init-options="{ renderer: 'svg' }"
        :after-config="afterConfig"
        :data="lineData.result"
        :extend="lineData.extend"
        :loading="lineData.loading"
        :mark-line="lineData.markLine"
        :mark-point="lineData.markPoint"
        :settings="lineData.settings"
        height="250px"
        width="99.2%"
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

import 'zrender/lib/svg/svg';

export default {
  name: "ChartsGameLine",
  components: {
    VeLine,
  },
  props: {
    extraType: {
      type: Number,
      default: 0,
    },
    extraList: {
      type: String,
      default: "",
    },
  },
  computed: {
    listenChange() {
      const { extraList, extraType } = this;
      return { extraList, extraType };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (!newValue.extraList) return;

        this.lineData.result = [];

        this.getGamePrediction(newValue.extraList, newValue.extraType);
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
    getGamePrediction: function (extraData, aid) {
      this.$axios
        .post(
          this.$appApi.game.getGamePrediction + "&aid=" + aid,
          this.$qs.stringify({
            extraData: extraData,
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