<template>
  <div class="hero-radar">
    <div class="hero-b86b97a57d04d7096b93b34cea410cfe">
      <vue-tags-input
        v-model="tag.text"
        v-show="tabsModel == 2"
        :tags="tag.array"
        :placeholder="tag.placeholder"
        @tags-changed="onTagsChanged"
        @blur="onTagsBlur"
        class="hero-d57ac45256849d9b13e2422d91580fb9"
      />
    </div>

    <div class="hero-00c0096b2f59afa06ea70de0e19fff29">
      <ve-radar
        :extend="radarData.extend"
        :settings="radarData.settings"
        :data="radarData.result"
        :loading="radarData.loading"
        legend-position="bottom"
        height="550px"
        class="hero-ca6674b328707b5a1f0b012105a7e4e1"
      />
    </div>
  </div>
</template>

<style>
@import url("/css/app-style/hero-radar.css");
</style>

<script>
import VeRadar from "v-charts/lib/radar.common";

export default {
  name: "HeroRadar",
  components: {
    VeRadar,
    VueTagsInput: (resolve) => require(["@johmun/vue-tags-input"], resolve),
  },
  props: {
    tabsModel: {
      type: Number,
      default: 0,
    },
    heroId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { tabsModel, heroId } = this;
      return { tabsModel, heroId };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (newValue.heroId == 0) return;

        if (newValue.tabsModel == 1) {
          this.getHeroChartsLog(newValue.heroId, "", 10);
        } else {
          this.tag.array = [];
        }
      },
    },
  },
  data() {
    return {
      tag: {
        text: "",
        array: [],
        placeholder: "输入对比的英雄,点击任意空白位置确认 😄",
      },
      radarData: {
        extend: {},
        settings: {},
        loading: true,
        result: {
          rows: [],
        },
      },
      heroList: {
        old: "",
        new: "",
      },
    };
  },
  methods: {
    getHeroChartsLog: function (heroId, heroName, aid) {
      this.radarData = {
        loading: true,
        result: {
          rows: [],
        },
      };

      this.axios
        .post(
          this.apiList.pvp.getHeroChartsLog +
            "&heroId=" +
            heroId +
            "&heroName=" +
            heroName +
            "&aid=" +
            aid
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.radarData = data;
            this.radarData.loading = false;
          } else {
            this.appOpenUrl(status.msg, null, { path: "/my" }, 1);
          }
        });
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

        this.heroList.new = newTags.replace("undefined,", "");
      }
    },
    onTagsBlur: function () {
      let oldHeroList = this.heroList.old,
        newHeroList = this.heroList.new;

      if (oldHeroList != newHeroList) {
        this.getHeroChartsLog("", newHeroList, 11);
        this.heroList.old = newHeroList;
      }
    },
  },
};
</script>
