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
          <template #title
            >巅峰赛 (顶端局) <a-icon type="caret-down"
          /></template>
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
          <template #title>玩家 (非实时) <a-icon type="caret-down" /></template>
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
        <div class="ranking-5728d19b81c17607842cb7befeef3152">
          <span class="ranking-4da12add5b0c1920dcde6c5627d30422"
            >您的分享是我更新的动力</span
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

<style>
@import url("/css/app-style/ranking.css");
</style>

<script>
export default {
  name: "RankingHome",
  components: {
    DianFengSai: (resolve) =>
      require(["@/views/Ranking/DianFengSai.vue"], resolve),
    GuanXi: (resolve) => require(["@/views/Ranking/GuanXi.vue"], resolve),
    WanJia: (resolve) => require(["@/views/Ranking/WanJia.vue"], resolve),
    ZhuangBei: (resolve) => require(["@/views/Ranking/ZhuangBei.vue"], resolve),
  },
  watch: {
    $route: function (to) {
      this.heroName = to.query.heroName || "";
      this.tabsInfo.model = parseInt(to.query.type) || 0;
      this.bid = parseInt(to.query.bid) || 0;
      this.cid = parseInt(to.query.cid) || 0;
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
          { text: "安卓 手Q", value: 1 },
          { text: "苹果 手Q", value: 2 },
          { text: "安卓微信", value: 3 },
          { text: "苹果微信", value: 4 },
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
      isSmallMobile = this.$cookie.get("isSmallMobile"),
      isSmallMobileInt = parseInt(isSmallMobile) || 0;

    this.heroName = route.heroName || "";
    this.tabsInfo.model = parseInt(route.type) || 0;
    this.bid = parseInt(route.bid) || 0;
    this.cid = parseInt(route.cid) || 0;

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
      }, 1000);
    },
    onDropdownMenuChange: function () {
      let tabsInfo = this.tabsInfo;

      this.bid = this.bidInfo.model;
      this.cid = this.cidInfo.model;

      if (tabsInfo.model == 0) {
        this.dfsAreaInfo.model = this.bid;
        this.dfsPositionInfo.model = this.cid;
      }

      if (tabsInfo.model == 2) {
        this.wjAreaInfo.model = this.bid;
        this.wjShieldInfo.model = this.cid;
      }

      this.$appPush({
        path: "/ranking",
        query: {
          type: tabsInfo.model,
          bid: this.bid,
          cid: this.cid,
          refresh: 1,
        },
      });

      this.showInfo.filterMenu = false;
    },
  },
};
</script>
