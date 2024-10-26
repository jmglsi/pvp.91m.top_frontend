<template>
  <div class="ranking-charts">
    <div class="ranking-f879e7f0824fcc83d172401c3cb31b8a">
      <ve-line
        :init-options="{ renderer: 'svg' }"
        :after-config="afterConfig"
        :data="charts"
        :extend="lineData.extend"
        :height="extraStyle.height"
        :mark-line="lineData.markLine"
        :width="extraStyle.width"
        class="ranking-c934456eea80a3c5db05ed142c757e07"
      />
    </div>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";

import 'zrender/lib/svg/svg';

export default {
  name: "ChartsRankingLine",
  components: {
    VeLine,
  },
  props: {
    extraType: {
      type: Number,
      default: 0,
    },
    extraStyle: {
      type: Object,
      default: () => ({
        width: "85px",
        height: "50px",
        grid: { left: -40, bottom: 40, width: 118 },
      }),
    },
    charts: {
      type: Object,
      default: () => ({}),
    },
    animation: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    listenChange() {
      const { extraType, charts } = this;
      return { extraType, charts };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        let nowColor = this.colorInfo[newValue.extraType];

        this.lineData.extend.color[0] = nowColor;
        this.lineData.extend.series.areaStyle.color.colorStops[0].color =
          nowColor;
        this.lineData.extend.series.areaStyle.color.colorStops[1].color =
          nowColor;
        this.lineData.result = newValue.charts;

        this.lineData.extend.animation = this.animation;
      },
    },
  },
  data() {
    return {
      lineData: {
        extend: {
          animation: true,
          color: ["orange"],
          series: {
            type: "line",
            smooth: true,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 0.75,
                colorStops: [
                  {
                    offset: 0,
                    color: "white",
                  },
                  {
                    offset: 0.25,
                    color: "white",
                  },
                  {
                    offset: 1,
                    color: "rgba(255, 255, 255, 0)",
                  },
                ],
                global: false,
              },
            },
          },
          xAxis: {
            show: false,
            splitLine: {
              show: false,
            },
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
            left: this.extraStyle.grid.left,
            bottom: this.extraStyle.grid.bottom,
            width: this.extraStyle.grid.width,
            height: this.extraStyle.grid.height,
            tooltip: {
              show: false,
            },
          },
        },
        markLine: {
          symbol: "none",
          data: [
            {
              name: "超热门",
              value: "超热门",
              yAxis: 110,
              itemStyle: {
                color: "red",
              },
              label: {
                formatter: " ",
              },
            },
          ],
        },
        result: {
          rows: [],
        },
      },
      colorInfo: ["orange", "#4694d6", "red"],
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
  },
};
</script>

<style scoped lang="less">
div.ranking-f879e7f0824fcc83d172401c3cb31b8a {
  height: @app-height;
  width: auto;
}
</style>