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
        class="info-d57ac45256849d9b13e2422d91580fb9"
      />
    </div>

    <div class="hero-00c0096b2f59afa06ea70de0e19fff29">
      <ve-radar
        legend-position="bottom"
        :style="style"
        :height="appDevice ? '650px' : '750px'"
        :settings="tableData.settings"
        :data="tableData.result"
      />
    </div>
  </div>
</template>

<style>
div.ti-input {
  border-radius: 5px;
}
</style>

<style scoped>
.info-d57ac45256849d9b13e2422d91580fb9 {
  text-align: center;
  width: 85%;
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 25px;
}
</style>

<script>
import VeRadar from "v-charts/lib/radar.common";

export default {
  name: "HeroRadar",
  components: {
    VeRadar,
    VueTagsInput: resolve => require(["@johmun/vue-tags-input"], resolve)
  },
  props: {
    tabsModel: {
      type: Number,
      default: 0
    },
    heroId: {
      type: Number,
      default: 0
    }
  },
  computed: {
    listenChange() {
      const { tabsModel, heroId } = this;
      return { tabsModel, heroId };
    }
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (newValue.tabsModel == 1) {
          this.getHeroChartsLogBySimilar(newValue.heroId);
        } else {
          this.tag.array = [];
        }
      }
    }
  },
  data() {
    return {
      tag: {
        text: "",
        array: [],
        placeholder: "输入对比的英雄,点击任意空白位置确认 😄"
      },
      style: {
        marginTop: 0
      },
      tableData: {
        result: []
      },
      customize: {
        old: "",
        new: ""
      }
    };
  },
  mounted() {
    this.appDevice
      ? (this.style.marginTop = "-150px")
      : (this.style.marginTop = "-50px");
  },
  methods: {
    getHeroChartsLogBySimilar: function(heroId) {
      this.axios
        .get(this.apiList.pvp.getHeroChartsLogBySimilar + "&heroId=" + heroId)
        .then(ret => {
          let data = ret.data.data;

          if (data.result.rows.length != 0) {
            this.tableData = data;
          }
        });
    },
    getHeroChartsLogByCustomize: function(heroName) {
      this.axios
        .get(
          this.apiList.pvp.getHeroChartsLogByCustomize + "&heroName=" + heroName
        )
        .then(ret => {
          let data = ret.data.data;

          if (data.result.rows.length != 0) {
            this.tableData = data;
          }
        });
    },
    getHeroChartsLogByCustomizeFromUrl: function(heroName) {
      let e, hero, newTags;

      e = heroName.split(",");
      for (let i = 0; i < e.length; i++) {
        hero = e[i];
        newTags = newTags + "," + hero;
        this.tag.array.push({ text: decodeURI(hero) });
      }

      this.getHeroChartsLogByCustomize(heroName);
    },
    onTagsChanged: function(e) {
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
    onTagsBlur: function() {
      let oldCustomize = this.customize.old,
        newCustomize = this.customize.new;

      if (oldCustomize != newCustomize) {
        this.getHeroChartsLogByCustomize(newCustomize);
        this.customize.old = newCustomize;
      }
    }
  }
};
</script>