<template>
  <div class="admin-robot-data">
    <!-- <div>这里是 robot-data</div> -->
    <div class="app-4717d11da95ed90ccdb4d4a0648bad39">
      <div class="admin-8c36adba08eefa688be68bc3cf4d5fd6">
        <a-dropdown :trigger="['click']">
          <h1>
            <span>🤖️ 管理员，很高兴为您服务。</span>
            <div
              v-if="percentage > 0"
              class="admin-558dab5fd681d940120defdcedf70585"
            >
              <van-progress :percentage="percentage" />
            </div>
          </h1>
          <template #overlay>
            <a-menu :style="{ width: '100px' }">
              <a-sub-menu key="menu" title="菜单">
                <a-menu-item @click="setMsg">推送内容</a-menu-item>
                <a-menu-item @click="setClient">配置客户端</a-menu-item>
                <a-menu-divider />
                <a-menu-item disabled>设置</a-menu-item>
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
        <a-col :span="8" @click="onRowClick('robot')">
          <a-statistic title="机器人" :value="tableData.robot.rows.length" />
        </a-col>
        <a-col :span="8" @click="onRowClick('group')">
          <a-statistic title="活跃群" :value="tableData.group.rows.length" />
        </a-col>
        <a-col :span="8" @click="onRowClick('plugins')">
          <a-statistic title="功能" :value="tableData.plugins.rows.length" />
        </a-col>
      </a-row>
    </div>

    <div class="admin-bfee7d52ba8fdb819662db5383073de4">
      <div v-show="showInfo.type == 'robot'">
        <vxe-table
          ref="refAdminRobot"
          align="left"
          :data="tableData.robot.rows"
        >
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column
            :filters="frameData.result.rows"
            :filter-method="onTableColumnFilterMethod"
            width="175"
            field="frameId"
            title="类型"
            sortable
          >
            <template #default="{ row }">
              {{ frameInfo[row.frameId] }}
            </template>
          </vxe-column>
          <vxe-column
            width="250"
            field="robot"
            title="机器人"
            sortable
          ></vxe-column>
          <vxe-column field="lastTime" title="时间" sortable></vxe-column>
        </vxe-table>
      </div>

      <div v-show="showInfo.type == 'group'">
        <vxe-table
          ref="refAdminGroup"
          align="left"
          :data="tableData.group.rows"
        >
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column
            :filters="frameData.result.rows"
            :filter-method="onTableColumnFilterMethod"
            width="175"
            field="frameId"
            title="类型"
            sortable
          >
            <template #default="{ row }">
              {{ frameInfo[row.frameId] }}
            </template>
          </vxe-column>
          <vxe-column
            width="250"
            field="robot"
            title="机器人"
            sortable
          ></vxe-column>
          <vxe-column
            field="group"
            title="群组"
            show-overflow="ellipsis"
            sortable
          ></vxe-column>
          <vxe-column field="lastTime" title="时间" sortable></vxe-column>
        </vxe-table>

        <div class="admin-ca523f12368dc2ab03fed17e5369442b">
          <div class="admin-d781a0af3220c510f8f1cf8486492b49">
            <div class="admin-41ed537ff495a1a76e5ac1bad83c4cae">
              <ul class="admin-ba4bdf717f7ca47fbba74da7e76e0a49">
                <li
                  @click="getSelectEvent"
                  class="admin-a64328a2760af2ca12a5b7c909082c14"
                >
                  ✈️ 发送
                </li>
                <li
                  @click="getDataByRobotData"
                  class="admin-a64328a2760af2ca12a5b7c909082c14"
                >
                  🐛 测试
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div v-show="showInfo.type == 'plugins'">
        <vxe-table
          ref="refAdminPlugins"
          align="left"
          :data="tableData.plugins.rows"
        >
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column
            width="175"
            field="info.name"
            title="插件"
            show-overflow="ellipsis"
            sortable
          ></vxe-column>
          <vxe-column
            width="250"
            field="info.trigger.frame"
            title="框架"
            sortable
          >
            <template #default="{ row }">
              {{
                row.info.trigger.frame
                  .map((e) => {
                    return frameInfo[e];
                  })
                  .toString()
              }}
            </template>
          </vxe-column>
          <vxe-column
            field="info.trigger.command"
            title="指令"
            show-overflow="ellipsis"
            sortable
          >
            <template #default="{ row }">
              {{
                row.info.trigger.command
                  .map((e) => {
                    return e.keywords;
                  })
                  .toString()
              }}
            </template>
          </vxe-column>
        </vxe-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "adminRobotData",
  data() {
    return {
      percentage: 0,
      tableData: {
        robot: {
          rows: [],
        },
        group: {
          rows: [],
        },
        plugins: {
          rows: [],
        },
      },
      frameData: {
        result: {
          rows: [],
        },
      },
      frameList: [
        70000, 75000, 20000, 40000, 60000, 10000, 15000, 2500, 80000, 90000,
        50000,
      ],
      frameInfo: {
        2500: "其他-小爱音箱",
        10000: "QQ (MyPCQQ)",
        15000: "QQ (OPQ)",
        20000: "WeChat (可爱猫)",
        40000: "DingTalk",
        50000: "NokNok",
        60000: "QQ (Gocq-http)",
        70000: "QQ (Guild)",
        75000: "QQ (Group)",
        80000: "其他-王者营地",
        90000: "miYouShe",
      },
      botInfo: {
        frameHost: null,
        key: null,
        msg: null,
      },
      showInfo: {
        type: "robot",
      },
    };
  },
  created() {
    this.initPage();
  },
  mounted() {
    this.getDataByRobotData();
  },
  methods: {
    initPage: function () {
      this.frameList.map((x) => {
        this.frameData.result.rows.push({
          value: x,
          label: this.frameInfo[x],
        });
      });

      this.botInfo.msg = this.$appGetLocalStorage("bot-sendMsg");
      this.botInfo.frameHost = this.$appGetLocalStorage("bot-frameHost");
      this.botInfo.key = this.$appGetLocalStorage("bot-key");
    },
    getDataByRobotData: function () {
      this.$axios
        .post(
          this.$appApi.bot.getDataByRobotData + "&frameId=2500",
          this.$qs.stringify({
            key: this.botInfo.key,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    getFrameInfo: function (frameId) {
      let ret;

      if (frameId == 10000) {
        ret = 8010;
      } else if (frameId == 15000) {
        ret = 8086;
      } else if (frameId == 20000) {
        ret = 8073;
      } else if (frameId == 60000) {
        ret = 8020;
      }

      return ret;
    },
    setClient: function () {
      let frameHost, key;

      frameHost = prompt("请输入地址", this.botInfo.frameHost || "test.com");

      if (frameHost) {
        this.botInfo.frameHost = frameHost;

        this.$appSetLocalStorage("bot-frameHost", frameHost);

        this.$message.success(this.$appMsg.success[1000]);
      }

      key = prompt("请输入密钥", this.botInfo.key || "abcd1234");

      if (key) {
        this.botInfo.key = key;

        this.$appSetLocalStorage("bot-key", key);

        this.$message.success(this.$appMsg.success[1000]);
      }
    },
    setMsg: function () {
      let msg = prompt("请输入内容", this.botInfo.msg || "hello~");

      if (msg) {
        this.botInfo.msg = msg;

        this.$appSetLocalStorage("bot-sendMsg", msg);

        this.$message.success(this.$appMsg.success[1000]);
      }
    },
    sendMsg: function (
      frameId,
      msgRobot,
      msgType,
      msgSource,
      msgContent,
      msgExt
    ) {
      this.$axios
        .post(
          this.$appApi.bot.sendMsg +
            "&frameId=" +
            frameId +
            "&frameHost=" +
            this.botInfo.frameHost +
            ":" +
            this.getFrameInfo(frameId),
          this.$qs.stringify({
            key: this.botInfo.key,
            msgRobot: msgRobot,
            msgType: msgType,
            msgSource: msgSource,
            msgContent: msgContent,
            msgExt: JSON.stringify({
              msgOrigMsg: msgExt,
              msgType: "text_msg",
            }),
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            console.log(data);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onRowClick: function (type) {
      this.showInfo.type = type;
    },
    onTableColumnFilterMethod: function ({ option, row, column }) {
      if (column.property == "frameId") {
        return row.frameId == option.value;
      }
    },
    getSelectEvent() {
      let group = this.$refs.refAdminGroup.getCheckboxRecords(),
        groupNum = group.length;

      //if (groupNum == 0) {
      //没选中
      //} else if (groupNum > 10) {
      //群太多
      //} else {
      this.$message.success("开始推送");

      group.map((x, i) => {
        setTimeout(() => {
          this.sendMsg(x.frameId, x.robot, 100, x.group, this.botInfo.msg, {
            robot_wxid: x.robot,
            from_wxid: x.group,
          });

          this.percentage = Math.floor(((i + 1) / groupNum) * 100);
        }, 1000 * i);
      });

      setTimeout(() => {
        this.percentage = 0;
      }, 1000 * groupNum);
      //}
    },
  },
};
</script>

<style scoped lang="less">
img.admin-58a5bd4d1fe1914a7438e768c0627486 {
  margin-left: -15px;
  margin-top: 33px;
  position: absolute;
}

li.admin-a64328a2760af2ca12a5b7c909082c14 {
  float: left;
  margin: 0 27px;
  color: white;
  text-align: center;
  margin-top: 15px;
}

div.admin-558dab5fd681d940120defdcedf70585 {
  width: 400px;
  position: absolute;
  margin-top: 3px;
}

div.admin-ca523f12368dc2ab03fed17e5369442b {
  position: fixed;
  bottom: 35px;
  height: 50px;
  z-index: 99999999 !important;
  margin: 0 auto;
  right: 35px;
}

div.admin-d781a0af3220c510f8f1cf8486492b49 {
  height: 50px;
  width: 200px;
  margin: 0 auto;
  background-color: #1890ff;
  border-radius: 25px;
}
</style>