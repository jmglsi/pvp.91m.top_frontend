<template>
  <div class="admin-mp-data">
    <!-- <div>这里是 mp-data</div> -->
    <div class="app-4717d11da95ed90ccdb4d4a0648bad39">
      <div class="admin-8ef8eb00bde6d89a54da830b8c26727d">
        <a-dropdown :trigger="['click']">
          <h1>
            <span>⛰️ 努力创作！</span>
          </h1>
          <template #overlay>
            <a-menu :style="{ width: '100px' }">
              <a-sub-menu key="menu" title="菜单">
                <a-menu-item>添加</a-menu-item>
              </a-sub-menu>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>

    <div
      class="app-4717d11da95ed90ccdb4d4a0648bad39 admin-8e086eb841d9b5cd2f89212ac8fd0527"
    >
      <a-row>
        <a-col :span="6">
          <a-statistic
            title="关注人数"
            :value="137392"
            :valueStyle="{ color: 'red' }"
          />
        </a-col>
        <a-col :span="6">
          <a-statistic title="公众号" :value="3" />
        </a-col>
      </a-row>
    </div>

    <div class="admin-7c11462935c3430d9063aeda83f79d2a">
      <ul>
        <li class="admin-28a3cbd51bfd74ac3fec434e0603fec2">
          <img
            width="50"
            height="50"
            v-lazy="
              $appApi.app.appProxy +
              'https://pic2.58cdn.com.cn/nowater/webim/big/n_v2f3ee60123e3a4f088d0c88eddda88ec2.jpg'
            "
            class="app-border-radius admin-7e1cb576d3715672cbb051e705e911bb"
          />
        </li>
        <li class="admin-28a3cbd51bfd74ac3fec434e0603fec2">
          <img
            width="50"
            height="50"
            v-lazy="
              $appApi.app.appProxy +
              'https://pic2.58cdn.com.cn/nowater/webim/big/n_v29fbb9eb5e7784b99b6f36e26ba067cf6.jpg'
            "
            class="app-border-radius admin-7e1cb576d3715672cbb051e705e911bb"
          />
        </li>
        <li class="admin-28a3cbd51bfd74ac3fec434e0603fec2">
          <img
            width="50"
            height="50"
            v-lazy="
              $appApi.app.appProxy +
              'https://pic5.58cdn.com.cn/nowater/webim/big/n_v2d7ed8bc82b72483c8957a5f1e9e3a1ab.png'
            "
            class="app-border-radius admin-7e1cb576d3715672cbb051e705e911bb"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
li.admin-28a3cbd51bfd74ac3fec434e0603fec2 {
  float: left;
  margin-right: 20px;
}

img.admin-7e1cb576d3715672cbb051e705e911bb {
  border: 1px solid gray;
}
</style>