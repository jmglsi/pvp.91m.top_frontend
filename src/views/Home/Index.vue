<template>
  <div class="app-index">
    <div class="home-4faa549767067d538f8945b062d2f244">
      <van-tabs
        v-model="tabsInfo.model"
        v-if="tabsInfo.model > -1"
        :border="false"
        :ellipsis="false"
        :swipeable="true"
        :sticky="true"
        :offset-top="$appIsApple && $appConfigInfo.appInfo.pwa == 1 ? 50 : 0"
        :before-change="onTabsBeforeChange"
        duration="0.5"
        line-width="25px"
        class="home-5db8dca30c2d7f0c2bc225ae852c5053"
      >
        <van-tab
          :title="$t('recommend')"
          class="home-e7f8cbd87d347be881cba92dad128518"
        >
          <HomeRecommend />
        </van-tab>
        <van-tab disabled class="home-e7f8cbd87d347be881cba92dad128518">
          <template #title>
            <van-search
              :placeholder="$appConfigInfo.appInfo.search.placeholder"
              @click="
                $appPush({
                  path: '/search',
                })
              "
              shape="round"
              class="home-b6651e4ed730d53f874841b07507986c"
            >
            </van-search>
          </template>
        </van-tab>
        <van-tab class="home-e7f8cbd87d347be881cba92dad128518">
          <template #title>
            <img
              v-lazy="$appConfigInfo.appInfo.search.img"
              @click="onUrlClick($appConfigInfo.appInfo.search)"
              width="35"
              height="35"
              class="app-border-radius"
            />
          </template>
        </van-tab>
        <!--
        <van-tab
          :title="$t('competition')"
          class="home-e7f8cbd87d347be881cba92dad128518"
        >
          <HomeGame />
        </van-tab>
        -->
      </van-tabs>
    </div>

    <div class="home-72ab9e07378f988922e6c91884048db0">
      <span class="home-865fc5de432c76bc2ab45afb9ff5b8de">
        {{ $t("home.bottom") }}
      </span>
    </div>

    <AppHello height="100px" />
  </div>
</template>

<script>
export default {
  name: "appIndex",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
    //HomeGame: () => import("@/views/Home/Game.vue"),
    HomeRecommend: () => import("@/views/Home/Recommend.vue"),
  },
  metaInfo() {
    return {
      meta: [
        {
          vmid: "keyWords",
          name: "keyWords",
          content:
            "ban,BP模拟,暴走的老刘备,榜单,比赛,版本之子,策划,对局回顾,对手,对抗,对比,打野,队友,顶端,分路,发育,辅助,游走,非ban必选,返场,关系,国服,高分局,攻速阈值,观赛助手,黄刀,教练,金刀,交友,尖端局,KPL,克制,开黑,扩列,老刘备,路人局,模拟器,闷声发财,opgg,pick,排位,皮肤,全局BP,全局BP模拟器,强势,弱势,上分助手,数据,赛事,同分路,同职业,推荐,体验,万战,王者荣耀,王者营地,玩家,英雄,永夜,中路,主播,战力,正式,职业",
        },
        {
          vmid: "description",
          name: "description",
          content:
            "在这，可以找到自己心仪的英雄。在这，可以看到每个英雄的巅峰时刻。在这，还可以模拟全局BP！",
        },
      ],
    };
  },
  data() {
    return {
      copyData: "",
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
      let q = this.$appQuery,
        pwa = Number(q.pwa) || 0,
        type = Number(q.type) || 0,
        version = Number(q.v) || 1609430400,
        ls = this.$appConfigInfo;

      this.tabsInfo.model = type;

      if (pwa == 0) return;

      ls.appInfo.pwa = pwa;
      this.$appSetLocalStorage("appConfigInfo", ls);

      let updateDay = ((this.$appTs - version) / 86400).toFixed(2),
        url = location;

      if (updateDay >= 90) {
        this.$dialog
          .confirm({
            title: "温馨提示【" + updateDay + "】",
            message:
              "您已经很久没有更新过本站啦\n页面有可能发生了较大的变化\n建议清除缓存重新添加到桌面",
          })
          .then(() => {
            //on confirm
            this.copyData = url.origin;

            this.$appCopyData(
              this.copyData,
              "链接已复制，请清除缓存重新添加到桌面~"
            );
          })
          .catch(() => {
            //on cancel
          });
      }
    },
    onTabsBeforeChange: function () {
      return false;
    },
    onUrlClick: function (data) {
      this.$appOpenUrl(
        "是否打开" + (data.url ? "外部" : "内部") + "链接?",
        data.to ? "网络交友须谨慎，涉及金钱莫轻信" : null,
        { path: data.url ? data.url : data.to },
        data.url ? 0 : 1
      );
    },
  },
};
</script>

<style lang="less">
img.home-3c873293a7dc1ea8c20579f6a7ae94a9 {
  border-radius: unset;
  height: 100%;
  width: 100%;
}

ul.home-0fb3346555b8f5460aaaf04001361da5 {
  height: 367px;
  overflow-y: auto;
  white-space: nowrap;
  width: 250px;
}

li.home-423fda2e543a1804accff6229de61143 {
  margin: 7px 0;
  margin-left: 20px;
  text-align: @app-text-align;
  width: 150px;
}

div.home-b6651e4ed730d53f874841b07507986c {
  input.van-field__control {
    text-align: center;
  }
}

div.home-caa1dc26349a3e0c95b4a9e69a6e53b7 {
  position: absolute;
  top: 150px;
  width: 100%;
}

div.home-e289b0da5cdb7507d4d9cc22f588cbda {
  overflow: hidden;
  width: 225px;
}

div.home-56677dd04cbe46e7b175e734b4ec94ef {
  background-color: rgb(250, 250, 250) !important;
  height: 381px;
  overflow: hidden;
  position: absolute;
  width: 80px;
}

div.home-41d74f0099cd7f9b526d7c601ada0e26 {
  left: 80px;
  position: relative;
  width: 100%;
}

div.home-07e33cfc65db63122f9d18ae77a89315 {
  font-size: 12px;
  position: fixed;
  right: -13px;
  width: 75px;
}

div.home-d553001f432b5a09d9ae776abd8413c0 {
  bottom: 0;
  font-size: 12px;
}

div.home-f55b83381f479ed4c1203b80f891d83a {
  font-size: 12px;
  margin-top: 5px;
}

div.home-72ab9e07378f988922e6c91884048db0 {
  font-size: 12px;
  margin: 25px;
}

div.home-5db8dca30c2d7f0c2bc225ae852c5053 {
  div.van-tabs__wrap {
    margin-top: -12px;
    height: 60px;
  }

  div.van-tab--active {
    font-size: 25px;
  }
}
</style>