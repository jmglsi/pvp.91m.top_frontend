<template>
  <div class="ranking-migration">
    <div class="ranking-63559bd374a437b89b36762811e4b809">
      <a-radio-group
        :value="viewInfo.model"
        :options="viewInfo.options"
        @change="onViewChange"
        default-value="c"
      />
    </div>

    <div class="ranking-47a721d2dcdc9a9875507e9f389e6409">
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
        class="ranking-1ef625581088ffc24d94e052d9ebc61d"
      />
    </div>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";

export default {
  name: "ChartsMigrationLine",
  components: {
    VeLine,
  },
  props: {
    bid: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { bid } = this;
      return { bid };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        this.getHeroChartsLog(5, newValue.bid, this.viewInfo.model, 0);
      },
    },
  },
  data() {
    return {
      lineData: {
        extend: {},
        loading: true,
        markLine: {},
        markPoint: {},
        result: {
          rows: [],
        },
        settings: {},
      },
      viewInfo: {
        model: "c",
        options: [
          { value: "a", label: "禁用" },
          { value: "b", label: "出场" },
          { value: "c", label: "禁选" },
        ],
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
    getHeroChartsLog: function (aid, bid, cid, did) {
      if (bid == 0) return;

      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "heroChartsLog-" + aid + "-" + bid + "-" + cid + "-" + did
        );

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.update.timeout) {
        return (this.lineData = ls);
      }

      this.lineData = {
        loading: true,
        result: {
          rows: [],
        },
      };

      this.$axios
        .post(
          this.$appApi.pvp.getHeroChartsLog +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&cid=" +
            cid
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          this.lineData.status = status;

          if (status.code == 200) {
            this.lineData = data;
            this.lineData.loading = false;
            this.lineData.updateTime = ts;

            this.$appSetLocalStorage(
              "heroChartsLog-" + aid + "-" + bid + "-" + cid + "-" + did,
              this.lineData
            );
          } else {
            this.$appOpenUrl("温馨提示", status.msg, { path: "/login" }, 1);
          }
        });
    },
    onViewChange(e) {
      this.viewInfo.model = e.target.value;

      this.getHeroChartsLog(5, this.bid, this.viewInfo.model, 0);
    },
  },
};
</script>

<style scoped lang="less">
div.ranking-migration {
  margin: 25px 0;
}

div.ranking-63559bd374a437b89b36762811e4b809 {
  width: 210px;
  position: absolute;
  right: 0;
}
</style>