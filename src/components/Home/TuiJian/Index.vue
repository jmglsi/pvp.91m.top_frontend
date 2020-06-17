<template>
  <div class="home-tuijian app-margin">
    <van-pull-refresh
      v-model="tuiJianIsLoading"
      :pulling-text="homeInfo.miniapp.pulling"
      :loosing-text="homeInfo.miniapp.loosing"
      :loading-text="homeInfo.miniapp.loading"
      :success-text="homeInfo.miniapp.success"
      @refresh="onTuiJianRefresh"
    >
      <div
        class="tuijian-a139b05b7f8e496c00991733ef7cd589 tuijian-447b7147e84be512208dcc0995d67ebc"
      >
        <van-swipe :autoplay="3000" :height="175" class="tuijian-f97c2ea77c6a08b3afd5a59851cbe0d8">
          <van-swipe-item
            v-for="(data, index) in homeInfo.swipe.result"
            :key="'tuijian-a139b05b7f8e496c00991733ef7cd589-' + index"
            class="tuijian-ac104b3f82b3b5d3643319a05734ce93"
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
          :title="homeInfo.tipsInfo.title"
          :value="homeInfo.tipsInfo.des"
          :to="homeInfo.tipsInfo.to"
          :url="homeInfo.tipsInfo.url"
          is-link
        />
      </div>
    </van-pull-refresh>

    <HeroUpdate :aid="0" />
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
  name: "HomeTuiJian",
  components: {
    HeroUpdate: resolve => require(["@/components/Hero/Update.vue"], resolve)
  },
  data() {
    return {
      homeInfo: {
        swipe: {
          result: []
        },
        tipsInfo: {
          title: null,
          des: null,
          to: null,
          url: null
        },
        miniapp: {
          pulling: "喵呜...",
          loosing: "奇迹什么时候女装呢...",
          loading: "加载中...",
          success: null
        }
      },
      tuiJianIsLoading: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      this.axios.get(this.appApi.list.getHome).then(ret => {
        this.homeInfo = ret.data.data;
      });
    },
    onTuiJianRefresh: function() {
      setTimeout(() => {
        this.tuiJianIsLoading = false;
        this.$router.push({
          path: "/miniapp?from=9485e07d3fa6e237df83da7ff5f83bde"
        });
      }, 1500);
    }
  }
};
</script>