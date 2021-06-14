<template>
  <div class="skin-line">
    <div class="skin-8c35b9de834af969baf22173b9539eb9">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        @click-left="$appPush({ path: '/ranking' })"
        left-text="返回"
        title="每隔 5 分钟更新一次,切换视角 👉"
        z-index="99999999"
        class="skin-0229cfdc78c2b9da8e238c9c89967c70"
      >
        <template #right>
          <div class="skin-921e37b78f1130768646531b655b7392">
            <van-switch
              v-model="showInfo.checked"
              size="15px"
              @click="showInfo.checked ? getSkinReturnLog() : getRanking(-1, 0, 0, 0)"
            />
          </div>
        </template>
      </van-nav-bar>
    </div>

    <div
      :style="
        $appIsApple && $appConfigInfo.appInfo.pwa == 1
          ? { marginTop: '-50px' }
          : {}
      "
      class="skin-0c81212fbe656b4245967fe1fba3413e"
    >
      <div
        v-if="!showInfo.checked && lineData.result.rows.length > 0"
        class="skin-9eff02d43a97619df7707398ec7099cb"
      >
        <ve-line
          :extend="lineData.extend"
          :settings="lineData.settings"
          :mark-line="lineData.markLine"
          :mark-point="lineData.markPoint"
          :data="lineData.result"
          :loading="lineData.loading"
          :after-config="afterConfig"
          width="99.2%"
          height="650px"
          class="skin-f3581151f1ec81c0c0a0226b4aa6e2d5"
        />
      </div>

      <div v-if="showInfo.checked" class="skin-32cf2eae6fcd7e91e52572c57b0dfed2">
        <vxe-grid
          ref="refSkinReturn"
          :loading="tableData.loading"
          :data="tableData.result.rows"
          :height="clientHeight"
        >
          <vxe-table-column title="皮肤" field="skinName" fixed="left" width="75">
            <template v-slot="{ row }">
              <img
                v-lazy="row.skinImg"
                width="50"
                height="50"
                class="skin-52326308ff25a5e0ce86bdae53ff2c35"
              />
              <van-tag
                :color="row.tag.color"
                mark
                type="primary"
                class="app-e4d23e841d8e8804190027bce3180fa5"
              >{{ row.skinName }}</van-tag>
            </template>
          </vxe-table-column>

          <vxe-table-column title="#" type="seq" width="50" />
          <vxe-table-column title="当前 (万)" field="allVoteNum" :width="listWidth" sortable>
            <template v-slot="{ row }">
              <div class="ranking-4ecf07e237f77d5efb6719a37ad40f4a">{{row.allVoteNum}}</div>
              <span
                v-if="row.needVote > 0"
                :style="row.needVote < 10 ? { color : 'red' } : { color : 'blue' }"
                class="ranking-ad602d217564b616b293eac07fc53138"
              >还差 {{row.needVote}}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column title="分均" field="addNum" :width="listWidth" sortable />
          <vxe-table-column title="还需 (时)" field="needTime" :width="listWidth" sortable />
        </vxe-grid>
      </div>

      <div v-if="showInfo.checked" class="skin-a47113818cd94f1f3221fed0a17e8588">
        <van-button
          round
          @click="getRanking(-1, 0, 0, 0)"
          size="small"
          color="linear-gradient(to right, #ff6034, #f7372c)"
        >刷新一下</van-button>&nbsp;
        <van-button
          round
          @click="onActivityUrlclick"
          size="small"
          color="linear-gradient(to right, #f7372c, #ee0a24)"
        >
          {{ tableData.result.title || "活动地址" }}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </van-button>
      </div>
    </div>

    <AppHello v-if="!showInfo.checked" height="100px" />
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";

import "echarts/lib/component/title";
import "echarts/lib/component/dataZoom";
import "v-charts/lib/style.css";

export default {
  name: "HeroSkinReturn",
  components: {
    VeLine,
    AppHello: () => import("@/components/App/Hello.vue"),
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
      listWidth: 0,
      clientHeight: 0,
      showInfo: {
        checked: true,
      },
    };
  },
  created() {
    this.clientHeight = this.$appInitTableHeight(10);
    let tableWidth = this.$appInitTableWidth(750);

    tableWidth > 0 ? (this.listWidth = tableWidth + 10) : (this.listWidth = 0);
  },
  mounted() {
    this.getRanking(-1, 0, 0, 0);
  },
  methods: {
    afterConfig: function (e) {
      e.series.map((x) => {
        x.symbol = "none";
      });
      //去除折线图上的小圆点
      return e;
    },
    getRanking: function (aid = -1, bid = 0, cid = 0, did = 0) {
      this.$axios
        .post(
          this.$appApi.pvp.getRanking +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&cid=" +
            cid +
            "&did=" +
            did
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;

            this.$message.success(this.$appMsg.success[1005]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    getSkinReturnLog: function () {
      this.$axios.post(this.$appApi.pvp.getSkinReturnLog).then((res) => {
        let data = res.data.data,
          status = res.data.status;

        if (status.code == 200) {
          this.lineData = data;
          this.lineData.loading = false;
          this.lineData.extend.yAxis.axisLabel = {
            formatter: function (v) {
              if (v >= 10000 && v < 10000000) {
                v = v / 10000 + " w";
              } else if (v >= 10000000) {
                v = v / 10000000 + " kw";
              }

              return v;
            },
          };

          this.$message.success(this.$appMsg.success[1005]);
        } else {
          this.$message.error(status.msg);
        }
      });
    },
    onActivityUrlclick: function () {
      let tipsInfo = this.tableData.result;

      if (tipsInfo.to) {
        this.$appOpenUrl("是否打开内部链接?", null, { path: tipsInfo.to }, 1);
      }

      if (tipsInfo.url) {
        this.$appOpenUrl("是否打开外部链接?", null, { path: tipsInfo.url }, 0);
      }
    },
  },
};
</script>

<style scoped lang="less">
img.skin-52326308ff25a5e0ce86bdae53ff2c35 {
  border-radius: @app-border-radius;
}

span.ranking-ad602d217564b616b293eac07fc53138 {
  font-size: @app-font-size;
  margin-top: -3px;
  position: absolute;
  right: 0;
}

div.skin-a47113818cd94f1f3221fed0a17e8588 {
  bottom: 100px;
  right: -20px;
  position: fixed;
  z-index: 99999999;
}
</style>