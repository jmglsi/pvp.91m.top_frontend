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
        :height="isMobile ? '375px' : '475px'"
        width="100%"
        class="equipment-be4fa98d69734bbd05d093fc0010f826"
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

import "v-charts/lib/style.css";

export default {
  name: "EquipmentLine",
  components: {
    VeLine,
  },
  props: {
    heroEquipment: {
      type: Object,
      default: () => {},
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
            subtext: "a装备 在 b格子时的数据 (受总样本数量影响)",
            left: "center",
          },
          yAxis: {
            splitLine: {
              show: false,
            },
          },
          series: {
            markLine: {
              data: [
                {
                  yAxis: 0.5,
                  name: "平均胜率",
                  itemStyle: {
                    color: "gray",
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
          rows: [],
        },
        settings: {
          axisSite: { right: ["胜率"] },
          yAxisName: ["场次", "胜率"],
          yAxisType: ["normal", "percent"],
        },
      },
    };
  },
};
</script>
