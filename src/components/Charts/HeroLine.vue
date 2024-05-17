<template>
  <div class="hero-line">
    <div class="hero-965f1a65ae362b02d244345afcbf542e">
      <ve-line
        :init-options="{ renderer: 'svg' }"
        :after-config="afterConfig"
        :data="lineData.result"
        :extend="lineData.extend"
        :loading="lineData.loading"
        :mark-line="lineData.markLine"
        :mark-point="lineData.markPoint"
        :settings="lineData.settings"
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

import 'zrender/lib/svg/svg';

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
    detail: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    listenChange() {
      const { heroId, aid, detail } = this;
      return { heroId, aid, detail };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (!newValue.heroId) return;

        this.getHeroChartsLog(
          newValue.aid,
          newValue.heroId,
          Number(newValue.detail)
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

        return x;
      });

      return e;
    },
    getHeroChartsLog: function (aid, heroId, detail) {
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
            "&aid=" +
            aid +
            "&heroId=" +
            heroId +
            "&detail=" +
            detail
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          this.lineData.status = status;

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