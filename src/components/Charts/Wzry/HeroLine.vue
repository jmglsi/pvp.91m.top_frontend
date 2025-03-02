<template>
  <div class="hero-line">
    <div v-if="extraId == 0" class="hero-965f1a65ae362b02d244345afcbf542e">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :left-text="$t('nav-bar.left-text')"
        title="日报"
        @click-left="$appBack()"
        z-index="2000"
        class="hero-0229cfdc78c2b9da8e238c9c89967c70"
      />

      <div
        :style="
          $appIsApple && $appConfigInfo.appInfo.pwa == 1
            ? { marginTop: '-50px' }
            : {}
        "
        class="hero-c79bf9a3203b55c0d029240ba7e395f4"
      >
        <van-cell-group :border="false">
          <template #title>
            <span class="hero-997cffd1b4c15bd001f2548df5c541a0">最新公告</span>
            <span
              @click="
                $appOpenUrl(
                  $t('open-url.title'),
                  null,
                  { path: '/search', query: { q: '公告', refresh: 1 } },
                  1
                )
              "
              class="hero-f2c563299eda7a8301fd79097a3d77a8 hero-7b7be5bb65f2587452c0483cd3135b33"
            >
              更多公告 ➡️
            </span>
          </template>

          <div class="hero-f6c155a5c2cef52607235042a3c7495a">
            <ul>
              <li
                v-for="(data, index) in updateData.result.rows.slice(0, 4)"
                :key="'hero-575b1378d20d0a1168556d58376e9752-' + index"
              >
                <span
                  v-if="data.articleId"
                  @click="
                    $appOpenUrl(
                      $t('open-url.title'),
                      null,
                      { path: data.url },
                      0
                    )
                  "
                  class="hero-2c8c32a3612ad83843c5de17963fb3c5"
                >
                  {{ data.title }}
                </span>
              </li>
            </ul>
          </div>
        </van-cell-group>

        <van-cell-group :border="false">
          <template #title>
            <span class="hero-997cffd1b4c15bd001f2548df5c541a0">今日表现</span>
            <span class="hero-18b58e781121d29af9c6dd24a2b9bdbc">|</span>
            <span class="hero-4b5af54a365b5077f89b573ff376ef82">
              <van-popover
                v-model="showInfo.areaPopoverMeau"
                :actions="wzryAreaTypeInfo"
                @select="onAreaPopoverMeauSelect"
                trigger="click"
                placement="bottom"
              >
                <template #reference>
                  <span class="hero-4af0496fe8b12ee0444d5b96af96f88f">
                    {{ areaInfo.text }} 🔄
                  </span>
                </template>
              </van-popover>
            </span>
            <span class="hero-18b58e781121d29af9c6dd24a2b9bdbc">|</span>
            <span class="hero-f2c563299eda7a8301fd79097a3d77a8">
              <span class="hero-412d90612ddb71698502ce6f29370422">
                11:30、23:30 更新
              </span>
              <span class="hero-f04ba7249dc09ecf99855b888f3ec78f">，</span>
              <span class="hero-5e442f77a551ef0cc4247e56def59551">
                版本迭代可能会提前
              </span>
            </span>
          </template>

          <div class="hero-9d64fb4582069dc644b61fd7dc2d5165">
            <van-grid :border="false" :column-num="3">
              <van-grid-item>
                <div class="hero-f48628f46cc0d14236d6077e1f61345e">
                  涨得最多
                </div>
                <div
                  v-if="lineData.result.rows.length > 0"
                  class="hero-8f422c42efbb8530bd3edf9691d66a8b"
                >
                  {{
                    lineData.result.rows[lineData.result.rows.length - 1][
                      "英雄"
                    ]
                  }}
                </div>
                <div v-else class="hero-8f422c42efbb8530bd3edf9691d66a8b">
                  -
                </div>
              </van-grid-item>
              <van-grid-item>
                <div class="hero-f48628f46cc0d14236d6077e1f61345e">
                  跌的最多
                </div>
                <div
                  v-if="lineData.result.rows.length > 0"
                  class="hero-8f422c42efbb8530bd3edf9691d66a8b"
                >
                  {{ lineData.result.rows[0]["英雄"] }}
                </div>
                <div v-else class="hero-8f422c42efbb8530bd3edf9691d66a8b">
                  -
                </div>
              </van-grid-item>
              <van-grid-item>
                <div class="hero-f48628f46cc0d14236d6077e1f61345e">
                  上分推荐
                </div>
                <div class="hero-8f422c42efbb8530bd3edf9691d66a8b">待定</div>
              </van-grid-item>
            </van-grid>
          </div>
        </van-cell-group>

        <van-cell-group :border="false">
          <template #title>
            <span class="hero-997cffd1b4c15bd001f2548df5c541a0">主力玩家</span>
            <span class="hero-18b58e781121d29af9c6dd24a2b9bdbc">|</span>
            <span class="hero-4b5af54a365b5077f89b573ff376ef82">
              <van-popover
                v-model="showInfo.positionPopoverMeau"
                :actions="wzryPositionTypeInfo"
                @select="onPositionPopoverMeauSelect"
                trigger="click"
                placement="bottom"
              >
                <template #reference>
                  <span class="hero-4af0496fe8b12ee0444d5b96af96f88f">
                    {{ positionInfo.text }} 🔄
                  </span>
                </template>
              </van-popover>
            </span>
            <span class="hero-18b58e781121d29af9c6dd24a2b9bdbc">|</span>
            <span class="hero-f2c563299eda7a8301fd79097a3d77a8">
              展示出场流入、流出 (%)
            </span>
            <span
              @click="
                $appOpenUrl(
                  $t('open-url.title'),
                  null,
                  { path: '/ranking', query: { eid: 'b', refresh: 1 } },
                  1
                )
              "
              class="hero-7b7be5bb65f2587452c0483cd3135b33"
            >
              查看排行 ➡️
            </span>
          </template>

          <div class="hero-75b7804e3a61dc0afa66de488a958d0e">
            <ve-bar
              :init-options="{ renderer: 'svg' }"
              :after-config="afterConfig"
              :data="lineData.result"
              :extend="lineData.extend"
              :loading="lineData.loading"
              :mark-line="lineData.markLine"
              :mark-point="lineData.markPoint"
              :settings="lineData.settings"
              height="310px"
              width="99.2%"
              class="hero-be4fa98d69734bbd05d093fc0010f826"
            />
          </div>
        </van-cell-group>

        <van-cell-group :border="false">
          <template #title>
            <span class="hero-997cffd1b4c15bd001f2548df5c541a0">自选英雄</span>
            <span class="hero-18b58e781121d29af9c6dd24a2b9bdbc">|</span>
            <span class="hero-f2c563299eda7a8301fd79097a3d77a8">
              <span class="hero-3c5ce68e1f3bf8481a8a6bd4dbbc2667">
                需要在趋势界面关注，关注时间降序
              </span>
              <span class="hero-292937f1e5601746d29e89815e616d8e">，</span>
              <span class="hero-a0e1d7ed00ffc971001f952f32c21e79">
                展示的是近期热度
              </span>
            </span>
          </template>

          <div class="hero-f6c155a5c2cef52607235042a3c7495a">
            <div v-if="tableData.result.rows.length == 0">
              <span class="hero-b97a15ec8ca41266ead22e99fea31e9b">暂无</span>
            </div>
            <div v-else>
              <van-grid :border="false" :column-num="3">
                <van-grid-item
                  v-for="(data, index) in tableData.result.rows.slice(0, 6)"
                  :key="'hero-098bb54d95474d39207adbc5bcb1fdf5-' + index"
                  @click="
                    $appOpenUrl(
                      $t('open-url.title'),
                      null,
                      { path: '/search', query: { q: data.name, refresh: 1 } },
                      1
                    )
                  "
                >
                  <img
                    class="hero-d5e8f5d4f1a7835d6b60df741458142f"
                    width="30"
                    height="30"
                    v-lazy="data.img"
                  />
                  <span class="hero-32488b56a42cdf9280f9f95a9d447738">
                    {{ data.name }}
                  </span>
                  <ChartsWzryRankingLine
                    :extraType="data.trend"
                    :charts="{
                      columns: chartsData.result.columns,
                      rows: chartsData.result.rows[data.id],
                    }"
                  />
                </van-grid-item>
              </van-grid>
            </div>
          </div>
        </van-cell-group>
      </div>
    </div>

    <div v-else-if="extraId > 0" class="hero-965f1a65ae362b02d244345afcbf542e">
      <div class="hero-180e46b52d0588c3d7bd1cd31116cfe3">
        <ve-line
          :after-config="afterConfig"
          :data="lineData.result"
          :extend="lineData.extend"
          :loading="lineData.loading"
          :mark-line="lineData.markLine"
          :mark-point="lineData.markPoint"
          :settings="lineData.settings"
          height="500px"
          width="99.2%"
          class="hero-be4fa98d69734bbd05d093fc0010f826"
        />
      </div>
    </div>

    <AppHello height="50px" />
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
import VeBar from "v-charts/lib/bar.common";

import "echarts/lib/component/dataZoom";
import "echarts/lib/component/legendScroll";
import "echarts/lib/component/markLine";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/title";

import "zrender/lib/svg/svg";

export default {
  name: "chartsHeroLine",
  components: {
    VeLine,
    VeBar,
    AppHello: () => import("@/components/App/Hello.vue"),
    ChartsWzryRankingLine: () =>
      import("@/components/Charts/Wzry/RankingLine.vue"),
  },
  props: {
    extraId: {
      type: Number,
      default: 0,
    },
    aid: {
      type: Number,
      default: 0,
    },
    detail: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    listenChange() {
      const { extraId, aid, detail } = this;
      return { extraId, aid, detail };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        //if (!newValue.extraId) return;

        this.getHeroChartsLog(
          newValue.aid,
          4,
          0,
          newValue.extraId,
          Number(newValue.detail)
        );
      },
    },
  },
  data() {
    return {
      trendIndex: 0,
      date: {
        min: new Date(),
        max: new Date(),
      },
      wzryAreaTypeInfo: [
        { text: "全分段", value: 0 },
        { text: "1350", value: 1 },
        { text: "高星局", value: 2 },
        { text: "比赛", value: 3, disabled: true },
        { text: "顶端局", value: 4 },
      ],
      wzryPositionTypeInfo: [
        { text: "全部分路", value: 0 },
        { text: "对抗路", value: 1 },
        { text: "中路", value: 2 },
        { text: "发育路", value: 3 },
        { text: "打野", value: 4 },
        { text: "游走", value: 5 },
      ],
      lineData: {
        loading: true,
        extend: {},
        tooltip: {},
        markLine: {},
        markPoint: {},
        settings: {},
        result: {
          rows: [],
        },
      },
      tableData: {
        result: {
          rows: [],
        },
      },
      progressData: {
        result: {
          rows: [],
        },
      },
      chartsData: {
        result: {
          columns: ["日期", "热度"],
          rows: [],
        },
      },
      updateData: {
        result: {
          rows: [],
        },
      },
      areaInfo: {
        text: "顶端局",
        value: 4,
      },
      positionInfo: {
        text: "全部分路",
        value: 0,
      },
      showInfo: {
        areaPopoverMeau: false,
        positionPopoverMeau: false,
      },
    };
  },
  mounted() {
    if (this.extraId == 0) {
      this.showInfo.areaPopoverMeau = true;

      this.getRanking(0, 6, 0, 0);
      this.getHeroChartsLog(7);
      this.getHeroUpdate(0, 1);

      setTimeout(() => {
        this.showInfo.areaPopoverMeau = false;
      }, 1000 * 5);
    }
  },
  methods: {
    afterConfig: function (e) {
      if (!e.series) {
        return e;
      }

      /**
       *
       * 去除折线图上的小圆点
       *
       */
      Array.from(e.series, (x) => {
        x.symbol = "none";

        if (this.extraId == 0) {
          Array.from(x.data, (y, i) => {
            if (y > 0) {
              x.data[i] = { value: y, itemStyle: { color: "red" } };
            } else {
              x.data[i] = { value: y, itemStyle: { color: "#1890ff" } };
            }
          });
        }

        return x;
      });

      return e;
    },
    getHeroUpdate: function (aid = 0, bid = 0, heroId = 0) {
      let appConfigInfo = this.$appConfigInfo,
        date = new Date(),
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "heroUpdate-" + aid + "-" + bid + "-" + heroId
        );

      this.date.min = new Date(date.setMonth(date.getMonth() - 4));
      this.date.max = new Date(date.setMonth(date.getMonth() + 4));

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.updateInfo.timeout) {
        this.updateData = ls;

        return;
      }

      this.$axios
        .post(
          this.$appApi.app.getHeroUpdate +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&id=" +
            encodeURIComponent(heroId)
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.updateData = data;
            this.updateData.updateTime = ts;

            this.$appSetLocalStorage(
              "heroUpdate-" + aid + "-" + bid + "-" + heroId,
              this.updateData
            );
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    getRanking: function (aid = 0, bid = 0, cid = 0, did = 0, time = "") {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + time
        );

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.updateInfo.timeout) {
        if (aid == 15) {
          this.progressData = ls;
        } else {
          this.tableData = ls;
        }

        return;
      }

      this.tableData.loading = true;

      this.$axios
        .post(
          this.$appApi.app.getRanking +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&cid=" +
            cid +
            "&did=" +
            did,
          this.$qs.stringify({
            t: this.time,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status,
            newData = null;

          if (status.code == 200) {
            if (aid == 15) {
              this.progressData = data;
              this.progressData.loading = false;
              this.progressData.updateTime = ts;

              newData = this.progressData;
            } else {
              this.tableData = data;
              this.tableData.loading = false;
              this.tableData.updateTime = ts;

              newData = this.tableData;
            }

            this.$appSetLocalStorage(
              "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + time,
              newData
            );

            if (aid == 0) {
              //this.$message.success(this.$appMsg.success[1005]);

              if (this.time) {
                this.$message.info(this.$appMsg.info[1030]);
              }
            }
          } else if ([2006, 2015].indexOf(status.code) > -1) {
            this.tableData.loading = false;
            this.msg = status.msg;
          } else {
            this.$message.error(status.msg);
          }
        });

      if (bid == 3 && cid == 0) {
        this.$message.info(this.$appMsg.info[1011]);
      }
    },
    getHeroChartsLog: function (
      aid,
      bid = 0,
      cid = 0,
      heroId = 111,
      detail = 1
    ) {
      this.$axios
        .post(
          this.$appApi.app.getHeroChartsLog +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&cid=" +
            cid +
            "&id=" +
            encodeURIComponent(heroId) +
            "&detail=" +
            detail
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            if (aid == 7) {
              this.chartsData = data;
              this.chartsData.loading = false;
            } else {
              this.lineData = data;
              this.lineData.loading = false;
            }
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onAreaPopoverMeauSelect: function (e) {
      this.areaInfo = e;

      this.getSelectData(this.areaInfo, this.positionInfo);
    },
    onPositionPopoverMeauSelect: function (e) {
      this.positionInfo = e;

      this.getSelectData(this.areaInfo, this.positionInfo);
    },
    getSelectData: function (e, a) {
      if (this.extraId == 0) {
        this.getHeroChartsLog(10, e.value, a.value);
      }
    },
  },
};
</script>

<style scoped lang="less">
img.hero-d5e8f5d4f1a7835d6b60df741458142f {
  border-radius: 100%;
  position: absolute;
  left: 10px;
  top: 5px;
}

span.hero-997cffd1b4c15bd001f2548df5c541a0 {
  font-size: 15px;
  font-weight: 525;
  color: black;
}

span.hero-f2c563299eda7a8301fd79097a3d77a8 {
  margin-left: -3px;
  font-size: 10px;
}

span.hero-412d90612ddb71698502ce6f29370422 {
  color: red;
}

span.hero-a0e1d7ed00ffc971001f952f32c21e79 {
  color: orange;
}

span.hero-18b58e781121d29af9c6dd24a2b9bdbc {
  margin: 0 5px;
}

span.hero-7b7be5bb65f2587452c0483cd3135b33 {
  font-size: 10px;
  right: 25px;
  position: absolute;
}

span.hero-32488b56a42cdf9280f9f95a9d447738 {
  font-size: 10px;
}

span.hero-2c8c32a3612ad83843c5de17963fb3c5 {
  margin-left: 7px;
  line-height: 35px;
}

span.hero-b97a15ec8ca41266ead22e99fea31e9b {
  text-align: center;
  margin: 0 auto;
  left: 0;
  width: 100%;
  position: absolute;
  font-size: 10px;
}

span.hero-4af0496fe8b12ee0444d5b96af96f88f {
  color: orange;
  font-size: 10px;
}

div.hero-f6c155a5c2cef52607235042a3c7495a {
  margin: 10px;
}

div.hero-9d64fb4582069dc644b61fd7dc2d5165,
div.hero-75b7804e3a61dc0afa66de488a958d0e {
  margin: 10px;
}

div.hero-f48628f46cc0d14236d6077e1f61345e {
  color: gray;
}

div.hero-8f422c42efbb8530bd3edf9691d66a8b {
  font-size: 15px;
  font-weight: 525;
  margin-top: 3px;
}
</style>