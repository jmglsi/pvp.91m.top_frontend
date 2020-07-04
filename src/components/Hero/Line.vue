<template>
  <div class="hero-line">
    <div class="hero-965f1a65ae362b02d244345afcbf542e">
      <ve-line
        :settings="tableData.settings"
        :extend="extend"
        :mark-line="markLine"
        :mark-point="markPoint"
        :data="tableData.result"
        width="99.2%"
      />
    </div>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";

import "echarts/lib/component/markLine";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/dataZoom";

export default {
  name: "HeroLine",
  components: {
    VeLine
  },
  props: {
    heroId: {
      type: Number,
      default: 0
    },
    detailed: {
      type: Boolean,
      default: true
    },
    lineType: {
      type: Number,
      default: 0
    }
  },
  computed: {
    listenChange() {
      const { heroId, detailed, lineType } = this;
      return { heroId, detailed, lineType };
    }
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (newValue.heroId == 0) return;

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
      }
    }
  },
  data() {
    this.markLine = {
      data: [
        {
          name: "平均线",
          type: "average"
        }
      ]
    };
    this.markPoint = {
      data: [
        {
          name: "最大值",
          type: "max"
        }
      ]
    };
    this.extend = {
      xAxis: {
        axisLabel: {
          rotate: 45
        }
      },
      dataZoom: [
        {
          type: "slider",
          show: true,
          start: 80,
          end: 100
        }
      ]
    };
    return {
      tableData: {
        result: []
      }
    };
  },
  methods: {
    getHeroChartsLogByDfs: function(heroId, detailed) {
      this.axios
        .get(
          this.apiList.pvp.getHeroChartsLogByDfs +
            "&heroId=" +
            heroId +
            "&detailed=" +
            detailed
        )
        .then(res => {
          let data = res.data.data;

          if (data.result.rows.length != 0) {
            this.tableData = data;
          }
        });
    },
    getHeroChartsLogByBbs: function(heroId) {
      this.axios
        .get(this.apiList.pvp.getHeroChartsLogByBbs + "&heroId=" + heroId)
        .then(res => {
          let data = res.data.data;

          if (data.result.rows.length != 0) {
            this.tableData = data;
          }
        });
    }
  }
};
</script>