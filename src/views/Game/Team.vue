<template>
  <div class="game-team">
    <div class="game-11738e2f54bf9290cf3aa2980f866c12">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        @click-left="$appPush({ path: '/my' })"
        @click-right="onCreateTeamClick"
        left-text="返回"
        title="队伍"
        z-index="99999999"
        class="game-6fd4f92278806c6e544f958ba762c7a9"
      >
        <van-icon name="add-o" slot="right" />
      </van-nav-bar>
    </div>

    <div
      class="game-c37237ae7770c5062ccad7a23572e282 app-4eb2044800e2b7b9e5c44d370af22b27"
    >
      <van-grid
        :column-num="3"
        :border="false"
        class="game-40db4f618bd5c27e60368f891382ffd4"
      >
        <van-grid-item
          v-for="(data, index) in tableData.result.rows"
          :key="'app-a15836c76bf09c02a9181d1dee61315b-' + index"
          :text="data.name"
          :icon="data.logo"
          icon-prefix="app-b10034712510883e9d2c45b4ec90772d"
          @click="onUpdateTeamClick(data, index)"
        />
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
                  <van-button
                    round
                    size="small"
                    color="black"
                    @click="onCreateEngageClick(tableDataRow.id)"
                    >创建交战</van-button
                  >
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
                    :max-size="3 * 1024 * 1024"
                    @oversize="onOversize"
                  >
                    <van-button round size="small" type="info"
                      >上传图片</van-button
                    >
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
              >删除信息</van-button
            >&nbsp;
            <van-button
              round
              size="small"
              type="primary"
              class="app-a066f238070a70cb531c9bd722c65b36"
              @click="onSaveTeamInfoClick"
              >保存信息</van-button
            >
          </div>
        </div>
      </van-action-sheet>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameTeam",
  data() {
    return {
      showInfo: {
        teamMenu: false,
      },
      tableData: {
        type: 0,
        index: 0,
        result: {
          rows: [],
        },
      },
      tableDataRow: {
        id: "",
        name: "",
      },
    };
  },
  mounted() {
    this.getGameDashboard();
  },
  methods: {
    getGameDashboard: function () {
      this.$cookie.delete("teamId");

      this.$axios
        .post(this.$appApi.pvp.getGameDashboard + "&aid=0")
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData.result = data.result;
          } else {
            this.$appOpenUrl(status.msg, null, { path: "/my" }, 1);
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
            this.$message.success(this.$appMsg.success[1000]);

            this.tableDataRow.logo = data.img;
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
    onCreateTeamClick: function () {
      this.showInfo.teamMenu = true;

      this.tableDataRow = {
        name: "",
        logo: "",
      };

      this.tableData.type = 0;
    },
    onUpdateTeamClick: function (data, index) {
      this.tableDataRow = data;
      this.tableDataRow.index = index;

      this.tableData.type = 1;

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
              this.$message.success(this.$appMsg.success[1000]);

              this.getGameDashboard();
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
          // on confirm
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
                this.$message.success(this.$appMsg.success[1000]);

                this.tableData.result.rows.splice(row.index, 1);
              } else {
                this.$message.error(status.msg);
              }
            });

          this.showInfo.teamMenu = false;
        })
        .catch(() => {
          // on cancel
        });
    },
    onCreateEngageClick: function (data) {
      this.showInfo.teamMenu = false;

      let teamId_1 = this.$cookie.get("teamId") || "",
        teamId_2 = data;

      if (teamId_1 == teamId_2) {
        this.$message.error(this.$appMsg.error[1006]);
        return;
      }

      if (!teamId_1) {
        this.$message.success(this.$appMsg.success[1003]);

        this.$cookie.set("teamId", data);
      } else {
        this.onSaveEngageClick(teamId_1, teamId_2);
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
            this.$message.success(this.$appMsg.success[1000]);

            this.$cookie.delete("teamId");

            this.$appPush({ path: "/game/" + label + "/bp" });
          } else {
            this.$message.error(status.msg);

            this.$appPush({ path: "/login" });
          }
        });

      this.showInfo.teamMenu = false;
    },
  },
};
</script>
