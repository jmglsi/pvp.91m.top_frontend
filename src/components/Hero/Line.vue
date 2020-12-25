<template>
  <div class="hero-line">
    <div class="hero-965f1a65ae362b02d244345afcbf542e">
      <ve-line
        :extend="lineData.extend"
        :settings="lineData.settings"
        :mark-line="lineData.markLine"
        :mark-point="lineData.markPoint"
        :data="lineData.result"
        :loading="lineData.loading"
        :after-config="afterConfig"
        height="500px"
        width="99.2%"
        class="hero-be4fa98d69734bbd05d093fc0010f826"
      />
    </div>

    <div class="hero-f6d50810d5b150ebd421cc944d2597a5">
      <van-switch
        v-show="trendType == 0"
        v-model="lineInfo.checked"
        @change="onSwitchChange"
        size="15px"
      />
    </div>
  </div>
</template>

<style>
@import url("/css/app-style/hero-line.css");
</style>

<script>
import VeLine from "v-charts/lib/line.common";

import "echarts/lib/component/title";
import "echarts/lib/component/markLine";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/dataZoom";

import "v-charts/lib/style.css";

export default {
  name: "HeroLine",
  components: {
    VeLine,
  },
  props: {
    heroId: {
      type: Number,
      default: 0,
    },
    detailed: {
      type: Number,
      default: 1,
    },
    trendType: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { heroId, detailed, trendType } = this;
      return { heroId, detailed, trendType };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (newValue.heroId == 0) return;
        this.getHeroChartsLog(
          newValue.heroId,
          newValue.trendType,
          Number(newValue.detailed)
        );
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
      lineInfo: {
        checked: false,
      },
      trendIndex: 0,
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
    getHeroChartsLog: function (heroId, aid, detailed) {
      this.lineData.loading = true;

      document.body.scrollTop = document.documentElement.scrollTop = 0;

      this.axios
        .post(
          this.apiList.pvp.getHeroChartsLog +
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

          if (status.code == 200) {
            this.lineData = data;
            this.lineData.loading = false;
          } else {
            this.appOpenUrl(status.msg, null, "/my", 1);
          }
        });
    },
    onSwitchChange: function (e) {
      let dataZoom = this.lineData.extend.dataZoom[0],
        interval = dataZoom.end - dataZoom.start;

      if (e == true) {
        this.autoPlayTrend(interval);
      } else {
        clearInterval(this.autoPlayTrendInterval);
      }
    },
    autoPlayTrend: function (interval) {
      this.trendIndex = 0;

      clearInterval(this.autoPlayTrendInterval);
      this.autoPlayTrendInterval = setInterval(() => {
        this.trendIndex++;
        this.lineData.extend.dataZoom[0].start = this.trendIndex;
        this.lineData.extend.dataZoom[0].end = this.trendIndex + interval;

        if (this.trendIndex >= 100 - interval) {
          this.lineInfo.checked = false;

          clearInterval(this.autoPlayTrendInterval);
        }
      }, 250);
    },
  },
};
</script>
