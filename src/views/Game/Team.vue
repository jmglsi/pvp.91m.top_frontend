<template>
  <div class="game-team">
    <div class="game-11738e2f54bf9290cf3aa2980f866c12">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        @click-left="appPush({ path: '/my' })"
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
          v-for="(data, index) in teamInfo.result.rows"
          :key="'app-a15836c76bf09c02a9181d1dee61315b-' + index"
          :text="data.name"
          :icon="data.logo"
          class="game-01d29acb32059f53e7a0297991662475"
          @click="onUpdateTeamClick(data, index)"
        />
      </van-grid>
    </div>

    <div class="game-ddf0c31260ebcb524c92953f905b6624">
      <van-action-sheet
        v-model="showInfo.team"
        :title="teamInfo.row.id ? teamInfo.row.name + ' 如何操作' : '新建队伍'"
        safe-area-inset-bottom
      >
        <div class="content">
          <div class="game-350be0bb4350ca865ab9210d074875f1">
            <van-cell-group class="game-2ce081560b9cb8cdcd7472e639624e3e">
              <van-field
                v-model="teamInfo.row.id"
                v-if="teamInfo.row.id"
                :disabled="true"
                label="id"
                class="game-3972b6d305454c0dd6bb3927cf9c8712"
              >
                <template #button>
                  <van-button
                    round
                    size="small"
                    color="black"
                    @click="onCreateEngageClick(teamInfo.row.id)"
                    >创建交战</van-button
                  >
                </template>
              </van-field>
              <van-field
                v-model="teamInfo.row.logo"
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
                v-model="teamInfo.row.name"
                label="名字"
                placeholder="输入队伍名字"
                clearable
                class="game-3972b6d305454c0dd6bb3927cf9c8712"
              />
            </van-cell-group>
          </div>

          <div class="game-c97a3db05d13ebcb702c69bc6a42a226">
            <van-button
              v-if="teamInfo.row.id"
              round
              size="small"
              color="red"
              class="game-a066f238070a70cb531c9bd722c65b36"
              @click="onDeleteTeamClick"
              >删除队伍</van-button
            >&nbsp;
            <van-button
              round
              size="small"
              color="rgb(7,193,96)"
              class="game-a066f238070a70cb531c9bd722c65b36"
              @click="onSaveTeamInfoClick"
              >保存队伍信息</van-button
            >
          </div>
        </div>
      </van-action-sheet>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameEngage",
  data() {
    return {
      loginInfo: {
        openId: null,
        accessToken: null,
      },
      showInfo: {
        team: false,
      },
      teamInfo: {
        type: 0,
        index: 0,
        result: {},
        row: {
          id: null,
          name: null,
          logo: null,
        },
      },
    };
  },
  mounted() {
    this.loginInfo.openId = this.$cookie.get("openId");
    this.loginInfo.accessToken = this.$cookie.get("accessToken");

    this.getGameDashboard();
  },
  methods: {
    getGameDashboard: function () {
      let loginInfo = this.loginInfo;

      this.$cookie.delete("teamId");

      this.axios
        .post(
          this.apiList.pvp.getGameDashboard + "&aid=0",
          this.$qs.stringify({
            openId: loginInfo.openId,
            accessToken: loginInfo.accessToken,
            friendsOpenId: loginInfo.openId,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.teamInfo.result = data.result;
          } else {
            this.appOpenUrl(status.msg, null, { path: "/my" }, 1);
          }
        });
    },
    onAfterRead: function (file) {
      let loginInfo = this.loginInfo,
        data = file.content;

      this.$message.info("提示:1002,正在上传");

      this.axios
        .post(
          this.apiList.pvp.uploadImg,
          this.$qs.stringify({
            openId: loginInfo.openId,
            accessToken: loginInfo.accessToken,
            friendsOpenId: loginInfo.openId,
            filePath: data,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.$message.success("上传成功");

            this.teamInfo.row.logo = data.img;
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
        this.$message.error("请上传 png/gif/jpg/jpeg 格式图片");
        return false;
      } else {
        return true;
      }
    },
    onOversize: function () {
      this.$message.error("错误:1006,图片超过 3MB");
    },
    onCreateTeamClick: function () {
      this.showInfo.team = true;

      this.teamInfo.row = {
        name: null,
        logo: null,
      };

      this.teamInfo.type = 0;
    },
    onUpdateTeamClick: function (data, index) {
      this.teamInfo.row = data;

      this.teamInfo.type = 1;
      this.teamInfo.index = index;

      this.showInfo.team = true;
    },
    onSaveTeamInfoClick: function () {
      let loginInfo = this.loginInfo,
        teamInfo = this.teamInfo;

      let postData = {
        openId: loginInfo.openId,
        accessToken: loginInfo.accessToken,
        friendsOpenId: loginInfo.openId,
        teamId: teamInfo.row.id,
        teamName: teamInfo.row.name,
        teamLogo: teamInfo.row.logo,
      };

      if (teamInfo.type == 0) {
        this.axios
          .post(this.apiList.pvp.createTeam, this.$qs.stringify(postData))
          .then((res) => {
            let status = res.data.status;

            if (status.code == 200) {
              this.$message.success("创建成功");

              this.getGameDashboard();
            } else {
              this.$message.error(status.msg);
            }
          });
      } else {
        this.axios
          .post(this.apiList.pvp.updateTeamInfo, this.$qs.stringify(postData))
          .then((res) => {
            let status = res.data.status;

            if (status.code == 200) {
              this.$message.success("更新成功");
            } else {
              this.$message.error(status.msg);
            }
          });
      }

      this.showInfo.team = false;
    },
    onDeleteTeamClick: function () {
      let loginInfo = this.loginInfo,
        teamInfo = this.teamInfo;

      this.$dialog
        .confirm({
          title: "是否删除队伍？",
        })
        .then(() => {
          // on confirm
          this.axios
            .post(
              this.apiList.pvp.deleteTeam,
              this.$qs.stringify({
                openId: loginInfo.openId,
                accessToken: loginInfo.accessToken,
                friendsOpenId: loginInfo.openId,
                teamId: teamInfo.row.id,
              })
            )
            .then((res) => {
              let status = res.data.status;

              if (status.code == 200) {
                this.$message.success("删除成功");

                this.teamInfo.result.rows.splice(teamInfo.index, 1);
              } else {
                this.$message.error(status.msg);
              }
            });

          this.showInfo.team = false;
        })
        .catch(() => {
          // on cancel
        });
    },
    onCreateEngageClick: function (data) {
      this.showInfo.team = false;

      let teamId_1 = this.$cookie.get("teamId");
      let teamId_2 = data;

      if (teamId_1 == teamId_2) {
        this.$message.error("错误:1003,两支队伍不能相同");
        return;
      }

      if (!teamId_1) {
        this.$message.success("添加成功,请再选择一个");

        this.$cookie.set("teamId", data);
      } else {
        this.onSaveEngageClick(teamId_1, teamId_2);
      }
    },
    onSaveEngageClick: function (teamId_1, teamId_2) {
      let loginInfo = this.loginInfo;

      this.axios
        .post(
          this.apiList.pvp.createEngage,
          this.$qs.stringify({
            openId: loginInfo.openId,
            accessToken: loginInfo.accessToken,
            friendsOpenId: loginInfo.openId,
            teamId_1: teamId_1,
            teamId_2: teamId_2,
          })
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            this.$message.success("创建成功");

            this.$cookie.delete("teamId");

            this.appPush({ path: "/game/engage" });
          } else {
            this.$message.error(status.msg);

            this.appPush({ path: "/login" });
          }
        });

      this.showInfo.team = false;
    },
  },
};
</script>
