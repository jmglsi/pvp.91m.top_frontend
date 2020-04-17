<template>
  <div class="miniapp">
    <div class="data">
      <van-cell-group title="本站" class="app-cell-group">
        <van-grid :border="false" :column-num="3">
          <van-grid-item
            v-for="(data, index) in miniapp.a"
            :key="index + '-miniapp-a'"
            :icon="data.icon"
            :text="data.text"
            :to="data.to"
            :url="data.url"
            class="link-item"
          />
        </van-grid>
      </van-cell-group>

      <van-cell-group title="其它" class="app-cell-group">
        <van-grid :border="false" :column-num="3">
          <van-grid-item
            v-for="(data, index) in miniapp.b"
            :key="index + '-miniapp-b'"
            :icon="data.icon"
            :text="data.text"
            :to="data.to"
            :url="data.url"
            class="link-item"
          />
        </van-grid>
      </van-cell-group>
    </div>

    <div class="collapse" @click="$router.push({ path: '/' });">
      <AppCollapse width="25" height="25" />
    </div>
  </div>
</template>

<style scoped>
.data {
  text-align: left;
}

.collapse {
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 35px;
}
</style>

<script>
export default {
  name: "MiniApp",
  components: {
    AppCollapse: resolve =>
      require(["@/components/AppIcons/AppCollapse.vue"], resolve)
  },
  data() {
    return {
      miniapp: {
        a: [],
        b: []
      }
    };
  },
  mounted() {
    this.getMiniApp();
  },
  methods: {
    getMiniApp: function() {
      this.axios.get(this.appApi.list.getMiniApp).then(ret => {
        this.miniapp = ret.data.data;
      });
    }
  }
};
</script>