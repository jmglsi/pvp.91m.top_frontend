<template>
  <div class="admin-index">
    <a-menu
      :style="{
        height: '100%',
        width: '256px',
        position: 'absolute',
        zIndex: '1 !important',
      }"
      :defaultOpenKeys="['sub-web', 'sub-robot', 'sub-mp', 'sub-system']"
      :defaultSelectedKeys="[defaultSelectedKey]"
      @click="handleClick"
      mode="inline"
    >
      <a-sub-menu key="sub-web" title="网站">
        <a-menu-item
          key="web-data"
          @click="$appPush({ path: '/admin/web-data' })"
        >
          苏苏的荣耀助手
        </a-menu-item>
        <!--
          <a-menu-item
            key="web-data2"
            @click="$appPush({ path: '/admin/web-data' })"
          >
            奶香的一刀
          </a-menu-item>
        -->
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
      <a-sub-menu key="sub-system" title="系统">
        <a-menu-item
          key="system-assignment"
          @click="$appPush({ path: '/admin/system-assignment' })"
        >
          任务
        </a-menu-item>
      </a-sub-menu>
    </a-menu>

    <a-dropdown :trigger="['click']">
      <img
        width="35"
        height="35"
        v-lazy="'//q.qlogo.cn/headimg_dl?dst_uin=947065098&spec=640'"
        class="app-border-radius admin-11692cbdb16fd998d9dc739c3d53afaa"
      />
      <template #overlay>
        <a-menu>
          <a-menu-item key="0">站长</a-menu-item>
          <a-menu-item key="1">
            <a href="//www.yuque.com/jmglsi/pvp/yyxgbh" target="_blank">
              常见问题
            </a>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3" :style="{ color: 'red' }">退出登录</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>

    <router-view class="app-76da017caccd1fb264af2218f6064b0d" />
  </div>
</template>

<script>
export default {
  name: "adminIndex",
  data() {
    return {
      defaultSelectedKey: "web-data",
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    initPage: function () {
      let q = this.$route;

      this.defaultSelectedKey = q.path.split("/")[2] || "web-data";
    },
    openKeys: function (e) {
      console.log("openKeys", e);
    },
    selectedKeys: function (e) {
      console.log("selectedKeys", e);
    },
    handleClick: function (e) {
      console.log("handleClick", e);
    },
    titleClick: function (e) {
      console.log("titleClick", e);
    },
  },
};
</script>

<style lang="less">
img.admin-11692cbdb16fd998d9dc739c3d53afaa {
  position: absolute;
  right: 25px;
  top: 25px;
  z-index: @app-z-index;
}

div.admin-index {
  text-align: @app-text-align;
}
</style>