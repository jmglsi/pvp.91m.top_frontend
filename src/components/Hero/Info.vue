<template>
  <div class="info">
    <van-nav-bar :border="false" @click-left="onNavBarLeftClick" @click-right="onNavBarRightClick">
      <template #title>
        <div @click="$message.info('巅峰赛趋势、分路推荐 ;D')" class="info-632d142d7a508e86f6c35a044a17411e">
          <span class="info-d5d3db1765287eef77d7927cc956f50a">{{ heroInfoTitle }}</span>
          <img
            v-if="heroInfo.trend > 0"
            v-lazy="'/img/app-icons/hot-' + heroInfo.trend + '.png'"
            v-show="shuntShow"
            width="15"
            class="info-3d5f1ffeadf58eb64ef57aef7e53a31e"
          />
          <span v-show="shuntShow" class="info-68adaff1d028a37f27fb33c483329cba">
            <ul>
              <li
                v-for="(data, index) in heroInfo.type"
                :key="'hero-e4d23e841d8e8804190027bce3180fa5-' + index"
                class="info-fd136b2a1c6099bfa0535fe944e0cdc6"
              >
                <van-tag
                  v-if="data > 0"
                  :color="positionInfo[data][1]"
                  round
                  class="info-ff2364a0be3d20e46cc69efb36afe9a5"
                >{{ positionInfo[data][0] }}</van-tag>
              </li>
            </ul>
          </span>
        </div>
      </template>
      <van-icon name="arrow-left" slot="left" />
      <van-icon name="ellipsis" slot="right" />
    </van-nav-bar>

    <van-grid
      :border="false"
      :column-num="3"
      v-show="shuntShow"
      class="app-ff4a008470319a22d9cf3d14af485977"
    >
      <van-grid-item @click="$message.info('分均经济、场均时长、场均经济 XD')">
        <div class="info-795f3202b17cb6bc3d4b771d8c6c9eaf">
          <AppGold width="25" height="25" class="info-ff2364a0be3d20e46cc69efb36afe9a5" />
          <span
            class="bottom-0fc3cfbc27e91ea60a787de13dae3e3c info-0fc3cfbc27e91ea60a787de13dae3e3c"
          >{{ heroInfo.equMoneyMin || 0 }}</span>

          <AppTime width="25" height="25" class="info-ff2364a0be3d20e46cc69efb36afe9a5" />
          <span
            class="bottom-0fc3cfbc27e91ea60a787de13dae3e3c info-0fc3cfbc27e91ea60a787de13dae3e3c"
          >{{ heroInfo.usedtime || 0 }}</span>
        </div>

        <span class="info-9726255eec083aa56dc0449a21b33190">
          <van-tag
            round
            color="black"
            class="info-ff2364a0be3d20e46cc69efb36afe9a5"
          >{{ heroInfo.equMoneyOverflow || 0 }}</van-tag>
        </span>
      </van-grid-item>
      <van-grid-item @click="actionSheetShow = true">
        <van-circle
          v-model="currentRate"
          :rate="heroInfo.dominanceRate"
          :speed="33"
          :clockwise="false"
          :color="gradientColor"
          :text="circleInfo.text"
          size="75"
        />
        <img
          width="50"
          v-show="heroImgShow"
          v-lazy="heroInfo.img"
          class="info-b798abe6e1b1318ee36b0dcb3fb9e4d3"
        />
      </van-grid-item>
      <van-grid-item @click="$message.info('技能下面的数字是占比 ;D')">
        <div class="info-f3412345b511c61986bba9a39793157f">
          <span
            class="info-713dd4d0b2e842c08da62ddeec872331"
            v-for="(data, index) in heroInfo.skill"
            :key="'hero-713dd4d0b2e842c08da62ddeec872331-' + index"
          >
            <img
              v-if="data.id > 0"
              v-lazy="data.img"
              width="25"
              class="info-ff2364a0be3d20e46cc69efb36afe9a5"
            />
            <span
              class="bottom-0fc3cfbc27e91ea60a787de13dae3e3c info-0fc3cfbc27e91ea60a787de13dae3e3c"
            >{{ data.pickRate }}</span>
          </span>
        </div>
      </van-grid-item>
    </van-grid>

    <van-tabs
      v-model="infoTabsActive"
      :border="false"
      @change="onTabsChange"
      color="rgb(222,177,81)"
      class="app-6a992d5529f459a44fee58c733255e86 info-d42f4851e770aa0f758b01388874f67b"
    >
      <van-tab title="巅峰赛趋势" :disabled="tabsDisabled" />
      <van-tab title="同职业对比" :disabled="tabsDisabled" />
      <van-tab title="自定义对比" />
    </van-tabs>

    <vue-tags-input
      v-model="tag"
      v-show="tagsInputShow"
      :tags="tags"
      :placeholder="tagsPlaceholder"
      @tags-changed="onTagsChanged"
      @blur="onTagsBlur"
      class="app-6a992d5529f459a44fee58c733255e86 info-d57ac45256849d9b13e2422d91580fb9"
    />

    <ve-line
      v-show="lineShow"
      :settings="chart.qushi.settings"
      :extend="extend"
      :mark-line="markLine"
      :mark-point="markPoint"
      :grid="grid"
      :toolbox="toolbox"
      :data="chart.qushi.data"
    />

    <ve-radar
      legend-position="bottom"
      v-show="radar_1_Show"
      :settings="chart.tongzhiye.settings"
      :height="radar_1_height"
      :style="radar_1_style"
      :data="chart.tongzhiye.data"
    />

    <ve-radar
      legend-position="bottom"
      v-show="radar_2_Show"
      :settings="chart.zidingyi.settings"
      :height="radar_2_height"
      :style="radar_2_style"
      :data="chart.zidingyi.data"
    />

    <div class="app-margin">
      <HeroUpdate v-if="isLoaded" v-show="shuntShow" :aid="parseInt(heroInfo.id)" />
    </div>

    <van-action-sheet
      v-model="actionSheetShow"
      :title="heroInfo.name + ' 的 ' + circleInfo.text"
      safe-area-inset-bottom
    >
      <van-grid :border="false" :column-num="2">
        <van-grid-item @click="addHeroVote(1)">
          <AppCry width="50" height="50" />
          <span class="vote-ebd73ade48cb3e102d1dbbfbc0377c5f">{{ circleInfo.vote[0].text }}</span>
        </van-grid-item>
        <van-grid-item @click="addHeroVote(2)">
          <AppSmile width="50" height="50" />
          <span class="vote-ebd73ade48cb3e102d1dbbfbc0377c5f">{{ circleInfo.vote[1].text }}</span>
        </van-grid-item>
        <van-cell
          title="注意事项"
          icon="question-o"
          @click="getTips"
          class="hero-fc861e4a5806e7411f7860142244c917"
          is-link
        />
      </van-grid>
    </van-action-sheet>

    <van-share-sheet
      v-model="shareSheetShow"
      title="立即分享给好友"
      :options="shareSheetOptions"
      @select="onShareSheetSelect"
    />

    <AppBottomTabbar v-if="appDevice" />
  </div>
</template>

<style>
div.van-circle__text {
  font-size: 10px;
}

div.app-71f24db02647f7d930444128c0b02003 i.van-button__icon {
  margin-top: -1px;
}

div.app-71f24db02647f7d930444128c0b02003 span.van-button__text {
  margin-top: 2px;
}

div.ti-input {
  border-radius: 5px;
}
</style>

<style scoped>
.info {
  background-color: white;
  width: 100%;
  height: 100%;
}

.info-d5d3db1765287eef77d7927cc956f50a {
  font-size: 20px;
}
.info-3d5f1ffeadf58eb64ef57aef7e53a31e {
  margin: 0 5px;
  margin-top: -5px;
}

.info-68adaff1d028a37f27fb33c483329cba {
  position: absolute;
  margin-top: -3px;
}

.info-fd136b2a1c6099bfa0535fe944e0cdc6 {
  float: left;
}

.app-ff4a008470319a22d9cf3d14af485977 {
  margin-top: 15px;
}

.app-6a992d5529f459a44fee58c733255e86 {
  z-index: 1;
}

.info-d42f4851e770aa0f758b01388874f67b {
  margin: 23px 0;
}

.info-9726255eec083aa56dc0449a21b33190 {
  margin-top: 5px;
}

.info-b798abe6e1b1318ee36b0dcb3fb9e4d3 {
  position: absolute;
  border-radius: 100%;
}

.info-0fc3cfbc27e91ea60a787de13dae3e3c {
  margin-left: -40px;
  margin-top: 26px;
}

.vote-ebd73ade48cb3e102d1dbbfbc0377c5f {
  font-size: 10px;
  margin-top: 10px;
}

.info-ff2364a0be3d20e46cc69efb36afe9a5 {
  margin: 0 3px;
}

.info-d57ac45256849d9b13e2422d91580fb9 {
  text-align: center;
  width: 85%;
  max-width: 500px;
  margin: auto;
  margin-top: -15px;
}

.app-71f24db02647f7d930444128c0b02003 {
  margin-top: 60px;
}
</style>

<script>
import VeLine from "v-charts/lib/line.common";
import VeRadar from "v-charts/lib/radar.common";

import "echarts/lib/component/toolbox";
import "echarts/lib/component/markLine";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/dataZoom";

export default {
  name: "HeroInfo",
  components: {
    VeLine,
    VeRadar,
    VueTagsInput: resolve => require(["@johmun/vue-tags-input"], resolve),
    AppGold: resolve => require(["@/assets/Icons/AppGold.vue"], resolve),
    AppTime: resolve => require(["@/assets/Icons/AppTime.vue"], resolve),
    AppCry: resolve => require(["@/assets/Icons/AppCry.vue"], resolve),
    AppSmile: resolve => require(["@/assets/Icons/AppSmile.vue"], resolve),
    HeroUpdate: resolve => require(["@/components/Hero/Update.vue"], resolve),
    AppBottomTabbar: resolve =>
      require(["@/components/App/BottomTabbar.vue"], resolve)
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.id != from.params.id) {
      this.init(to.params.id);
      next();
    }
  },
  data() {
    this.markLine = {
      data: [
        {
          name: "平均线",
          type: "average"
        }
      ]
    };
    this.markPoint = {
      data: [
        {
          name: "最大值",
          type: "max"
        }
      ]
    };
    this.extend = {
      xAxis: {
        axisLabel: {
          rotate: 45
        }
      },
      dataZoom: [
        {
          type: "slider",
          show: true,
          start: 80,
          end: 100
        }
      ]
    };
    return {
      isLoaded: false,
      currentRate: 0,
      circleInfo: {
        text: "加载中",
        tips: "加载中",
        vote: [
          {
            img: "/img/app-icons/cry.png",
            text: "加载中"
          },
          {
            img: "/img/app-icons/smile.png",
            text: "加载中"
          }
        ]
      },
      shuntShow: true,
      shareSheetShow: false,
      shareSheetOptions: [
        [{ name: "复制链接", icon: "link", value: 0 }],
        [{ name: "常见问题", icon: "/img/app-icons/inspiration.png", value: 1 }]
      ],
      actionSheetShow: false,
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6"
      },
      infoTabsActive: 0,
      tabsDisabled: false,
      heroImgShow: true,
      heroInfoTitle: "加载中",
      heroInfo: {
        id: 0,
        shareText: "可爱的宝贝已经分享了"
      },
      type: {
        list: []
      },
      copyData: "",
      list: [],
      nowData: {},
      tag: "",
      tags: [],
      tagsPlaceholder: "输入对比的英雄,点击任意空白位置确认 😄",
      tagsInputShow: false,
      chart: {
        qushi: {
          settings: {},
          data: {}
        },
        tongzhiye: {
          settings: {},
          data: {}
        },
        zidingyi: {
          settings: {},
          data: {}
        }
      },
      grid: {
        left: "2%",
        right: "2%"
      },
      toolbox: {
        feature: {
          saveAsImage: {
            name: "加载中"
          }
        }
      },
      lineShow: true,
      radar_1_style: {
        marginTop: 0
      },
      radar_2_style: {
        marginTop: 0
      },
      radar_1_height: "700px",
      radar_2_height: "500px",
      radar_1_Show: true,
      radar_2_Show: true,
      popupShow: false,
      copyDataCustomize: ""
    };
  },
  mounted() {
    let heroId = this.$route.params.id;
    this.init(heroId);
  },
  methods: {
    init: function(heroId) {
      this.heroInfoTitle = "加载中";

      this.radar_1_Show = false;
      this.radar_2_Show = false;

      if (heroId == 0) {
        this.heroInfoTitle = "自定义对比";

        this.lineShow = false;
        this.shuntShow = false;
        this.radar_2_Show = true;

        this.infoTabsActive = 2;
        this.tabsDisabled = true;
        this.tagsInputShow = true;

        let heroName = this.$route.query.heroName;
        if (heroName) {
          this.getHeroChartsLogByCustomizeFromUrl(heroName);
        }
      } else {
        this.infoTabsActive = parseInt(this.$route.query.type);

        this.getHeroInfo(heroId);

        if (!this.infoTabsActive || this.infoTabsActive == 0) {
          setTimeout(() => {
            this.getHeroChartsLog(heroId);
          }, 100);
        }

        if (this.infoTabsActive != 2) {
          setTimeout(() => {
            this.getHeroChartsLogBySimilar(heroId);
          }, 100);
        }

        if (this.appDevice) {
          this.radar_1_style.marginTop = "-180px";
          this.radar_2_style.marginTop = "-50px";

          this.radar_1_height = "700px";
          this.radar_2_height = "500px";
        }
      }

      setInterval(() => {
        this.heroImgShow == true
          ? (this.heroImgShow = false)
          : (this.heroImgShow = true);
      }, 1000 * 10);
    },
    getHeroChartsLog: function(heroId) {
      this.axios
        .get(this.appApi.list.getHeroChartsLog + "&heroId=" + heroId)
        .then(ret => {
          let chartData = ret.data.data.chartData;
          if (chartData.rows.length != 0) {
            this.tagsPlaceholder = ret.data.data.tagsPlaceholder;
            this.chart.qushi.settings = ret.data.data.chartSettings;
            this.chart.qushi.data = chartData;
          }
        });
    },
    getHeroChartsLogBySimilar: function(heroId) {
      this.axios
        .get(this.appApi.list.getHeroChartsLogBySimilar + "&heroId=" + heroId)
        .then(ret => {
          let chartData = ret.data.data.chartData;
          if (chartData.rows.length != 0) {
            this.tagsPlaceholder = ret.data.data.tagsPlaceholder;
            this.chart.tongzhiye.settings = ret.data.data.chartSettings;
            this.chart.tongzhiye.data = chartData;
          }
        });
    },
    getHeroChartsLogByCustomize: function(heroName) {
      this.axios
        .get(
          this.appApi.list.getHeroChartsLogByCustomize + "&heroName=" + heroName
        )
        .then(ret => {
          let chartData = ret.data.data.chartData;
          if (chartData.rows.length != 0) {
            this.tagsPlaceholder = ret.data.data.tagsPlaceholder;
            this.chart.zidingyi.settings = ret.data.data.chartSettings;
            this.chart.zidingyi.data = chartData;
          }
        });
    },
    getHeroChartsLogByCustomizeFromUrl: function(heroName) {
      let e, hero, newTags;
      e = heroName.split(",");
      for (let i = 0; i < e.length; i++) {
        hero = e[i];
        newTags = newTags + "," + hero;
        this.tags.push({ text: decodeURI(hero) });
      }

      this.getHeroChartsLogByCustomize(heroName);
    },
    getHeroInfo: function(heroId) {
      this.axios
        .get(this.appApi.list.getHeroInfo + "&heroId=" + heroId)
        .then(ret => {
          this.isLoaded = true;
          this.circleInfo = ret.data.data.circleInfo;
          this.positionInfo = ret.data.data.positionInfo;
          this.heroInfo = ret.data.data.heroInfo;

          let heroInfo = this.heroInfo;

          this.heroInfoTitle = heroInfo.name;

          document.title = heroInfo.name + " | 苏苏的荣耀助手";

          this.toolbox.feature.saveAsImage.name = heroInfo.name + "_巅峰赛趋势";

          this.copyData =
            heroInfo.name +
            " 的巅峰赛数据\r-\r禁用:" +
            (heroInfo.banRate * 100).toFixed(2) +
            "%\r出场:" +
            (heroInfo.pickRate * 100).toFixed(2) +
            "%\r胜率:" +
            (heroInfo.winRate * 100).toFixed(2) +
            "%\r热度:" +
            heroInfo.score +
            "\r分均经济:" +
            heroInfo.equMoneyMin +
            "\r场均时长:" +
            heroInfo.usedtime +
            " (分钟)\r场均经济:" +
            heroInfo.equMoneyOverflow +
            "\r-\r巅峰赛趋势 & 职业对比,结果仅供参考 ↓\r" +
            location.origin +
            location.pathname +
            "?from=71f24db02647f7d930444128c0b02003";
        });
    },
    getTips: function() {
      this.$dialog.alert({
        title: "请客观评价该英雄",
        message: this.circleInfo.tips
      });
    },
    addHeroVote: function(voteType) {
      this.axios
        .get(
          this.appApi.list.addHeroVote +
            "&heroId=" +
            this.heroInfo.id +
            "&voteType=" +
            voteType
        )
        .then(ret => {
          let code = ret.data.data.code;
          if (code >= 0) {
            this.$message.success("投票成功");
          } else {
            this.$message.error("本周投过");
          }
        });
      this.actionSheetShow = false;
    },
    onTabsChange: function(e) {
      e == 0 ? (this.shuntShow = true) : (this.shuntShow = false);

      let heroInfo = this.heroInfo,
        dTitle;

      if (e == 0) {
        this.lineShow = true;
        this.radar_1_Show = false;
        this.radar_2_Show = false;

        dTitle = heroInfo.name;
        this.heroInfoTitle = dTitle;
      }

      if (e == 1) {
        this.lineShow = false;
        this.radar_1_Show = true;
        this.radar_2_Show = false;

        dTitle = "同职业对比";
        this.heroInfoTitle = dTitle;
      }

      if (e == 2) {
        this.lineShow = false;
        this.radar_1_Show = false;
        this.radar_2_Show = true;

        dTitle = "自定义对比";
        this.heroInfoTitle = dTitle;

        this.chart.zidingyi.data = {};
        this.chart.zidingyi.settings = {};
        this.tagsInputShow = true;
      } else {
        this.tagsInputShow = false;
      }

      document.title = dTitle + " | 苏苏的荣耀助手";

      this.copyData =
        heroInfo.name +
        " 的巅峰赛数据\r-\r禁用:" +
        (heroInfo.banRate * 100).toFixed(2) +
        "%\r出场:" +
        (heroInfo.pickRate * 100).toFixed(2) +
        "%\r胜率:" +
        (heroInfo.winRate * 100).toFixed(2) +
        "%\r热度:" +
        heroInfo.score +
        "\r分均经济:" +
        heroInfo.equMoneyMin +
        "\r场均时长:" +
        heroInfo.usedtime +
        " (分钟)\r场均经济:" +
        heroInfo.equMoneyOverflow +
        "\r-\r巅峰赛趋势 & 职业对比,结果仅供参考 ↓\r" +
        location.origin +
        location.pathname +
        "?from=71f24db02647f7d930444128c0b02003";
    },
    onTagsChanged: function(e) {
      if (e.length == 0) {
        this.chartSettings = {};
        this.chartData = [];
      } else {
        let hero, newTags;
        for (let i = 0; i < e.length; i++) {
          hero = e[i].text;
          newTags = newTags + "," + hero;
        }
        this.copyDataCustomize = newTags.replace("undefined,", "");
      }
    },
    onTagsBlur: function() {
      this.radar_2_Show = true;
      this.getHeroChartsLogByCustomize(this.copyDataCustomize);

      this.axios
        .get(
          "https://s.91m.top/?url=" +
            encodeURIComponent(
              location.origin +
                "/hero/0/info?from=ac0eb60533b5843bb8fbdf98e5922072&type=2&heroName=" +
                encodeURIComponent(this.copyDataCustomize)
            )
        )
        .then(ret => {
          this.copyData =
            "组合:" +
            this.copyDataCustomize +
            "\r-\r自定义英雄对比 ↓\r" +
            ret.data.data.url;
        });
    },
    onNavBarLeftClick: function() {
      this.$router.push({
        path: "/ranking?from=caf9b6b99962bf5c2264824231d7a40c"
      });
    },
    onNavBarRightClick: function() {
      this.shareSheetShow = true;
    },
    onShareSheetSelect: function(option) {
      if (option.value == 0) {
        this.shareSheetShow = false;
        this.$copyText(this.copyData);
        this.$message.success("已复制");
      }

      if (option.value == 1) {
        window.open("https://doc.91m.top");
      }
    }
  }
};
</script>