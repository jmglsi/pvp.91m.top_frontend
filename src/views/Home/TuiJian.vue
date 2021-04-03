<template>
  <div class="app-tuijian tuijian-b77f3080e567fd154c25b053042dcba9">
    <div class="tuijian-fde59ce861918e4314a5a460e7c9cc54">
      <van-pull-refresh
        v-model="isLoading"
        :pulling-text="appHomeInfo.miniappInfo.pulling"
        :loosing-text="appHomeInfo.miniappInfo.loosing"
        :loading-text="appHomeInfo.miniappInfo.loading"
        :success-text="appHomeInfo.miniappInfo.success"
        @refresh="onDropdownRefreshClick"
        class="tuijian-af03857fe372b964b53ef3a082c2b518"
      >
        <div class="app-a139b05b7f8e496c00991733ef7cd589 app-1e4b00d1b398e8a6551429b2a2f0e17c">
          <van-swipe :autoplay="5000" :height="200" class="app-f97c2ea77c6a08b3afd5a59851cbe0d8">
            <van-swipe-item
              v-for="(data, index) in appHomeInfo.swipeInfo.result.rows"
              :key="'tuijian-0c74eea41745fb37742d335606774a60-' + index"
              @click="
                data.url
                  ? $appOpenUrl('是否打开外部链接?', null, { path: data.url })
                  : null
              "
              class="tuijian-ac104b3f82b3b5d3643319a05734ce93"
            >
              <img v-lazy="data.img" class="tuijian-3c873293a7dc1ea8c20579f6a7ae94a9" />
              <van-tag
                mark
                :color="data.tag.color"
                class="app-a5a5c883f68e45baa83f140e218759f1"
              >{{ data.tag.text }}</van-tag>
            </van-swipe-item>
          </van-swipe>

          <div class="app-609a820218e58b4ea5a5f7656e61a0ad">
            <van-grid :border="false" :column-num="3" class="app-18e05b8e51e3beb49ba55397d11cb8ce">
              <van-grid-item
                v-for="(data, index) in appHomeInfo.indexInfo"
                :key="'tuijian-ea25beed04733529ada26478f028b97e-' + index"
                :to="data.to"
              >
                <span v-if="data.img">
                  <img
                    width="50"
                    height="50"
                    v-lazy="data.img"
                    class="tuijian-6bea2af1a0662ae3049c2b1c5a60f302"
                  />
                </span>
                <div
                  v-if="data.title"
                  class="tuijian-f55b83381f479ed4c1203b80f891d83a"
                >{{ data.title }}</div>
              </van-grid-item>
            </van-grid>

            <van-cell
              :title="appHomeInfo.tipsInfo.title || '嗨~'"
              :label="appHomeInfo.tipsInfo.label || '你好鸭♥'"
              :value="appHomeInfo.tipsInfo.value"
              :to="appHomeInfo.tipsInfo.to"
              :url="appHomeInfo.tipsInfo.url"
              :is-link="appHomeInfo.tipsInfo.isLink"
              class="app-06eab62dcb5a23b966a620807d78e66f"
            />
          </div>
        </div>
      </van-pull-refresh>
    </div>

    <div class="tuijian-3379002f77deb3f52601cf5ddcdcebca">
      <van-skeleton v-if="showInfo.skeleton" :row="30" />

      <lazy-component
        :preLoad="1"
        @show="onComponentShow"
        class="hero-2a23eb5062a0258f23f4969c4c60aa2e"
      >
        <HeroUpdate :heroId="0" />
      </lazy-component>
    </div>
  </div>
</template>

<script>
export default {
  name: "TuiJianHome",
  components: {
    HeroUpdate: () => import("@/components/Hero/Update.vue"),
  },
  data() {
    return {
      isLoading: false,
      showInfo: {
        skeleton: true,
      },
      appHomeInfo: {
        miniappInfo: {
          to: "/miniapp",
          pulling: "喵呜...",
          loosing: "奇迹什么时候女装呢...",
          loading: "加载中...",
          success: null,
        },
        swipeInfo: {
          result: {
            rows: [],
          },
        },
        indexInfo: [],
        tipsInfo: {
          title: null,
          label: null,
          value: null,
          isLink: false,
          to: null,
          url: null,
        },
      },
    };
  },
  mounted() {
    this.getAppHome();
  },
  methods: {
    getAppHome: function () {
      let appConfigInfo = this.$appConfigInfo,
        appHome = this.$appGetLocalStorage("appHome");

      if (
        appHome &&
        this.$appTs - appConfigInfo.appInfo.updateTime <
          appConfigInfo.updateInfo.timeout
      ) {
        this.appHomeInfo = appHome;

        return;
      }

      this.$axios.post(this.$appApi.pvp.getAppHome).then((res) => {
        let data = res.data.data;

        this.appHomeInfo = data;

        this.$appSetLocalStorage("appHome", this.appHomeInfo);
      });
    },
    onComponentShow: function () {
      setTimeout(() => {
        this.showInfo.skeleton = false;
      }, 1000);
    },
    onDropdownRefreshClick: function () {
      setTimeout(() => {
        this.isLoading = false;

        this.$appPush({ path: this.appHomeInfo.miniappInfo.to });
      }, 2500);
    },
  },
};
</script>

<style scoped>
img.tuijian-6bea2af1a0662ae3049c2b1c5a60f302 {
  border-radius: 100%;
}

div.tuijian-f55b83381f479ed4c1203b80f891d83a {
  font-size: 12px;
  margin-top: 5px;
}
</style>