<template>
  <div class="app-home">
    <div class="home-3edeff15047c21ac6441301927306137">
      <van-sticky :offset-top="$appIsApple && $appConfigInfo.appInfo.pwa == 1 ? 50 : 0">
        <van-search
          show-action
          shape="round"
          :placeholder="appInfo.search.placeholder"
          @click="$appPush({ path: '/search' })"
        >
          <template #action>
            <img
              width="35"
              height="35"
              v-lazy="appInfo.search.img"
              class="home-47ee6ad584172f967b674131cb948a87"
              @click="
                appInfo.search.to 
                ? $appOpenUrl('是否打开内部链接?', '网络交友需谨慎,涉及金钱莫轻信', { path: appInfo.search.to }, 1) 
                : $appOpenUrl('是否打开外部链接?', null, { path: appInfo.search.url }, 0)
              "
            />
          </template>
        </van-search>
      </van-sticky>
    </div>

    <div class="app-6db4dcff371b9397d894ed932d085444">
      <van-tabs
        v-model="tabsInfo.model"
        v-if="tabsInfo.model > -1"
        :border="false"
        :ellipsis="false"
        :swipeable="true"
        @change="$appPush({ query: { type: tabsInfo.model } })"
        duration="0.5"
        line-width="25px"
        class="home-5db8dca30c2d7f0c2bc225ae852c5053"
      >
        <van-tab title="推荐" class="home-e7f8cbd87d347be881cba92dad128518">
          <TuiJian />
        </van-tab>
        <van-tab title="赛事" class="home-e7f8cbd87d347be881cba92dad128518">
          <Game />
        </van-tab>
      </van-tabs>
    </div>

    <div class="home-72ab9e07378f988922e6c91884048db0">
      <span class="home-865fc5de432c76bc2ab45afb9ff5b8de">数据随意引用，注明出处即可 ;D</span>
    </div>

    <AppHello height="100px" />
  </div>
</template>

<script>
export default {
  name: "AppHome",
  components: {
    TuiJian: () => import("@/views/Home/TuiJian.vue"),
    Game: () => import("@/views/Home/Game.vue"),
    AppHello: () => import("@/components/App/Hello.vue"),
  },
  metaInfo() {
    return {
      meta: [
        {
          vmid: "keyWords",
          name: "keyWords",
          content:
            "ban,BP模拟,暴走的老刘备,榜单,比赛,版本之子,策划,对局回顾,对手,对抗,对比,打野,队友,顶端,分路,发育,辅助,非ban必选,返场,关系,国服,高分局,攻速阈值,观赛助手,黄刀,教练,金刀,交友,尖端局,KPL,克制,开黑,扩列,老刘备,路人局,模拟器,闷声发财,opgg,pick,排位,皮肤,全局BP,全局BP模拟器,强势,弱势,上分助手,数据,赛事,同分路,同职业,推荐,体验,万战,王者荣耀,王者营地,玩家,英雄,永夜,中路,主播,战力,正式,职业",
        },
        {
          vmid: "description",
          name: "description",
          content:
            "在这,可以找到自己心仪的英雄。在这,可以看到每个英雄的巅峰时刻。在这,还可以模拟全局BP！",
        },
      ],
    };
  },
  data() {
    return {
      copyData: "",
      appInfo: {
        search: {
          placeholder: "搜索",
          img: "//pic.iask.cn/fimg/724763542645.jpg",
          to: "/friends",
          url: null,
        },
      },
      tabsInfo: {
        model: 0,
      },
    };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage: function () {
      let pwa = parseInt(this.$route.query.pwa) || 0,
        type = parseInt(this.$route.query.type) || 0,
        version = parseInt(this.$route.query.v) || 1609430400;

      this.tabsInfo.model = type;

      if (this.$appConfigInfo.appInfo.version > 0) {
        this.appInfo = this.$appConfigInfo.appInfo;
      }

      if (pwa == 0) return;
      this.$appConfigInfo.appInfo.pwa = pwa;

      this.$appSetLocalStorage("appConfigInfo", this.$appConfigInfo);

      let updateDay = ((this.$appTs - version) / 86400).toFixed(2);

      if (updateDay >= 90) {
        this.$dialog
          .confirm({
            title: "温馨提示【" + updateDay + "】",
            message:
              "您已经很久没有更新过本站啦\r页面有可能发生了较大的变化\r建议清除缓存重新添加到桌面",
          })
          .then(() => {
            // on confirm
            this.copyData = location.origin;

            setTimeout(
              (copyData) => {
                this.$appCopyData(
                  copyData,
                  "链接已复制,请清除缓存重新添加到桌面~"
                );
              },
              750,
              this.copyData
            );
          })
          .catch(() => {
            // on cancel
          });
      }
    },
  },
};
</script>

<style lang="less">
img.home-47ee6ad584172f967b674131cb948a87 {
  border-radius: @app-border-radius;
}

div.home-72ab9e07378f988922e6c91884048db0 {
  font-size: @app-font-size + 2px;
  margin: 25px;
}
</style>