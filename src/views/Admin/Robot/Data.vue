<template>
  <div class="admin-robot-data">
    <!-- <div>这里是 robot-data</div> -->
    <div class="app-4717d11da95ed90ccdb4d4a0648bad39">
      <div class="admin-8c36adba08eefa688be68bc3cf4d5fd6">
        <a-dropdown :trigger="['click']">
          <h1>🤖️ 主人，很高兴为您服务。</h1>
          <template #overlay>
            <a-menu :style="{ textAlign: 'left', width: '100px' }">
              <a-sub-menu key="robot" title="机器人">
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
          <a-statistic title="总群数" :value="2518" />
        </a-col>
        <a-col :span="6">
          <a-statistic title="活跃群" :value="1727" />
        </a-col>
        <a-col :span="6">
          <a-statistic title="机器人" :value="5" />
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
          <img
            width="20"
            height="20"
            v-lazy="'/img/icons-app/qq-q.ico'"
            class="app-border-radius admin-58a5bd4d1fe1914a7438e768c0627486"
          />
        </li>
        <li class="admin-28a3cbd51bfd74ac3fec434e0603fec2">
          <img
            width="50"
            height="50"
            v-lazy="'//q.qlogo.cn/headimg_dl?dst_uin=1042815109&spec=640'"
            class="app-border-radius"
          />
          <img
            width="20"
            height="20"
            v-lazy="'/img/icons-app/qq-q.ico'"
            class="app-border-radius admin-58a5bd4d1fe1914a7438e768c0627486"
          />
        </li>
        <li class="admin-28a3cbd51bfd74ac3fec434e0603fec2">
          <img
            width="50"
            height="50"
            v-lazy="'//q.qlogo.cn/headimg_dl?dst_uin=50371140&spec=640'"
            class="app-border-radius"
          />
          <img
            width="20"
            height="20"
            v-lazy="'/img/icons-app/qq.ico'"
            class="app-border-radius admin-58a5bd4d1fe1914a7438e768c0627486"
          />
        </li>
        <li class="admin-28a3cbd51bfd74ac3fec434e0603fec2">
          <img
            width="50"
            height="50"
            v-lazy="'//q.qlogo.cn/headimg_dl?dst_uin=1042815109&spec=640'"
            class="app-border-radius"
          />
          <img
            width="20"
            height="20"
            v-lazy="'/img/icons-app/qq.ico'"
            class="app-border-radius admin-58a5bd4d1fe1914a7438e768c0627486"
          />
        </li>
        <li class="admin-28a3cbd51bfd74ac3fec434e0603fec2">
          <img
            width="50"
            height="50"
            v-lazy="'//q.qlogo.cn/headimg_dl?dst_uin=2132625207&spec=640'"
            class="app-border-radius"
          />
          <img
            width="20"
            height="20"
            v-lazy="'/img/icons-app/qq.ico'"
            class="app-border-radius admin-58a5bd4d1fe1914a7438e768c0627486"
          />
        </li>
        <li class="admin-28a3cbd51bfd74ac3fec434e0603fec2">
          <img
            width="50"
            height="50"
            v-lazy="'//q.qlogo.cn/headimg_dl?dst_uin=3578572094&spec=640'"
            class="app-border-radius"
          />
          <img
            width="20"
            height="20"
            v-lazy="'/img/icons-app/qq.ico'"
            class="app-border-radius admin-58a5bd4d1fe1914a7438e768c0627486"
          />
        </li>
        <li class="admin-28a3cbd51bfd74ac3fec434e0603fec2">
          <img
            width="50"
            height="50"
            v-lazy="'//q.qlogo.cn/headimg_dl?dst_uin=3106897087&spec=640'"
            class="app-border-radius"
          />
          <img
            width="20"
            height="20"
            v-lazy="'/img/icons-app/wechat.ico'"
            class="app-border-radius admin-58a5bd4d1fe1914a7438e768c0627486"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminRobotData",
};
</script>

<style scoped lang="less">
img.admin-58a5bd4d1fe1914a7438e768c0627486 {
  margin-left: -15px;
  margin-top: 33px;
  position: absolute;
}

li.admin-28a3cbd51bfd74ac3fec434e0603fec2 {
  float: left;
  margin-right: 20px;
}
</style>