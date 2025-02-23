<template>
  <div class="ranking-index">
    <div class="ranking-a9b4432c8e9b49bafa0a23e52d970016">
      <van-tabs
        v-model="tabsInfo.model"
        v-if="tabsInfo.model > -1"
        :border="false"
        :ellipsis="false"
        @click="onTabsClick"
        duration="0.5"
        line-width="25px"
      >
        <van-tab :disabled="$appGameType != 'wzry'">
          <template #title>
            <div class="ranking-49d4c899070175b7649d7424a5d2ee41">
              <span>英雄排行&nbsp;</span>

              <a-tooltip
                :visible="showInfo.gameTips"
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
                <GameWzryRankingTiDu
                  :bid="bid || wzryAreaTypeInfo.model"
                  :cid="cid || wzryPositionTypeInfo.model"
                />
              </div>

              <div v-else-if="viewInfo.model == 'b'">
                <a-tooltip
                  :visible="showInfo.extraTips"
                  overlayClassName="ranking-8d583d7c052e343e6817b99812fa03b6"
                  placement="left"
                >
                  <template slot="title">
                    <span>左侧查看备战，右侧搜索舆论</span>
                  </template>

                  <GameWzryRanking
                    :isSmallMode="isSmallMode"
                    :bid="bid || wzryAreaTypeInfo.model"
                    :cid="cid || wzryPositionTypeInfo.model"
                    :did="did || Number($appConfigInfo.appInfo.isSwingMode)"
                    :refresh="refresh || 0"
                  />
                </a-tooltip>
              </div>

              <div v-else-if="viewInfo.model == 'c'">
                <ChartsWzryMigrationLine
                  :bid="cid || wzryPositionTypeInfo.model"
                />
              </div>

              <div v-else-if="viewInfo.model == 'd'">
                <ChartsWzryFightPowerLine
                  :bid="cid || wzryPositionTypeInfo.model"
                />
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
              <van-popover
                v-model="showInfo.popoverMeau"
                :get-container="getContainer"
                trigger="click"
                placement="bottom-end"
              >
                <template #reference>
                  <span>
                    <div
                      class="ranking-1fc99c22c900d9d31cb0ad2434ed4464 app-52b0e5c90604d59d1814f184d58e2033"
                    >
                      <van-button
                        round
                        icon="exchange"
                        size="small"
                        color="linear-gradient(to right, #fd6585, #0d25b9)"
                      >
                        {{ $t("switch-view") }} &nbsp;&nbsp;&nbsp;&nbsp;
                      </van-button>
                    </div>
                  </span>
                </template>

                <span>
                  <div class="ranking-e1c6b759e0537c91d5c6dbb2d4738173">
                    <a-radio-group
                      :value="viewInfo.model"
                      @change="onRadioGroupChange"
                      default-value="a"
                      button-style="solid"
                    >
                      <a-radio-button value="a">梯度</a-radio-button>
                      <a-radio-button value="b">排行</a-radio-button>
                      <a-radio-button value="c" :disabled="cid == 0">
                        迁徙
                      </a-radio-button>
                      <a-radio-button value="d" :disabled="cid == 0">
                        战力
                      </a-radio-button>
                    </a-radio-group>
                  </div>
                </span>
              </van-popover>
            </div>
          </div>
        </van-tab>

        <van-tab :disabled="$appGameType != 'wzry'">
          <template #title>
            战力排行&nbsp;<i class="vxe-icon--funnel" />
          </template>

          <div class="ranking-f0bce2ae24464a70a3e9e78a1c36eea0">
            <GameWzryRankingZhanLi
              v-if="tabsInfo.model == 1"
              :bid="bid || wzryFightPowerTypeInfo.model"
              :cid="cid || wzryPositionTypeInfo.model"
              :isSmallMode="isSmallMode"
              :refresh="refresh || 0"
            />
          </div>
        </van-tab>

        <van-tab :disabled="$appGameType != 'wzry'">
          <template #title>
            <div class="ranking-49d4c899070175b7649d7424a5d2ee41">
              <span>玩家排行&nbsp;</span>

              <a-tooltip :visible="showInfo.playerTips" placement="bottomRight">
                <template slot="title">
                  <span>大佬们在玩什么</span>
                </template>
                <i class="vxe-icon--funnel" />
              </a-tooltip>
            </div>
          </template>

          <div class="ranking-c48b544672dab7bc931d3c19985856d6">
            <GameWzryRankingWanJia
              v-if="tabsInfo.model == 2"
              :isSmallMode="isSmallMode"
              :bid="bid || wzryPlayerAreaTypeInfo.model"
              :refresh="refresh || 0"
            />
          </div>
        </van-tab>

        <van-tab>
          <template #title>
            装备库&nbsp;<i class="vxe-icon--funnel" />
          </template>

          <div
            v-if="gameEquipmentSelectInfo.model == 1"
            class="ranking-7e3bb7a1e300ab761a82ac7f1df82e8a"
          >
            <GameWzryRankingZhuangBeiKu
              v-if="tabsInfo.model == 3"
              :isSmallMode="isSmallMode"
              :refresh="refresh || 0"
            />
          </div>

          <div
            v-else-if="gameEquipmentSelectInfo.model == 2"
            class="ranking-7e3bb7a1e300ab761a82ac7f1df82e8a"
          >
            <GameJccRankingZhuangBeiKu
              v-if="tabsInfo.model == 3"
              :isSmallMode="isSmallMode"
              :refresh="refresh || 0"
            />
          </div>

          <div v-else class="ranking-689fdaf6324c0a1d4369c477538a4c63">
            上方选择游戏 或 等待内容更新 :D
          </div>
        </van-tab>

        <van-tab :disabled="$appGameType != 'wzry'">
          <template #title>
            关系库&nbsp;<i class="vxe-icon--search" />
          </template>

          <div class="ranking-f0bce2ae24464a70a3e9e78a1c36eea0">
            <GameWzryRankingGuanXiKu
              v-if="tabsInfo.model == 4"
              :isSmallMode="isSmallMode"
              :heroName="heroName"
              :refresh="refresh || 0"
            />
          </div>
        </van-tab>

        <van-tab :disabled="$appGameType != 'jcc'">
          <template #title>
            弈子排行&nbsp;<i class="vxe-icon--funnel" />
          </template>

          <GameJccRanking :isSmallMode="isSmallMode" :refresh="refresh || 0" />
        </van-tab>

        <van-tab :disabled="$appGameType != 'jcc'">
          <template #title>
            强化符文&nbsp;<i class="vxe-icon--funnel" />
          </template>

          <GameJccRankingQiangHuaFuWen
            :isSmallMode="isSmallMode"
            :refresh="refresh || 0"
          />
        </van-tab>

        <van-tab disabled title="内容待定"></van-tab>

        <!--
        <van-tab>
          <template #title>内战&nbsp;<i class="vxe-icon--funnel" /></template>

          <div class="ranking-967b680d849350ecbc7c66ff16027608">
            <GameWzryRankingNeiZhan
              v-if="tabsInfo.model == 6"
              :isSmallMode="isSmallMode"
              :bid="bid || nzOrderInfo.model"
              :cid="cid || nzStatusInfo.model"
              :refresh="refresh || 0"
            />
          </div>
        </van-tab>
        -->
      </van-tabs>
    </div>

    <!--
    <AppHello v-if="viewInfo.model != 'b'" height="100px" />
    -->

    <van-popup
      v-model="showInfo.popup"
      v-if="showInfo.popup"
      class="app-69df17da0044a6e876b2afd3217d2564 ranking-31c631534a3cec9ed2c5283f653a06aa"
    >
      <a-input-search
        :default-value="searchInfo.defaultValue"
        @search="onInputSearch"
        enter-button
        placeholder="试一试搜索阿离"
      />
    </van-popup>

    <div class="ranking-851095463bdd8ecc4ef18c2b243949ce">
      <van-action-sheet
        v-model="showInfo.actionSheet"
        :title="$t('how-to-operate')"
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
                v-if="didInfo.options.length > 0"
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
                  query: {
                    q: '大佬们快来加群',
                    refresh: 1,
                  },
                })
              "
            >
              您的分享是我更新的动力 ( •̀ ω •́ )y
            </span>
          </div>
        </template>
      </van-action-sheet>
    </div>

    <div class="ranking-ebf09abeb7c3db44741d328324915725">
      <van-divider
        :style="{
          padding: '0 15px',
          color: 'rgb(243, 189, 103) !important',
          marginTop: '-3px',
          borderColor: 'rgb(243, 189, 103) !important',
        }"
        @click="$message.info($appMsg.info[1012])"
      >
        您的分享是我更新的动力
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

export default {
  name: "rankingIndex",
  components: {
    //AppHello: () => import("@/components/App/Hello.vue"),
    ChartsWzryMigrationLine: () =>
      import("@/components/Charts/Wzry/MigrationLine.vue"),
    ChartsWzryFightPowerLine: () =>
      import("@/components/Charts/Wzry/FightPowerLine.vue"),
    GameWzryRanking: () => import("@/views/Ranking/Wzry/Game.vue"),
    GameWzryRankingTiDu: () => import("@/views/Ranking/Wzry/TiDu.vue"),
    GameWzryRankingZhanLi: () => import("@/views/Ranking/Wzry/ZhanLi.vue"),
    GameWzryRankingGuanXiKu: () => import("@/views/Ranking/Wzry/GuanXiKu.vue"),
    GameWzryRankingWanJia: () => import("@/views/Ranking/Wzry/WanJia.vue"),
    GameWzryRankingZhuangBeiKu: () =>
      import("@/views/Ranking/Wzry/ZhuangBeiKu.vue"),
    GameJccRankingZhuangBeiKu: () =>
      import("@/views/Ranking/Jcc/ZhuangBeiKu.vue"),
    GameJccRankingQiangHuaFuWen: () =>
      import("@/views/Ranking/Jcc/QiangHuaFuWen.vue"),
    GameJccRanking: () => import("@/views/Ranking/Jcc/Game.vue"),
    //GameWzryRankingNeiZhan: () => import("@/views/Ranking/NeiZhan.vue"),
    //GameWzryRankingPaiZi: () => import("@/views/Ranking/PaiZi.vue"),
  },
  watch: {
    $route: function (to) {
      let q = to.query;

      if (q) {
        this.initShow(q);
      }
    },
  },
  data() {
    return {
      bid: 0,
      cid: 0,
      did: 0,
      gc: "",
      refresh: 0,
      heroName: "",
      isSmallMode: false,
      viewInfo: {
        model: this.$route.query.eid || "a",
      },
      searchInfo: {
        defaultValue: "",
      },
      tabsInfo: {
        model: 0,
      },
      showInfo: {
        actionSheet: false,
        popup: false,
        gameTips: true,
        extraTips: true,
        playerTips: true,
        popoverMeau: false,
      },
      wzryAreaTypeInfo: {
        model: 0,
        options: [
          { value: 0, text: "全部 (昨日)" },
          { value: 1, text: "QQ (昨日)" },
          { value: 2, text: "WX (昨日)" },
          { value: 3, text: "上分推荐 (昨日)" },
          { value: 4, text: "全部 (最近 6 天)" },
          { value: 5, text: "全部 (最近 30 天)" },
          { value: 6, text: "我关注的" },
        ],
      },
      wzryFightPowerTypeInfo: {
        model: 0,
        options: [
          { value: 0, text: "全部" },
          { value: 1, text: "安卓 QQ" },
          { value: 2, text: "苹果 QQ" },
          { value: 3, text: "安卓 WX" },
          { value: 4, text: "苹果 WX" },
        ],
      },
      wzryPositionTypeInfo: {
        model: 0,
        options: [
          { value: 0, text: "全部分路 ω' )و" },
          { value: 1, text: "对抗路" },
          { value: 2, text: "中路" },
          { value: 3, text: "发育路" },
          { value: 4, text: "打野" },
          { value: 5, text: "游走" },
        ],
      },
      wzryPlayerAreaTypeInfo: {
        model: 0,
        options: [
          { value: 0, text: "全部" },
          { value: 1, text: "安卓QQ" },
          { value: 2, text: "苹果QQ" },
          { value: 3, text: "安卓WX" },
          { value: 4, text: "苹果WX" },
        ],
      },
      gameEquipmentSelectInfo: {
        model: 0,
        options: [
          { value: 0, text: "请选择游戏" },
          { value: 1, text: "王者荣耀" },
          { value: 2, text: "金铲铲" },
          //{ value: 3, text: "逆水寒" },
        ],
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
  mounted() {
    let show = false;

    this.$appIsRobot ? (show = false) : (show = true);

    this.showInfo.popoverMeau = show;
  },
  methods: {
    initPage: function () {
      let q = this.$route.query,
        ls = this.$appConfigInfo,
        gameTips = ls.tipsInfo.gameTips || false,
        extraTips = ls.tipsInfo.extraTips || false,
        playerTips = ls.tipsInfo.playerTips || false;

      this.tabsInfo.model = Number(q.type) || 0;
      this.gameEquipmentSelectInfo.model = Number(q.bid) || 0;

      this.heroName = q.heroName || "";

      q.bid ? (this.bid = Number(q.bid)) : (this.bid = 0);
      q.cid ? (this.cid = Number(q.cid)) : (this.cid = 0);
      q.did ? (this.did = Number(q.did)) : (this.did = 0);
      q.gc ? (this.gc = q.gc) : (this.gc = "");

      if (!gameTips || !extraTips || !playerTips) {
        ls.tipsInfo.gameTips = true;
        ls.tipsInfo.extraTips = true;
        ls.tipsInfo.playerTips = true;
        this.$appSetLocalStorage("appConfigInfo", ls);

        setTimeout(() => {
          this.showInfo.gameTips = false;
          this.showInfo.extraTips = false;
          this.showInfo.playerTips = false;
        }, 1000 * 15);
      } else {
        this.showInfo.gameTips = false;
        this.showInfo.extraTips = false;
        this.showInfo.playerTips = false;
      }

      setTimeout(() => {
        this.showInfo.popoverMeau = false;
      }, 1000 * 5);

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
    initShow: function (q) {
      this.heroName = q.heroName || "";
      this.bid = Number(q.bid) || 0;
      this.cid = Number(q.cid) || 0;
      this.did = Number(q.did) || 0;
      this.viewInfo.model = q.eid || "a";
      this.refresh = Number(q.refresh) || 0;
    },
    onTabsClick: function (e) {
      if (e == 0) {
        /**
         *
         * 初始化菜单
         *
         */
        this.bidInfo = this.wzryAreaTypeInfo;
        this.cidInfo = this.wzryPositionTypeInfo;
        this.didInfo = {
          model: 0,
          options: [],
        };

        /**
         *
         * 同步选项
         *
         */
        this.wzryAreaTypeInfo.model = this.bid;
        this.wzryPositionTypeInfo.model = this.cid;

        this.showInfo.actionSheet = true;
      }

      if (e == 1) {
        this.bidInfo = this.wzryFightPowerTypeInfo;
        this.cidInfo = this.wzryPositionTypeInfo;

        this.wzryFightPowerTypeInfo.model = this.bid;
        this.wzryPositionTypeInfo.model = this.cid;

        this.showInfo.actionSheet = true;
      }

      if (e == 2) {
        this.bidInfo = this.wzryPlayerAreaTypeInfo;
        this.cidInfo = {
          model: 0,
          options: [],
        };
        this.didInfo = {
          model: 0,
          options: [],
        };

        this.wzryPlayerAreaTypeInfo.model = this.bid;

        this.showInfo.actionSheet = true;
      }

      if (e == 3) {
        this.bidInfo = this.gameEquipmentSelectInfo;
        this.cidInfo = {
          model: 0,
          options: [],
        };
        this.didInfo = {
          model: 0,
          options: [],
        };

        this.gameEquipmentSelectInfo.model = this.bid;

        this.showInfo.actionSheet = true;
      }

      if (e == 4) {
        this.showInfo.popup = true;
      }

      if (e == 5) {
        //
      }

      if (e == 6) {
        this.bidInfo = this.nzOrderInfo;
        this.cidInfo = this.nzStatusInfo;
        this.didInfo = {
          model: 0,
          options: [],
        };

        this.nzOrderInfo.model = this.bid;
        this.nzStatusInfo.model = this.cid;

        this.showInfo.actionSheet = true;
      }
    },
    onRadioGroupChange: function (e) {
      let tabsInfo = this.tabsInfo;

      this.viewInfo.model = e.target.value;

      this.$appPush({
        query: {
          type: tabsInfo.model,
          bid: this.bid,
          cid: this.cid,
          did: this.did,
          eid: this.viewInfo.model,
          refresh: 1,
        },
      });
    },
    onInputSearch: function (value) {
      this.$appPush({
        query: {
          type: 4,
          heroName: value,
          refresh: 1,
        },
      });

      this.searchInfo.defaultValue = value;

      this.showInfo.popup = false;
    },
    onDropdownMenuChange: function () {
      let tabsInfo = this.tabsInfo,
        bidInfo = this.bidInfo,
        cidInfo = this.cidInfo,
        didInfo = this.didInfo;

      if (tabsInfo.model == 0) {
        //
      }

      if (tabsInfo.model == 1) {
        //
      }

      if (tabsInfo.model == 2) {
        //
      }

      if (tabsInfo.model == 3) {
        //
      }

      if (tabsInfo.model == 4) {
        //
      }

      if (tabsInfo.model == 5) {
        //
      }

      if (tabsInfo.model == 6) {
        //
      }

      this.$appPush({
        query: {
          type: tabsInfo.model,
          bid: bidInfo.model,
          cid: cidInfo.model,
          did: didInfo.model,
          eid: this.viewInfo.model,
          //gc: this.gc,
          refresh: 1,
        },
      });

      //if (tabsInfo.model != 4) {
      this.showInfo.actionSheet = false;
      //}
    },
    getContainer: function () {
      return document.querySelector(".ranking-index");
    },
  },
};
</script>

<style lang="less">
.vxe-cell,
.vxe-cell--label {
  font-family: monospace;
}

img.ranking-be66eb32605e1f12853a2ad4ac9ccddc {
  border-radius: unset;
  margin-left: -10px;
  margin-top: -8px;
  position: absolute;
}

img.ranking-e49cd5784f7893174dadee338fd0e61b {
  margin-left: -5px;
  margin-top: -10px;
  position: absolute;
}

ul.ranking-f138efce9d200665110c7c47b8a57811 {
  display: initial;
}

li.ranking-80ef788ee63a7ce63e7ad1403967bf11 {
  float: left;
  margin: 0 10px;
  width: 40px;
}

span.ranking-4da12add5b0c1920dcde6c5627d30422 {
  left: 0;
  margin: 50px 0;
  position: absolute;
  width: 100%;
}

span.ranking-7de1b8678bf87a631bd5f2c2b70a1214 {
  font-size: 12px;
  margin-top: 25px;
  position: absolute;
}

span.ranking-5cb6f4cb579d8c69b973e0fec7239056 {
  color: red !important;
  font-size: @app-font-size;
  margin-left: -13px;
  margin-top: 20px;
  position: absolute;
}

span.ranking-7c7f825106f6288d7e5bea8012e23041 {
  font-size: 10px;
}

span.ranking-8302b5f225fa915b2cf1a42525d4e0d3 {
  position: absolute;
  font-size: 12px;
  left: 0;
  top: -15px;
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
  font-size: 18px;
}

div.ranking-index {
  div.van-dropdown-menu__bar {
    box-shadow: unset;
  }
}

div.ranking-progress {
  margin-top: 3px;
  position: absolute;
}

div.ranking-689fdaf6324c0a1d4369c477538a4c63 {
  margin: 50px;
  color: red;
}

div.ranking-e1c6b759e0537c91d5c6dbb2d4738173 {
  margin: 10px;
}

div.ranking-d742492b2526d57a222af9b54040b3b4 {
  left: 0;
  position: absolute;
  top: 25px;
  width: 100%;
  z-index: 99999999 !important;
}

div.ranking-f4a47ff1f3e53bfd1dabc667a6bdbc81 {
  display: inline-block;
}

div.ranking-51c877f489423eb1c3901dd0e12c03d4 {
  bottom: -19px;
  font-size: @app-font-size;
  position: absolute;
  width: 100%;
}

div.ranking-0e1a8b3f7f6162bf4b88d3d001b88374 {
  font-size: @app-font-size;
  left: -28px;
  margin-top: -10px;
  position: absolute;
  width: 100%;
}

div.ranking-abb5cb2b15eb9ccfe416f0ba3da3499e {
  height: 150px;
  margin: 0 auto;
  margin-top: 50px;
  position: absolute;
  width: 100%;
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
  height: 300px;
  overflow: hidden;
  width: 100%;

  canvas {
    height: 100% !important;
    object-fit: cover;
    width: 100% !important;
  }
}

div.ranking-420e569f7ae439ae256513412631f2f4 {
  font-size: @app-font-size;
  left: 0;
  margin: 0 auto;
  margin-top: -3px;
  position: absolute;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

div.ranking-a6c2fcca8d40c28ed46b93c2c629f0ae {
  font-size: 13px;
}

div.ranking-8d583d7c052e343e6817b99812fa03b6 {
  left: 60px !important;
  top: 205px !important;
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
  height: 375px;
  padding-top: 25px;
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

div.ranking-19c5e5344dbdca6ef8d9ba5d989aea4d {
  margin: 10px;
}
</style>