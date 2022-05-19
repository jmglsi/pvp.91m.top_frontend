<template>
  <div class="equipment-line">
    <div class="equipment-965f1a65ae362b02d244345afcbf542e">
      <ve-line
        :extend="lineData.extend"
        :settings="lineData.settings"
        :mark-line="lineData.markLine"
        :mark-point="lineData.markPoint"
        :data="lineData.result"
        :loading="lineData.loading"
        :after-config="afterConfig"
        :height="$appIsMobile ? '375px' : '475px'"
        width="100%"
        class="equipment-be4fa98d69734bbd05d093fc0010f826"
      />
    </div>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";

import "echarts/lib/component/markLine";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/title";

import "v-charts/lib/style.css";

export default {
  name: "EquipmentLine",
  components: {
    VeLine,
  },
  props: {
    heroEquipment: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    listenChange() {
      const { heroEquipment } = this;
      return { heroEquipment };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (newValue.heroEquipment == {}) return;

        this.lineData.result = newValue.heroEquipment;

        this.lineData.loading = false;
      },
    },
  },
  data() {
    return {
      lineData: {
        extend: {
          title: {
            subtext: "该装备在某个格子时的数据 (受总样本数影响)",
            left: "center",
          },
          yAxis: {
            splitLine: {
              show: false,
            },
            min: 0,
            max: 1,
          },
          series: {
            markLine: {
              symbol: "none",
              data: [
                {
                  yAxis: 0.5,
                  name: "及格",
                  itemStyle: {
                    color: "#63d1b0",
                  },
                  label: {
                    formatter: " ",
                  },
                },
              ],
            },
          },
          grid: {
            top: 120,
          },
          legend: {
            top: 45,
          },
        },
        loading: true,
        result: {
          columns: ["格子", "胜率", "占比"],
          rows: [],
        },
        settings: {
          axisSite: { right: ["胜率"] },
          yAxisType: ["percent", "percent"],
          yAxisName: ["占比", "胜率"],
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