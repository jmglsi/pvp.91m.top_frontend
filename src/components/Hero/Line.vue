<template>
  <div class="hero-line">
    <div class="hero-965f1a65ae362b02d244345afcbf542e">
      <ve-line
        :settings="tableData.settings"
        :extend="extend"
        :mark-line="markLine"
        :mark-point="markPoint"
        :data="tableData.result"
        width="99%"
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
    }
  },
  computed: {
    listenChange() {
      const { heroId, detailed } = this;
      return { heroId, detailed };
    }
  },
  watch: {
    listenChange: {
      immediate: false,
      handler(newValue, oldValue) {
        this.getHeroChartsLog(newValue.heroId, Number(newValue.detailed));
        if (oldValue.heroId != 0) {
          this.$message.success("切换成功");
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
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
    getHeroChartsLog: function(heroId, detailed) {
      this.axios
        .get(
          this.apiList.pvp.getHeroChartsLog +
            "&heroId=" +
            heroId +
            "&detailed=" +
            detailed
        )
        .then(ret => {
          let data = ret.data.data;

          if (data.result.rows.length != 0) {
            this.tableData = data;
          }
        });
    }
  }
};
</script>