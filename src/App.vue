<template>
  <div id="app">
    <AppReadme />

    <div class="app-63c4cfbde5ad50f3f537c2540374995e">
      <div v-if="$appConfigInfo.appInfo.pwa == 1">
        <div
          v-if="showInfo.statusBar"
          :style="{
            background:
              'rgba(0, 0, 0, 0) linear-gradient(to right, rgb(236, 119, 171), rgb(120, 115, 245)) repeat scroll 0% 0%',
            zIndex: -5,
          }"
          class="app-8de1f001663ee713d24888bb422e3881"
        ></div>
        <div
          v-if="showInfo.whiteBar"
          :style="{ backgroundColor: 'white !important' }"
          class="app-4789d9440d92b2647ea8a52c2f5b31b5"
        ></div>
      </div>

      <div v-if="showInfo.app" class="app-3d1b70e46d0b6cd9cfa43d743da14266">
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view class="app-1bda80f2be4d3658e0baa43fbe7ae8c1" />
        </keep-alive>

        <router-view v-else class="app-1bda80f2be4d3658e0baa43fbe7ae8c1" />
      </div>
    </div>

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
import watermark from "watermark-dom";

export default {
  name: "AppHome",
  components: {
    AppReadme: () => import("@/components/App/Readme.vue"),
  },
  watch: {
    $route: function (to) {
      let nowPath = to.path,
        statusBar = false,
        whiteBar = false,
        tabbar = false,
        name = this.$cookie.get("name") || this.$appConfigInfo.appInfo.name,
        accessToken = this.$cookie.get("accessToken") || null,
        randAngle = Math.floor(Math.random() * 360),
        //colorArr = ["orange", "red"],
        //randColor = colorArr[Math.floor(Math.random() * colorArr.length)],
        watermarkConfig = {
          watermark_alpha: 0.3,
          watermark_height: 25,
          watermark_width: 100,
          watermark_x: -50,
          watermark_y: -25,
          watermark_x_space: 25,
          watermark_y_space: 150,
          watermark_fontsize: "12px",
          watermark_txt: "@" + name,
          watermark_angle: randAngle,
          watermark_color: "#bebebe",
        },
        needWatermark = /ranking|search/i.test(nowPath);

      if (accessToken) {
        if (needWatermark == true) {
          watermark.load(watermarkConfig);
        }

        if (needWatermark == false && document.getElementById("wm_div_id")) {
          watermark.remove();
        }
      }

      this.tableData.result.model = nowPath;

      /ranking|search/i.test(nowPath) == true || nowPath == "/"
        ? (statusBar = true)
        : (statusBar = false);
      this.showInfo.statusBar = statusBar;

      /ranking/i.test(nowPath) == true ? (whiteBar = true) : (whiteBar = false);
      this.showInfo.whiteBar = whiteBar;

      /miniapp|bilibili|login|skin|hero\/(.*?)\/info|hero\/(.*?)\/equipment|hero\/(.*?)\/replay|game\/(.*?)/i.test(
        nowPath
      ) == true
        ? (tabbar = false)
        : (tabbar = true);
      this.showInfo.tabbar = tabbar;
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
      tableData: {
        result: {
          model: "/",
          rows: [
            {
              icon: null,
              to: "/",
              name: "/",
              text: "加载中...",
            },
            {
              icon: null,
              to: null,
              name: null,
              text: "加载中...",
            },
            {
              icon: null,
              to: null,
              name: null,
              text: "加载中...",
            },
          ],
        },
      },
      showInfo: {
        app: false,
        hello: true,
        statusBar: true,
        whiteBar: false,
        tabbar: true,
      },
    };
  },
  mounted() {
    this.getAppInfo();
  },
  methods: {
    getAppInfo: function () {
      this.$axios.post(this.$appApi.pvp.getAppInfo).then((res) => {
        let data = res.data.data,
          appInfo = data.appInfo,
          tipsInfo = data.tipsInfo,
          positionInfo = data.positionInfo,
          q = this.$appQuery,
          tempOpenId = q.tempOpenId || "",
          tempAccessToken = q.tempAccessToken || "",
          oauthType = q.oauthType || "",
          tempText = q.tempText || null,
          appConfigInfo = this.$appConfigInfo;

        this.tableData = data;
        this.tableData.result.model = this.$route.path;

        if (appInfo.update.time != appConfigInfo.appInfo.update.time) {
          this.$appDelectAllLocalStorage();
        }

        if (appInfo.update.version != appConfigInfo.appInfo.update.version) {
          if (appInfo.update.text) {
            this.$dialog
              .alert({
                title: appInfo.update.title,
                message: appInfo.update.text,
                theme: "round-button",
              })
              .then(() => {
                //on close
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
          tempText: appInfo.tempText || "",
          update: {
            version: appInfo.update.version || 0,
            time: appInfo.update.time || 0,
            title: appInfo.update.title || "加载中...",
            text: appInfo.update.text || "加载中...",
            timeout: appInfo.update.timeout || 43200,
          },
          search: {
            img: appInfo.search.img || null,
            placeholder: appInfo.search.placeholder || null,
            to: appInfo.search.to || null,
            url: appInfo.search.url || null,
          },
        };
        this.$appConfigInfo.positionInfo = positionInfo || [];

        this.$appSetLocalStorage("appConfigInfo", this.$appConfigInfo);

        if (tipsInfo) {
          this.$notification.open({
            message: tipsInfo.title,
            description: tipsInfo.description,
            onClick: () => {
              this.onUrlClick(tipsInfo);
            },
          });
        }

        if (!oauthType) {
          if (tempOpenId) {
            this.$cookie.set("tempOpenId", tempOpenId, { expires: "1h" });
            this.$cookie.set("tempAccessToken", tempAccessToken, {
              expires: "1h",
            });
          }

          if (appInfo.tempText) {
            this.$message.info(appInfo.tempText);

            this.$appDelectAllLocalStorage();
          }
        } else {
          if (tempOpenId) {
            this.$cookie.set("openId", tempOpenId, { expires: "1h" });
            this.$cookie.set("accessToken", tempAccessToken, {
              expires: "1h",
            });
          }

          if (tempText)
            this.$message.warning(this.$appMsg.warning[tempText] || "未知错误");
        }

        this.showInfo.app = true;
      });

      /**
       *
       * 以防上方没加载完，加载完后再显示
       *
       */
      setTimeout(() => {
        this.showInfo.app = true;
      }, 250);
    },
    onUrlClick: function (data) {
      this.$appOpenUrl(
        "是否打开" + (data.url ? "外部" : "内部") + "链接?",
        null,
        { path: data.url ? data.url : data.to },
        data.url ? 0 : 1
      );
    },
  },
};
</script>

<style lang="less">
#app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
  text-align: center;
  position: absolute;
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

img.app-d31cb1c15b091f41248935d88a8d0a45 {
  border-radius: unset;
  bottom: -19px;
  margin-left: -52px;
  position: absolute;
  transform: scale(0.75);
}

img.app-3b9655ab218c7f1a18f5dacd778a52f0 {
  border-radius: @app-border-radius;
}

img.app-4ab161130e76571ab0c31aa23a6238c7 {
  border-radius: @app-border-radius;
  margin: 0 10px;
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
}

li.app-1951b6e7c82938dd7446a41e829b247b {
  display: inline-block;
  margin-top: 10px;
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

span.app-a5a5c883f68e45baa83f140e218759f1 {
  position: absolute;
  bottom: 30px;
  z-index: @app-z-index;
  left: 0;
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

div.vxe-table th.vxe-header--column:not(.col--ellipsis) {
  padding: 6px 0;
}

div.app-home {
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

div.app-fe64546261ce7a19b6784737edd0fdf1 {
  height: 423px;

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
  font-size: @app-font-size + 2px;
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

div.app-6db4dcff371b9397d894ed932d085444 {
  margin-top: 10px;
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
  padding: 10px;
  width: 75%;
  max-width: 500px;
}

div.app-8de1f001663ee713d24888bb422e3881 {
  height: 120px;
  margin-top: -60px;
  position: fixed;
  width: 100%;
}

div.app-4789d9440d92b2647ea8a52c2f5b31b5 {
  position: absolute;
  width: 100%;
  margin-top: 25px;
  height: 100px;
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
div.app-genre,
div.app-position,
div.app-equipmentListAll,
div.app-equipmentListOne,
div.app-inscription,
div.app-pzOne {
  margin-top: 3px;
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
    width: 40px;
    height: 40px;
    margin-top: -21px;
    background-color: white !important;
    border: 3px solid white;
    border-radius: @app-border-radius;
  }
}
</style>