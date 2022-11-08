<template>
  <div class="ranking-home">
    <div class="ranking-a9b4432c8e9b49bafa0a23e52d970016">
      <van-tabs
        v-model="tabsInfo.model"
        v-if="tabsInfo.model > -1"
        :border="false"
        :ellipsis="false"
        @click="onRankingTabsClick"
        duration="0.5"
        line-width="25px"
      >
        <van-tab>
          <template #title>
            <div class="ranking-49d4c899070175b7649d7424a5d2ee41">
              <span>梯度排行&nbsp;</span>

              <a-tooltip
                :visible="showInfo.dfsTips"
                overlayClassName="ranking-2d6772ddd3e52a2c53cd8c794ec5ded3"
                placement="bottomRight"
              >
                <template slot="title">
                  <span>筛选移到这了</span>
                </template>
                <i class="vxe-icon--funnel" />
              </a-tooltip>
            </div>
          </template>

          <div v-if="tabsInfo.model == 0">
            <div class="ranking-5f02576721f9492841a54d9bf8a47370">
              <div v-if="viewInfo.model == 'a'">
                <RankingGradient
                  :bid="bid || dfsAreaTypeInfo.model"
                  :cid="cid || dfsPositionTypeInfo.model"
                />
              </div>

              <div v-else-if="viewInfo.model == 'b'">
                <a-tooltip
                  :visible="showInfo.skillTips"
                  overlayClassName="ranking-8d583d7c052e343e6817b99812fa03b6"
                  placement="left"
                >
                  <template slot="title">
                    <span>左侧查看备战，右侧搜索舆论</span>
                  </template>

                  <DianFengSai
                    :isSmallMode="isSmallMode"
                    :bid="bid || dfsAreaTypeInfo.model"
                    :cid="cid || dfsPositionTypeInfo.model"
                    :did="did || 0"
                    :refresh="refresh || 0"
                  />
                </a-tooltip>
              </div>

              <div v-else-if="viewInfo.model == 'c'">
                <RankingMigrationLine :bid="cid || dfsPositionTypeInfo.model" />
              </div>
            </div>

            <div
              :style="
                $appIsApple && $appConfigInfo.appInfo.pwa == 1
                  ? {
                      top: '55px',
                    }
                  : {
                      top: '5px',
                    }
              "
              class="ranking-87714e7bd6c0d80c7bbdb69629b5a80d"
            >
              <a-popover
                placement="bottomRight"
                trigger="click"
                overlayClassName="ranking-ed3451c988256d717ce6e41d24da7e45"
              >
                <template slot="content">
                  <div class="ranking-e1c6b759e0537c91d5c6dbb2d4738173">
                    <a-radio-group
                      :value="viewInfo.model"
                      @change="onRadioChange"
                      default-value="a"
                      button-style="solid"
                    >
                      <a-radio-button value="a">梯度</a-radio-button>
                      <a-radio-button value="b">排行</a-radio-button>
                      <a-radio-button :disabled="cid == 0" value="c">
                        趋势
                      </a-radio-button>
                    </a-radio-group>
                  </div>
                </template>
                <div
                  class="
                    ranking-1fc99c22c900d9d31cb0ad2434ed4464
                    app-52b0e5c90604d59d1814f184d58e2033
                  "
                >
                  <van-button
                    round
                    icon="exchange"
                    size="small"
                    color="linear-gradient(to right, #fd6585, #0d25b9)"
                  >
                    切换视图 &nbsp;&nbsp;&nbsp;&nbsp;
                  </van-button>
                </div>
              </a-popover>
            </div>
          </div>
        </van-tab>

        <van-tab>
          <template #title>
            关系克制 (近期)&nbsp;<i class="vxe-icon--search" />
          </template>

          <div class="ranking-f0bce2ae24464a70a3e9e78a1c36eea0">
            <GuanXi
              v-if="tabsInfo.model == 1"
              :isSmallMode="isSmallMode"
              :heroName="heroName"
              :refresh="refresh || 0"
            />
          </div>
        </van-tab>

        <van-tab>
          <template #title>
            <div class="ranking-49d4c899070175b7649d7424a5d2ee41">
              <span>玩家 (非实时)&nbsp;</span>

              <a-tooltip :visible="showInfo.wanjiaTips" placement="bottomRight">
                <template slot="title">
                  <span>大佬们在玩什么</span>
                </template>
                <i class="vxe-icon--funnel" />
              </a-tooltip>
            </div>
          </template>

          <div class="ranking-c48b544672dab7bc931d3c19985856d6">
            <WanJia
              v-if="tabsInfo.model == 2"
              :isSmallMode="isSmallMode"
              :bid="bid || wjAreaTypeInfo.model"
              :refresh="refresh || 0"
            />
          </div>
        </van-tab>

        <van-tab title="装备 (近期)">
          <ZhuangBei
            v-if="tabsInfo.model == 3"
            :isSmallMode="isSmallMode"
            :refresh="refresh || 0"
          />
        </van-tab>

        <van-tab disabled>
          <template #title>牌子&nbsp;<i class="vxe-icon--funnel" /></template>

          <div class="ranking-02481dbde39222ea29fbc1d2f80b2885">
            <PaiZi
              v-if="tabsInfo.model == 4"
              :isSmallMode="isSmallMode"
              :bid="bid || pzAreaTypeInfo.model"
              :cid="cid || pzProvinceTypeInfo.model"
              :did="did || pzFightPowerTypeInfo.model"
              :refresh="refresh || 0"
            />
          </div>
        </van-tab>

        <van-tab>
          <template #title>内战&nbsp;<i class="vxe-icon--funnel" /></template>

          <div class="ranking-967b680d849350ecbc7c66ff16027608">
            <NeiZhan
              v-if="tabsInfo.model == 5"
              :isSmallMode="isSmallMode"
              :bid="bid || nzOrderInfo.model"
              :cid="cid || nzStatusInfo.model"
              :refresh="refresh || 0"
            />
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <AppHello v-if="viewInfo.model != 'b'" height="100px" />

    <van-popup
      v-model="showInfo.rankingSearch"
      v-if="showInfo.rankingSearch"
      class="
        app-69df17da0044a6e876b2afd3217d2564
        ranking-31c631534a3cec9ed2c5283f653a06aa
      "
    >
      <a-input-search
        :defaultValue="searchInfo.defaultValue"
        @search="onRankingSearch"
        enter-button
        placeholder="试一试搜索阿离"
      />
    </van-popup>

    <div class="ranking-851095463bdd8ecc4ef18c2b243949ce">
      <van-action-sheet
        v-model="showInfo.rankingFilterMenu"
        title="请选择"
        safe-area-inset-bottom
      >
        <template #default>
          <div class="ranking-22ae5d40867aec91fe193ba201bd3cec">
            <van-dropdown-menu class="ranking-fdb4c24dae49e3ec89942ac5d4893f4f">
              <van-dropdown-item
                v-if="bidInfo.options.length > 0"
                v-model="bidInfo.model"
                :options="bidInfo.options"
                @change="onDropdownMenuChange"
              />
              <van-dropdown-item
                v-if="cidInfo.options.length > 0"
                v-model="cidInfo.model"
                :options="cidInfo.options"
                @change="onDropdownMenuChange"
              />
              <van-dropdown-item
                v-if="didInfo.options.length > 0 && tabsInfo.model == 4"
                v-model="didInfo.model"
                :options="didInfo.options"
                @change="onDropdownMenuChange"
              />
            </van-dropdown-menu>
          </div>
          <div class="ranking-5728d19b81c17607842cb7befeef3152">
            <span
              class="ranking-4da12add5b0c1920dcde6c5627d30422"
              @click="
                $appPush({
                  path: '/search',
                  query: { q: '大佬们快来加群', refresh: 1 },
                })
              "
              >您的分享是我更新的动力 ( •̀ ω •́ )y</span
            >
          </div>
        </template>
      </van-action-sheet>
    </div>

    <div
      v-if="viewInfo.model == 'b'"
      class="ranking-ebf09abeb7c3db44741d328324915725"
    >
      <van-divider
        :style="{
          padding: '0 15px',
          color: 'rgb(243, 189, 103) !important',
          marginTop: '-3px',
          borderColor: 'rgb(243, 189, 103) !important',
        }"
        @click="$message.info($appMsg.info[1012])"
      >
        <van-tag
          round
          type="danger"
          class="ranking-4d09fbef1438e2b23375b87ba3e02942"
        >
          游客部分功能受限，登录后将自动解锁
        </van-tag>
      </van-divider>
    </div>
  </div>
</template>

<script>
import "echarts/lib/component/dataZoom";
import "echarts/lib/component/legendScroll";
import "echarts/lib/component/markLine";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/title";

import "v-charts/lib/style.css";
import "zrender/lib/svg/svg";

export default {
  name: "RankingHome",
  components: {
    DianFengSai: () => import("@/views/Ranking/DianFengSai.vue"),
    RankingGradient: () => import("@/components/Ranking/Gradient.vue"),
    RankingMigrationLine: () =>
      import("@/components/Ranking/MigrationLine.vue"),
    GuanXi: () => import("@/views/Ranking/GuanXi.vue"),
    WanJia: () => import("@/views/Ranking/WanJia.vue"),
    NeiZhan: () => import("@/views/Ranking/NeiZhan.vue"),
    ZhuangBei: () => import("@/views/Ranking/ZhuangBei.vue"),
    PaiZi: () => import("@/views/Ranking/PaiZi.vue"),
    AppHello: () => import("@/components/App/Hello.vue"),
  },
  watch: {
    $route: function (to) {
      let q = to.query;

      this.heroName = q.heroName || "";
      this.bid = parseInt(q.bid) || 0;
      this.cid = parseInt(q.cid) || 0;
      this.did = parseInt(q.did) || 0;
      this.refresh = parseInt(q.refresh) || 0;

      if (
        this.bid == 0 &&
        this.cid == 0 &&
        this.did == 0 &&
        this.viewInfo.model == "c"
      ) {
        this.viewInfo.model = "a";
      }
    },
  },
  data() {
    return {
      bid: 0,
      cid: 0,
      did: 0,
      refresh: 0,
      gc: "",
      heroName: "",
      isSmallMode: false,
      viewInfo: {
        model: "a",
      },
      searchInfo: {
        defaultValue: "",
      },
      tabsInfo: {
        model: 0,
      },
      showInfo: {
        dfsTips: true,
        skillTips: true,
        wanjiaTips: true,
        rankingSearch: false,
        rankingFilterMenu: false,
      },
      dfsAreaTypeInfo: {
        model: 0,
        options: [
          { value: 0, text: "全部 (昨日)" },
          { value: 1, text: "QQ (昨日)" },
          { value: 2, text: "WX (昨日)" },
          { value: 3, text: "上分推荐 (昨日)" },
          { value: 4, text: "全部 (最近 5 天)" },
          { value: 5, text: "全部 (最近 30 天)" },
        ],
      },
      dfsPositionTypeInfo: {
        model: 0,
        options: [
          { value: 0, text: "全部分路 ω' )و" },
          { value: 1, text: "对抗路" },
          { value: 2, text: "中路" },
          //{ value: 3, text: "对抗路 (坦克)" },
          { value: 4, text: "打野" },
          { value: 5, text: "发育路" },
          { value: 6, text: "游走" },
        ],
      },
      wjAreaTypeInfo: {
        model: 0,
        options: [
          { value: 0, text: "全部" },
          { value: 1, text: "安卓QQ" },
          { value: 2, text: "苹果QQ" },
          { value: 3, text: "安卓WX" },
          { value: 4, text: "苹果WX" },
        ],
      },
      pzAreaTypeInfo: {
        model: 0,
        options: [],
      },
      pzProvinceTypeInfo: {
        model: 0,
        options: [],
      },
      pzFightPowerTypeInfo: {
        model: 0,
        options: [],
      },
      nzOrderInfo: {
        model: 0,
        options: [
          { value: 0, text: "降序" },
          { value: 1, text: "升序" },
        ],
      },
      nzStatusInfo: {
        model: 0,
        options: [
          { value: 0, text: "全部" },
          { value: 1, text: "队列中" },
          { value: 2, text: "对局中" },
        ],
      },
      bidInfo: {
        model: 0,
        options: [],
      },
      cidInfo: {
        model: 0,
        options: [],
      },
      didInfo: {
        model: 0,
        options: [],
      },
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    initPage: function () {
      let q = this.$route.query,
        ls = this.$appConfigInfo,
        dfsTips = ls.tipsInfo.dfsTips || false,
        skillTips = ls.tipsInfo.skillTips || false,
        wanjiaTips = ls.tipsInfo.wanjiaTips || false;

      this.heroName = q.heroName || "";
      this.tabsInfo.model = parseInt(q.type) || 0;
      q.bid ? (this.bid = parseInt(q.bid)) : (this.bid = 0);
      q.cid ? (this.cid = parseInt(q.cid)) : (this.cid = 0);
      q.did ? (this.did = parseInt(q.did)) : (this.did = 0);
      q.gc ? (this.gc = q.gc) : (this.gc = "");

      if (!dfsTips || !skillTips || !wanjiaTips) {
        ls.tipsInfo.dfsTips = true;
        ls.tipsInfo.skillTips = true;
        ls.tipsInfo.wanjiaTips = true;
        this.$appSetLocalStorage("appConfigInfo", ls);

        setTimeout(() => {
          this.showInfo.dfsTips = false;
          this.showInfo.skillTips = false;
          this.showInfo.wanjiaTips = false;
        }, 15000);
      } else {
        this.showInfo.dfsTips = false;
        this.showInfo.skillTips = false;
        this.showInfo.wanjiaTips = false;
      }

      this.isSmallMode = ls.appInfo.isSmallMode;

      if (!ls.appInfo.isSmallMode && this.$appHeight < 575) {
        this.$dialog
          .confirm({
            title: "是否适配小屏?",
            message: "稍后可在【我的 - 通用 - 适配小屏】修改",
          })
          .then(() => {
            //on confirm
            this.isSmallMode = true;

            ls.appInfo.isSmallMode = this.isSmallMode;
            this.$appSetLocalStorage("appConfigInfo", ls);
          })
          .catch(() => {
            //on cancel
            this.isSmallMode = false;

            ls.appInfo.isSmallMode = this.isSmallMode;
            this.$appSetLocalStorage("appConfigInfo", ls);
          });
      }
    },
    onRankingTabsClick: function (e) {
      //let tabsInfo = this.tabsInfo;

      if (e == 0) {
        this.bidInfo = this.dfsAreaTypeInfo;
        this.cidInfo = this.dfsPositionTypeInfo;

        this.showInfo.rankingFilterMenu = true;
      }

      if (e == 1) {
        this.showInfo.rankingSearch = true;
      }

      if (e == 2) {
        this.bidInfo = this.wjAreaTypeInfo;

        this.showInfo.rankingFilterMenu = true;
      }

      if (e == 3) {
        //
      }

      if (e == 4) {
        let arrData_1 = [],
          arrData_2 = [],
          arrData_3 = [];
        this.$appColumnsInfo.areaType.map((x, i) => {
          arrData_1.push({ text: x, value: i });
        });
        this.pzAreaTypeInfo.options = arrData_1;

        this.$appColumnsInfo.provinceType.map((x, i) => {
          arrData_2.push({ text: x, value: i });
        });
        this.pzProvinceTypeInfo.options = arrData_2;

        this.$appColumnsInfo.fightPowerType.text.map((x, i) => {
          arrData_3.push({ text: x, value: i });
        });
        this.pzFightPowerTypeInfo.options = arrData_3;

        this.bidInfo = this.pzAreaTypeInfo;
        this.cidInfo = this.pzProvinceTypeInfo;
        this.didInfo = this.pzFightPowerTypeInfo;

        this.showInfo.rankingFilterMenu = true;
      }

      if (e == 5) {
        this.bidInfo = this.nzOrderInfo;
        this.cidInfo = this.nzStatusInfo;

        this.showInfo.rankingFilterMenu = true;
      }

      //this.$appPush({ query: { type: tabsInfo.model } });
    },
    onRadioChange: function (e) {
      this.viewInfo.model = e.target.value;
    },
    onDropdownMenuChange: function () {
      let tabsInfo = this.tabsInfo,
        bidInfo = this.bidInfo,
        cidInfo = this.cidInfo,
        didInfo = this.didInfo;

      if (tabsInfo.model == 0) {
        this.dfsAreaTypeInfo.model = bidInfo.model;
        this.dfsPositionTypeInfo.model = cidInfo.model;
      }

      if (tabsInfo.model == 1) {
        //
      }

      if (tabsInfo.model == 2) {
        this.wjAreaTypeInfo.model = bidInfo.model;
      }

      if (tabsInfo.model == 3) {
        //
      }

      if (tabsInfo.model == 4) {
        this.pzAreaTypeInfo.model = bidInfo.model;
        this.pzProvinceTypeInfo.model = cidInfo.model;
        this.pzFightPowerTypeInfo.model = didInfo.model;
      }

      if (tabsInfo.model == 5) {
        this.nzOrderInfo.model = bidInfo.model;
        this.nzStatusInfo.model = cidInfo.model;
      }

      this.$appPush({
        query: {
          type: tabsInfo.model,
          bid: bidInfo.model,
          cid: cidInfo.model,
          did: didInfo.model,
          gc: this.gc,
          refresh: 1,
        },
      });

      if (tabsInfo.model != 4) {
        this.showInfo.rankingFilterMenu = false;
      }
    },
    onRankingSearch: function (value) {
      this.$appPush({
        query: {
          type: 1,
          heroName: value,
          refresh: 1,
        },
      });

      this.searchInfo.defaultValue = value;

      this.showInfo.rankingSearch = false;
    },
  },
};
</script>

<style lang="less">
.vxe-cell,
.vxe-cell--label {
  font-family: monospace;
}

img.ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3 {
  border-radius: @app-border-radius;
}

img.ranking-be66eb32605e1f12853a2ad4ac9ccddc {
  border-radius: unset;
  margin-left: -10px;
  margin-top: -8px;
  position: absolute;
}

img.ranking-e49cd5784f7893174dadee338fd0e61b {
  position: absolute;
  margin-top: -10px;
  margin-left: -5px;
}

img.ranking-a548cbd20a565cc98caf397c9bfd7cdb {
  border-radius: 100%;
}

ul.ranking-f138efce9d200665110c7c47b8a57811 {
  display: initial;
}

li.ranking-80ef788ee63a7ce63e7ad1403967bf11 {
  float: left;
  width: 40px;
  margin: 0 10px;
}

span.ranking-80ef788ee63a7ce63e7ad1403967bf11 {
  margin: 0 10px;
  white-space: nowrap;
}

span.ranking-4da12add5b0c1920dcde6c5627d30422 {
  margin: 50px 0;
  left: 0;
  position: absolute;
  width: 100%;
}

span.ranking-7de1b8678bf87a631bd5f2c2b70a1214 {
  font-size: @app-font-size + 2px;
  margin-top: 25px;
  position: absolute;
}

span.ranking-5cb6f4cb579d8c69b973e0fec7239056 {
  color: red !important;
  font-size: @app-font-size;
  margin-left: -10px;
  margin-top: 10px;
  position: absolute;
}

div.vxe-table--main-wrapper {
  margin-top: -3px;
}

div.vxe-custom--option-wrapper {
  left: 0;
  margin: 15px 0 0 0;
  width: 215px;
}

td.vxe-body--column {
  padding: 12px 0;

  div.vxe-cell {
    font-size: 15px;
  }
}

td.vxe-body--cloumn .vxe-table.virtual--x .col--ellipsis .vxe-cell,
.vxe-table.virtual--y .col--ellipsis .vxe-cell {
  max-height: unset;
}

td.app-bda9643ac6601722a28f238714274da4 div.vxe-cell,
td.app-ee3e4aec9bcaaaf72cd0c59e8a0f477d div.vxe-cell,
td.app-48d6215903dff56238e52e8891380c8f div.vxe-cell,
td.app-9f27410725ab8cc8854a2769c7a516b8 div.vxe-cell {
  font-size: @app-font-size + 8px;
}

div.ranking-home {
  div.van-dropdown-menu__bar {
    box-shadow: unset;
  }
}

div.ranking-progress {
  margin-top: 3px;
  position: absolute;
}

div.ranking-d742492b2526d57a222af9b54040b3b4 {
  left: 0;
  position: absolute;
  top: 25px;
  width: 100%;
  z-index: 99999999 !important;
}

div.ranking-2862744e5d7cce9d070aa41172557d78 {
  margin-top: 50px;
  font-size: @app-font-size;
}

div.ranking-51c877f489423eb1c3901dd0e12c03d4 {
  font-size: @app-font-size;
  position: absolute;
  bottom: -19px;
  width: 100%;
}

div.ranking-0e1a8b3f7f6162bf4b88d3d001b88374 {
  font-size: @app-font-size;
  left: -28px;
  width: 100%;
  margin-top: -10px;
  position: absolute;
}

div.ranking-abb5cb2b15eb9ccfe416f0ba3da3499e {
  position: absolute;
  margin: 0 auto;
  height: 225px;
  width: 100%;
  margin-top: 25px;
}

div.ranking-8747b0956746ca03e56e59d7312efcb1 {
  height: 587px;
}

div.ranking-561f33b3e8f36a8c9cdf1a5a3b099497 {
  font-size: @app-font-size;
  margin-top: 3px;
  position: absolute;
  width: 100%;
}

div.ranking-3ab42c8325a264730406e37e1f731f70 {
  overflow: hidden;
  height: 300px;
  width: 100%;

  canvas {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }
}

div.ranking-420e569f7ae439ae256513412631f2f4 {
  font-size: @app-font-size;
  left: 0;
  margin: 0 auto;
  margin-top: -3px;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  width: 100%;
}

div.ranking-a6c2fcca8d40c28ed46b93c2c629f0ae {
  font-size: @app-font-size + 3px;
}

div.ranking-8d583d7c052e343e6817b99812fa03b6 {
  left: 60px !important;
  top: 205px !important;
}

div.ranking-ed3451c988256d717ce6e41d24da7e45 {
  left: unset !important;
  right: 10px !important;
}

div.ranking-a9b4432c8e9b49bafa0a23e52d970016 {
  div.van-tabs__nav {
    z-index: @app-z-index;
  }
}

div.ranking-ebf09abeb7c3db44741d328324915725 {
  margin-top: 5px;
  position: absolute;
  width: 100%;
}

div.ranking-e20c0bfa2eeda7a13463d390a5bbfc4f {
  left: -3px;
  margin-top: 9px;
  position: absolute;
  z-index: 10 !important;

  i.vxe-button--icon.vxe-icon--menu {
    bottom: 1px;
  }
}

div.ranking-5728d19b81c17607842cb7befeef3152 {
  padding-top: 25px;
  height: 375px;
}

div.ranking-31c631534a3cec9ed2c5283f653a06aa {
  top: 150px;
}

/*
*
* 缩小前的
*
*/

div.ranking-e10ca73b79369d2183f81ca10fb587af {
  img.ranking-3d5f1ffeadf58eb64ef57aef7e53a31e {
    margin-left: 30px;
    margin-top: -12px;
    position: absolute;
    z-index: @app-z-index;
  }
}

div.ranking-713dd4d0b2e842c08da62ddeec872331 {
  position: absolute;

  img.ranking-95a25d46f98b0ec553d892cc45037d57 {
    margin-top: -15px;
    position: absolute;
  }

  img.ranking-35af5e6c0fc290aa4f2e38d4c8296a03 {
    left: -7px;
  }

  img.ranking-fbfe7b256ce6b4df1d03d8022163c6d2 {
    left: 47px;
  }

  span.ranking-043052eea2d064cab23119e56f4f640e {
    left: -22px;
  }

  span.ranking-dabb6e25dffefe5b4821b7062afbdaef {
    left: 28px;
  }
}

div.ranking-78117a02d15f1dffe5263f47a220c56b {
  span.ranking-f58cc48f5b942c91e57eff48accc5151 {
    margin-left: -50px;
    top: 50px;
  }
}

/*
*
* 缩小后的
*
*/

div.ranking-0b22b207c2b785ceff7a241980f23d14 {
  img.ranking-35af5e6c0fc290aa4f2e38d4c8296a03 {
    left: -3px;
  }

  img.ranking-fbfe7b256ce6b4df1d03d8022163c6d2 {
    left: 43px;
  }

  span.ranking-043052eea2d064cab23119e56f4f640e {
    left: -20px;
  }

  span.ranking-dabb6e25dffefe5b4821b7062afbdaef {
    left: 27px;
  }
}

div.ranking-5d308b6a0da77ffb33c63fc542f58746 {
  span.ranking-f58cc48f5b942c91e57eff48accc5151 {
    margin-left: -43px;
    position: absolute;
    top: 35px;
  }
}

div.ranking-87714e7bd6c0d80c7bbdb69629b5a80d {
  position: fixed;
  right: -15px;
  z-index: 10 !important;
}
</style>