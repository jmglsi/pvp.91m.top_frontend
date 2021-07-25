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
              <span>巅峰赛 (顶端局)&nbsp;</span>

              <a-tooltip :visible="showInfo.dfsTips" placement="bottomRight">
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
                <a-tooltip
                  :visible="showInfo.skillTips"
                  overlayClassName="ranking-8d583d7c052e343e6817b99812fa03b6"
                  placement="left"
                >
                  <template slot="title">
                    <span>左侧查看出装，右侧搜索舆论</span>
                  </template>

                  <DianFengSai
                    :isSmallMobile="isSmallMobile"
                    :bid="bid || dfsAreaTypeInfo.model"
                    :cid="cid || dfsPositionTypeInfo.model"
                  />
                </a-tooltip>
              </div>

              <div v-else-if="viewInfo.model == 'b'">
                <RankingGradient
                  :bid="bid || dfsAreaTypeInfo.model"
                  :cid="cid || dfsPositionTypeInfo.model"
                />
              </div>

              <div v-else-if="viewInfo.model == 'c'">
                <RankingLine :bid="cid || dfsPositionTypeInfo.model" />
              </div>
            </div>

            <div
              v-if="cid > 0 || dfsPositionTypeInfo.model > 0"
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
                      <a-radio-button value="a">排行</a-radio-button>
                      <a-radio-button value="b">梯度</a-radio-button>
                      <a-radio-button value="c">趋势</a-radio-button>
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
            关系和克制 (近期)&nbsp;<i class="vxe-icon--search" />
          </template>

          <div>
            <GuanXi
              v-if="tabsInfo.model == 1"
              :isSmallMobile="isSmallMobile"
              :heroName="heroName"
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

          <div>
            <WanJia
              v-if="tabsInfo.model == 2"
              :isSmallMobile="isSmallMobile"
              :bid="bid || wjAreaTypeInfo.model"
            />
          </div>
        </van-tab>

        <van-tab title="装备 (近期)">
          <ZhuangBei
            v-if="tabsInfo.model == 3"
            :isSmallMobile="isSmallMobile"
          />
        </van-tab>

        <van-tab>
          <template #title>牌子&nbsp;<i class="vxe-icon--funnel" /></template>

          <div>
            <PaiZi
              v-if="tabsInfo.model == 4"
              :isSmallMobile="isSmallMobile"
              :bid="bid || pzAreaTypeInfo.model"
              :cid="cid || pzProvinceTypeInfo.model"
              :did="did || pzFightPowerTypeInfo.model"
            />
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <div v-if="viewInfo.model != 'a'">
      <AppHello height="100px" />
    </div>

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
        placeholder="试试搜索英雄的外号~"
      />
    </van-popup>

    <div class="ranking-851095463bdd8ecc4ef18c2b243949ce">
      <van-action-sheet
        v-model="showInfo.rankingFilterMenu"
        title="请选择"
        safe-area-inset-bottom
      >
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
      </van-action-sheet>
    </div>

    <div
      v-if="viewInfo.model == 'a'"
      class="ranking-ebf09abeb7c3db44741d328324915725"
    >
      <van-divider
        :style="{
          padding: '0 15px',
          color: 'rgb(243,189,103)',
          marginTop: '-3px',
          borderColor: 'rgb(243,189,103)',
        }"
        @click="$message.info(this.$appMsg.info[1012])"
      >
        <van-tag
          round
          type="danger"
          class="ranking-4d09fbef1438e2b23375b87ba3e02942"
          >游客部分功能将受限,登录后解锁</van-tag
        >
      </van-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: "RankingHome",
  components: {
    DianFengSai: () => import("@/views/Ranking/DianFengSai.vue"),
    RankingGradient: () => import("@/components/Ranking/Gradient.vue"),
    RankingLine: () => import("@/components/Ranking/Line.vue"),
    GuanXi: () => import("@/views/Ranking/GuanXi.vue"),
    WanJia: () => import("@/views/Ranking/WanJia.vue"),
    ZhuangBei: () => import("@/views/Ranking/ZhuangBei.vue"),
    PaiZi: () => import("@/views/Ranking/PaiZi.vue"),
    AppHello: () => import("@/components/App/Hello.vue"),
  },
  watch: {
    $route: function (to) {
      this.heroName = to.query.heroName || "";
      this.bid = parseInt(to.query.bid) || 0;
      this.cid = parseInt(to.query.cid) || 0;
      this.did = parseInt(to.query.did) || 0;

      if (this.bid == 0 && this.cid == 0 && this.did == 0) {
        this.viewInfo.model = "a";
      }

      if (parseInt(to.query.refresh) == 1) {
        this.tabsInfo.model = parseInt(to.query.type) || 0;
      }
    },
  },
  data() {
    return {
      bid: 0,
      cid: 0,
      did: 0,
      heroName: "",
      isSmallMobile: 0,
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
          { text: "全部 (昨日)", value: 0 },
          { text: "QQ (昨日)", value: 1 },
          { text: "WX (昨日)", value: 2 },
          { text: "版本答案 (昨日)", value: 3 },
          { text: "全部 (上周)", value: 4 },
          { text: "全部 (上月)", value: 5 },
        ],
      },
      dfsPositionTypeInfo: {
        model: 0,
        options: [
          { text: "全部分路 ω' )و", value: 0 },
          { text: "对抗路 (战士)", value: 1 },
          { text: "中路", value: 2 },
          { text: "对抗路 (坦克)", value: 3 },
          { text: "打野", value: 4 },
          { text: "发育路", value: 5 },
          { text: "游走", value: 6 },
        ],
      },
      wjAreaTypeInfo: {
        model: 0,
        options: [
          { text: "全部", value: 0 },
          { text: "安卓QQ", value: 1 },
          { text: "苹果QQ", value: 2 },
          { text: "安卓WX", value: 3 },
          { text: "苹果WX", value: 4 },
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
  mounted() {
    this.initPage();
  },
  methods: {
    initPage: function () {
      let route = this.$route.query,
        appConfigInfo = this.$appConfigInfo,
        dfsTips = appConfigInfo.tipsInfo.dfsTips || 0,
        skillTips = appConfigInfo.tipsInfo.skillTips || 0,
        wanjiaTips = appConfigInfo.tipsInfo.wanjiaTips || 0;

      this.heroName = route.heroName || "";
      this.tabsInfo.model = parseInt(route.type) || 0;
      route.bid ? (this.bid = parseInt(route.bid)) : (this.bid = 0);
      route.cid ? (this.cid = parseInt(route.cid)) : (this.cid = 0);
      route.did ? (this.did = parseInt(route.did)) : (this.did = 0);

      if (dfsTips == 0 || skillTips == 0 || wanjiaTips == 0) {
        appConfigInfo.tipsInfo.dfsTips = 1;
        appConfigInfo.tipsInfo.skillTips = 1;
        appConfigInfo.tipsInfo.wanjiaTips = 1;
        this.$appSetLocalStorage("appConfigInfo", appConfigInfo);

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

      if (appConfigInfo.appInfo.isSmallMobile == 0 && this.$appHeight < 575) {
        this.$dialog
          .confirm({
            title: "是否适配小屏?",
            message: "稍后可在【我的 - 通用 - 适配小屏】修改",
          })
          .then(() => {
            // on confirm
            this.isSmallMobile = 1;

            appConfigInfo.appInfo.isSmallMobile = this.isSmallMobile;
            this.$appSetLocalStorage("appConfigInfo", appConfigInfo);
          })
          .catch(() => {
            // on cancel
            this.isSmallMobile = 0;

            appConfigInfo.appInfo.isSmallMobile = this.isSmallMobile;
            this.$appSetLocalStorage("appConfigInfo", appConfigInfo);
          });
      } else {
        this.isSmallMobile = appConfigInfo.appInfo.isSmallMobile;
      }
    },
    onRankingTabsClick: function (e) {
      let tabsInfo = this.tabsInfo;

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

      this.$appPush({ query: { type: tabsInfo.model } });
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

      if (tabsInfo.model == 2) {
        this.wjAreaTypeInfo.model = bidInfo.model;
      }

      if (tabsInfo.model == 4) {
        this.pzAreaTypeInfo.model = bidInfo.model;
        this.pzProvinceTypeInfo.model = cidInfo.model;
        this.pzFightPowerTypeInfo.model = didInfo.model;
      }

      this.$appPush({
        query: {
          type: tabsInfo.model,
          bid: bidInfo.model,
          cid: cidInfo.model,
          did: didInfo.model,
          refresh: 1,
        },
      });

      if (tabsInfo.model != 4) {
        this.showInfo.rankingFilterMenu = false;
      }
    },
    onRankingSearch: function (value) {
      this.$appPush({
        query: { type: 1, heroName: value, refresh: 1 },
      });

      this.searchInfo.defaultValue = value;

      this.showInfo.rankingSearch = false;
    },
  },
};
</script>

<style lang="less">
.ranking-bda9643ac6601722a28f238714274da4 {
  color: red;
}

.ranking-ee3e4aec9bcaaaf72cd0c59e8a0f477d {
  color: orange;
}

.ranking-48d6215903dff56238e52e8891380c8f {
  color: blue;
}

.ranking-9f27410725ab8cc8854a2769c7a516b8 {
  color: green;
}

img.ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3 {
  border-radius: @app-border-radius;
}

img.ranking-be66eb32605e1f12853a2ad4ac9ccddc {
  border-radius: unset;
  margin-left: -14px;
  margin-top: -8px;
  position: absolute;
}

span.ranking-80ef788ee63a7ce63e7ad1403967bf11 {
  margin: 0 10px;
  white-space: nowrap;
}

span.ranking-f58cc48f5b942c91e57eff48accc5151 {
  margin-left: -50px;
  top: 62px;
}

span.ranking-4da12add5b0c1920dcde6c5627d30422 {
  margin: 50px 0;
  left: 0;
  position: absolute;
  width: 100%;
}

span.ranking-7de1b8678bf87a631bd5f2c2b70a1214 {
  position: absolute;
  font-size: 10px;
  margin-left: -34px;
  margin-top: 30px;
}

span.ranking-5cb6f4cb579d8c69b973e0fec7239056 {
  color: red;
  font-size: @app-font-size;
  margin-left: -10px;
  margin-top: 9px;
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
    font-size: @app-font-size + 5px;
  }
}

td.vxe-body--cloumn .vxe-table.virtual--x .col--ellipsis .vxe-cell,
.vxe-table.virtual--y .col--ellipsis .vxe-cell {
  max-height: unset;
}

td.ranking-bda9643ac6601722a28f238714274da4 div.vxe-cell,
td.ranking-ee3e4aec9bcaaaf72cd0c59e8a0f477d div.vxe-cell,
td.ranking-48d6215903dff56238e52e8891380c8f div.vxe-cell,
td.ranking-9f27410725ab8cc8854a2769c7a516b8 div.vxe-cell {
  font-size: @app-font-size + 10px;
}

div.ranking-home {
  div.van-dropdown-menu__bar {
    box-shadow: unset;
  }
}

div.ranking-gradient {
  div.van-cell-group,
  div.van-cell {
    background-color: transparent !important;
  }
}

div.ranking-abb5cb2b15eb9ccfe416f0ba3da3499e {
  position: absolute;
  margin: 0 auto;
  margin-top: 0px;
  height: 150px;
  width: 100%;
  margin-top: 50px;
}

div.ranking-3ab42c8325a264730406e37e1f731f70 {
  overflow: hidden;
  height: 300px;
  width: 100%;
}

div.ranking-420e569f7ae439ae256513412631f2f4 {
  font-size: @app-font-size;
  position: absolute;
  left: 0;
  margin: 0 auto;
  margin-top: -5px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
}

div.ranking-a6c2fcca8d40c28ed46b93c2c629f0ae {
  font-size: 13px;
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
    z-index: 1;
  }
}

div.ranking-ebf09abeb7c3db44741d328324915725 {
  margin-top: 5px;
  position: absolute;
  width: 100%;
}

div.ranking-e20c0bfa2eeda7a13463d390a5bbfc4f {
  left: -3px;
  margin-top: 12px;
  position: absolute;
  z-index: 2;

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
    margin-left: -2px;
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
    top: 62px;
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
    top: 47px;
  }
}

div.ranking-87714e7bd6c0d80c7bbdb69629b5a80d {
  position: fixed;
  right: -15px;
  z-index: 10;
}
</style>