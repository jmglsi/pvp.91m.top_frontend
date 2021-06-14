<template>
  <div class="ranking-line">
    <div class="ranking-4789d9440d92b2647ea8a52c2f5b31b5">&nbsp;</div>

    <div class="ranking-63559bd374a437b89b36762811e4b809">
      <a-radio-group
        :value="viewInfo.model"
        :options="viewOptions"
        :default-value="2"
        @change="onViewChange"
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
        height="650px"
        width="99.2%"
        class="ranking-1ef625581088ffc24d94e052d9ebc61d"
      />
    </div>

    <AppHello v-if="$appIsMobile" height="100px" />
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";

import "echarts/lib/component/title";
import "echarts/lib/component/markLine";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/dataZoom";

import "v-charts/lib/style.css";

export default {
  name: "HeroLine",
  components: {
    VeLine,
    AppHello: () => import("@/components/App/Hello.vue"),
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
        this.viewInfo.model = 2;

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
        model: 2,
      },
      viewOptions: [
        { label: "禁用", value: 0 },
        { label: "出场", value: 1 },
        { label: "禁选", value: 2 },
      ],
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
    getHeroChartsLog: function (aid, bid, cid, did) {
      if (bid == 0) return;

      let appConfigInfo = this.$appConfigInfo,
        heroChartsLog = this.$appGetLocalStorage(
          "heroChartsLog-" + aid + "-" + bid + "-" + cid + "-" + did
        );

      if (
        heroChartsLog &&
        this.$appTs - appConfigInfo.appInfo.updateTime <
          appConfigInfo.updateInfo.timeout
      ) {
        this.lineData = heroChartsLog;

        return;
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
div.ranking-line {
  margin: 25px 0;
}

div.ranking-4789d9440d92b2647ea8a52c2f5b31b5 {
  background-color: white;
  position: absolute;
  width: 100%;
  margin-top: -25px;
  height: @app-height;
}

div.ranking-63559bd374a437b89b36762811e4b809 {
  width: 225px;
  position: absolute;
  right: 0;
}
</style>