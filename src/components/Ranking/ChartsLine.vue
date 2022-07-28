<template>
  <div class="ranking-charts">
    <div class="ranking-f879e7f0824fcc83d172401c3cb31b8a">
      <ve-line
        :init-options="{ renderer: 'svg' }"
        :extend="lineData.extend"
        :mark-line="lineData.markLine"
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

export default {
  name: "HeroCharts",
  components: {
    VeLine,
  },
  props: {
    trend: {
      type: Number,
      default: 0,
    },
    charts: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    listenChange() {
      const { trend, charts } = this;
      return { trend, charts };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        let nowColor = this.colorInfo[newValue.trend];

        this.lineData.extend.color[0] = nowColor;
        this.lineData.extend.series.areaStyle.color.colorStops[0].color =
          nowColor;
        this.lineData.extend.series.areaStyle.color.colorStops[1].color =
          nowColor;
        this.lineData.result = newValue.charts;
      },
    },
  },
  data() {
    return {
      lineData: {
        extend: {
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
              yAxis: 120,
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

      Array.from(e.series).map((x) => {
        x.symbol = "none";
      });
      return e;
    },
  },
};
</script>

<style scoped lang="less">
div.ranking-f879e7f0824fcc83d172401c3cb31b8a {
  height: 50px;
  overflow: hidden;
  width: auto;
}

div.ranking-c934456eea80a3c5db05ed142c757e07 {
  margin-top: -53px;
  margin-left: -45px;
}
</style>