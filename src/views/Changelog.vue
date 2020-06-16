<template>
  <div class="changelog">
    <vue-markdown :source="statementApp" class="app-590fc197fe73db0aa2ec03687a372eea" />
    <AppBottomTabbar />
  </div>
</template>

<style scoped>
.changelog {
  text-align: left;
}

.app-590fc197fe73db0aa2ec03687a372eea {
  padding: 25px;
}
</style>

<script>
export default {
  name: "Changelog",
  components: {
    VueMarkdown: resolve => require(["vue-markdown"], resolve),
    AppBottomTabbar: resolve =>
      require(["@/components/App/BottomTabbar.vue"], resolve)
  },
  data() {
    return {
      statementApp: ""
    };
  },
  mounted() {
    this.getStatementApp();
  },
  methods: {
    getStatementApp: function() {
      this.axios.get("/md/statement_app.md?ts=" + this.appTs).then(ret => {
        this.statementApp = ret.data;
      });
    }
  }
};
</script>