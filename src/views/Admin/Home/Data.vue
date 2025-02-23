<template>
  <div class="admin-home-data">
    <!-- <div>这里是 home-data</div> -->
    <div class="app-4717d11da95ed90ccdb4d4a0648bad39">
      <div class="admin-49657711d4f79ee0e5501a5c554026b8">
        <a-dropdown :trigger="['click']">
          <h1>
            <span>💼 您好，这里是工作台哦。</span>
          </h1>
          <template #overlay>
            <a-menu
              :style="{
                width: '100px',
              }"
            >
              <a-sub-menu key="menu" title="菜单">
                <a-menu-item @click="$appPush({ path: '/' })">
                  返回首页
                </a-menu-item>
              </a-sub-menu>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "adminHomeData",
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
