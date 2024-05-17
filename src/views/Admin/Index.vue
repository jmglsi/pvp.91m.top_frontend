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
            <a-menu-item key="0">{{ loginInfo.name }}</a-menu-item>
            <a-menu-divider />
            <a-menu-item key="1" :style="{ color: 'red' }"
              >退出登录</a-menu-item
            >
          </a-menu>
        </template>
      </a-dropdown>
    </div>

    <div class="admin-88eca23dacf6d9789faa45810c104607">
      <a-menu
        :style="{
          height: '100%',
          width: '225px',
          position: 'absolute',
          zIndex: '1 !important',
        }"
        :defaultOpenKeys="['sub-robot', 'sub-mp']"
        :defaultSelectedKeys="defaultSelectedKey"
        mode="inline"
      >
        <a-sub-menu key="sub-web" title="数据站">
          <a-menu-item
            key="web-data-492e8"
            @click="$appPush({ path: '/admin/web-data-492e8' })"
          >
            苏苏的荣耀助手
          </a-menu-item>
          <a-menu-item
            disabled
            key="web-data-5533c"
            @click="$appPush({ path: '/admin/web-data-5533c' })"
          >
            奶香的一刀
          </a-menu-item>
          <a-menu-item
            disabled
            key="web-data-d88e5"
            @click="$appPush({ path: '/admin/web-data-d88e5' })"
          >
            暴走的巅峰赛
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub-robot" title="机器人">
          <a-menu-item
            key="robot-data"
            @click="$appPush({ path: '/admin/robot-data' })"
          >
            数据
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub-mp" title="公众号">
          <a-menu-item
            key="mp-data"
            @click="$appPush({ path: '/admin/mp-data' })"
          >
            数据
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu disabled key="sub-system" title="系统">
          <a-menu-item
            key="system-assignment"
            @click="$appPush({ path: '/admin/system-assignment' })"
          >
            任务
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>

    <router-view
      class="app-76da017caccd1fb264af2218f6064b0d admin-65421a7ec15d60a791fe243310e147d9"
    />
  </div>
</template>

<script>
export default {
  name: "adminIndex",
  data() {
    return {
      isLogin: false,
      defaultSelectedKey: [],
      loginInfo: {
        name: "苏苏",
        img: "//cn.gravatar.com/avatar/8d0d4a6b8394fa1fe09ed57b2793c63eae72d8859734323b7a08dfdf8013aa45?size=512",
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
      },
    };
  },
  created() {
    this.initPage();
  },
  mounted() {
    this.getWebAccountInfo();
  },
  methods: {
    initPage: function () {
      let q = this.$route;

      this.defaultSelectedKey = [q.path.split("/")[2] || "mp-data"];
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

div.admin-index {
  text-align: @app-text-align;
}

div.admin-65421a7ec15d60a791fe243310e147d9 {
  height: 100%;
  overflow: auto;
}
</style>