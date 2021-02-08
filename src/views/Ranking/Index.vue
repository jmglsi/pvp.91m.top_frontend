<template>
  <div class="ranking-home">
    <div class="ranking-a9b4432c8e9b49bafa0a23e52d970016">
      <van-tabs
        v-model="tabsInfo.model"
        v-if="tabsInfo.model > -1"
        :border="false"
        :ellipsis="false"
        :sticky="true"
        @click="onRankingTabsClick"
        duration="0.5"
        line-width="25px"
        color="orange"
        title-active-color="orange"
      >
        <van-tab>
          <template #title>
            巅峰赛 (顶端局) <i class="vxe-icon--funnel" />
            <div class="ranking-49d4c899070175b7649d7424a5d2ee41">
              <a-tooltip :visible="showInfo.filterTips" placement="bottomLeft">
                <template slot="title">
                  <span>筛选移到这里了哦</span>
                </template>
              </a-tooltip>
            </div>
          </template>
          <DianFengSai
            v-if="tabsInfo.model == 0"
            :isSmallMobile="isSmallMobile"
            :bid="dfsAreaInfo.model"
            :cid="dfsPositionInfo.model"
          />
        </van-tab>

        <van-tab title="关系和克制 (上周)">
          <GuanXi
            v-if="tabsInfo.model == 1"
            :isSmallMobile="isSmallMobile"
            :heroName="heroName"
          />
        </van-tab>

        <van-tab>
          <template #title
            >玩家 (非实时) <i class="vxe-icon--funnel"
          /></template>
          <WanJia
            v-if="tabsInfo.model == 2"
            :isSmallMobile="isSmallMobile"
            :bid="wjAreaInfo.model"
            :cid="wjShieldInfo.model"
          />
        </van-tab>

        <van-tab title="装备 (上周)">
          <ZhuangBei
            v-if="tabsInfo.model == 3"
            :isSmallMobile="isSmallMobile"
          />
        </van-tab>
      </van-tabs>
    </div>

    <div class="ranking-851095463bdd8ecc4ef18c2b243949ce">
      <van-action-sheet
        v-model="showInfo.filterMenu"
        title="请选择"
        safe-area-inset-bottom
      >
        <div class="ranking-22ae5d40867aec91fe193ba201bd3cec">
          <van-dropdown-menu class="ranking-fdb4c24dae49e3ec89942ac5d4893f4f">
            <van-dropdown-item
              v-model="bidInfo.model"
              :options="bidInfo.options"
              @change="onDropdownMenuChange"
            />
            <van-dropdown-item
              v-model="cidInfo.model"
              :options="cidInfo.options"
              @change="onDropdownMenuChange"
            />
          </van-dropdown-menu>
        </div>
        <div
          @click="
            $appPush({
              path: '/search',
              query: { q: '大佬们快来加群', refresh: 1 },
            })
          "
          class="ranking-5728d19b81c17607842cb7befeef3152"
        >
          <span class="ranking-4da12add5b0c1920dcde6c5627d30422"
            >您的分享是我更新的动力 ( •̀ ω •́ )y</span
          >
        </div>
      </van-action-sheet>
    </div>

    <div class="ranking-ebf09abeb7c3db44741d328324915725">
      <van-divider
        :style="{
          padding: '0 15px',
          color: 'rgb(243,189,103)',
          marginTop: '-3px',
          borderColor: 'rgb(243,189,103)',
        }"
        @click="$message.info(this.$appMsg.info[1012])"
        ><van-tag
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
    GuanXi: () => import("@/views/Ranking/GuanXi.vue"),
    WanJia: () => import("@/views/Ranking/WanJia.vue"),
    ZhuangBei: () => import("@/views/Ranking/ZhuangBei.vue"),
  },
  watch: {
    $route: function (to) {
      this.heroName = to.query.heroName || "";
      this.bid = parseInt(to.query.bid) || 0;
      this.cid = parseInt(to.query.cid) || 0;

      if (parseInt(to.query.refresh) == 1) {
        this.tabsInfo.model = parseInt(to.query.type) || 0;
      }
    },
  },
  data() {
    return {
      heroName: "",
      bid: 0,
      cid: 0,
      isSmallMobile: 0,
      tabsInfo: {
        model: 0,
      },
      showInfo: {
        filterTips: true,
        filterMenu: false,
        shield: false,
      },
      dfsAreaInfo: {
        model: 0,
        options: [
          { text: "全部 (昨日)", value: 0 },
          { text: "手 Q (昨日)", value: 1 },
          { text: "微信 (昨日)", value: 2 },
          { text: "推荐 (昨日)", value: 3 },
          { text: "全部 (上周)", value: 4 },
          { text: "全部 (上月)", value: 5 },
        ],
      },
      dfsPositionInfo: {
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
      wjAreaInfo: {
        model: 0,
        options: [
          { text: "全部", value: 0 },
          { text: "安卓QQ", value: 1 },
          { text: "苹果QQ", value: 2 },
          { text: "安卓WX", value: 3 },
          { text: "苹果WX", value: 4 },
        ],
      },
      wjShieldInfo: {
        model: 0,
        options: [
          { text: "打开战绩", value: 0 },
          { text: "隐藏战绩", value: 1 },
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
    };
  },
  mounted() {
    let route = this.$route.query,
      rankingFilterTips = this.$cookie.get("rankingFilterTips"),
      isSmallMobile = this.$cookie.get("isSmallMobile"),
      isSmallMobileInt = parseInt(isSmallMobile) || 0;

    this.heroName = route.heroName || "";
    this.tabsInfo.model = parseInt(route.type) || 0;
    this.bid = parseInt(route.bid) || 0;
    this.cid = parseInt(route.cid) || 0;

    if (rankingFilterTips == undefined) {
      this.$cookie.set("rankingFilterTips", 1, { expires: "1Y" });

      setTimeout(() => {
        this.showInfo.filterTips = false;
      }, 7500);
    } else {
      this.showInfo.filterTips = false;
    }

    if (isSmallMobile == undefined && this.$appHeight < 575) {
      this.$dialog
        .confirm({
          title: "是否适配小屏?",
          message: "稍后可在【我的 - 适配小屏】修改",
        })
        .then(() => {
          // on confirm
          this.isSmallMobile = 1;
          this.$cookie.set("isSmallMobile", 1, { expires: "1Y" });
        })
        .catch(() => {
          // on cancel
          this.isSmallMobile = 0;
          this.$cookie.set("isSmallMobile", 0, { expires: "1Y" });
        });
    } else {
      this.isSmallMobile = isSmallMobileInt;
    }
  },
  methods: {
    onRankingTabsClick: function (e) {
      let tabsInfo = this.tabsInfo;

      this.$appPush({
        query: { type: tabsInfo.model },
      });

      if (e == 0) {
        this.bidInfo = this.dfsAreaInfo;
        this.cidInfo = this.dfsPositionInfo;
      }

      if (e == 2) {
        this.bidInfo = this.wjAreaInfo;
        this.cidInfo = this.wjShieldInfo;
      }

      setTimeout(() => {
        e == 0 || e == 2
          ? (this.showInfo.filterMenu = true)
          : (this.showInfo.filterMenu = false);
      }, 500);
    },
    onDropdownMenuChange: function () {
      let tabsInfo = this.tabsInfo,
        bidInfo = this.bidInfo,
        cidInfo = this.cidInfo;

      if (tabsInfo.model == 0) {
        this.dfsAreaInfo.model = bidInfo.model;
        this.dfsPositionInfo.model = cidInfo.model;
      }

      if (tabsInfo.model == 2) {
        this.wjAreaInfo.model = bidInfo.model;
        this.wjShieldInfo.model = cidInfo.model;
      }

      this.$appPush({
        query: {
          type: tabsInfo.model,
          bid: bidInfo.model,
          cid: cidInfo.model,
          refresh: 1,
        },
      });

      this.showInfo.filterMenu = false;
    },
  },
};
</script>

<style>
img.ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3 {
  border-radius: 100%;
}

span.ranking-f58cc48f5b942c91e57eff48accc5151 {
  margin-left: -50px;
  top: 62px;
}

span.ranking-4da12add5b0c1920dcde6c5627d30422 {
  margin-top: 25px;
  left: 0;
  position: absolute;
  width: 100%;
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
}

td.vxe-body--column div.vxe-cell {
  font-size: 15px;
}

td.vxe-body--cloumn .vxe-table.virtual--x .col--ellipsis .vxe-cell,
.vxe-table.virtual--y .col--ellipsis .vxe-cell {
  max-height: unset;
}

td.ranking-bda9643ac6601722a28f238714274da4 div.vxe-cell,
td.ranking-ee3e4aec9bcaaaf72cd0c59e8a0f477d div.vxe-cell,
td.ranking-48d6215903dff56238e52e8891380c8f div.vxe-cell,
td.ranking-9f27410725ab8cc8854a2769c7a516b8 div.vxe-cell {
  font-size: 20px;
}

div.ranking-home div.van-dropdown-menu__bar {
  box-shadow: unset;
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
}

div.ranking-e20c0bfa2eeda7a13463d390a5bbfc4f i.vxe-button--icon.vxe-icon--menu {
  bottom: 1px;
}

div.ranking-5728d19b81c17607842cb7befeef3152 {
  height: 400px;
}

/*
缩小前的
*/

div.ranking-e10ca73b79369d2183f81ca10fb587af
  img.ranking-3d5f1ffeadf58eb64ef57aef7e53a31e {
  margin-left: -2px;
  margin-top: -12px;
  position: absolute;
  z-index: 1;
}

div.ranking-713dd4d0b2e842c08da62ddeec872331
  img.ranking-95a25d46f98b0ec553d892cc45037d57 {
  margin-top: -15px;
  position: absolute;
}

div.ranking-713dd4d0b2e842c08da62ddeec872331
  img.ranking-35af5e6c0fc290aa4f2e38d4c8296a03 {
  left: -7px;
}

div.ranking-713dd4d0b2e842c08da62ddeec872331
  img.ranking-fbfe7b256ce6b4df1d03d8022163c6d2 {
  left: 47px;
}

div.ranking-713dd4d0b2e842c08da62ddeec872331
  span.ranking-043052eea2d064cab23119e56f4f640e {
  left: -22px;
}

div.ranking-713dd4d0b2e842c08da62ddeec872331
  span.ranking-dabb6e25dffefe5b4821b7062afbdaef {
  left: 28px;
}

div.ranking-713dd4d0b2e842c08da62ddeec872331 {
  position: absolute;
}

div.ranking-78117a02d15f1dffe5263f47a220c56b
  span.ranking-f58cc48f5b942c91e57eff48accc5151 {
  margin-left: -50px;
  top: 62px;
}

/*
缩小后的
*/

div.ranking-0b22b207c2b785ceff7a241980f23d14
  img.ranking-35af5e6c0fc290aa4f2e38d4c8296a03 {
  left: -3px;
}

div.ranking-0b22b207c2b785ceff7a241980f23d14
  img.ranking-fbfe7b256ce6b4df1d03d8022163c6d2 {
  left: 43px;
}

div.ranking-0b22b207c2b785ceff7a241980f23d14
  span.ranking-043052eea2d064cab23119e56f4f640e {
  left: -20px;
}

div.ranking-0b22b207c2b785ceff7a241980f23d14
  span.ranking-dabb6e25dffefe5b4821b7062afbdaef {
  left: 27px;
}

div.ranking-5d308b6a0da77ffb33c63fc542f58746
  span.ranking-f58cc48f5b942c91e57eff48accc5151 {
  margin-left: -43px;
  top: 47px;
}
</style>