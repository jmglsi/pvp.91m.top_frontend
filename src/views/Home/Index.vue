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
        @change="onTabsChange"
        duration="0.5"
        line-width="25px"
        class="home-5db8dca30c2d7f0c2bc225ae852c5053"
      >
        <!--
        :before-change="onTabsBeforeChange"
        -->
        <van-tab class="home-e7f8cbd87d347be881cba92dad128518">
          <template #title>
            <img
              width="33"
              height="33"
              v-lazy="$appCache + '/img/icons-game/wzry.png'"
            />
          </template>

          <HomeWzryRecommend />
        </van-tab>
        <van-tab class="home-e7f8cbd87d347be881cba92dad128518">
          <template #title>
            <img
              width="33"
              height="33"
              v-lazy="$appCache + '/img/icons-game/jcc.png'"
            />
          </template>
        </van-tab>
        <!--
        <van-tab class="home-e7f8cbd87d347be881cba92dad128518">
          <template #title>
            <img
              width="33"
              height="33"
              v-lazy="$appCache + '/img/icons-game/nsh.png'"
            />
          </template>
        </van-tab>
        -->
        <van-tab disabled class="home-e7f8cbd87d347be881cba92dad128518">
          <template #title>
            <van-popover
              v-model="showInfo.popoverMeau"
              :actions="popoverMeauActions"
              @select="onPopoverMeauSelect"
              trigger="click"
              placement="bottom-end"
            >
              <template #reference>
                <span class="home-59ffc0dc2bc3e6f52ba91e7639d55987">
                  ⬇️ {{ $t("more") }} ⬇️
                </span>
              </template>
            </van-popover>
          </template>
        </van-tab>
        <!--
        <van-tab class="home-e7f8cbd87d347be881cba92dad128518">
          <template #title>
            <img
              v-lazy="$appConfigInfo.appInfo.search.img"
              @click="onUrlClick($appConfigInfo.appInfo.search)"
              width="33"
              height="33"
              class="app-border-radius"
            />
          </template>
        </van-tab>
        -->
        <!--
        <van-tab
          :title="$t('competition')"
          class="home-e7f8cbd87d347be881cba92dad128518"
        >
          <HomeGlobalBPMatch />
        </van-tab>
        -->
      </van-tabs>
    </div>

    <AppHello height="100px" />
  </div>
</template>

<script>
export default {
  name: "appIndex",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
    HomeWzryRecommend: () => import("@/views/Home/Wzry/Recommend.vue"),
    //HomeGlobalBPMatch: () => import("@/views/Home/GlobalBP/Match.vue"),
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
      popoverMeauActions: [{ text: "工具箱", value: 0 }],
      selectInfo: {
        text: "工具箱",
        value: 0,
      },
      tabsInfo: {
        model: 1,
      },
      showInfo: {
        popoverMeau: true,
      },
    };
  },
  created() {
    this.initPage();

    setTimeout(() => {
      this.showInfo.popoverMeau = false;
    }, 1000 * 5);
  },
  methods: {
    initPage: function () {
      let q = this.$appQuery,
        version = Number(q.v) || 1609430400,
        pwa = Number(q.pwa) || 0,
        gameIndex = Number(this.$cookie.get("game-index")) || 0,
        ls = this.$appConfigInfo;

      this.tabsInfo.model = gameIndex;

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
    onPopoverMeauSelect: function (e) {
      this.getSelectData(e);
    },
    getSelectData: function (e) {
      let selectIndex = e.value;

      if (selectIndex == 0) {
        this.$appPush({ path: "/tools/box" });
      }
    },
    onTabsBeforeChange: function () {
      //
    },
    onTabsChange: function (e) {
      let gameIndex = String(e),
        gameType = this.$appGameInfo[e];

      this.$cookie.set("game-index", gameIndex, {
        expires: "1Y",
      });

      this.$cookie.set("game-type", gameType, {
        expires: "1Y",
      });

      this.$message.info(this.$appMsg.info[1033]);

      setTimeout(() => {
        window.location.href = window.location.origin + "/my?refresh=1";
      }, 1000);
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
  width: 250px !important;
}

li.home-423fda2e543a1804accff6229de61143 {
  margin: 7px 0;
  margin-left: 20px;
  text-align: @app-text-align;
  width: 150px;
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

div.home-b467ee88fe43e04a918a10585678bdf9 {
  font-size: 12px;
  margin-top: 25px;
}

div.home-5db8dca30c2d7f0c2bc225ae852c5053 {
  div.van-tabs__wrap {
    //margin-top: -12px;
    //margin-top: 3px;
    height: 60px;
  }

  div.van-tab--active {
    font-size: 25px;
  }
}
</style>