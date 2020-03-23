<template>
  <div class="changelog">
    <vue-markdown
      :source="statementApp"
      class="app-markdown"
    />
    <AppBottomTabbar />
  </div>
</template>

<style scoped>
.changelog {
  text-align: left;
}

.app-markdown {
  padding: 25px;
}
</style>

<script>
export default {
  name: "Changelog",
  components: {
    VueMarkdown: resolve => require(["vue-markdown"], resolve),
    AppBottomTabbar: resolve => require(["@/components/AppBottomTabbar.vue"], resolve)
  },
  data () {
    return {
      statementApp: ""
    };
  },
  mounted () {
    this.getStatementApp();
  },
  methods: {
    getStatementApp: function () {
      this.axios.get("/md/statement_app.md?ts=" + this.appTs).then(ret => {
        this.statementApp = ret.data;
      });
    }
  }
};
</script>