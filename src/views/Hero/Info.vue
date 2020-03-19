<template>
  <div class="info">
    <van-nav-bar
      :title="heroInfoTitle"
      :border="false"
      @click-left="onClickLeft"
    >
      <van-icon
        name="todo-list-o"
        slot="left"
      />
    </van-nav-bar>

    <van-grid
      :border="false"
      :column-num="3"
      v-show="shuntShow"
      class="app-grid"
    >
      <div
        class="div-type"
        @click="$message.info('巅峰赛趋势、分路推荐 ;D')"
      >
        <img
          v-if="heroInfo.trend > 0"
          width="15"
          v-lazy="'/img/app-icons/hot-' + heroInfo.trend + '.png'"
          class="info-trend"
        />
        <span
          class="info-type"
          v-for="(data, index) in heroInfo.type"
          :key="index + '-tag'"
        >
          <van-tag
            round
            class="info-space"
            v-if="data > 0"
            :color="typeList[data][1]"
          >
            {{ typeList[data][0] }}
          </van-tag>
        </span>
      </div>

      <van-grid-item @click="$message.info('分均经济、场均时长、场均经济 XD')">
        <div class="div-other">
          <AppGold
            width="25"
            height="25"
            class="info-space"
          />
          <span class="bottom-num info-num">
            {{ heroInfo.equMoneyMin || 0 }}
          </span>

          <AppTime
            width="25"
            height="25"
            class="info-space"
          />
          <span class="bottom-num info-num">
            {{ heroInfo.usedtime || 0 }}
          </span>
        </div>

        <span class="info-money">
          <van-tag
            round
            class="info-space"
            color="black"
          >
            {{ heroInfo.equMoneyOverflow || 0 }}
          </van-tag>
        </span>
      </van-grid-item>
      <van-grid-item @click="actionSheetShow = true">
        <van-circle
          v-model="currentRate"
          :rate="heroInfo.dominanceRate"
          :speed="33"
          :clockwise="false"
          :color="gradientColor"
          size="75"
          :text="circleInfo.text"
        />
        <img
          width="50"
          v-show="heroImgShow"
          v-lazy="heroInfo.img"
          class="info-img"
        />
      </van-grid-item>
      <van-grid-item @click="$message.info('技能下面的数字是占比 ;D')">
        <div class="div-skill">
          <span
            class="info-skill"
            v-for="(data, index) in heroInfo.skill"
            :key="index + '-img'"
          >
            <img
              v-if="data.id > 0"
              width="25"
              v-lazy="data.img"
              class="info-space"
            />
            <span class="bottom-num info-num">
              {{ data.pickRate }}
            </span>
          </span>
        </div>
      </van-grid-item>
    </van-grid>

    <van-tabs
      :border="false"
      v-model="tabsActive"
      @change="onTabsChange"
      color="rgb(222,177,81)"
      class="app-index info-margin"
    >
      <van-tab
        title="巅峰赛趋势"
        :disabled="tabsDisabled"
      />
      <van-tab
        title="同职业对比"
        :disabled="tabsDisabled"
      />
      <van-tab title="自定义对比" />
    </van-tabs>

    <vue-tags-input
      class="app-index info-tags"
      v-show="tagsInputShow"
      v-model="tag"
      @tags-changed="onTagsChanged"
      @blur="onBlur"
      :tags="tags"
      :placeholder="tagsPlaceholder"
    />

    <ve-line
      legend-position="bottom"
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

    <div class="app-copyshare">
      <van-button
        round
        size="small"
        type="info"
        icon="/img/app-icons/share.png"
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        v-clipboard:copy="copyData"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >
        {{ heroInfo.shareText }}
      </van-button>
    </div>

    <van-action-sheet
      :title="heroInfo.name + ' 的 ' + circleInfo.text"
      v-model="actionSheetShow"
      safe-area-inset-bottom
      class="app-action-sheet"
    >
      <van-grid
        :border="false"
        :column-num="2"
      >
        <van-grid-item @click="addHeroVote(1)">
          <AppCry
            width="50"
            height="50"
          />
          <span class="vote-choose">
            {{ circleInfo.vote[0].text }}
          </span>
        </van-grid-item>
        <van-grid-item @click="addHeroVote(2)">
          <AppSmile
            width="50"
            height="50"
          />
          <span class="vote-choose">
            {{ circleInfo.vote[1].text }}
          </span>
        </van-grid-item>
        <van-cell
          title="注意事项"
          icon="question-o"
          @click="getTips"
          class="hero-list-tips"
          is-link
        />
      </van-grid>
    </van-action-sheet>

    <AppBottomTabbar v-if="appDevice" />
  </div>
</template>

<style>
i.van-button__icon {
  margin-top: -1px;
}

span.van-button__text {
  margin-top: 2px;
}

div.ti-input {
  border-radius: 5px;
}
</style>

<style scoped>
.app-grid {
  margin-top: 23px;
}

.app-index {
  z-index: 1;
}

.info-margin {
  margin: 23px 0;
}

.info-money {
  margin-top: 5px;
}

.info-img {
  position: absolute;
  border-radius: 100%;
}

.info-num {
  margin-left: -40px;
  margin-top: 26px;
}

.div-type {
  position: absolute;
  left: 0;
  right: 0;
  width: 33.33%;
  height: 25px;
  margin: 0 auto;
  z-index: 1;
  top: 50px;
}

.vote-choose {
  font-size: 10px;
  margin-top: 10px;
}

.info-type,
.info-skill {
  right: 15px;
}

.info-space {
  margin: 0 3px;
}

.info-tags {
  text-align: center;
  width: 85%;
  max-width: 500px;
  margin: auto;
  margin-top: -15px;
}

.app-copyshare {
  margin-top: 15px;
}
</style>

<script>
import VeLine from "v-charts/lib/line.common";
import VeRadar from "v-charts/lib/radar.common";

import "echarts/lib/component/toolbox";
import "echarts/lib/component/markLine";
import "echarts/lib/component/markPoint";

export default {
  name: "HeroInfo",
  components: {
    VeLine,
    VeRadar,
    VueTagsInput: resolve => require(["@johmun/vue-tags-input"], resolve),
    AppGold: resolve => require(["@/components/AppIcons/AppGold.vue"], resolve),
    AppTime: resolve => require(["@/components/AppIcons/AppTime.vue"], resolve),
    AppCry: resolve => require(["@/components/AppIcons/AppCry.vue"], resolve),
    AppSmile: resolve => require(["@/components/AppIcons/AppSmile.vue"], resolve),
    AppBottomTabbar: resolve => require(["@/components/AppBottomTabbar.vue"], resolve)
  },
  data () {
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
      "xAxis.0.axisLabel.rotate": 45
    };
    return {
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
      actionSheetShow: false,
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6"
      },
      tabsActive: 0,
      tabsDisabled: false,
      heroImgShow: true,
      heroInfoTitle: "加载中",
      heroInfo: {
        shareText: "可爱的宝贝已经分享了"
      },
      typeList: [],
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
  mounted () {
    let heroId = this.$route.params.id;
    this.heroInfoTitle = "加载中";

    this.radar_1_Show = false;
    this.radar_2_Show = false;

    if (heroId == 0) {
      this.heroInfoTitle = "自定义对比";

      this.lineShow = false;
      this.shuntShow = false;
      this.radar_2_Show = true;

      this.tabsActive = 2;
      this.tabsDisabled = true;
      this.tagsInputShow = true;

      let heroName = this.$route.query.heroName;
      if (heroName) {
        this.getHeroChartsLogByCustomizeFromUrl(heroName);
      }
    } else {
      this.tabsActive = parseInt(this.$route.query.type);

      this.getHeroInfo(heroId);

      if (!this.tabsActive || this.tabsActive == 0) {
        setTimeout(() => {
          this.getHeroChartsLog(heroId);
        }, 100);
      }

      if (this.tabsActive != 2) {
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
  methods: {
    getHeroChartsLog: function (heroId) {
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
    getHeroChartsLogBySimilar: function (heroId) {
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
    getHeroChartsLogByCustomize: function (heroName) {
      this.axios
        .get(
          this.appApi.list.getHeroChartsLogByCustomize +
          "&heroName=" +
          heroName
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
    getHeroChartsLogByCustomizeFromUrl: function (heroName) {
      let e, hero, newTags;
      e = heroName.split(",");
      for (let i = 0; i < e.length; i++) {
        hero = e[i];
        newTags = newTags + "," + hero;
        this.tags.push({ text: decodeURI(hero) });
      }

      this.getHeroChartsLogByCustomize(heroName);
    },
    getHeroInfo: function (heroId) {
      this.axios
        .get(this.appApi.list.getHeroInfo + "&heroId=" + heroId)
        .then(ret => {
          this.circleInfo = ret.data.data.circleInfo;
          this.typeList = ret.data.data.typeList;
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
            "?from=copyshare";
        });
    },
    getTips: function () {
      this.$dialog.alert({
        title: "请客观评价该英雄",
        message: this.circleInfo.tips
      });
    },
    addHeroVote: function (voteType) {
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
    onTabsChange: function (e) {
      e == 0 ? (this.shuntShow = true) : (this.shuntShow = false);

      let heroInfo = this.heroInfo, dTitle;

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
        "?from=copyshare";
    },
    onTagsChanged: function (e) {
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
    onBlur: function () {
      this.radar_2_Show = true;
      this.getHeroChartsLogByCustomize(this.copyDataCustomize);

      this.axios
        .get(
          "https://s.91m.top/?url=" +
          encodeURIComponent(
            location.origin +
            "/heroInfo/0?from=tagschanged&type=2&heroName=" +
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
    onCopy: function () {
      this.$message.success("复制成功");
    },
    onError: function () {
      this.$message.error("复制失败");
    },
    onClickLeft: function () {
      this.$router.push({
        path: "/heroReplay/" + this.heroInfo.id,
        query: { from: "heroInfo" }
      });
    },
    onClickRight: function () { }
  }
};
</script>