<template>
  <div class="tuijian-home app-margin">
    <div class="tuijian-fde59ce861918e4314a5a460e7c9cc54">
      <van-pull-refresh
        v-model="isLoading"
        :pulling-text="appHomeInfo.miniappInfo.pulling"
        :loosing-text="appHomeInfo.miniappInfo.loosing"
        :loading-text="appHomeInfo.miniappInfo.loading"
        :success-text="appHomeInfo.miniappInfo.success"
        @refresh="onTuiJianRefresh"
      >
        <div
          class="tuijian-a139b05b7f8e496c00991733ef7cd589 tuijian-447b7147e84be512208dcc0995d67ebc"
        >
          <van-swipe
            :autoplay="3000"
            :height="175"
            class="tuijian-f97c2ea77c6a08b3afd5a59851cbe0d8"
          >
            <van-swipe-item
              v-for="(data, index) in appHomeInfo.swipeInfo.result"
              :key="'tuijian-a139b05b7f8e496c00991733ef7cd589-' + index"
              class="tuijian-ac104b3f82b3b5d3643319a05734ce93"
              @click="data.url ? appOpenUrl('是否打开外部链接？', null, data.url) : null"
            >
              <img :src="data.img" class="tuijian-3c873293a7dc1ea8c20579f6a7ae94a9" />
              <van-tag
                :color="data.tag.color"
                mark
                class="tuijian-a5a5c883f68e45baa83f140e218759f1"
              >{{ data.tag.text }}</van-tag>
            </van-swipe-item>
          </van-swipe>
        </div>

        <div class="tuijian-6a507ff2d5941aa4e30c98a8f3739ffe">
          <van-cell
            :title="appHomeInfo.tipsInfo.title"
            :value="appHomeInfo.tipsInfo.des"
            :to="appHomeInfo.tipsInfo.to"
            :url="appHomeInfo.tipsInfo.url"
            is-link
          />
        </div>
      </van-pull-refresh>
    </div>

    <div class="tuijian-3379002f77deb3f52601cf5ddcdcebca">
      <HeroUpdate :heroId="0" />
    </div>
  </div>
</template>

<style scoped>
.tuijian-a139b05b7f8e496c00991733ef7cd589 {
  padding: 0;
  overflow: hidden;
  transform: translateY(0);
}

.tuijian-3c873293a7dc1ea8c20579f6a7ae94a9 {
  height: 100%;
  width: 100%;
}

.tuijian-a5a5c883f68e45baa83f140e218759f1 {
  position: absolute;
  bottom: 25px;
  z-index: 1;
  left: 0;
}

div.van-cell.van-cell--clickable {
  background-color: rgb(245, 245, 245);
  border-radius: 10px;
}

.tuijian-6a507ff2d5941aa4e30c98a8f3739ffe {
  text-align: left;
  margin: 0 10px;
}
</style>

<script>
export default {
  name: "TuiJianHome",
  components: {
    HeroUpdate: resolve => require(["@/components/Hero/Update.vue"], resolve)
  },
  data() {
    return {
      appHomeInfo: {
        swipeInfo: {
          result: []
        },
        tipsInfo: {
          title: null,
          des: null,
          to: null,
          url: null
        },
        miniappInfo: {
          pulling: "喵呜...",
          loosing: "奇迹什么时候女装呢...",
          loading: "加载中...",
          success: null
        }
      },
      isLoading: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      this.axios.get(this.apiList.pvp.getAppHome).then(ret => {
        this.appHomeInfo = ret.data.data;
      });
    },
    onTuiJianRefresh: function() {
      setTimeout(() => {
        this.isLoading = false;
        this.$router.push({
          path: "/miniapp",
          query: { from: "9485e07d3fa6e237df83da7ff5f83bde" }
        });
      }, 2000);
    }
  }
};
</script>