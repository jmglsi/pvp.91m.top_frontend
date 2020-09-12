<template>
  <div class="app-tuijian app-d638615004bb2ff42ed26948aba89c80">
    <div class="tuijian-fde59ce861918e4314a5a460e7c9cc54">
      <van-pull-refresh
        v-model="isLoading"
        :pulling-text="appHomeInfo.miniappInfo.pulling"
        :loosing-text="appHomeInfo.miniappInfo.loosing"
        :loading-text="appHomeInfo.miniappInfo.loading"
        :success-text="appHomeInfo.miniappInfo.success"
        @refresh="onTuiJianRefresh"
        class="tuijian-af03857fe372b964b53ef3a082c2b518"
      >
        <div class="tuijian-a139b05b7f8e496c00991733ef7cd589 app-1e4b00d1b398e8a6551429b2a2f0e17c">
          <van-swipe
            :autoplay="5000"
            :height="175"
            class="tuijian-f97c2ea77c6a08b3afd5a59851cbe0d8"
          >
            <van-swipe-item
              v-for="(data, index) in appHomeInfo.swipeInfo.result"
              :key="'tuijian-0c74eea41745fb37742d335606774a60-' + index"
              class="tuijian-ac104b3f82b3b5d3643319a05734ce93"
              @click="data.url ? appOpenUrl('是否打开外部链接？', null, data.url) : null"
            >
              <img v-lazy="data.img" class="tuijian-3c873293a7dc1ea8c20579f6a7ae94a9" />
              <van-tag
                :color="data.tag.color"
                mark
                class="tuijian-a5a5c883f68e45baa83f140e218759f1"
              >{{ data.tag.text }}</van-tag>
            </van-swipe-item>
          </van-swipe>

          <van-cell
            :title="appHomeInfo.tipsInfo.title ? appHomeInfo.tipsInfo.title : '很高兴认识你~'"
            :value="appHomeInfo.tipsInfo.des"
            :to="appHomeInfo.tipsInfo.to"
            :url="appHomeInfo.tipsInfo.url"
            is-link
            class="tuijian-06eab62dcb5a23b966a620807d78e66f"
          />
        </div>
      </van-pull-refresh>
    </div>

    <div class="tuijian-3379002f77deb3f52601cf5ddcdcebca">
      <HeroUpdate :heroId="0" />
    </div>
  </div>
</template>

<script>
export default {
  name: "TuiJianHome",
  components: {
    HeroUpdate: (resolve) => require(["@/components/Hero/Update.vue"], resolve),
  },
  data() {
    return {
      appHomeInfo: {
        swipeInfo: {
          result: [],
        },
        tipsInfo: {
          title: null,
          des: null,
          to: null,
          url: null,
        },
        miniappInfo: {
          pulling: "喵呜...",
          loosing: "奇迹什么时候女装呢...",
          loading: "加载中...",
          success: null,
        },
      },
      isLoading: false,
    };
  },
  mounted() {
    this.getAppHome();
  },
  methods: {
    getAppHome: function () {
      this.axios.get(this.apiList.pvp.getAppHome).then((res) => {
        this.appHomeInfo = res.data.data;
      });
    },
    onTuiJianRefresh: function () {
      setTimeout(() => {
        this.isLoading = false;

        this.appPush("/miniapp");
      }, 2000);
    },
  },
};
</script>