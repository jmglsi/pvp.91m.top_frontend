<template>
  <div id="app" :style="{ zoom: zoom }">
    <div v-watermark="watermark" class="app-63c4cfbde5ad50f3f537c2540374995e">
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
          :style="{ backgroundColor: 'white !important' }"
          class="app-4789d9440d92b2647ea8a52c2f5b31b5"
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

    <div
      v-if="showInfo.tabbar && showInfo.miniappButton"
      @click="openWxMiniapp"
      class="app-f1453f63de7b681a25dc590be0c8a31e"
    >
      <van-popover
        v-model="showInfo.miniappPopover"
        placement="right"
        trigger="click"
      >
        <template #reference>
          <van-button round plain color="orange" size="small">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <img width="20" height="20" v-lazy="'/img/icons-app/miniapp.png'" />
          </van-button>
        </template>

        <div
          @click="openWxMiniapp"
          class="app-26e2e326f1b1b65c8872276c20d24535"
        >
          推荐使用小程序~<br />体验更好更丝滑~
        </div>
      </van-popover>
    </div>

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
        fixed
        class="app-130a360689f8d613da10c94d53527a1b"
      >
        <van-tabbar-item
          v-for="(data, index) in tableData.result.rows"
          :key="'app-531814e80e16a27a837887308ee7c9ad-' + index"
          :icon="data.icon"
          :to="data.to"
          :name="data.name"
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
      watermark: {
        content: "",
        font: "12px Microsoft YaHei",
        rotate: 25,
        width: 135,
        height: 100,
        color: "rgb(244, 244, 244)",
      },
      bottomHeight: 175,
      zoom: 1,
      noUpdateTips: true,
      tableData: {
        result: {
          model: "/",
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
        tabbar: true,
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
    this.$i18n.locale = this.$cookie.get("lang") || "zh-CN";
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
        isRobot = to.query.isRobot || 0,
        name = this.$cookie.get("name") || this.$appConfigInfo.appInfo.name,
        accessToken = this.$cookie.get("accessToken") || null;

      if (accessToken) {
        this.watermark = {
          content: "@" + name,
          font: "12px Microsoft YaHei",
          rotate: 25,
          width: 135,
          height: 100,
          color: "rgb(240, 240, 240)",
        };
      }

      if (isRobot) {
        this.$appConfigInfo.appInfo.isReadme = true;
        this.$appConfigInfo.tipsInfo.dfsTips = true;
        this.$appConfigInfo.tipsInfo.skillTips = true;
        this.$appConfigInfo.tipsInfo.wanjiaTips = true;

        this.$appSetLocalStorage("appConfigInfo", this.$appConfigInfo);

        this.$cookie.set("agree", 1, {
          expires: "1Y",
        });
      }

      this.tableData.result.model = path;

      /ranking|search/i.test(path) == true || path == "/"
        ? (statusBar = true)
        : (statusBar = false);
      this.showInfo.statusBar = statusBar;

      /ranking/i.test(path) == true ? (whiteBar = true) : (whiteBar = false);
      this.showInfo.whiteBar = whiteBar;

      /tools|admin|miniapp|bilibili|login|skin|hero\/(.*?)\/info|hero\/(.*?)\/replay|hero\/(.*?)\/view|hero\/(.*?)\/equipment|game\/(.*?)/i.test(
        path
      ) == true
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
          positionInfo = data.positionInfo,
          tipsInfo = data.tipsInfo,
          q = this.$appQuery,
          tempOpenId = q.tempOpenId || "",
          tempAccessToken = q.tempAccessToken || "",
          oauthType = q.oauthType || "",
          tempText = q.tempText || "",
          appConfigInfo = this.$appConfigInfo;

        this.zoom = q.zoom || 1;
        this.tableData = data;
        this.tableData.result.model = this.$route.path;

        let updateTime = appConfigInfo.appInfo.updateInfo.time || 0;
        //let updateVersion = appConfigInfo.appInfo.updateInfo.version || 0;
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let today = year + "-" + month + "-" + day;
        let lastUpdateTipsDay = this.$cookie.get("lastUpdateTipsDay") || "";

        //if (appInfo.updateInfo.version != updateVersion) {
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
                this.$cookie.set("lastUpdateTipsDay", today, {
                  expires: "1M",
                });
              })
              .catch(() => {
                //on cancel
              });
          }

          this.$appDelectLocalStorage("appConfigInfo");
        }

        //this.$appDelectLocalStorage("appConfigInfo");
        //}

        if (appInfo.updateInfo.time != updateTime) {
          this.$appDelectAllLocalStorage();

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
          tempText: appInfo.tempText || "",
          updateInfo: {
            version: appInfo.updateInfo.version || 0,
            time: appInfo.updateInfo.time || 0,
            title: appInfo.updateInfo.title || this.$t("loading"),
            text: appInfo.updateInfo.text || this.$t("loading"),
            timeout: appInfo.updateInfo.timeout || 43200,
          },
          search: {
            img: appInfo.search.img || null,
            placeholder: appInfo.search.placeholder || null,
            to: appInfo.search.to || null,
            url: appInfo.search.url || null,
          },
          wxMiniappUrl: appInfo.wxMiniappUrl || null,
        };
        this.$appConfigInfo.oauthInfo = oauthInfo || [];
        this.$appConfigInfo.positionInfo = positionInfo || [];

        this.$appSetLocalStorage("appConfigInfo", this.$appConfigInfo);

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
            this.$cookie.set("tempOpenId", tempOpenId, { expires: "1H" });
            this.$cookie.set("tempAccessToken", tempAccessToken, {
              expires: "1H",
            });
          }

          if (tempText) {
            this.$message.info(tempText);

            this.$appDelectAllLocalStorage();
          }
        } else {
          if (tempOpenId) {
            this.$cookie.set("openId", tempOpenId, { expires: "1M" });
            this.$cookie.set("accessToken", tempAccessToken, {
              expires: "1M",
            });
          }

          if (tempText) {
            this.$message.warning(this.$appMsg.warning[tempText]);
          }
        }

        this.showInfo.app = true;
      });

      if (!this.$appInWechatMiniapp) {
        this.showInfo.miniappButton = true;
      }

      /**
       *
       * 以防上方没加载完，加载完后再显示
       *
       */
      setTimeout(() => {
        this.showInfo.app = true;
      }, 500);
    },
    openWxMiniapp: function () {
      this.$appOpenUrl(
        this.$t("open-url.title"),
        null,
        {
          path: this.$appConfigInfo.appInfo.wxMiniappUrl,
        },
        0
      );
    },
    test_start: function () {
      document.getElementById("app").style.overflowY = "hidden";
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

      document.getElementById("app").style.overflowY = "unset";

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
  color: blue !important;
}

.app-fdc229c08af23dac1a0e8caac88a239d {
  color: purple !important;
}

.app-d7a506baa20bdbe9daaa1366348175a9 {
  color: rgb(222, 177, 81) !important;
}

.app-53f544c1e6fce0feac70340d481ad2ed {
  color: rgb(35, 124, 123) !important;
}

.app-8a900759792c14b84891392b9f0e360d {
  color: black !important;
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

div.ant-popover-title,
ul.ant-dropdown-menu {
  text-align: center;
}

div.ant-message,
div.ant-notification,
div.vxe-table--tooltip-wrapper {
  z-index: 99999999 !important;
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

div.app-63c4cfbde5ad50f3f537c2540374995e {
  position: relative;
  width: 100%;
  height: 100%;
}

div.app-097ee6ec15c5d0a4c39910b8b8797ca3 {
  height: 100%;
  width: 100%;
  position: static !important;
  z-index: @app-z-index !important;
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
  margin-bottom: 65px;
  margin-top: 50px;
}

div.app-76da017caccd1fb264af2218f6064b0d {
  height: 740px;
  overflow: auto;
  padding-bottom: 25px;
  padding-left: 280px;
  padding-right: 25px;
  padding-top: 25px;
  position: absolute;
  top: 0;
  width: 100%;
}

div.app-fe64546261ce7a19b6784737edd0fdf1 {
  height: 423px;

  label.ant-checkbox-wrapper {
    width: 250px;
  }

  div.app-41b238cc893836e28b50cd5a59843803 {
    margin-top: 175px;
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
  margin: 25px 10px 0 10px;
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
  margin: 0 15px 25px 15px;
  text-align: @app-text-align;
}

div.app-2acf2be2c6fdd22f4a6282a72817bdb1 {
  margin-top: 25px;
}

div.app-044a82dc9b34eebf2c54fe2c3c904368 {
  margin: 15px 0 5px 0px;
}

div.app-dfs,
div.app-gx,
div.app-wj,
div.app-pz,
div.app-zb,
div.app-bpIndex,
div.app-genre,
div.app-position,
div.app-equipmentListAll,
div.app-equipmentListOne,
div.app-inscription,
div.app-pzOne {
  margin-top: 3px;
}

div.app-genre,
div.app-position,
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