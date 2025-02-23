<template>
  <div class="admin-robot-data">
    <!-- <div>这里是 robot-data</div> -->
    <div class="app-4717d11da95ed90ccdb4d4a0648bad39">
      <div class="admin-8c36adba08eefa688be68bc3cf4d5fd6">
        <a-dropdown :trigger="['click']">
          <h1>
            <span>🤖️ 您好，很高兴为您服务。</span>
            <div
              v-if="percentage > 0"
              class="admin-558dab5fd681d940120defdcedf70585"
            >
              <van-progress :percentage="percentage" />
            </div>
          </h1>
          <template #overlay>
            <a-menu
              :style="{
                width: '100px',
              }"
            >
              <a-sub-menu key="menu" title="菜单">
                <a-menu-item @click="setMsg">推送的内容</a-menu-item>
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
        <a-col :span="3" @click="onRowClick('robot', 0)">
          <a-statistic title="机器人" :value="tableData[0].total" />
        </a-col>
        <a-col :span="3" @click="onRowClick('group', 1)">
          <a-statistic title="活跃群组" :value="tableData[1].total" />
        </a-col>
      </a-row>
    </div>

    <div class="admin-bfee7d52ba8fdb819662db5383073de4">
      <div v-show="showInfo.type == 'robot'">
        <vxe-table
          ref="refAdminRobot"
          id="refAdminRobot"
          align="left"
          border="inner"
          :custom-config="{ storage: true }"
          :data="tableData[0].rows"
        >
          <vxe-column type="seq" width="60" />
          <vxe-column
            :filters="frameData.result.rows"
            :filter-method="onTableColumnFilterMethod"
            width="175"
            field="frameId"
            title="类型"
            show-overflow="ellipsis"
          >
            <template #default="{ row }">
              {{ frameInfo[row.frameId] }}
            </template>
          </vxe-column>
          <vxe-column
            width="250"
            field="robot"
            title="机器人"
            show-overflow="ellipsis"
          />
          <vxe-column field="updated_at" title="更新时间" sortable />
        </vxe-table>
      </div>

      <div v-show="showInfo.type == 'group'">
        <vxe-table
          ref="refAdminRobotGroup"
          id="refAdminRobotGroup"
          align="left"
          border="inner"
          :custom-config="{ storage: true }"
          :expand-config="{ accordion: true }"
          :data="tableData[1].rows"
        >
          <vxe-column type="checkbox" width="60" />
          <vxe-column type="seq" width="60" />
          <vxe-table-column type="expand" width="80">
            <template v-slot:content="{ row }">
              <RobotFunction :row="row" />
            </template>
          </vxe-table-column>
          <vxe-column
            :filters="frameData.result.rows"
            :filter-method="onTableColumnFilterMethod"
            width="175"
            field="frameId"
            title="类型"
            show-overflow="ellipsis"
          >
            <template #default="{ row }">
              {{ frameInfo[row.frameId] }}
            </template>
          </vxe-column>
          <vxe-column
            :filters="robotData.result.rows"
            :filter-method="onTableColumnFilterMethod"
            width="250"
            field="robot"
            title="机器人"
            show-overflow="ellipsis"
          >
            <template #default="{ row }">
              <span class="admin-fbb2abea8cbe41aacdf1b893f9cb4459">
                {{ row.robot }}
              </span>
              <span
                v-if="row.frameId == 5000 && row.tag.length > 0"
                class="admin-35a3fd9ebe1b21426f457f83df90890a"
              >
                <br />
                <van-tag
                  v-for="(data, index) in row.tag"
                  :key="'admin-4f1cb2cce1bd665d34f21735c517cf9f-' + index"
                  round
                  :color="data.color"
                  type="primary"
                  class="admin-1957c2d79946c8557790e643435fea9a"
                >
                  {{ data.name }}
                </van-tag>
              </span>
            </template>
          </vxe-column>
          <vxe-column field="group" title="群组" show-overflow="ellipsis">
            <template #default="{ row }">
              <span class="admin-fbb2abea8cbe41aacdf1b893f9cb4459">
                {{ row.group }}
              </span>
              <span
                v-if="row.frameId != 5000 && row.tag.length > 0"
                class="admin-35a3fd9ebe1b21426f457f83df90890a"
              >
                <br />
                <van-tag
                  v-for="(data, index) in row.tag"
                  :key="'admin-4f1cb2cce1bd665d34f21735c517cf9f-' + index"
                  round
                  :color="data.color"
                  type="primary"
                  class="admin-1957c2d79946c8557790e643435fea9a"
                >
                  {{ data.name }}
                </van-tag>
              </span>
            </template>
          </vxe-column>
          <vxe-column field="updated_at" title="更新时间" sortable />
        </vxe-table>

        <div class="app-face1cbe136c70e1fc08cff038596944">
          <van-pagination
            v-model="paginationInfo.model"
            :total-items="tableData[1].total"
            :items-per-page="tableData[1].pageSize"
            @change="onPaginationChange"
            class="admin-44e675bf674e7760df79b8b7f2360008"
          />
        </div>

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
                <li class="admin-a64328a2760af2ca12a5b7c909082c14">🐛 测试</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppHello height="100px" />
  </div>
</template>

<script>
export default {
  name: "adminRobotData",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
    RobotFunction: () => import("@/components/Admin/Function/Robot.vue"),
  },
  data() {
    return {
      percentage: 0,
      tableData: [
        {
          rows: [],
          total: 25,
          totalPage: 0,
          pageSize: 25,
        },
        {
          rows: [],
          total: 25,
          totalPage: 0,
          pageSize: 25,
        },
        {
          rows: [],
          total: 25,
          totalPage: 0,
          pageSize: 25,
        },
      ],
      frameData: {
        result: {
          rows: [],
        },
      },
      robotData: {
        result: {
          rows: [],
        },
      },
      frameList: [
        20000, 5000, 30000, 60000, 70000, 75000, 15000, 10000, 40000, 2500,
        80000, 90000, 50000,
      ],
      frameInfo: {
        2500: "其他-小爱音箱",
        5000: "WeChat (公众号)",
        10000: "QQ (MyPCQQ)",
        15000: "QQ (OPQ)",
        20000: "WeChat (可爱猫)",
        30000: "FeiShu (飞书)",
        40000: "DingTalk",
        50000: "NokNok",
        60000: "QQ (LiteLoaderQQNT)",
        70000: "QQ (频道)",
        75000: "QQ (群)",
        80000: "其他-王者营地",
        90000: "miYouShe (米游社)",
      },
      paginationInfo: {
        model: 0,
      },
      pageInfo: {
        currentPage: 1,
        pageSize: 25,
      },
      robotInfo: {
        list: [],
        frameHost: null,
        key: null,
        msg: null,
      },
      showInfo: {
        type: "robot",
        index: 0,
      },
    };
  },
  mounted() {
    this.initPage();
    this.getAdminData(1, 0, 0);
  },
  methods: {
    initPage: function () {
      this.frameList.map((x) => {
        this.frameData.result.rows.push({
          value: x,
          label: this.frameInfo[x],
        });
      });

      this.robotInfo.list = this.$appGetLocalStorage("admin-robot-list") || [];

      this.robotInfo.list.map((x) => {
        this.robotData.result.rows.push({
          value: x.robot,
          label: x.robot,
        });
      });

      this.robotInfo.msg = this.$appGetLocalStorage("admin-robot-sendMsg");
      this.robotInfo.frameHost = this.$appGetLocalStorage(
        "admin-robot-frameHost"
      );
      this.robotInfo.key = this.$appGetLocalStorage("admin-robot-key");
    },
    getAdminData: function (aid = 1, bid = 0, page = 0) {
      this.$axios
        .post(
          this.$appApi.app.getAdminData +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&page=" +
            page +
            "&frameId=2500"
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            let robotList = [];

            data[0].rows.map((x) => {
              robotList.push(x);
            });

            this.$appSetLocalStorage("admin-robot-list", robotList);

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

      frameHost = prompt("请输入地址", this.robotInfo.frameHost || "test.com");

      if (frameHost) {
        this.robotInfo.frameHost = frameHost;

        this.$appSetLocalStorage("admin-robot-frameHost", frameHost);

        this.$message.success(this.$appMsg.success[1000]);
      }

      key = prompt("请输入密钥", this.robotInfo.key || "abcd1234");

      if (key) {
        this.robotInfo.key = key;

        this.$appSetLocalStorage("admin-robot-key", key);

        this.$message.success(this.$appMsg.success[1000]);
      }
    },
    setMsg: function () {
      let msg = prompt("请输入内容", this.robotInfo.msg || "hello~");

      if (msg) {
        this.robotInfo.msg = msg;

        this.$appSetLocalStorage("admin-robot-sendMsg", msg);

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
          this.$appApi.robot.sendMsg +
            "&frameId=" +
            frameId +
            "&frameHost=" +
            this.robotInfo.frameHost +
            ":" +
            this.getFrameInfo(frameId),
          this.$qs.stringify({
            key: this.robotInfo.key,
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
    onRowClick: function (type, index) {
      this.showInfo.type = type;
      this.showInfo.index = index;
    },
    onTableColumnFilterMethod: function ({ option, row, column }) {
      if (column.property == "frameId") {
        return row.frameId == option.value;
      } else if (column.property == "robot") {
        return row.robot == option.value;
      }
    },
    getSelectEvent: function () {
      let group = this.$refs.refAdminRobotGroup.getCheckboxRecords(),
        groupNum = group.length;

      //if (groupNum == 0) {
      //没选中
      //} else if (groupNum > 10) {
      //群太多
      //} else {
      this.$message.success("开始推送");

      group.map((x, i) => {
        let msgContent = this.robotInfo.msg,
          msgExt = {};

        if (x.frameId == 20000) {
          msgExt = {
            robot_wxid: x.robot,
            from_wxid: x.group,
          };
        } else if (x.frameId == 60000) {
          msgExt = {
            message_type: "group",
            self_id: x.robot,
            group_id: String(x.group),
          };
        } else {
          return;
        }

        if (msgExt != {}) {
          setTimeout(() => {
            this.sendMsg(
              x.frameId,
              x.robot,
              x.group.indexOf(":") > -1 ? "guild" : "group",
              x.group,
              msgContent,
              msgExt
            );

            this.percentage = Math.floor(((i + 1) / groupNum) * 100);
          }, 1000 * i);
        }
      });

      setTimeout(() => {
        this.percentage = 0;
      }, 1000 * groupNum);
      //}
    },
    onPaginationChange: function (e) {
      this.getAdminData(1, this.showInfo.index, e - 1);
    },
  },
};
</script>

<style scoped lang="less">
li.admin-a64328a2760af2ca12a5b7c909082c14 {
  float: left;
  margin: 0 27px;
  color: white;
  text-align: center;
  margin-top: 15px;
}

span.admin-1957c2d79946c8557790e643435fea9a {
  margin-right: 5px;
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