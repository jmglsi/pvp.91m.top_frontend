<template>
  <div class="miniapp">
    <div class="miniapp-8d777f385d3dfec8815d20f7496026dc">
      <van-cell-group :border="false" title="本站">
        <van-grid :border="false" :column-num="3">
          <van-grid-item
            v-for="(data, index) in miniapp.a"
            :key="'miniapp-0cc175b9c0f1b6a831c399e269772661-' + index"
            :icon="data.icon"
            :text="data.text"
            :to="data.to"
            :url="data.url"
            class="app-b5e3c0b9ac8b718b9b4cb60f4fabe214"
          />
        </van-grid>
      </van-cell-group>

      <van-cell-group :border="false" title="其它">
        <van-grid :border="false" :column-num="3">
          <van-grid-item
            v-for="(data, index) in miniapp.b"
            :key="'miniapp-92eb5ffee6ae2fec3ad71c777531578f-' + index"
            :icon="data.icon"
            :text="data.text"
            :to="data.to"
            :url="data.url"
            class="app-b5e3c0b9ac8b718b9b4cb60f4fabe214"
          />
        </van-grid>
      </van-cell-group>
    </div>

    <div class="miniapp-1a721faf2df53972bfd0831c64b6146d" @click="$router.push({ path: '/' });">
      <AppCollapse width="25" height="25" />
    </div>
  </div>
</template>

<style scoped>
.miniapp-8d777f385d3dfec8815d20f7496026dc {
  text-align: left;
}

.miniapp-1a721faf2df53972bfd0831c64b6146d {
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
    AppCollapse: resolve => require(["@/assets/Icons/AppCollapse.vue"], resolve)
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
      this.axios.get(this.apiList.pvp.getMiniApp).then(ret => {
        this.miniapp = ret.data.data;
      });
    }
  }
};
</script>