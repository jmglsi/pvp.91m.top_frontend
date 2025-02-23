<template>
  <div class="search-wordcloud">
    <ve-wordcloud
      :data="wordcloudData.result"
      :extend="wordcloudData.extend"
      :loading="wordcloudData.loading"
    ></ve-wordcloud>
  </div>
</template>

<script>
import VeWordcloud from "v-charts/lib/wordcloud.common";

export default {
  name: "chartsSearchWordcloud",
  components: {
    VeWordcloud,
  },
  props: {
    q: {
      type: String,
      default: "",
    },
  },
  computed: {
    listenChange() {
      const { q } = this;
      return { q };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (!newValue.q) return;

        this.getHeroChartsLog(9, newValue.q);
      },
    },
  },
  data() {
    return {
      wordcloudData: {
        loading: false,
        extend: {
          series: {
            type: "wordCloud",
            width: "90%",
            height: "90%",
          },
        },
        result: {
          columns: ["word", "count"],
          rows: [],
        },
      },
    };
  },
  methods: {
    getHeroChartsLog: function (aid, q) {
      this.wordcloudData.loading = true;

      this.$axios
        .post(
          this.$appApi.app.getHeroChartsLog + "&aid=" + aid,
          this.$qs.stringify({
            q: q,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          this.wordcloudData.status = status;

          if (status.code == 200) {
            this.wordcloudData = data;
            this.wordcloudData.loading = false;
          } else {
            this.$message.error(status.msg);
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
div.search-wordcloud {
  margin-top: 50px;
}
</style>