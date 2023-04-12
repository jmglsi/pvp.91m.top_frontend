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

import "echarts/lib/component/dataZoom";
import "echarts/lib/component/legendScroll";
import "echarts/lib/component/markLine";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/title";

import "v-charts/lib/style.css";

export default {
  name: "ChartsHeroLine",
  components: {
    VeLine,
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
        settings: {},
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

      /**
       *
       * 去除折线图上的小圆点
       *
       */
      Array.from(e.series, (x) => {
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
          this.$appApi.app.getHeroChartsLog +
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
          } else {
            this.$appOpenUrl(
              "温馨提示",
              status.msg,
              {
                path: "/search",
                query: {
                  q: "大佬们快来加群",
                  refresh: 1,
                },
              },
              1
            );
          }
        });
    },
  },
};
</script>