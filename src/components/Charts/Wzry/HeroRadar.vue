<template>
  <div class="hero-radar">
    <div class="hero-radar-b86b97a57d04d7096b93b34cea410cfe">
      <vue-tags-input
        v-model="tag.text"
        v-if="extraModel == 2"
        :tags="tag.array"
        :placeholder="tag.placeholder"
        @tags-changed="onTagsInputChanged"
        @blur="onTagsInputBlur"
        class="hero-radar-d57ac45256849d9b13e2422d91580fb9"
      />
    </div>

    <div class="hero-radar-00c0096b2f59afa06ea70de0e19fff29">
      <ve-radar
        :data="radarData.result"
        :extend="radarData.extend"
        :loading="radarData.loading"
        :settings="radarData.settings"
        legend-position="bottom"
        height="550px"
        class="hero-radar-ca6674b328707b5a1f0b012105a7e4e1"
      />
    </div>
  </div>
</template>

<script>
import VeRadar from "v-charts/lib/radar.common";

import "echarts/lib/component/legendScroll";
import "echarts/lib/component/title";

export default {
  name: "chartsHeroRadar",
  components: {
    VeRadar,
    VueTagsInput: () => import("@johmun/vue-tags-input"),
  },
  props: {
    extraId: {
      type: Number,
      default: 0,
    },
    extraModel: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { extraId, extraModel } = this;
      return { extraId, extraModel };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (!newValue.extraId) return;

        if (newValue.extraModel == 1) {
          this.getHeroChartsLog(4, newValue.extraId, "");
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
        placeholder: "输入对比的英雄，点击任意空白位置确认 😄",
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
    getHeroChartsLog: function (aid, heroId = 111, heroName = "") {
      this.$axios
        .post(
          this.$appApi.app.getHeroChartsLog +
            "&aid=" +
            aid +
            "&id=" +
            encodeURIComponent(heroId),
          {
            extraData: heroName,
          }
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.radarData = data;
            this.radarData.loading = false;
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onTagsInputChanged: function (e) {
      if (e.length == 0) {
        this.chartSettings = {};
        this.chartData = [];
      } else {
        let newTags = "";

        e.map((x) => {
          newTags += "," + x.text;
        });

        this.heroList.new = newTags.slice(1);
      }
    },
    onTagsInputBlur: function () {
      let oldHeroList = this.heroList.old,
        newHeroList = this.heroList.new;

      if (oldHeroList != newHeroList) {
        this.getHeroChartsLog(5, "", newHeroList);
        this.heroList.old = newHeroList;
      }
    },
  },
};
</script>

<style scoped lang="less">
div.hero-radar-d57ac45256849d9b13e2422d91580fb9 {
  margin: 25px auto;
  max-width: 500px;
  text-align: center;
  width: 85%;
  z-index: @app-z-index;
}
</style>