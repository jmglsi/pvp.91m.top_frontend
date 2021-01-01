<template>
  <div class="miniapp">
    <div
      class="miniapp-8d777f385d3dfec8815d20f7496026dc app-4eb2044800e2b7b9e5c44d370af22b27"
    >
      <div class="miniapp-7c8fdd065963838acab323de542586ee">
        <van-cell-group
          :border="false"
          title="本站"
          class="miniapp-e92a4998df8669fd2f0d92b7f3d41ac5"
        >
          <van-grid
            :border="false"
            :column-num="3"
            class="miniapp-074e15e6992043a4a47e781cc3008693"
          >
            <van-grid-item
              v-for="(data, index) in miniapp.result.a"
              :key="'miniapp-0cc175b9c0f1b6a831c399e269772661-' + index"
              :icon="data.icon"
              :text="data.text"
              :to="data.to"
              :url="data.url"
              class="app-b5e3c0b9ac8b718b9b4cb60f4fabe214"
            />
          </van-grid>
        </van-cell-group>
      </div>

      <div class="miniapp-2a48f64e8081b260765b0c936932836a">
        <van-cell-group
          :border="false"
          title="其它"
          class="miniapp-b377992f355a56a90c6120fb8559de59"
        >
          <van-grid
            :border="false"
            :column-num="3"
            class="miniapp-a713c75193d032a9ea6df8a0665471eb"
          >
            <van-grid-item
              v-for="(data, index) in miniapp.result.b"
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
    </div>

    <div
      class="miniapp-021a7599a708a3781fabe39f7631edfc"
      @click="appPush({ path: '/' })"
    >
      <AppCollapse width="25" height="25" />
    </div>
  </div>
</template>

<style>
@import url("/css/app-style/home-miniapp.css");
</style>

<script>
export default {
  name: "MiniApp",
  components: {
    AppCollapse: (resolve) =>
      require(["@/assets/Icons/AppCollapse.vue"], resolve),
  },
  data() {
    return {
      miniapp: {
        result: {
          a: [],
          b: [],
        },
      },
    };
  },
  mounted() {
    this.getMiniAppInfo();
  },
  methods: {
    getMiniAppInfo: function () {
      this.axios.get(this.apiList.pvp.getMiniAppInfo).then((res) => {
        this.miniapp = res.data.data;
      });
    },
  },
};
</script>
