<template>
  <div id="app">
    <div class="app-63c4cfbde5ad50f3f537c2540374995e">
      <div
        class="app-8de1f001663ee713d24888bb422e3881"
        :style="
          $appConfigInfo.appInfo.pwa == 1 && showInfo.statusBar
            ? {
                background:
                  'rgba(0, 0, 0, 0) linear-gradient(to right, rgb(255, 96, 52), rgb(238, 10, 36)) repeat scroll 0% 0%',
              }
            : {}
        "
      ></div>

      <div
        v-if="$route.meta.keepAlive"
        class="app-3d1b70e46d0b6cd9cfa43d743da14266"
      >
        <keep-alive>
          <router-view class="app-1bda80f2be4d3658e0baa43fbe7ae8c1" />
        </keep-alive>
      </div>

      <div
        v-else-if="!$route.meta.keepAlive"
        class="app-3d1b70e46d0b6cd9cfa43d743da14266"
      >
        <router-view class="app-1bda80f2be4d3658e0baa43fbe7ae8c1" />
      </div>
    </div>

    <div class="app-ad7786f9368e7c2dc1cde095284ca39f">
      <van-tabbar
        v-model="tableData.result.model"
        v-if="showInfo.tabbar"
        fixed
        safe-area-inset-bottom
        active-color="orange"
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
  name: "App",
  watch: {
    $route(to) {
      let hello = false,
        statusBar = false,
        tabbar = false;

      this.tableData.result.model = to.path;

      /(ranking|game(.*?)bp)/i.test(to.path) ? (hello = false) : (hello = true);
      this.showInfo.hello = hello;

      /(login|miniapp|bilibili|hero|game)/i.test(to.path)
        ? (tabbar = false)
        : (tabbar = true);
      this.showInfo.tabbar = tabbar;

      /search/i.test(to.path) ? (statusBar = true) : (statusBar = false);
      this.showInfo.statusBar = statusBar;
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
      ],
      script: this.tableData.homeInfo.script || [],
      link: this.tableData.homeInfo.link || [],
    };
  },
  data() {
    return {
      tableData: {
        result: {
          model: "/",
          rows: [
            {
              icon:
                "//img07.mifile.cn/v1/MI_542ED8B1722DC/817e2d3745bc5e780073f8db30e67fd7.png",
              to: "/",
              name: "/",
              text: "首页",
            },
            {
              icon:
                "//img06.mifile.cn/v1/MI_542ED8B1722DC/0f2deea7f990b594e9db2594a1e681a3.png",
              to: "/ranking",
              name: "/ranking",
              text: "排行",
            },
            {
              icon:
                "//img06.mifile.cn/v1/MI_542ED8B1722DC/053c8e1dd5759f876c75be34cc557edc.png",
              to: "/search",
              name: "/search",
              text: "发现",
            },
            {
              icon:
                "//img06.mifile.cn/v1/MI_542ED8B1722DC/245e02223e244ef7adf77912859095ee.png",
              to: "/friends",
              name: "/friends",
              text: "扩列",
            },
            {
              icon:
                "//img07.mifile.cn/v1/MI_542ED8B1722DC/a9b17909b07f133a8adb2946be61655f.png",
              to: "/my",
              name: "/my",
              text: "我的",
            },
          ],
        },
        homeInfo: {
          script: [],
          link: [],
        },
        tipsInfo: {},
      },
      showInfo: {
        hello: true,
        statusBar: true,
        tabbar: true,
      },
    };
  },
  mounted() {
    this.getAppInfo();
  },
  methods: {
    getAppInfo: function () {
      let appConfigInfo = this.$appGetLocalStorage("appConfigInfo");

      this.$axios
        .post(
          this.$appApi.pvp.getAppInfo +
            "&url=" +
            encodeURIComponent(location.pathname + location.search)
        )
        .then((res) => {
          let data = res.data.data,
            appInfo = data.appInfo,
            tipsInfo = data.tipsInfo;

          this.tableData = data;
          this.tableData.result.model = this.$route.path;

          if (appInfo.version != appConfigInfo.appInfo.version) {
            this.$appConfigInfo.appInfo = {
              name: "苏苏的荣耀助手",
              pwa: appConfigInfo.appInfo.pwa || 0,
              isSmallMobile: appConfigInfo.appInfo.isSmallMobile || 0,
              isReducedMode: appConfigInfo.appInfo.isReducedMode || 0,
              version: appInfo.version || this.$appTs,
            };

            localStorage.removeItem("appConfigInfo");

            this.$appDelectRankingCache("heroUpdate");
            this.$appDelectRankingCache("ranking");
            this.$appSetLocalStorage("appConfigInfo", this.$appConfigInfo);
          }

          if (tipsInfo) {
            this.$notification.open({
              message: tipsInfo.title,
              description: tipsInfo.description,
              onClick: () => {
                if (tipsInfo.to) {
                  this.$appOpenUrl(
                    "是否打开内部链接?",
                    null,
                    { path: tipsInfo.to },
                    1
                  );
                }

                if (tipsInfo.url) {
                  this.$appOpenUrl("是否打开外部链接?", null, {
                    path: tipsInfo.url,
                  });
                }
              },
            });
          }
        });
    },
  },
};
</script>

<style>
#app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  height: 100%;
  text-align: center;
  width: 100%;
}

img {
  border-radius: 10px;
  object-fit: cover;
}

.ranking-bda9643ac6601722a28f238714274da4 {
  color: red;
}

.ranking-ee3e4aec9bcaaaf72cd0c59e8a0f477d {
  color: orange;
}

.ranking-ef96f47f5516788b4273bd9ff8c9fa19 {
  color: red;
  font-size: 12px;
}

.ranking-48d6215903dff56238e52e8891380c8f {
  color: blue;
}

.ranking-9f27410725ab8cc8854a2769c7a516b8 {
  color: green;
}

input.app-fa42596ed8c1eff3ed8b93bba913bde3 {
  margin: 0 5px;
  text-align: center;
  width: 50px;
  z-index: 1;
}

img.app-d31cb1c15b091f41248935d88a8d0a45 {
  border-radius: unset;
  margin-bottom: -40px;
  margin-left: -45px;
  position: relative;
  width: 35px;
}

img.app-4ab161130e76571ab0c31aa23a6238c7 {
  border-radius: 100%;
  margin: 0 10px;
}

img.app-3b9655ab218c7f1a18f5dacd778a52f0 {
  border-radius: 100%;
}

img.app-db21bca782a535e91eb87f56b8abdc45 {
  margin-top: -3px;
  margin-left: 5px;
}

i.app-6de102c0bc4dc7f72ce287d6b0828052 img.van-icon__image {
  border-radius: unset;
  margin-top: -2px;
}

i.app-b10034712510883e9d2c45b4ec90772d img.van-icon__image {
  border-radius: 100%;
  height: 40px;
  width: 40px;
}

i.app-e0c3b278eeb2cab05f548d7af0f2c949 img.van-icon__image,
i.app-72383b9892bd1e6a2bd310dfb1fb2344 img.van-icon__image {
  border-radius: unset;
  transform: scale(1.25);
}

ul.app-d865b50ce307751bdeb9a6ab16e7baf9 {
  list-style: none;
  overflow-x: auto;
  white-space: nowrap;
}

ul.app-9e60d3ee1e1574cae90960f940c0a821 {
  height: 70px;
}

li.app-1951b6e7c82938dd7446a41e829b247b {
  display: inline-block;
  margin-top: 10px;
}

button.app-a066f238070a70cb531c9bd722c65b36 {
  margin: 25px 0;
}

button.app-0162f4b7b2dbdf6aff3a25de02e49a8b,
button.app-4236a440a662cc8253d7536e5aa17942 {
  height: 35px;
  width: 150px;
}

button.app-4236a440a662cc8253d7536e5aa17942 span.van-button__text {
  color: red;
}

span.app-a5a5c883f68e45baa83f140e218759f1 {
  position: absolute;
  bottom: 25px;
  z-index: 1;
  left: 0;
}

span.van-tab__text {
  margin: 11px 0;
}

span.app-e4d23e841d8e8804190027bce3180fa5 {
  font-size: 10px;
  left: 0;
  margin-top: -13px;
  position: absolute;
  z-index: 1;
}

span.app-0fc3cfbc27e91ea60a787de13dae3e3c {
  font-size: 10px;
  margin-top: -6px;
  position: absolute;
  width: 50px;
}

span.app-07cc694b9b3fc636710fa08b6922c42b {
  font-size: 12px;
}

span.app-f4842dcb685d490e2a43212b8072a6fe {
  color: #969799;
  font-size: 10px;
}

span.app-dac41b9450b77c3eb0ab7d8428d004f5 {
  margin: 0 15px;
}

span.app-e4c9479b11955648dad558fe717a4eb2 {
  color: red;
  font-size: 12px;
}

span.app-dac41b9450b77c3eb0ab7d8428d004f5 {
  color: #969799;
  font-size: 10px;
}

div.ant-message,
div.ant-notification {
  z-index: 99999999;
}

div.vxe-table th.vxe-header--column:not(.col--ellipsis) {
  padding: 6px 0;
}

div.van-search {
  background-color: transparent;
}

div.van-tabs__nav {
  height: unset;
  overflow-x: unset;
}

div.app-8de1f001663ee713d24888bb422e3881 {
  height: 100px;
  margin-top: -50px;
  position: fixed;
  width: 100%;
}

div.app-1bda80f2be4d3658e0baa43fbe7ae8c1 {
  height: 100%;
  position: absolute;
  width: 100%;
}

div.app-06eab62dcb5a23b966a620807d78e66f.van-cell.van-cell--clickable,
div.app-f3cc17bc0d768ca60b8bb496a10b1990 div.van-tabs__wrap div.van-tabs__nav {
  background-color: rgb(248, 249, 252);
}

div.app-f3cc17bc0d768ca60b8bb496a10b1990 div.van-tabs__wrap {
  border-radius: 100px;
  height: 32px;
}

div.app-f3cc17bc0d768ca60b8bb496a10b1990 span.van-tab__text {
  margin: 6px 0;
}

div.app-f3cc17bc0d768ca60b8bb496a10b1990 {
  text-align: left;
}

div.app-f56ae939694a0488cc9e8ecdd47a46ab,
div.van-grid-item__content.van-grid-item__content--center
  span.van-grid-item__text {
  font-weight: 600;
}

div.app-a139b05b7f8e496c00991733ef7cd589 {
  margin: 25px 10px 0 10px;
  padding: 0;
}

div.app-f97c2ea77c6a08b3afd5a59851cbe0d8 {
  border-radius: 10px;
  overflow: hidden;
  transform: translateY(0);
}

div.app-99938282f04071859941e18f16efcf42 div.van-tabs__wrap {
  left: 0;
  margin: 0 auto;
  position: fixed;
  right: 0;
  top: 20px;
  width: 40%;
}

div.app-99938282f04071859941e18f16efcf42 span.van-tab__text {
  font-size: 12px;
}

div.app-99938282f04071859941e18f16efcf42
  div.van-grid-item__content.van-grid-item__content--center {
  padding: 8px 4px;
}

div.app-99938282f04071859941e18f16efcf42 div.van-tab.van-ellipsis {
  line-height: 30px;
}

div.app-99938282f04071859941e18f16efcf42 {
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 50px;
  overflow: hidden;
  overflow-y: auto;
}

div.app-f56ae939694a0488cc9e8ecdd47a46ab {
  font-size: 12px;
  margin-top: 5px;
}

div.app-06eab62dcb5a23b966a620807d78e66f {
  margin: 25px 0;
  text-align: left;
}

div.app-06eab62dcb5a23b966a620807d78e66f.van-cell.van-cell--clickable {
  border-radius: 10px;
}

div.app-0464ec62d5cba8a9ec29d0c4c89fc7c6,
div.app-6bdc6915ee08058392eafe0ef6e353fd {
  border-radius: 10px;
  margin: 0 10px;
  padding: 10px;
}

div.app-b4a64ecd008af42ba95bc20350599699,
div.app-9b9faf4e737f5907995f767e0b345dab {
  background-color: rgb(248, 249, 252);
}

div.app-88bf7a95736562190270d51dc2cb3f42 {
  margin: 50px 15px 40px 15px;
}

div.app-e827ba0e6873e7ce7ef7c6c58e970609.van-popup {
  height: 80%;
}

div.app-aaf877dc2d49f8e1494e6a7dcf8b475c.van-popup {
  height: calc(75% - 3px);
}

div.van-tabbar-item__text {
  transform: scale(0.75);
  margin-top: 3px;
}

div.app-f3b57b63e4f5f4e157fd45bdb8611005 div.van-dropdown-item {
  margin-bottom: 10px;
}

div.app-f3b57b63e4f5f4e157fd45bdb8611005 div.van-dropdown-menu__bar {
  border-radius: 50px;
  width: 125px;
}

div.app-61046f2f5eefe3dc179e52af32241062 {
  margin: 25px 15px;
  text-align: left;
}

div.app-044a82dc9b34eebf2c54fe2c3c904368 {
  margin: 15px 0 5px 0px;
}

div.app-dfs,
div.app-gx,
div.app-wj,
div.app-zb,
div.app-skill,
div.app-equipmentListAll,
div.app-equipmentListOne {
  margin-top: 3px;
}

div.app-130a360689f8d613da10c94d53527a1b {
  z-index: 5;
}

div.app-130a360689f8d613da10c94d53527a1b.van-tabbar {
  height: 53px;
  padding-top: 3px;
}

div.app-1de7efdd403ec02d55f5c1d9557a2fc4
  img.ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3 {
  width: 35px;
  height: 35px;
}

div.app-0353ac5a7e2d6e9a6a0e652c63b2832a {
  z-index: 1;
}

div.app-0353ac5a7e2d6e9a6a0e652c63b2832a img.van-icon__image {
  width: 40px;
  height: 40px;
  margin-top: -21px;
  border: 3px solid white;
  border-radius: 100%;
}
</style>