<template>
  <div class="skin-line">
    <div class="skin-8c35b9de834af969baf22173b9539eb9">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="type == 1 ? true : false"
        :safe-area-inset-top="true"
        @click-left="$appPush({ path: '/ranking' })"
        left-text="返回"
        z-index="99999999"
        class="skin-0229cfdc78c2b9da8e238c9c89967c70"
      >
        <template #title>
          <span class="skin-2de2ce7733cbb350c6aa2862912c853b"> 票选排行 </span>
        </template>
        <template #right>
          <span
            @click="type == 0 ? getRanking(-1, 0, 0, 0) : getSkinReturnLog()"
          >
            <van-icon name="replay" />
          </span>
        </template>
      </van-nav-bar>
    </div>

    <div class="skin-0c81212fbe656b4245967fe1fba3413e">
      <div v-if="type == 0" class="skin-4e31671abda91ffcc22a860a7bcd84ee">
        <van-row @click="$message.warning($appMsg.warning[1005])">
          <a-popover
            arrow-point-at-center
            placement="bottomLeft"
            trigger="click"
          >
            <van-col span="8">
              <div class="skin-194d92f12722c6d346dc1207ba7d2499">
                <div>
                  <img
                    v-lazy="topInfo[1].skinImg"
                    width="50"
                    height="50"
                    class="skin-52326308ff25a5e0ce86bdae53ff2c35"
                  />
                </div>
                <div>
                  <van-tag :color="topInfo[1].tag.color" round type="primary">
                    {{ topInfo[1].skinName }}
                  </van-tag>
                </div>
                <div>
                  <span
                    :style="{ color: topInfo[1].tag.color }"
                    class="skin-279a4b0330c1a4ef39cde3a334a9c652"
                  >
                    2
                  </span>
                </div>
                <div class="skin-82175be63be4c53021549241368b4c6f">
                  <span class="skin-2de2ce7733cbb350c6aa2862912c853b">
                    {{ topInfo[1].allVoteNum || 0 }} 万
                  </span>
                </div>
              </div>
            </van-col>
            <template slot="content">
              <span>分均:{{ topInfo[1].addNum }}</span>
              <br />
              <span
                :style="
                  topInfo[1].needVote < 25
                    ? { color: 'red' }
                    : { color: 'blue' }
                "
              >
                还差:{{ topInfo[1].needVote }} 万
              </span>
              <br />
              <span>还需:{{ topInfo[1].needTime }} 小时</span>
            </template>
          </a-popover>
          <a-popover arrow-point-at-center placement="bottom" trigger="click">
            <van-col span="8">
              <div class="skin-6fc36a6c243522e9579bb8500fcd8812">
                <div>
                  <img
                    v-lazy="topInfo[0].skinImg"
                    width="75"
                    height="75"
                    class="skin-52326308ff25a5e0ce86bdae53ff2c35"
                  />
                  <img
                    v-lazy="
                      'https://ae03.alicdn.com/kf/H451a86f08ecd432b8d2d486290489d91E.png'
                    "
                    width="50"
                    height="50"
                    class="skin-c3aea51299c526f7b079c527ae02deb9"
                  />
                </div>
                <div>
                  <van-tag :color="topInfo[0].tag.color" round type="primary">
                    {{ topInfo[0].skinName }}
                  </van-tag>
                </div>
                <div>
                  <span
                    :style="{ color: topInfo[0].tag.color }"
                    class="skin-279a4b0330c1a4ef39cde3a334a9c652"
                  >
                    1
                  </span>
                </div>
                <div class="skin-82175be63be4c53021549241368b4c6f">
                  <span class="skin-2de2ce7733cbb350c6aa2862912c853b">
                    {{ topInfo[0].allVoteNum || 0 }} 万
                  </span>
                </div>
              </div>
            </van-col>
            <template slot="content">
              <span
                @click="onActivityUrlclick"
                class="skin-4fb4d4758e19b050e0de1ef488ae54a3"
              >
                {{ tableData.result.title || "好耶!" }}
                <van-icon name="arrow" />
              </span>
            </template>
          </a-popover>
          <a-popover
            arrow-point-at-center
            placement="bottomLeft"
            trigger="click"
          >
            <van-col span="8">
              <div class="skin-2e9cd6ca0ca7a6d34edb205e1087b7e1">
                <div>
                  <img
                    v-lazy="topInfo[2].skinImg"
                    width="50"
                    height="50"
                    class="skin-52326308ff25a5e0ce86bdae53ff2c35"
                  />
                </div>
                <div>
                  <van-tag :color="topInfo[2].tag.color" round type="primary">
                    {{ topInfo[2].skinName }}
                  </van-tag>
                </div>
                <div>
                  <span
                    :style="{ color: topInfo[2].tag.color }"
                    class="skin-279a4b0330c1a4ef39cde3a334a9c652"
                  >
                    3
                  </span>
                </div>
                <div class="skin-82175be63be4c53021549241368b4c6f">
                  <span class="skin-2de2ce7733cbb350c6aa2862912c853b">
                    {{ topInfo[2].allVoteNum || 0 }} 万
                  </span>
                </div>
              </div>
            </van-col>
            <template slot="content">
              <span>分均:{{ topInfo[2].addNum }}</span>
              <br />
              <span
                :style="
                  topInfo[1].needVote < 15
                    ? { color: 'red' }
                    : { color: 'blue' }
                "
              >
                还差:{{ topInfo[2].needVote }} 万
              </span>
              <br />
              <span>还需:{{ topInfo[2].needTime }} 小时</span>
            </template>
          </a-popover>
        </van-row>
      </div>

      <div v-if="type == 0" class="skin-32cf2eae6fcd7e91e52572c57b0dfed2">
        <vxe-grid
          ref="refSkinReturn"
          :loading="tableData.loading"
          :data="tableData.result.rows.slice(3)"
          :height="clientHeight"
        >
          <vxe-table-column title="-" field="skinName" fixed="left" width="75">
            <template v-slot="{ row, rowIndex }">
              <img
                v-lazy="row.skinImg"
                width="35"
                height="35"
                class="skin-52326308ff25a5e0ce86bdae53ff2c35"
              />
              <van-tag
                :color="row.tag.color"
                mark
                type="primary"
                class="app-e4d23e841d8e8804190027bce3180fa5"
                >{{ row.skinName }}</van-tag
              >
              <span class="skin-58206caebd18d792f59aa1ec064f65d1">
                {{ rowIndex + 4 }}
              </span>
            </template>
          </vxe-table-column>
          <vxe-table-column
            title="分均"
            field="addNum"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            title="当前 (万)"
            field="allVoteNum"
            :width="listWidth"
            sortable
          >
            <template v-slot="{ row }">
              <div>{{ row.allVoteNum }}</div>
              <span
                v-if="row.needVote > 0"
                :style="
                  row.needVote < 10 ? { color: 'red' } : { color: 'blue' }
                "
                class="ranking-ad602d217564b616b293eac07fc53138"
                >还差 {{ row.needVote }}</span
              >
            </template>
          </vxe-table-column>
          <vxe-table-column
            title="还需 (时)"
            field="needTime"
            :width="listWidth"
            sortable
          />
        </vxe-grid>
      </div>

      <div
        v-if="type == 1 && lineData.result.rows.length > 0"
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
    </div>

    <AppHello v-if="type == 1" height="100px" />
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
      type: parseInt(this.$route.query.type) || 0,
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
      topInfo: [
        {
          skinImg: "/img/app-icons/hero_white.png",
          tag: {},
        },
        {
          skinImg: "/img/app-icons/hero_white.png",
          tag: {},
        },
        {
          skinImg: "/img/app-icons/hero_white.png",
          tag: {},
        },
      ],
    };
  },
  created() {
    this.clientHeight = this.$appInitTableHeight(-250); //-350
    let tableWidth = this.$appInitTableWidth(350);

    tableWidth > 0 ? (this.listWidth = tableWidth + 10) : (this.listWidth = 0);
  },
  mounted() {
    this.type == 0 ? this.getRanking(-1, 0, 0, 0) : this.getSkinReturnLog();
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
            result = data.result,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;
            this.topInfo = [result.rows[0], result.rows[1], result.rows[2]];

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

img.skin-c3aea51299c526f7b079c527ae02deb9 {
  position: absolute;
  transform: rotate(54deg);
  margin-left: -30px;
  margin-top: -20px;
}

span.skin-279a4b0330c1a4ef39cde3a334a9c652 {
  font-size: 50px;
}

span.ranking-ad602d217564b616b293eac07fc53138 {
  font-size: @app-font-size;
  margin-top: -3px;
  position: absolute;
  right: 0;
}

span.skin-4fb4d4758e19b050e0de1ef488ae54a3 {
  color: #1989fa;
}

span.skin-58206caebd18d792f59aa1ec064f65d1 {
  position: absolute;
}

div.skin-8c35b9de834af969baf22173b9539eb9 {
  div.van-nav-bar {
    background-color: transparent !important;
  }
}

div.skin-0c81212fbe656b4245967fe1fba3413e {
  position: absolute;
  width: 100%;
}

div.skin-4e31671abda91ffcc22a860a7bcd84ee {
  height: 385px;
  padding-top: 85px;
}

div.skin-194d92f12722c6d346dc1207ba7d2499 {
  padding-top: 75px;
}

div.skin-2e9cd6ca0ca7a6d34edb205e1087b7e1 {
  padding-top: 100px;
}
</style>