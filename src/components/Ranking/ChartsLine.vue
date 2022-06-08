<template>
  <div class="ranking-charts">
    <div class="ranking-f879e7f0824fcc83d172401c3cb31b8a">
      <ve-line
        :init-options="{ renderer: 'svg' }"
        :extend="lineData.extend"
        :data="charts"
        :after-config="afterConfig"
        height="175px"
        width="125px"
        class="ranking-c934456eea80a3c5db05ed142c757e07"
      />
    </div>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";

import "v-charts/lib/style.css";
import "zrender/lib/svg/svg";

export default {
  name: "HeroCharts",
  components: {
    VeLine,
  },
  props: {
    color: {
      type: String,
      default: "",
    },
    charts: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    listenChange() {
      const { color, charts } = this;
      return { color, charts };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        this.lineData.extend.color = newValue.color;
        this.lineData.result = newValue.charts;
      },
    },
  },
  data() {
    return {
      lineData: {
        extend: {
          color: [this.color],
          xAxis: {
            show: false,
          },
          yAxis: {
            show: false,
            splitLine: {
              show: false,
            },
            min: "dataMin",
            max: "dataMax",
          },
          legend: {
            show: false,
          },
          grid: {
            tooltip: {
              show: false,
            },
          },
        },
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

      Array.from(e.series).map((x) => {
        x.symbol = "none";
      });
      return e;
    },
  },
};
</script>
