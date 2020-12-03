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
      type: Boolean,
      default: true,
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

        this.lineData.result = [];

        this.getHeroChartsLog(
          newValue.heroId,
          newValue.trendType,
          Number(newValue.detailed)
        );

        document.body.scrollTop = document.documentElement.scrollTop = 0;
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
    getHeroChartsLog: function (heroId, aid, detailed) {
      this.lineData.loading = true;

      this.axios
        .get(
          this.apiList.pvp.getHeroChartsLog +
            "&heroId=" +
            heroId +
            "&aid=" +
            aid +
            "&detailed=" +
            detailed
        )
        .then((res) => {
          let data = res.data.data;

          if (data.result.rows.length != 0) {
            this.lineData = data;
          } else {
            this.$message.warning("无内容");
          }

          this.lineData.loading = false;
        });
    },
  },
};
</script>