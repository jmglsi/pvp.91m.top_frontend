<template>
  <div class="game-team">
    <div class="game-11738e2f54bf9290cf3aa2980f866c12">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        @click-left="$appPush({ path: '/my', query: { refresh: 0 } })"
        @click-right="onNavBarRightClick"
        left-text="返回"
        title="队伍"
        class="game-6fd4f92278806c6e544f958ba762c7a9"
      >
        <van-icon name="add-o" slot="right" />
      </van-nav-bar>
    </div>

    <div
      class="
        game-c37237ae7770c5062ccad7a23572e282
        app-4eb2044800e2b7b9e5c44d370af22b27
      "
      :style="
        $appIsApple && $appConfigInfo.appInfo.pwa == 1
          ? { marginTop: '-50px' }
          : {}
      "
    >
      <van-grid
        :border="false"
        :column-num="3"
        class="game-40db4f618bd5c27e60368f891382ffd4"
      >
        <van-grid-item
          v-for="(data, index) in tableData.result.rows"
          :key="'app-a15836c76bf09c02a9181d1dee61315b-' + index"
          icon-prefix="app-b10034712510883e9d2c45b4ec90772d"
          @click="onUpdateTeamClick(data, index)"
        >
          <template #icon>
            <img
              v-lazy="data.logo"
              width="50"
              height="50"
              class="game-1ab74bf7276acc5985f078fee7e63109"
            />
          </template>
          <template #text>
            <div class="app-82f6ee2b57fb59b0b7b3803164d6b9d8">
              {{ data.name }}
            </div>
          </template>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="game-ddf0c31260ebcb524c92953f905b6624">
      <van-action-sheet
        v-model="showInfo.teamMenu"
        :title="tableDataRow.id ? tableDataRow.name + ' 如何操作' : '新建队伍'"
        safe-area-inset-bottom
      >
        <div class="content">
          <div class="game-350be0bb4350ca865ab9210d074875f1">
            <van-cell-group class="game-2ce081560b9cb8cdcd7472e639624e3e">
              <van-field
                v-model="tableDataRow.id"
                v-if="tableDataRow.id"
                :disabled="true"
                label="id"
                class="game-3972b6d305454c0dd6bb3927cf9c8712"
              >
                <template #button>
                  <div class="game-73ece876adc866804e05a0eae53577c6">
                    <van-button
                      round
                      size="small"
                      color="black"
                      @click="onCreateEngageClick(tableDataRow.id)"
                    >
                      创建交战
                    </van-button>
                  </div>
                </template>
              </van-field>
              <van-field
                v-model="tableDataRow.logo"
                label="Logo"
                placeholder="输入图片链接"
                clearable
                class="game-3972b6d305454c0dd6bb3927cf9c8712"
              >
                <template #button>
                  <van-uploader
                    :after-read="onAfterRead"
                    :before-read="onBeforeRead"
                    :max-size="1 * 1024 * 1024"
                    @oversize="onOversize"
                  >
                    <div class="game-5f758f428b7ca18a42a55032f534bd2e">
                      <van-button round size="small" type="info">
                        上传图片
                      </van-button>
                    </div>
                  </van-uploader>
                </template>
              </van-field>
              <van-field
                v-model="tableDataRow.name"
                label="名字"
                placeholder="输入队伍名字"
                clearable
                class="game-3972b6d305454c0dd6bb3927cf9c8712"
              />
            </van-cell-group>
          </div>

          <div class="game-c97a3db05d13ebcb702c69bc6a42a226">
            <van-button
              v-if="tableDataRow.id"
              round
              size="small"
              type="danger"
              class="app-a066f238070a70cb531c9bd722c65b36"
              @click="onDeleteTeamClick"
            >
              删除信息
            </van-button>
            &nbsp;
            <van-button
              round
              size="small"
              type="primary"
              class="app-a066f238070a70cb531c9bd722c65b36"
              @click="onSaveTeamInfoClick"
            >
              保存信息
            </van-button>
          </div>
        </div>
      </van-action-sheet>
    </div>

    <AppHello height="50px" />
  </div>
</template>

<script>
export default {
  name: "GameTeam",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
  },
  data() {
    return {
      showInfo: {
        teamMenu: false,
      },
      tableData: {
        result: {
          rows: [],
        },
        type: 0,
        index: 0,
      },
      tableDataRow: {
        id: 0,
        name: "加载中...",
      },
    };
  },
  mounted() {
    this.getGameDashboard();
  },
  methods: {
    getGameDashboard: function () {
      this.$appDelectLocalStorage("tempTeamId");

      this.$axios
        .post(this.$appApi.pvp.getGameDashboard + "&aid=0")
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData.result = data.result;
          } else {
            this.$appOpenUrl("温馨提示", status.msg, { path: "/my" }, 1);
          }
        });
    },
    onAfterRead: function (file) {
      let data = file.content;

      this.$message.info(this.$appMsg.info[1002]);

      this.$axios
        .post(
          this.$appApi.pvp.uploadImg,
          this.$qs.stringify({
            filePath: data,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableDataRow.logo = data.img;

            this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onBeforeRead: function (file) {
      if (
        file.type != "image/png" &&
        file.type != "image/gif" &&
        file.type != "image/jpg" &&
        file.type != "image/jpeg"
      ) {
        this.$message.error(this.$appMsg.error[1004]);
        return false;
      } else {
        return true;
      }
    },
    onOversize: function () {
      this.$message.error(this.$appMsg.error[1005]);
    },
    onNavBarRightClick: function () {
      this.tableData.type = 0;
      this.tableDataRow = {
        name: "",
        logo: "",
      };

      this.showInfo.teamMenu = true;
    },
    onUpdateTeamClick: function (data, index) {
      this.tableData.type = 1;
      this.tableDataRow = data;
      this.tableDataRow.index = index;

      this.showInfo.teamMenu = true;
    },
    onSaveTeamInfoClick: function () {
      let tableData = this.tableData,
        row = this.tableDataRow;

      let postData = {
        teamId: row.id,
        teamName: row.name,
        teamLogo: row.logo,
      };

      if (tableData.type == 0) {
        this.$axios
          .post(this.$appApi.pvp.createTeam, this.$qs.stringify(postData))
          .then((res) => {
            let status = res.data.status;

            if (status.code == 200) {
              this.getGameDashboard();

              this.$message.success(this.$appMsg.success[1000]);
            } else {
              this.$message.error(status.msg);
            }
          });
      } else {
        this.$axios
          .post(this.$appApi.pvp.updateTeamInfo, this.$qs.stringify(postData))
          .then((res) => {
            let status = res.data.status;

            if (status.code == 200) {
              this.$message.success(this.$appMsg.success[1000]);
            } else {
              this.$message.error(status.msg);
            }
          });
      }

      this.showInfo.teamMenu = false;
    },
    onDeleteTeamClick: function () {
      let row = this.tableDataRow;

      this.$dialog
        .confirm({
          title: "是否删除队伍?",
          message: "此操作不可逆",
        })
        .then(() => {
          //on confirm
          this.$axios
            .post(
              this.$appApi.pvp.deleteTeam,
              this.$qs.stringify({
                teamId: row.id,
              })
            )
            .then((res) => {
              let status = res.data.status;

              if (status.code == 200) {
                this.tableData.result.rows.splice(row.index, 1);

                this.$message.success(this.$appMsg.success[1000]);
              } else {
                this.$message.error(status.msg);
              }
            });

          this.showInfo.teamMenu = false;
        })
        .catch(() => {
          //on cancel
        });
    },
    onCreateEngageClick: function (data) {
      this.showInfo.teamMenu = false;

      let oldTeamId = localStorage.getItem("tempTeamId") || "",
        newTeamId = data;

      if (oldTeamId == newTeamId) {
        return this.$message.error(this.$appMsg.error[1006]);
      }

      if (!oldTeamId) {
        this.$message.success(this.$appMsg.success[1003]);

        localStorage.setItem("tempTeamId", data);
      } else {
        this.onSaveEngageClick(oldTeamId, newTeamId);
      }
    },
    onSaveEngageClick: function (teamId_1, teamId_2) {
      this.$axios
        .post(
          this.$appApi.pvp.createEngage,
          this.$qs.stringify({
            teamId_1: teamId_1,
            teamId_2: teamId_2,
          })
        )
        .then((res) => {
          let data = res.data,
            status = data.status;

          if (status.code == 200) {
            let label = data.data.label;

            this.$appDelectLocalStorage("tempTeamId");
            this.$appPush({ path: "/game/" + label + "/bp" });

            this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$appPush({ path: "/login" });

            this.$message.error(status.msg);
          }
        });

      this.showInfo.teamMenu = false;
    },
  },
};
</script>