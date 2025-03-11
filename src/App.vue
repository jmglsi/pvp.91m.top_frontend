<template>
  <div
    id="app"
    :style="{
      zoom: zoom,
    }"
  >
    <div
      v-watermark="$appWatermarkInfo"
      class="app-63c4cfbde5ad50f3f537c2540374995e"
    >
      <div v-if="$appIsApple && $appConfigInfo.appInfo.pwa == 1">
        <div
          v-if="showInfo.statusBar"
          :style="{
            background:
              'rgba(0, 0, 0, 0) linear-gradient(to right, rgb(236, 119, 171), rgb(120, 115, 245)) repeat scroll 0% 0%',
            zIndex: '-5 !important',
          }"
          class="app-8de1f001663ee713d24888bb422e3881"
        />
        <div
          v-if="showInfo.whiteBar"
          :style="{
            backgroundColor: 'white !important',
          }"
          class="app-4789d9440d92b2647ea8a52c2f5b31b5"
        />
      </div>

      <div
        v-else-if="$appInWechatMiniapp"
        class="app-655254d3dc0f9b7f5f5f2a5c36cf09e6"
      >
        <van-nav-bar
          :border="false"
          :fixed="true"
          :safe-area-inset-top="true"
          :style="{ zIndex: -1 }"
        />
      </div>

      <div v-if="showInfo.app" class="app-3d1b70e46d0b6cd9cfa43d743da14266">
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view class="app-1bda80f2be4d3658e0baa43fbe7ae8c1" />
        </keep-alive>

        <router-view v-else class="app-1bda80f2be4d3658e0baa43fbe7ae8c1" />
      </div>
    </div>

    <AppReadme v-if="!noUpdateTips" />

    <!--
    <div
      v-if="showInfo.tabbar && !$appIsRobot && showInfo.miniappButton"
      class="app-f1453f63de7b681a25dc590be0c8a31e"
    >
      <van-popover
        v-model="showInfo.miniappPopover"
        placement="right"
        trigger="click"
      >
        <template #reference>
          <span>
            <van-button round plain color="orange" size="small">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img
                v-lazy="$appCache + '/img/icons-app/miniapp.png'"
                width="20"
                height="20"
              />
            </van-button>
          </span>
        </template>

        <div
          @click="openWxMiniapp"
          class="app-26e2e326f1b1b65c8872276c20d24535"
        >
          推荐使用小程序~<br />体验更好更丝滑~
        </div>
      </van-popover>
    </div>
    -->

    <!--
    <div
      :style="{
        height: bottomHeight + 'px',
        overflow: bottomHeight < 175 ? 'hidden' : 'auto',
        paddingTop: '10px',
      }"
      class="app-c696671ab3f65c37ca1c3899d5da3352"
    >
      <div
        @touchstart="test_start"
        @touchmove="test_move"
        @touchend="test_end"
        class="app-c572af95c789f65ee013ad5aa62b7b59"
      >
        <div class="app-0704716ec20b7c8363dbb02633edfc7e"></div>
      </div>

      <div
        :style="{
          overflow: bottomHeight < 175 ? 'hidden' : 'auto',
        }"
        class="app-44d87ea4c47ebfb7ea291a5dc72042f8"
      >
        容器头部

        <div
          style="height: 1000px; background-color: green; margin: 10px"
          class="app-44d87ea4c47ebfb7ea291a5dc7204218"
        >
          容器内容
        </div>

        容器底部
      </div>
    </div>
    -->

    <div class="app-ad7786f9368e7c2dc1cde095284ca39f">
      <van-tabbar
        v-model="tableData.result.model"
        v-if="showInfo.tabbar"
        class="app-130a360689f8d613da10c94d53527a1b"
      >
        <van-tabbar-item
          v-for="(data, index) in tableData.result.rows"
          :key="'app-531814e80e16a27a837887308ee7c9ad-' + index"
          :icon="data.icon"
          :to="data.to"
          :name="data.name"
          :badge="data.badge"
          :class="data.isBig ? 'app-0353ac5a7e2d6e9a6a0e652c63b2832a' : null"
          icon-prefix="app-e0c3b278eeb2cab05f548d7af0f2c949"
        >
          {{ data.text }}
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHome",
  components: {
    AppReadme: () => import("@/components/App/Readme.vue"),
  },
  watch: {
    $route: function (to, from) {
      this.initPage(to);
      this.initShow(to, from);
    },
  },
  metaInfo() {
    return {
      meta: [
        {
          vmid: "format-detection-telephone",
          name: "format-detection",
          content: "telephone=no",
        },
        {
          vmid: "format-detection-address",
          name: "format-detection",
          content: "address=no",
        },
        {
          vmid: "format-detection-date",
          name: "format-detection",
          content: "date=no",
        },
        {
          vmid: "format-detection-email",
          name: "format-detection",
          content: "email=no",
        },
        {
          vmid: "format-full-screen",
          name: "full-screen",
          content: "yes",
        },
      ],
      script: this.$appConfigInfo.appInfo.script || [],
      link: this.$appConfigInfo.appInfo.link || [],
    };
  },
  data() {
    return {
      bottomHeight: 175,
      zoom: 1,
      noUpdateTips: true,
      tableData: {
        result: {
          model: window.location.pathname,
          rows: [
            {
              icon: null,
              to: "/",
              name: "/",
              text: this.$t("loading"),
            },
            {
              icon: null,
              to: null,
              name: null,
              text: this.$t("loading"),
            },
            {
              icon: null,
              to: null,
              name: null,
              text: this.$t("loading"),
            },
          ],
        },
      },
      showInfo: {
        tabbar: false,
        app: false,
        hello: true,
        statusBar: true,
        whiteBar: false,
        miniappButton: false,
        miniappPopover: true,
      },
    };
  },
  created() {
    this.$i18n.locale = this.$appCookie("lang") || "zh-CN";
  },
  mounted() {
    this.getAppInfo();
  },
  methods: {
    initPage: function (to) {
      let statusBar = false,
        whiteBar = false,
        tabbar = false,
        path = to.path,
        isRobot = this.$appIsRobot,
        openId = this.$appCookie("openId") || "苏苏的荣耀助手";

      this.$appWatermarkInfo = {
        content: "@" + openId.slice(0, 12),
        font: "12px Microsoft YaHei",
        rotate: 25,
        width: 135,
        height: 100,
        color: "rgba(175, 175, 175, 0.25)",
      };

      if (isRobot) {
        this.$appConfigInfo.appInfo.isReadme = true;
        this.$appConfigInfo.tipsInfo.gameTips = true;
        this.$appConfigInfo.tipsInfo.extraTips = true;
        this.$appConfigInfo.tipsInfo.playerTips = true;

        this.$appSetLocalStorage("appConfigInfo", this.$appConfigInfo);

        this.$appCookie("agree", 1, {
          expires: "1y",
        });
      }

      this.tableData.result.model = window.location.pathname || path;

      /ranking|search/i.test(path) || path == "/"
        ? (statusBar = true)
        : (statusBar = false);
      this.showInfo.statusBar = statusBar;

      /ranking/i.test(path) ? (whiteBar = true) : (whiteBar = false);
      this.showInfo.whiteBar = whiteBar;

      /^\/(admin|miniapp|login|skin|hero\/(.*?)\/info|hero\/(.*?)\/replay|hero\/(.*?)\/view|hero\/(.*?)\/equipment|game)/i.test(
        path
      )
        ? (tabbar = false)
        : (tabbar = true);
      this.showInfo.tabbar = tabbar;

      /tools/i.test(path) || isRobot == 1
        ? (this.noUpdateTips = true)
        : (this.noUpdateTips = false);
    },
    initShow: function (to, from) {
      let getHistory = this.$store.getters.getHistory || {},
        nowPath = {};

      if (!from.name) {
        nowPath = {
          fullPath: "/",
        };
      } else if (to.name != from.name) {
        nowPath = from;
      } else {
        return;
      }

      this.$store.commit("saveHistory", nowPath);

      if (getHistory.length > 1) {
        this.$store.getters.getHistory.shift();
      }
    },
    getAppInfo: function () {
      this.$axios.post(this.$appApi.app.getAppInfo).then((res) => {
        let data = res.data.data,
          appInfo = data.appInfo,
          oauthInfo = data.oauthInfo,
          tipsInfo = data.tipsInfo,
          q = this.$appQuery,
          oauthType = q.oauthType || "",
          tempOpenId = q.tempOpenId || "",
          tempAccessToken = q.tempAccessToken || "",
          tempCode = q.tempCode || "",
          appConfigInfo = this.$appConfigInfo;

        this.zoom = q.zoom || 1;
        this.tableData = data;
        this.tableData.result.model =
          window.location.pathname || this.$route.path;

        //let updateTime = appConfigInfo.appInfo.updateInfo.time || 0;
        let updateVersion = appConfigInfo.appInfo.updateInfo.version || 0;
        let today = this.$appXEUtils.toDateString(new Date(), "yyyy-MM-dd");
        let lastUpdateTipsDay = this.$appCookie("lastUpdateTipsDay") || "";

        if (appInfo.updateInfo.version != updateVersion) {
          this.$appCookie("tempOpenId", null, {
            expires: -1,
          });
          this.$appCookie("tempAccessToken", null, {
            expires: -1,
          });
          this.$appCookie("lastUpdateTipsDay", null, {
            expires: -1,
          });
          this.$appCookie("game-index", null, {
            expires: -1,
          });
          this.$appCookie("game-type", null, {
            expires: -1,
          });

          this.$appDelectAllLocalStorage();

          this.$appDelectLocalStorage("appConfigInfo");
        }

        if (lastUpdateTipsDay != today) {
          if (appInfo.updateInfo.text && !this.noUpdateTips) {
            this.$dialog
              .alert({
                title: appInfo.updateInfo.title || "loading...",
                message: appInfo.updateInfo.text || "loading...",
                allowHtml: true,
                showCancelButton: true,
                confirmButtonText: "今日不再提醒",
                cancelButtonText: "取消",
                theme: "round-button",
              })
              .then(() => {
                this.$appCookie("lastUpdateTipsDay", today, {
                  expires: "1d",
                });
              })
              .catch(() => {
                //on cancel
              });
          }

          this.$appDelectLocalStorage("appConfigInfo");
        }

        this.$appConfigInfo.appInfo = {
          isReadme: Boolean(appConfigInfo.appInfo.isReadme) || false,
          isSwingMode: Boolean(appConfigInfo.appInfo.isSwingMode) || false,
          isSmallMode: Boolean(appConfigInfo.appInfo.isSmallMode) || false,
          isReductionMode:
            Boolean(appConfigInfo.appInfo.isReductionMode) || false,
          openUrl: Boolean(appConfigInfo.appInfo.openUrl) || false,
          newsPush: Boolean(appConfigInfo.appInfo.newsPush) || true,
          wow: Boolean(appConfigInfo.appInfo.wow) || true,
          pwa: appConfigInfo.appInfo.pwa || 0,
          link: appInfo.link || [],
          name: appInfo.name || "苏苏的荣耀助手",
          script: appInfo.script || [],
          updateInfo: {
            version: appInfo.updateInfo.version || 0,
            text: appInfo.updateInfo.text || this.$t("loading"),
            title: appInfo.updateInfo.title || this.$t("loading"),
            time: appInfo.updateInfo.time || 0,
            timeout: appInfo.updateInfo.timeout || 43200,
            //
            avgScore: appInfo.updateInfo.avgScore || 0,
            daily: appInfo.updateInfo.daily || 0,
            weekly: appInfo.updateInfo.weekly || 0,
          },
          miniappInfo: {
            url: appInfo.miniappInfo.url || null,
          },
          search: {
            img: appInfo.search.img || null,
            placeholder: appInfo.search.placeholder || null,
            to: appInfo.search.to || null,
            url: appInfo.search.url || null,
          },
        };
        this.$appConfigInfo.oauthInfo = oauthInfo || [];

        this.$appSetLocalStorage("appConfigInfo", this.$appConfigInfo);

        this.getGameInfo();

        if (tipsInfo) {
          this.$notification.open({
            message: tipsInfo.title,
            description: tipsInfo.description,
            onClick: () => {
              this.$appOpenUrl(
                "是否打开" + (tipsInfo.url ? "外部" : "内部") + "链接?",
                null,
                { path: tipsInfo.url ? tipsInfo.url : tipsInfo.to },
                tipsInfo.url ? 0 : 1
              );
            },
          });
        }

        if (!oauthType) {
          if (tempOpenId) {
            this.$appCookie("tempOpenId", tempOpenId, {
              expires: "1H",
            });
            this.$appCookie("tempAccessToken", tempAccessToken, {
              expires: "1H",
            });
          }

          if (tempCode) {
            this.$message.warning(this.$appMsg.warning[tempCode]);

            this.$appDelectAllLocalStorage();
          }
        } else {
          if (tempOpenId) {
            this.$appCookie("openId", tempOpenId, {
              expires: "1M",
            });
            this.$appCookie("accessToken", tempAccessToken, {
              expires: "1M",
            });

            setTimeout(() => {
              let nowUrl,
                nowPath,
                nowSearch,
                nowSearchIndex = 0;

              nowPath = window.location.pathname;
              nowSearch = window.location.search;
              nowSearch = nowSearch.replace("&refresh=0", "");
              nowSearch = nowSearch.replace("&refresh=1", "");
              nowSearchIndex = nowSearch.indexOf("&tempOpenId=");

              if (nowSearchIndex == -1) {
                nowSearchIndex = nowSearch.length;
              }

              nowSearch = nowSearch.substring(0, nowSearchIndex);

              nowUrl = nowPath + nowSearch;

              window.location.href = nowUrl;
            }, 1000 * 2.5);
          }

          if (tempCode) {
            this.$message.warning(this.$appMsg.warning[tempCode]);
          }
        }

        this.showInfo.app = true;
      });

      //if (!this.$appInWechatMiniapp) {
      //this.showInfo.miniappButton = true;
      //}

      /**
       *
       * 以防上方没加载完，加载完后再显示
       *
       */
      setTimeout(() => {
        this.showInfo.app = true;
      }, 500);
    },
    getGameInfo: function () {
      let q = this.$appQuery,
        gameType = q.gameType || this.$appGameType,
        gameIndex = this.$appGameInfo.indexOf(gameType);

      if (gameIndex == -1) {
        gameIndex = 0;
      }

      gameType = this.$appGameInfo[gameIndex];

      if (this.$appCookie("game-index") != gameIndex) {
        //this.$message.info(this.$appMsg.info[1034]);
      }

      this.$appCookie("game-index", gameIndex, {
        expires: "1y",
      });

      this.$appCookie("game-type", gameType, {
        expires: "1y",
      });
    },
    openWxMiniapp: function () {
      this.$appOpenUrl(
        this.$t("open-url.title"),
        null,
        {
          path: this.$appConfigInfo.appInfo.miniappInfo.url,
        },
        0
      );
    },
    test_start: function () {
      document.querySelector("#app").style.overflowY = "hidden";
    },
    test_move: function (e) {
      let cH = document.body.clientHeight,
        cY = cH - e.touches[0].clientY,
        height = 0;

      if (cY < 175) {
        height = 175;
      } else if (cH - cY < 75) {
        height = cH - 75;
      } else {
        height = cY;
      }

      this.bottomHeight = height;
    },
    test_end: function () {
      let cH = document.body.clientHeight,
        bottomHeight = this.bottomHeight;

      document.querySelector("#app").style.overflowY = "unset";

      if (bottomHeight < 175) {
        this.bottomHeight = 175;
      } else {
        this.bottomHeight = cH - 75;
      }
    },
  },
};
</script>

<style lang="less">
#app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  height: 100%;
  position: absolute;
  text-align: center;
  width: 100%;
}

#mindMapContainer {
  margin: 0;
  padding: 0;
  height: 446px;
  width: 100%;
  overflow: hidden;
  background-color: rgb(237, 237, 237) !important;
}

.app-bda9643ac6601722a28f238714274da4 {
  color: red !important;
}

.app-ee3e4aec9bcaaaf72cd0c59e8a0f477d {
  color: orange !important;
}

.app-9f27410725ab8cc8854a2769c7a516b8 {
  color: green !important;
}

.app-48d6215903dff56238e52e8891380c8f {
  color: #1680d1 !important;
}

.app-fdc229c08af23dac1a0e8caac88a239d {
  color: purple !important;
}

.app-8a900759792c14b84891392b9f0e360d {
  color: black !important;
}

.app-d7a506baa20bdbe9daaa1366348175a9 {
  color: rgb(222, 177, 81) !important;
}

.app-53f544c1e6fce0feac70340d481ad2ed {
  color: rgb(35, 124, 123) !important;
}

.app-07b92306234cbd0130797a0832bb6ec8 {
  color: rgb(135, 135, 135) !important;
}

.app-px74c62958bafea1f814e2eb4aa1a173 {
  color: rgb(81, 198, 32) !important;
}

.app-794c031c8f0677bd60c22c57a8c209f5 {
  color: rgb(33, 99, 192) !important;
}

.app-ed403ab7f16652930c096cf5ace1e810 {
  color: rgb(190, 0, 193) !important;
}

.app-fa564e797e42df57903a35d6ce5c97c5 {
  color: rgb(192, 148, 32) !important;
}

.app-5f19eaf71f40d74d66be84db52b3ad87 {
  color: white !important;
  text-shadow: 1px 1px 3px #000, 1px 1px 3px #000;
}

.app-b28e48b33c0948bab67b77d696b3b9fd {
  margin-left: 5px;
}

input.app-fa42596ed8c1eff3ed8b93bba913bde3 {
  margin: 0 5px;
  text-align: center;
  width: @app-width;
  z-index: @app-z-index;
}

img {
  border-radius: 10px;
  object-fit: cover;
}

img.app-border-radius {
  border-radius: @app-border-radius;
}

img.app-d31cb1c15b091f41248935d88a8d0a45 {
  border-radius: unset;
  bottom: -25px !important;
  left: 2px !important;
  position: absolute;
  transform: scale(0.75);
}

img.app-4ab161130e76571ab0c31aa23a6238c7 {
  margin: 0 10px;
}

i.vxe-cell-help-icon {
  color: orange;
  margin-bottom: 3px;
}

i.app-6de102c0bc4dc7f72ce287d6b0828052 {
  img.van-icon__image {
    border-radius: unset;
    margin-top: 3px !important;
  }
}

i.app-b10034712510883e9d2c45b4ec90772d {
  img.van-icon__image {
    border-radius: @app-border-radius;
    height: @app-height;
    width: @app-width;
  }
}

i.app-e0c3b278eeb2cab05f548d7af0f2c949 img.van-icon__image,
i.app-72383b9892bd1e6a2bd310dfb1fb2344 img.van-icon__image {
  border-radius: unset;
  transform: scale(1.25);
}

ul.app-9e60d3ee1e1574cae90960f940c0a821 {
  height: 90px;
}

ul.app-d865b50ce307751bdeb9a6ab16e7baf9 {
  overflow-x: auto;
  white-space: nowrap;

  li.app-1951b6e7c82938dd7446a41e829b247b {
    display: inline-block;
    margin-top: 10px;
  }
}

button.app-a066f238070a70cb531c9bd722c65b36 {
  margin: 25px 0;
}

button.app-0162f4b7b2dbdf6aff3a25de02e49a8b {
  height: 35px;
  width: 150px;
}

button.app-4236a440a662cc8253d7536e5aa17942 {
  height: 35px;
  width: 150px;

  span.van-button__text {
    color: red !important;
  }
}

span.van-tab__text {
  margin: 11px 0;
}

span.app-b69a71d636ec20584432124284825b1e {
  margin: 0 3px;
}

span.app-ce6834f6417aa0bd26ce2c913f27302d {
  margin-left: 5px;
  margin-right: -3px;
}

span.app-a5a5c883f68e45baa83f140e218759f1 {
  bottom: 30px;
  left: 0;
  position: absolute;
  z-index: @app-z-index;
}

span.app-e4d23e841d8e8804190027bce3180fa5 {
  font-size: @app-font-size;
  left: 0;
  margin-top: -13px;
  position: absolute;
  z-index: @app-z-index;
}

span.app-0fc3cfbc27e91ea60a787de13dae3e3c {
  font-size: @app-font-size;
  margin-top: -6px;
  position: absolute;
  width: @app-width;
}

span.app-07cc694b9b3fc636710fa08b6922c42b {
  font-size: @app-font-size;
}

span.app-f4842dcb685d490e2a43212b8072a6fe {
  color: #969799 !important;
  font-size: @app-font-size;
}

span.app-dac41b9450b77c3eb0ab7d8428d004f5 {
  color: #969799 !important;
  font-size: @app-font-size;
  margin: 0 15px;
}

span.app-e4c9479b11955648dad558fe717a4eb2 {
  color: red !important;
  font-size: @app-font-size;
}

span.app-f929a9d9af35e647bf66a06a6c421ea1 {
  margin-left: 3px;
  font-size: 8px;
}

label.ant-radio-wrapper {
  margin-top: 10px;
}

div.ant-message,
div.ant-notification,
div.vxe-table--tooltip-wrapper {
  z-index: 99999999 !important;
}

div.ant-popover {
  padding: 10px;
}

div.ant-popover-title,
ul.ant-dropdown-menu {
  text-align: center;
}

div.van-popup {
  div.van-popover__content {
    z-index: 99999999 !important;
  }
}

div.van-tabs__nav {
  height: unset;
  overflow-x: unset;
}

div.vxe-table--empty-content {
  width: unset !important;
}

div.vxe-table {
  th.vxe-header--column:not(.col--ellipsis) {
    padding: 6px 0;
  }
}

div.app-index {
  div.van-tabs__nav {
    background-color: transparent !important;
  }
}

div.login-index {
  div.van-popup {
    padding: 0 10px !important;
  }
}

div.ranking-index {
  div.van-popover {
    left: unset !important;
    right: 10px !important;
    top: 50px !important;
    width: 275px;
  }
}

div.app-recommend {
  div.van-cell-group,
  div.van-cell,
  div.van-grid-item__content {
    background-color: rgb(250, 250, 250) !important;
  }
}

div.app-bpIndex {
  height: 443px;
}

div.app-420e569f7ae439ae256513412631f2f4 {
  font-size: @app-font-size;
  left: 0;
  margin: 0 auto;
  margin-top: -3px;
  position: absolute;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

div.app-e7cc92f4d89cae11c55145231f702389 {
  margin: 5px;
  text-align: center;
  width: 100px;
}

div.app-68adaff1d028a37f27fb33c483329cba {
  margin-right: -2px;
}

div.app-ecb26e3ebb0456087e850f45c7484687 {
  width: 100px;
  height: 40px;
  margin-top: -40px;
  position: absolute;
  backdrop-filter: blur(5px);
  filter: blur(5px);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

div.app-e8a723fff1bfb5b0e938a949c31b0659 {
  margin-top: -47px;
  position: absolute;
  z-index: 1;
  text-align: left;
  font-size: 12px;
}

div.app-c8b5f5d48f608ded3e078de9bef7c61b {
  margin-top: 7px;
  font-size: 12px;
}

div.app-63c4cfbde5ad50f3f537c2540374995e {
  position: relative;
  width: 100%;
  height: 100%;
}

div.app-097ee6ec15c5d0a4c39910b8b8797ca3 {
  height: 100%;
  width: 100%;
  position: static !important;
  z-index: @app-z-index;
}

div.app-f1453f63de7b681a25dc590be0c8a31e {
  position: fixed;
  bottom: 125px;
  left: -25px;
  z-index: 10 !important;
}

div.app-26e2e326f1b1b65c8872276c20d24535 {
  padding: 10px;
  font-size: 12px;
  color: gray;
}

div.app-c572af95c789f65ee013ad5aa62b7b59 {
  margin-top: -35px;
  padding-top: 15px;
  height: 50px;
}

div.app-c696671ab3f65c37ca1c3899d5da3352 {
  width: 100%;
  bottom: 0;
  position: fixed;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px -1px 7px rgb(220, 220, 220);
  padding-bottom: 40px;
  z-index: 10 !important;
}

div.app-0704716ec20b7c8363dbb02633edfc7e {
  background-color: rgb(227, 231, 241);
  border-radius: 10px;
  width: 50px;
  margin: 25px auto;
  height: 7px;
}

div.app-44d87ea4c47ebfb7ea291a5dc72042f8 {
  margin: 10px;
  margin-top: 13px;
  height: 767px;
  background-color: red;
}

div.app-0cecd2d48b0c852a513d34eec25042b7 {
  height: 446px;
  overflow: auto;
}

div.app-4717d11da95ed90ccdb4d4a0648bad39 {
  margin-bottom: 50px;
  margin-top: 50px;
}

div.app-76da017caccd1fb264af2218f6064b0d {
  height: 740px;
  overflow: auto;
  padding-bottom: 25px;
  padding-right: 25px;
  padding-top: 25px;
  position: absolute;
  top: 0;
  width: 100%;
}

div.app-0e1a8b3f7f6162bf4b88d3d001b88374 {
  font-size: @app-font-size;
  left: -28px;
  margin-top: -5px;
  position: absolute;
  width: 100%;
}

div.app-fe64546261ce7a19b6784737edd0fdf1 {
  height: 225px;

  label.ant-checkbox-wrapper {
    width: 250px;
  }

  div.app-41b238cc893836e28b50cd5a59843803 {
    margin-top: 50px;
    position: absolute;
    width: 100%;
  }
}

div.app-b0704b59dbf144bfeffb53bdb11d7128 {
  font-size: @app-font-size;
  left: 0;
  margin-top: -3px;
  position: absolute;
  width: 100%;
}

div.app-52b0e5c90604d59d1814f184d58e2033 {
  white-space: nowrap;
}

div.app-82f6ee2b57fb59b0b7b3803164d6b9d8 {
  font-size: 12px;
  margin-top: 5px;
}

div.app-5ddd8715c99cbf00677a622145b3c163 {
  color: gray !important;
  font-size: @app-font-size;
  margin: 5px 0;
  text-align: center;
  width: 100%;
}

div.app-c1351782c9c93025d72864180d0cf28c {
  height: 70px;
  overflow: hidden;
}

div.app-1bda80f2be4d3658e0baa43fbe7ae8c1 {
  height: 100%;
  position: absolute;
  width: 100%;
}

div.app-0ca41257ee36e86e5d89591c82113263 {
  img.van-image__img {
    border-radius: unset;
  }

  div.van-image-preview__index {
    top: unset;
    bottom: 75px;
  }

  div.van-image-preview__cover {
    bottom: 35px;
    color: white !important;
    top: unset;
    width: 100%;
  }
}

div.app-face1cbe136c70e1fc08cff038596944 {
  margin-top: 25px;
}

div.app-69df17da0044a6e876b2afd3217d2564 {
  border-radius: 5px;
  max-width: 500px;
  padding: 10px;
  width: 75%;
}

div.app-8de1f001663ee713d24888bb422e3881 {
  height: 120px;
  margin-top: -60px;
  position: fixed;
  width: 100%;
}

div.app-4789d9440d92b2647ea8a52c2f5b31b5 {
  height: 100px;
  margin-top: 25px;
  position: absolute;
  width: 100%;
}

div.app-f3cc17bc0d768ca60b8bb496a10b1990 {
  text-align: @app-text-align;

  span.van-tab__text {
    margin: 6px 0;
  }

  div.van-tabs__wrap {
    border-radius: 100px;
    height: 32px;

    div.van-tabs__nav {
      background-color: rgb(250, 250, 250) !important;
    }
  }
}

div.app-a139b05b7f8e496c00991733ef7cd589 {
  //margin: 25px 10px 0 10px;
  margin: 10px;
  padding: 0;
}

div.app-f97c2ea77c6a08b3afd5a59851cbe0d8,
div.app-1c17c2e6813dda8cab7978f50d30203c {
  border-radius: 10px;
  overflow: hidden;
  transform: translateY(0);
}

div.app-609a820218e58b4ea5a5f7656e61a0ad {
  margin: 25px 0;
}

div.app-06eab62dcb5a23b966a620807d78e66f {
  text-align: @app-text-align;
}

div.app-0464ec62d5cba8a9ec29d0c4c89fc7c6,
div.app-6bdc6915ee08058392eafe0ef6e353fd {
  border-radius: 10px;
  margin: 0 10px;
  padding: 10px;
}

div.app-b4a64ecd008af42ba95bc20350599699,
div.app-9b9faf4e737f5907995f767e0b345dab {
  background-color: rgb(250, 250, 250) !important;
}

div.app-88bf7a95736562190270d51dc2cb3f42 {
  margin: 50px 15px 40px 15px;
}

div.van-tabbar-item__text {
  transform: scale(0.75);
  margin-top: 3px;
}

div.app-f3b57b63e4f5f4e157fd45bdb8611005 {
  div.van-dropdown-menu__bar {
    border-radius: 50px;
    width: 125px;
  }
}

div.app-8f06e89ca90bebf60c91699c473f4022 {
  div.van-dropdown-item {
    margin: 0 10px;

    div.van-cell {
      background-color: #fafafa !important;
    }
  }
}

div.app-71c40c24a80f0a5cda72f93d3af1d904 {
  height: 533px;
  margin-top: 10px;
  overflow: auto;
}

div.app-61046f2f5eefe3dc179e52af32241062 {
  margin: 15px;
  text-align: @app-text-align;
}

div.app-2acf2be2c6fdd22f4a6282a72817bdb1 {
  margin-top: 25px;
}

div.app-044a82dc9b34eebf2c54fe2c3c904368 {
  margin: 15px 0 5px 0px;
}

div.app-wzry,
div.app-zl,
div.app-wj,
div.app-zbk,
div.app-gxk,
div.app-jcc,
div.app-jb,
div.app-qhfw,
//
div.app-bpIndex,
div.app-genre,
div.app-equipmentListAll,
div.app-equipmentListOne,
div.app-inscription,
//
div.app-px,
div.app-td,
div.app-pz,
div.app-pzOne {
  margin-top: 3px;
}

div.app-genre,
div.app-equipmentListAll,
div.app-equipmentListOne,
div.app-inscription,
div.app-pzOne {
  height: 443px !important;
  max-height: 443px !important;
  overflow: hidden;
}

div.app-130a360689f8d613da10c94d53527a1b {
  padding-top: 3px;
  z-index: 10 !important;
}

div.app-1de7efdd403ec02d55f5c1d9557a2fc4 {
  img.ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3 {
    width: 35px;
    height: 35px;
  }
}

div.app-0353ac5a7e2d6e9a6a0e652c63b2832a {
  z-index: @app-z-index;

  img.van-icon__image {
    background-color: white !important;
    border-radius: @app-border-radius;
    border: 3px solid white;
    height: 40px;
    margin-top: -21px;
    width: 40px;
  }
}
</style>