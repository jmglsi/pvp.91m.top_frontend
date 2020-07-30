<template>
  <div class="hero-line">
    <div class="hero-965f1a65ae362b02d244345afcbf542e">
      <ve-line
        :extend="tableData.extend"
        :settings="tableData.settings"
        :mark-line="tableData.markLine"
        :mark-point="tableData.markPoint"
        :data="tableData.result"
        :loading="tableData.loading"
        :after-config="afterConfig"
        width="99.2%"
        class="hero-be4fa98d69734bbd05d093fc0010f826"
      />
    </div>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";

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
    lineType: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { heroId, detailed, lineType } = this;
      return { heroId, detailed, lineType };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (newValue.heroId == 0) return;

        this.tableData.result = [];

        if (newValue.lineType == 0) {
          this.getHeroChartsLogByDfs(
            newValue.heroId,
            Number(newValue.detailed)
          );
        }

        if (newValue.lineType == 1) {
          this.getHeroChartsLogByBbs(newValue.heroId);
        }

        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },
    },
  },
  data() {
    return {
      tableData: {
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
    getHeroChartsLogByDfs: function (heroId, detailed) {
      this.tableData.loading = true;

      this.axios
        .get(
          this.apiList.pvp.getHeroChartsLogByDfs +
            "&heroId=" +
            heroId +
            "&detailed=" +
            detailed
        )
        .then((res) => {
          let data = res.data.data;

          if (data.result.rows.length != 0) {
            this.tableData = data;
          }

          this.tableData.loading = false;
        });
    },
    getHeroChartsLogByBbs: function (heroId) {
      this.tableData.loading = true;

      this.axios
        .get(this.apiList.pvp.getHeroChartsLogByBbs + "&heroId=" + heroId)
        .then((res) => {
          let data = res.data.data;

          if (data.result.rows.length != 0) {
            this.tableData = data;
          } else {
            this.$message.warning("无内容");
          }

          this.tableData.loading = false;
        });
    },
  },
};
</script>