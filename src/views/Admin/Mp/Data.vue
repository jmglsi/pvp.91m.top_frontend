<template>
  <div class="admin-mp-data">
    <!-- <div>这里是 mp-data</div> -->
    <div class="app-4717d11da95ed90ccdb4d4a0648bad39">
      <div class="admin-8ef8eb00bde6d89a54da830b8c26727d">
        <a-dropdown :trigger="['click']">
          <h1>⛰️ 努力创作！</h1>
          <template #overlay>
            <a-menu :style="{ textAlign: 'left', width: '100px' }">
              <a-sub-menu key="mp" title="公众号">
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
            title="消息量"
            :value="1292591"
            :valueStyle="{ color: 'red' }"
          />
        </a-col>
        <a-col :span="6">
          <a-statistic title="总人数" :value="2518" />
        </a-col>
        <a-col :span="6">
          <a-statistic title="活跃数" :value="1727" />
        </a-col>
        <a-col :span="6">
          <a-statistic title="公众号" :value="5" />
        </a-col>
      </a-row>
    </div>

    <div class="admin-7c11462935c3430d9063aeda83f79d2a">
      <ul>
        <li class="admin-28a3cbd51bfd74ac3fec434e0603fec2">
          <img
            width="50"
            height="50"
            v-lazy="'//q.qlogo.cn/headimg_dl?dst_uin=50371140&spec=640'"
            class="app-border-radius"
          />
        </li>
        <li class="admin-28a3cbd51bfd74ac3fec434e0603fec2">
          <img
            width="50"
            height="50"
            v-lazy="'//q.qlogo.cn/headimg_dl?dst_uin=1042815109&spec=640'"
            class="app-border-radius"
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
</style>