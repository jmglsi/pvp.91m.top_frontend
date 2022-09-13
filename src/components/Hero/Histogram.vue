<template>
  <div class="hero-histogram">
    <div class="hero-0a5f82fc680243b3e6a5b79f1fc9a43e">
      <ve-histogram
        :extend="lineData.extend"
        :settings="lineData.settings"
        :mark-line="lineData.markLine"
        :mark-point="lineData.markPoint"
        :data="lineData.result"
        :loading="lineData.loading"
        :toolbox="lineData.toolbox"
        :after-config="afterConfig"
        height="500px"
        width="99.2%"
        class="hero-9b6ee44aac1b593ab3af725466c9757b"
      />
    </div>

    <div
      v-if="showInfo.autoPlayTrend && aid == 0"
      class="hero-08f41db6f9dc27eace457c89d3a96533"
    >
      <van-switch
        v-model="lineInfo.checked"
        @change="onSwitchChange"
        size="15px"
      />
    </div>
  </div>
</template>

<script>
import VeHistogram from "v-charts/lib/histogram.common";

import "echarts/lib/chart/line";
import "echarts/lib/component/dataZoom";
import "echarts/lib/component/legendScroll";
import "echarts/lib/component/markLine";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/title";
import "echarts/lib/component/toolbox";

import "v-charts/lib/style.css";

export default {
  name: "HeroHistogram",
  components: {
    VeHistogram,
  },
  props: {
    heroId: {
      type: Number,
      default: 0,
    },
    aid: {
      type: Number,
      default: 0,
    },
    detailed: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    listenChange() {
      const { heroId, aid, detailed } = this;
      return { heroId, aid, detailed };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (!newValue.heroId) return;

        this.getHeroChartsLog(
          newValue.heroId,
          newValue.aid,
          Number(newValue.detailed)
        );
      },
    },
  },
  data() {
    return {
      trendIndex: 0,
      lineData: {
        loading: true,
        extend: {},
        tooltip: {},
        markLine: {},
        markPoint: {},
        toolbox: {},
        settings: {},
        result: {
          rows: [],
        },
      },
      lineInfo: {
        checked: false,
      },
      showInfo: {
        autoPlayTrend: false,
      },
    };
  },
  methods: {
    afterConfig: function (e) {
      if (!e.series) {
        return e;
      }

      Array.from(e.series).map((x) => {
        x.symbol = "none";
      });
      return e;
    },
    getHeroChartsLog: function (heroId, aid, detailed) {
      this.lineData = {
        loading: true,
        result: {
          rows: [],
        },
        status: 200,
      };

      this.$axios
        .post(
          this.$appApi.pvp.getHeroChartsLog +
            "&heroId=" +
            heroId +
            "&aid=" +
            aid +
            "&detailed=" +
            detailed
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          this.lineData.status = status;

          if (status.code == 200) {
            this.lineData = data;
            this.lineData.loading = false;

            this.showInfo.autoPlayTrend = true;
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onSwitchChange: function (e) {
      let dataZoom = this.lineData.extend.dataZoom[0],
        interval = dataZoom.end - dataZoom.start;

      this.trendIndex = 0;
      clearInterval(this.autoPlayTrendInterval);
      if (e) {
        this.autoPlayTrendClick(interval);
      }
    },
    autoPlayTrendClick: function (interval) {
      this.autoPlayTrendInterval = setInterval(() => {
        this.trendIndex++;
        this.lineData.extend.dataZoom[0].start = this.trendIndex;
        this.lineData.extend.dataZoom[0].end = this.trendIndex + interval;

        if (this.trendIndex >= 100 - interval) {
          this.lineInfo.checked = false;

          clearInterval(this.autoPlayTrendInterval);
        }
      }, 150);
    },
  },
};
</script>

<style scoped lang="less">
div.hero-08f41db6f9dc27eace457c89d3a96533 {
  left: 7px;
  margin-top: -30px;
  position: absolute;
}
</style>