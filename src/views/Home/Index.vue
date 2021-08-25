<template>
  <div class="app-home">
    <div class="home-3edeff15047c21ac6441301927306137">
      <van-sticky
        :offset-top="$appIsApple && $appConfigInfo.appInfo.pwa == 1 ? 50 : 0"
      >
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
              class="app-3b9655ab218c7f1a18f5dacd778a52f0"
              @click="onRightClick(appInfo.search)"
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
        <van-tab
          to="/search?q=%E7%88%86%E6%96%99&refresh=1"
          title="爆料 🔗"
          class="home-e7f8cbd87d347be881cba92dad128518"
        >
          <div style="margin-top: 25px">数据来源互联网</div>
        </van-tab>
      </van-tabs>
    </div>

    <div class="home-72ab9e07378f988922e6c91884048db0">
      <span class="home-865fc5de432c76bc2ab45afb9ff5b8de"
        >数据随意引用，注明出处即可 ;D</span
      >
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
          img: "//ae04.alicdn.com/kf/Hec08150147584fc0b4dcc1176200ef94v.png",
          to: "/friends",
          url: null,
        },
      },
      tabsInfo: {
        model: 0,
      },
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    initPage: function () {
      let q = this.$route.query,
        pwa = parseInt(q.pwa) || 0,
        type = parseInt(q.type) || 0,
        version = parseInt(q.v) || 1609430400;

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

            this.$appCopyData(
              this.copyData,
              "链接已复制,请清除缓存重新添加到桌面~"
            );
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    onRightClick: function (data) {
      if (data.to) {
        this.$appOpenUrl(
          "是否打开内部链接?",
          "网络交友须谨慎，涉及金钱莫轻信",
          { path: data.to },
          1
        );
      }

      if (data.url) {
        this.$appOpenUrl("是否打开外部链接?", null, { path: data.url }, 0);
      }
    },
  },
};
</script>

<style lang="less">
.update-tyf {
  color: purple;
}

.update-zsf {
  color: rgb(222, 177, 81);
}

.update-xyx {
  color: rgb(35, 124, 123);
}

.update-pb {
  color: black;
}

.update-cz {
  color: red;
}

.update-fx {
  color: orange;
}

.update-xpf {
  color: green;
}

.update-fc {
  color: blue;
}

img.home-3c873293a7dc1ea8c20579f6a7ae94a9 {
  border-radius: unset;
  height: 100%;
  width: 100%;
}

div.app-game {
  div.van-cell-group,
  div.van-cell,
  div.van-grid-item__content {
    background-color: transparent !important;
  }
}

div.home-f55b83381f479ed4c1203b80f891d83a {
  font-size: @app-font-size + 2px;
  margin-top: 5px;
}

div.home-72ab9e07378f988922e6c91884048db0 {
  font-size: @app-font-size + 2px;
  margin: 25px;
}

div.home-5db8dca30c2d7f0c2bc225ae852c5053 {
  div.van-tabs__wrap {
    width: 43% !important;
    margin-top: -3px;
  }

  div.van-tab--active {
    font-size: 25px;
  }
}

div.home-3edeff15047c21ac6441301927306137 {
  div.van-search {
    width: 57%;
    right: 0;
    position: absolute;
    margin-top: 2px;
    z-index: 1;
  }
}
</style>