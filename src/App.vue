<template>
  <div id="app">
    <div class="app-63c4cfbde5ad50f3f537c2540374995e">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="app-1bda80f2be4d3658e0baa43fbe7ae8c1" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" class="app-1bda80f2be4d3658e0baa43fbe7ae8c1" />
    </div>

    <div class="app-ad7786f9368e7c2dc1cde095284ca39f">
      <van-tabbar
        v-model="tabbar.active"
        v-show="tabbar.default.show"
        :z-index="2"
        fixed
        safe-area-inset-bottom
        active-color="rgb(222, 177, 81)"
        inactive-color="rgb(67, 62, 52)"
        class="app-130a360689f8d613da10c94d53527a1b"
      >
        <van-tabbar-item
          v-for="(data, index) in tabbar.default.list"
          :key="'app-e0c3b278eeb2cab05f548d7af0f2c949-' + index"
          :icon="data.icon"
          :to="data.to"
          :name="data.name"
          class="app-e0c3b278eeb2cab05f548d7af0f2c949"
        >{{ data.text }}</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
}

.app-margin {
  margin: 0 10px;
}

.app-1bda80f2be4d3658e0baa43fbe7ae8c1 {
  position: absolute;
  width: 100%;
  height: 100%;
}

img {
  border-radius: 10px;
  object-fit: cover;
}
</style>

<style>
i.van-icon.van-grid-item__icon img.van-icon__image {
  border-radius: 100%;
  width: 40px;
  height: 40px;
}

div.van-grid-item__content.van-grid-item__content--center
  span.van-grid-item__text {
  font-weight: 600;
}

div.van-nav-bar__title {
  font-size: 20px;
}

div.app-e0c3b278eeb2cab05f548d7af0f2c949 img.van-icon__image {
  border-radius: 0;
}

div.tuijian-447b7147e84be512208dcc0995d67ebc,
div.hero-f3cc17bc0d768ca60b8bb496a10b1990
  div.van-tabs__wrap.van-tabs__wrap--scrollable
  div.van-tabs__nav {
  background-color: rgb(245, 245, 245);
}
</style>

<style>
img.tuijian-a1b6d48bbb668c1f71ac1fdd39fc7f4e {
  width: 15px;
  height: 15px;
  margin-top: -3px;
}

div.tuijian-447b7147e84be512208dcc0995d67ebc {
  border-radius: 10px;
  padding: 15px 10px;
  margin: 20px 10px;
}
</style>

<style>
.bottom-0fc3cfbc27e91ea60a787de13dae3e3c {
  position: absolute;
  font-size: 10px;
  width: 50px;
  margin-top: -7px;
}
</style>

<style>
div.tuijian-c88c478fd2695c8b07740ccd247a28ae div.van-dropdown-menu__bar {
  border-radius: 100px;
}

div.tuijian-c88c478fd2695c8b07740ccd247a28ae div.van-dropdown-item {
  margin-bottom: 25px;
}
</style>

<style>
i.van-icon img.van-icon__image {
  margin-top: -3px;
}

div.game-bp i.van-button__icon img.van-icon__image {
  margin-top: -5px;
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin-left: -12px;
  margin-top: -7px;
}
</style>

<style>
button.my-0162f4b7b2dbdf6aff3a25de02e49a8b,
button.my-4236a440a662cc8253d7536e5aa17942 {
  width: 150px;
  height: 35px;
}
</style>

<style>
div.van-tabs__nav {
  height: unset;
  overflow-x: unset;
}
</style>
<script>
export default {
  name: "App",
  metaInfo() {
    return {
      script: this.appInfo.homeInfo.script,
      link: this.appInfo.homeInfo.link
    };
  },
  data() {
    return {
      tabbar: {
        active: "/",
        default: {
          show: false,
          list: [
            {
              icon: "/img/app-icons/information.png",
              to: {
                path: "/",
                query: { from: "fa57e0725457a667d8dd6e9b0a4b3bd4" }
              },
              name: "/",
              text: "资讯"
            },
            {
              icon: "/img/app-icons/ranking.png",
              to: {
                path: "/ranking",
                query: { from: "72b664ef95e47693fc2737cd3b0a0a92" }
              },
              name: "/ranking",
              text: "排行"
            },
            {
              icon: "/img/app-icons/user.png",
              to: {
                path: "/my",
                query: { from: "a5d041e8ffec04b0b5e1c26537364540" }
              },
              name: "/my",
              text: "我的"
            }
          ]
        }
      },
      appInfo: {
        homeInfo: {}
      }
    };
  },
  watch: {
    $route(to) {
      if (
        to.path == "/login" ||
        to.path == "/miniapp" ||
        to.path == "/bilibili" ||
        to.path.indexOf("/hero/") > -1 ||
        to.path.indexOf("/game/") > -1
      ) {
        this.tabbar.default.show = false;
      } else {
        this.tabbar.default.show = true;
        this.tabbar.active = to.path;
      }
    }
  },
  mounted() {
    this.getAppInfo();
  },
  methods: {
    getAppInfo: function() {
      this.axios
        .get(
          this.apiList.pvp.getAppInfo +
            "&url=" +
            encodeURIComponent(location.pathname + location.search)
        )
        .then(ret => {
          this.appInfo = ret.data.data;

          let tipsInfo = this.appInfo.tipsInfo;
          if (tipsInfo) {
            this.$notification.open({
              message: tipsInfo.title,
              description: tipsInfo.des,
              onClick: () => {
                if (tipsInfo.url) {
                  this.appOpenUrl("是否打开外部链接?", null, tipsInfo.url);
                }
              }
            });
          }
        });
    }
  }
};
</script>