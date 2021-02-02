<template>
  <div class="skin-line">
    <div class="skin-8c35b9de834af969baf22173b9539eb9">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        @click-left="$router.go(-1)"
        left-text="返回"
        title="每隔 5 分钟更新一次,切换视角 👉"
        z-index="99999999"
        class="skin-0229cfdc78c2b9da8e238c9c89967c70"
      >
        <template #right>
          <div class="skin-921e37b78f1130768646531b655b7392">
            <van-switch v-model="showInfo.checked" />
          </div>
        </template>
      </van-nav-bar>
    </div>

    <div
      v-show="!showInfo.checked && lineData.result.rows.length > 0"
      class="skin-9eff02d43a97619df7707398ec7099cb"
    >
      <ve-line
        :extend="lineData.extend"
        :settings="lineData.settings"
        :mark-line="lineData.markLine"
        :mark-point="lineData.markPoint"
        :data="lineData.result.rows"
        :loading="lineData.loading"
        :after-config="afterConfig"
        width="99.2%"
        class="skin-f3581151f1ec81c0c0a0226b4aa6e2d5"
      />
    </div>

    <div
      v-show="showInfo.checked"
      class="skin-32cf2eae6fcd7e91e52572c57b0dfed2"
    >
      <vxe-grid
        ref="refSkinReturn"
        :loading="tableData.loading"
        :data="tableData.result.rows"
        :height="clientHeight"
      >
        <vxe-table-column title="皮肤" field="skinName" fixed="left" width="85">
          <template v-slot="{ row }">
            <img
              v-lazy="row.skinImg"
              width="50"
              height="50"
              class="skin-52326308ff25a5e0ce86bdae53ff2c35"
            />
            <span class="skin-6ccfe2c5d635aa134880d67af43cb1dd">{{
              row.skinName
            }}</span>
          </template>
        </vxe-table-column>

        <vxe-table-column title="#" type="seq" width="50" />
        <vxe-table-column title="当前 (万)" field="allVoteNum" sortable />
        <vxe-table-column title="分均" field="addNum" sortable />
        <vxe-table-column title="还需 (小时)" field="needtime" sortable />
      </vxe-grid>
    </div>

    <div class="skin-a47113818cd94f1f3221fed0a17e8588">
      <van-button
        round
        @click="
          $appOpenUrl('是否打开外部链接?', null, { path: tableData.result.url })
        "
        size="small"
        color="linear-gradient(to right, #ff6034, #ee0a24)"
      >
        {{ tableData.result.title || "活动地址" }}
      </van-button>
    </div>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
import "echarts/lib/component/dataZoom";
import "v-charts/lib/style.css";

export default {
  name: "HeroSkinReturn",
  components: {
    VeLine,
  },
  data() {
    return {
      tableData: {
        loading: true,
        result: {
          rows: [],
        },
      },
      lineData: {
        markLine: {},
        markPoint: {},
        extend: {},
        settings: {},
        loading: true,
        result: {
          rows: [],
        },
      },
      clientHeight: 0,
      showInfo: {
        checked: false,
      },
    };
  },
  created() {
    this.clientHeight = this.$appInitTableHeight();
  },
  mounted() {
    this.getSkinReturnLog();
    this.getSkinReturn();
  },
  methods: {
    afterConfig: function (e) {
      e.series.map((x) => {
        x.symbol = "none";
      });
      //去除折线图上的小圆点
      return e;
    },
    getSkinReturn: function () {
      this.$axios.post(this.$appApi.pvp.getSkinReturn).then((res) => {
        let data = res.data.data;

        this.tableData = data;
        this.tableData.loading = false;
      });
    },
    getSkinReturnLog: function () {
      this.$axios.post(this.$appApi.pvp.getSkinReturnLog).then((res) => {
        let data = res.data.data;

        this.lineData = data;
        this.lineData.loading = false;
      });
    },
  },
};
</script>

<style scoped>
span.skin-6ccfe2c5d635aa134880d67af43cb1dd {
  font-size: 12px;
  white-space: nowrap;
}

div.skin-9eff02d43a97619df7707398ec7099cb {
  margin-top: 50px;
}

div.skin-a47113818cd94f1f3221fed0a17e8588 {
  bottom: 90px;
  position: fixed;
  width: 100%;
  z-index: 99999999;
}
</style>