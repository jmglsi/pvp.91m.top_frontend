<template>
  <div class="admin-index">
    <div class="admin-62060944ea84cd403907030743e460af">
      <a-dropdown :trigger="['click']">
        <img
          width="35"
          height="35"
          v-lazy="loginInfo.img"
          class="app-border-radius admin-11692cbdb16fd998d9dc739c3d53afaa"
        />
        <template #overlay>
          <a-menu>
            <a-menu-item key="0">
              <van-tag :color="loginInfo.certification.color" type="primary">
                {{ loginInfo.certification.text }}
              </van-tag>
              <span class="admin-ee5e6f32be8ae4437eef536794a34083">
                {{ loginInfo.name }}
              </span>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item
              key="1"
              :style="{
                color: 'red',
              }"
              @click="onLogoutClick"
            >
              {{ $t("my.login-out") }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>

    <div
      :style="{
        width: collapsed ? '100px !important' : '200px !important',
      }"
      class="admin-88eca23dacf6d9789faa45810c104607"
    >
      <a-menu
        :style="{
          height: '100%',
        }"
        :default-selected-keys="defaultSelectedKey"
        :inline-collapsed="collapsed"
        mode="inline"
        theme="dark"
      >
        <a-menu-item
          key="home-data"
          @click="
            $appPush({
              path: '/admin/home-data',
            })
          "
        >
          <a-icon type="home" />
          <span>工作台</span>
        </a-menu-item>
        <a-sub-menu v-show="onModuleShow('sub-web')" key="sub-web">
          <span slot="title">
            <a-icon type="bar-chart" />
            <span>数据站</span>
          </span>

          <a-menu-item
            v-show="onModuleShow('web-data-492e8')"
            key="web-data-492e8"
            @click="
              $appPush({
                path: '/admin/web-data-492e8',
              })
            "
          >
            苏苏的荣耀助手
          </a-menu-item>
          <a-menu-item
            disabled
            v-show="onModuleShow('web-data-5533c')"
            key="web-data-5533c"
            @click="
              $appPush({
                path: '/admin/web-data-5533c',
              })
            "
          >
            奶香的一刀
          </a-menu-item>
          <a-menu-item
            disabled
            v-show="onModuleShow('web-data-d88e5')"
            key="web-data-d88e5"
            @click="
              $appPush({
                path: '/admin/web-data-d88e5',
              })
            "
          >
            暴走的巅峰赛
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu v-show="onModuleShow('sub-robot')" key="sub-robot">
          <span slot="title">
            <a-icon type="robot" />
            <span>机器人</span>
          </span>

          <a-menu-item
            v-show="onModuleShow('robot-data')"
            key="robot-data"
            @click="
              $appPush({
                path: '/admin/robot-data',
              })
            "
          >
            管理
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu v-show="onModuleShow('sub-mp')" key="sub-mp">
          <span slot="title">
            <a-icon type="wechat" />
            <span>公众号</span>
          </span>

          <a-menu-item
            v-show="onModuleShow('mp-data')"
            key="mp-data"
            @click="
              $appPush({
                path: '/admin/mp-data',
              })
            "
          >
            管理
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu v-show="onModuleShow('sub-shop')" key="sub-shop">
          <span slot="title">
            <a-icon type="shop" />
            <span>商&nbsp;&nbsp;&nbsp;店</span>
          </span>

          <a-menu-item
            v-show="onModuleShow('shop-data')"
            key="shop-data"
            @click="
              $appPush({
                path: '/admin/shop-data',
              })
            "
          >
            管理
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu v-show="onModuleShow('sub-system')" key="sub-system">
          <span slot="title">
            <a-icon type="global" />
            <span>系&nbsp;&nbsp;&nbsp;统</span>
          </span>

          <a-menu-item
            v-show="onModuleShow('system-data')"
            @click="
              $appPush({
                path: '/admin/system-data',
              })
            "
          >
            任务
          </a-menu-item>
        </a-sub-menu>
      </a-menu>

      <div class="admin-a6e5c6ead5e961e03325d9b0e06ec08f">
        <a-button
          type="primary"
          shape="circle"
          :icon="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="onCollapsedClick"
        />
      </div>
    </div>

    <router-view
      :style="{
        paddingLeft: collapsed ? '100px !important' : '225px !important',
      }"
      class="app-76da017caccd1fb264af2218f6064b0d admin-65421a7ec15d60a791fe243310e147d9"
    />
  </div>
</template>

<script>
export default {
  name: "adminIndex",
  data() {
    return {
      collapsed: false,
      isLogin: false,
      defaultSelectedKey: [],
      loginInfo: {
        name: "苏苏",
        img: this.$appCache + "/img/icons-app/loading.png",
        certification: {
          color: null,
          text: null,
        },
        description: null,
        heroList: [],
        areaType: 1,
        provinceType: 1,
        friendsType: 1,
        rank: {
          starType: 1,
          starIcon: "//camp.qq.com/battle/profile/roleJobV2/1.png",
          score: 1200,
        },
        keys: [],
      },
    };
  },
  created() {
    let q = this.$route.query;

    if (q.oauthType) {
      setTimeout(() => {
        this.$appPush({
          query: { refresh: 1 },
        });

        location.reload();
      }, 2000);
    } else {
      this.initPage();
    }
  },
  mounted() {
    this.getWebAccountInfo();
  },
  methods: {
    initPage: function () {
      let q = this.$route;
      this.defaultSelectedKey = [q.path.split("/")[2] || "home-data"];
    },
    getWebAccountInfo: function (aid = 0) {
      this.$axios
        .post(this.$appApi.app.getWebAccountInfo + "&aid=" + aid)
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.loginInfo = data;

            this.$cookie.set("name", data.name, { expires: "1M" });

            this.isLogin = true;
          } else {
            this.isLogin = false;

            //this.$message.error(status.msg);
          }
        });
    },
    onModuleShow: function (key) {
      return this.loginInfo.keys.indexOf(key) > -1 ? true : false;
    },
    onLogoutClick: function () {
      this.$dialog
        .confirm({
          title: "是否退出登录?",
        })
        .then(() => {
          //on confirm

          this.$cookie.delete("openId");
          this.$cookie.delete("accessToken");
          this.$cookie.delete("tempOpenId");
          this.$cookie.delete("tempAccessToken");

          this.$appDelectAllLocalStorage();

          setTimeout(() => {
            location.reload();
          }, 1000);
        })
        .catch(() => {
          //on cancel
        });
    },
    onCollapsedClick: function () {
      let ret;

      this.collapsed ? (ret = false) : (ret = true);

      this.collapsed = ret;
    },
  },
};
</script>

<style lang="less">
img.admin-11692cbdb16fd998d9dc739c3d53afaa {
  border: 1px solid white;
  position: absolute;
  right: 25px;
  top: 25px;
  z-index: @app-z-index;
}

span.admin-ee5e6f32be8ae4437eef536794a34083{
  margin-left: 3px;
}

div.admin-index {
  text-align: @app-text-align;
}

div.admin-88eca23dacf6d9789faa45810c104607 {
  height: 100%;
  position: absolute;
  z-index: 1000 !important;
}

div.admin-65421a7ec15d60a791fe243310e147d9 {
  height: 100%;
  overflow: auto;
}

div.admin-a6e5c6ead5e961e03325d9b0e06ec08f {
  position: absolute;
  left: 15px;
  bottom: 15px;
}
</style>