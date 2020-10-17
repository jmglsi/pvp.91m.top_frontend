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
        legend-position="bottom"
        :extend="radarData.extend"
        :settings="radarData.settings"
        :data="radarData.result"
        :loading="radarData.loading"
        :height="appDevice ? '650px' : '750px'"
        :style="style"
        class="hero-ca6674b328707b5a1f0b012105a7e4e1"
      />
    </div>
  </div>
</template>

<style>
@import url("/css/app-style/hero.css");
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
        this.radarData.result = [];

        if (newValue.tabsModel == 1) {
          this.getHeroChartsLogBySimilar(newValue.heroId);
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
      style: {
        marginTop: 0,
      },
      radarData: {
        extend: {},
        settings: {},
        loading: true,
        result: [],
      },
      customize: {
        old: "",
        new: "",
      },
    };
  },
  mounted() {
    this.appDevice
      ? (this.style.marginTop = "-150px")
      : (this.style.marginTop = "-50px");
  },
  methods: {
    getHeroChartsLogBySimilar: function (heroId) {
      this.radarData.loading = true;

      this.axios
        .get(this.apiList.pvp.getHeroChartsLogBySimilar + "&heroId=" + heroId)
        .then((res) => {
          let data = res.data.data;

          if (data.result.rows.length != 0) {
            this.radarData = data;
          }

          this.radarData.loading = false;
        });
    },
    getHeroChartsLogByCustomize: function (heroName) {
      this.radarData.loading = true;

      this.axios
        .get(
          this.apiList.pvp.getHeroChartsLogByCustomize + "&heroName=" + heroName
        )
        .then((res) => {
          let data = res.data.data;

          if (data.result.rows.length != 0) {
            this.radarData = data;
          }

          this.radarData.loading = false;
        });
    },
    getHeroChartsLogByCustomizeFromUrl: function (heroName) {
      let e, hero, newTags;

      e = heroName.split(",");
      for (let i = 0; i < e.length; i++) {
        hero = e[i];
        newTags = newTags + "," + hero;
        this.tag.array.push({ text: decodeURI(hero) });
      }

      this.getHeroChartsLogByCustomize(heroName);
    },
    onTagsChanged: function (e) {
      if (e.length == 0) {
        this.chartSettings = {};
        this.chartData = [];
        this.customize = "";
      } else {
        let hero, newTags;

        for (let i = 0; i < e.length; i++) {
          hero = e[i].text;
          newTags = newTags + "," + hero;
        }
        this.customize.new = newTags.replace("undefined,", "");
      }
    },
    onTagsBlur: function () {
      let oldCustomize = this.customize.old,
        newCustomize = this.customize.new;

      if (oldCustomize != newCustomize) {
        this.getHeroChartsLogByCustomize(newCustomize);
        this.customize.old = newCustomize;
      }
    },
  },
};
</script>