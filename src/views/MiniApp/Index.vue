<template>
  <div class="miniapp">
    <div class="miniapp-5acbc85c0ac59d5f69197b9fdb893b00">
      <van-nav-bar
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        z-index="99999999"
        title="小程序"
        class="miniapp-cce79bfde37d3f930a50bbaed2d29135"
      ></van-nav-bar>
    </div>
    <div
      class="
        miniapp-8d777f385d3dfec8815d20f7496026dc
        app-4eb2044800e2b7b9e5c44d370af22b27
      "
      :style="
        $appIsApple && $appConfigInfo.appInfo.pwa == 1
          ? { marginTop: '-50px' }
          : {}
      "
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
              icon-prefix="app-b10034712510883e9d2c45b4ec90772d"
            />
          </van-grid>
        </van-cell-group>
      </div>

      <div class="miniapp-2a48f64e8081b260765b0c936932836a">
        <van-cell-group
          :border="false"
          title="其他"
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
              icon-prefix="app-b10034712510883e9d2c45b4ec90772d"
            />
          </van-grid>
        </van-cell-group>
      </div>
    </div>

    <div
      class="miniapp-021a7599a708a3781fabe39f7631edfc"
      @click="$appPush({ path: '/' })"
    >
      <img
        v-lazy="
          '//img06.mifile.cn/v1/MI_542ED8B1722DC/b97e76e5df98fbfd8b25ad527f9aadb5.png'
        "
        width="25"
        height="25"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniApp",
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
      this.$axios.post(this.$appApi.pvp.getMiniAppInfo).then((res) => {
        this.miniapp = res.data.data;
      });
    },
  },
};
</script>

<style scoped lang="less">
div.miniapp-8d777f385d3dfec8815d20f7496026dc {
  text-align: @app-text-align;
}

div.miniapp-021a7599a708a3781fabe39f7631edfc {
  bottom: 35px;
  left: 0;
  margin: 0 auto;
  position: fixed;
  right: 0;
}
</style>