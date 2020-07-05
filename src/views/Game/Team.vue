<template>
  <div class="game-team">
    <div class="game-11738e2f54bf9290cf3aa2980f866c12">
      <van-nav-bar
        :border="false"
        :fixed="true"
        :placeholder="true"
        title="我的队伍"
        @click-left="$router.go(-1)"
        @click-right="onCreateTeamClick"
      >
        <van-icon name="arrow-left" slot="left" />
        <van-icon name="add-o" slot="right" />
      </van-nav-bar>
    </div>

    <div class="game-c37237ae7770c5062ccad7a23572e282 grid-4eb2044800e2b7b9e5c44d370af22b27">
      <van-grid :border="false">
        <van-grid-item
          v-for="(data, index) in teamInfo.result"
          :key="'app-a15836c76bf09c02a9181d1dee61315b-' + index"
          :text="data.name"
          :icon="data.logo"
          @click="onUpdateTeamClick(data, index)"
        />
      </van-grid>
    </div>

    <div class="game-ddf0c31260ebcb524c92953f905b6624">
      <van-action-sheet
        v-model="show.team"
        :title="teamInfo.row.id != null ? teamInfo.row.name + ' 如何操作' : '新建队伍'"
      >
        <div class="content">
          <div class="game-350be0bb4350ca865ab9210d074875f1">
            <van-cell-group>
              <van-field
                v-model="teamInfo.row.id"
                v-show="teamInfo.row.id"
                :disabled="true"
                label="id"
              >
                <template #button>
                  <van-button
                    round
                    size="small"
                    color="black"
                    @click="onCreateEngageClick(teamInfo.row.id)"
                  >创建交战</van-button>
                </template>
              </van-field>
              <van-field v-model="teamInfo.row.logo" label="Logo" placeholder="输入图片链接" clearable>
                <template #button>
                  <van-uploader
                    :after-read="onAfterRead"
                    :before-read="onBeforeRead"
                    :max-size="3 * 1024 * 1024"
                    @oversize="onOversize"
                  >
                    <van-button round size="small" color="rgb(25, 137, 250)">上传图片</van-button>
                  </van-uploader>
                </template>
              </van-field>
              <van-field v-model="teamInfo.row.name" label="名字" placeholder="输入队伍名字" clearable />
            </van-cell-group>
          </div>

          <div class="game-c97a3db05d13ebcb702c69bc6a42a226">
            <van-button
              v-show="show.delect"
              round
              size="small"
              color="red"
              class="game-a066f238070a70cb531c9bd722c65b36"
              @click="onDelectTeamClick"
            >删除队伍</van-button>&nbsp;
            <van-button
              round
              size="small"
              color="rgb(7, 193, 96)"
              class="game-a066f238070a70cb531c9bd722c65b36"
              @click="onSaveTeamInfoClick"
            >保存队伍信息</van-button>
          </div>
        </div>
      </van-action-sheet>
    </div>
  </div>
</template>

<style scoped>
.game-04b8e72015730c5d62bb5f0cf379ff5e {
  border-radius: unset;
}

.game-a066f238070a70cb531c9bd722c65b36 {
  margin: 25px 0;
}
</style>

<script>
export default {
  name: "GameEngage",
  data() {
    return {
      loginInfo: {
        openId: null,
        accessToken: null
      },
      show: {
        team: false,
        delect: false
      },
      teamInfo: {
        type: 0,
        index: 0,
        result: [],
        row: {
          id: null,
          name: null,
          logo: null
        }
      }
    };
  },
  mounted() {
    this.loginInfo.openId = this.$cookie.get("openId");
    this.loginInfo.accessToken = this.$cookie.get("accessToken");

    this.$cookie.delete("teamId");

    this.getGameDashboard();
  },
  methods: {
    getGameDashboard: function() {
      let loginInfo = this.loginInfo;

      this.axios
        .post(
          this.apiList.pvp.getGameDashboard + "&aid=0",
          this.$qs.stringify({
            openId: loginInfo.openId,
            accessToken: loginInfo.accessToken
          })
        )
        .then(res => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.teamInfo.result = data.result;
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onAfterRead: function(file) {
      let loginInfo = this.loginInfo,
        data = file.content;

      this.$message.info("正在上传");

      this.axios
        .post(
          this.apiList.pvp.uploadImg,
          this.$qs.stringify({
            openId: loginInfo.openId,
            accessToken: loginInfo.accessToken,
            filePath: data
          })
        )
        .then(res => {
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
    onBeforeRead: function(file) {
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
    onOversize: function() {
      this.$message.error("错误:1006,图片超过 3MB");
    },
    onCreateTeamClick: function() {
      this.teamInfo.row = {
        name: null,
        logo: null
      };

      this.teamInfo.type = 0;

      this.show.team = true;
      this.show.delect = false;
    },
    onUpdateTeamClick: function(data, index) {
      this.teamInfo.row = data;

      this.teamInfo.type = 1;
      this.teamInfo.index = index;

      this.show.team = true;
      this.show.delect = true;
    },
    onSaveTeamInfoClick: function() {
      let loginInfo = this.loginInfo,
        teamInfo = this.teamInfo;

      let postData = {
        openId: loginInfo.openId,
        accessToken: loginInfo.accessToken,
        teamId: teamInfo.row.id,
        teamName: teamInfo.row.name,
        teamLogo: teamInfo.row.logo
      };

      if (teamInfo.type == 0) {
        this.axios
          .post(this.apiList.pvp.createTeam, this.$qs.stringify(postData))
          .then(res => {
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
          .then(res => {
            let status = res.data.status;

            if (status.code == 200) {
              this.$message.success("更新成功");
            } else {
              this.$message.error(status.msg);
            }
          });
      }

      this.show.team = false;
    },
    onDelectTeamClick: function() {
      let loginInfo = this.loginInfo,
        teamInfo = this.teamInfo;

      this.$dialog
        .confirm({
          title: "是否删除队伍？"
        })
        .then(() => {
          // on confirm
          this.axios
            .post(
              this.apiList.pvp.delectTeam,
              this.$qs.stringify({
                openId: loginInfo.openId,
                accessToken: loginInfo.accessToken,
                teamId: teamInfo.row.id
              })
            )
            .then(res => {
              let status = res.data.status;

              if (status.code == 200) {
                this.$message.success("删除成功");
                this.teamInfo.result.splice(teamInfo.index, 1);
              } else {
                this.$message.error(status.msg);
              }
            });

          this.show.team = false;
        })
        .catch(() => {
          // on cancel
        });
    },
    onCreateEngageClick: function(data) {
      let teamId_1 = this.$cookie.get("teamId");
      let teamId_2 = data;

      this.show.team = false;

      if (teamId_1 == teamId_2) {
        this.$message.error("错误:1003,两支队伍不能相同");
        return;
      }

      if (!teamId_1) {
        this.$cookie.set("teamId", data);
        this.$message.success("添加成功,请再选择一个");
      } else {
        this.onSaveEngageClick(teamId_1, teamId_2);
      }
    },
    onSaveEngageClick: function(teamId_1, teamId_2) {
      let loginInfo = this.loginInfo;

      this.axios
        .post(
          this.apiList.pvp.createEngage,
          this.$qs.stringify({
            openId: loginInfo.openId,
            accessToken: loginInfo.accessToken,
            teamId_1: teamId_1,
            teamId_2: teamId_2
          })
        )
        .then(res => {
          let status = res.data.status;

          if (status.code == 200) {
            this.$message.success("创建成功");
            this.$cookie.delete("teamId");

            this.$router.push({
              path: "/game/engage",
              query: { from: "ea1ecdac3b835ad8350274daf8622418" }
            });
          } else {
            this.$message.error(status.msg);
          }
        });

      this.show.team = false;
    }
  }
};
</script>