<template>
  <div class="xhh-6be8b442b29455954a48ba47d77f34a1">
    <div class="xhh-6dfd13cf3596f869cea69e556fa55874">
      <div @click="showToken" class="xhh-447cf3f1fd4d23f434fdd90da934819b">
        当前 Token
      </div>
      <div class="xhh-88053b76cbecba44aa1d032a7d3ac897">
        <span
          v-if="showInfo.token"
          class="xhh-036dd32f3fd56ac4fc46029ebedce833"
        >
          {{ token || "loading" }}
        </span>
        <span v-else class="xhh-036dd32f3fd56ac4fc46029ebedce833">
          ********************
        </span>
      </div>

      <br /><br />

      <div class="xhh-447cf3f1fd4d23f434fdd90da934819b">当前剩余</div>
      <div class="xhh-db7f593db3e0fb3fd6f2a7946478a563">
        <span class="xhh-8c595754aa6b1528999eb3975cd6696b">
          {{ times || 0 }}
        </span>
        <span class="xhh-7f1e00e75f91b99f19129d248f9281e8">次</span>
      </div>
      <div class="xhh-3598f92558e331a710f8fdf203b90dec">
        <van-button
          round
          plain
          icon="gold-coin-o"
          type="info"
          size="small"
          @click="addChallengeTimes"
        >
          获取奖励
        </van-button>
        &nbsp;&nbsp;
        <van-button
          round
          plain
          icon="replay"
          type="danger"
          size="small"
          @click="resetToken"
        >
          重置 Token
        </van-button>
        &nbsp;&nbsp;
        <van-button
          disabled
          round
          plain
          icon="cash-o"
          color="orange"
          size="small"
        >
          氪金改命
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Xhh",
  data() {
    return {
      token: "",
      times: 0,
      showInfo: {
        token: false,
      },
    };
  },
  mounted() {
    this.getChallengeInfo();
  },
  methods: {
    showToken: function () {
      if (this.showInfo.token) {
        this.showInfo.token = false;
      } else {
        this.showInfo.token = true;
      }
    },
    resetToken: function () {
      this.$dialog
        .confirm({
          title: "是否重置 Token?",
          message: "此操作不可逆",
        })
        .then(() => {
          //on confirm

          this.resetChallengeToken();
        })
        .catch(() => {
          //on cancel
        });
    },
    getChallengeInfo: function () {
      this.$axios.post(this.$appApi.app.getChallenge + "&aid=0").then((res) => {
        let data = res.data.data,
          status = res.data.status;

        if (status.code == 200) {
          this.token = data.token;
          this.times = data.times;

          //this.$message.success(this.$appMsg.success[1000]);
        } else {
          //this.$message.error(status.msg);
        }
      });
    },
    addChallengeTimes: function () {
      this.$message.info(this.$appMsg.info[1031]);

      setTimeout(() => {
        this.$axios
          .post(this.$appApi.app.getChallenge + "&aid=1")
          .then((res) => {
            let data = res.data.data,
              status = res.data.status;

            if (status.code == 200) {
              this.token = data.token;
              this.times = data.times;

              this.$message.success(this.$appMsg.success[1000]);
            } else {
              this.$message.error(status.msg);
            }
          });
      }, 2000);
    },
    resetChallengeToken: function () {
      this.$axios.post(this.$appApi.app.getChallenge + "&aid=2").then((res) => {
        let status = res.data.status;

        if (status.code == 200) {
          this.getChallengeInfo();

          this.$message.success(this.$appMsg.success[1000]);
        } else {
          this.$message.error(status.msg);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
span.xhh-7f1e00e75f91b99f19129d248f9281e8 {
  font-size: 10px;
  color: black;
  margin-left: 5px;
}

div.xhh-6dfd13cf3596f869cea69e556fa55874 {
  margin-top: 200px;
}

div.xhh-447cf3f1fd4d23f434fdd90da934819b {
  font-size: 30px;
  margin-bottom: 25px;
}

div.xhh-db7f593db3e0fb3fd6f2a7946478a563 {
  font-size: 20px;
  color: red;
}

div.xhh-3598f92558e331a710f8fdf203b90dec {
  margin-top: 25px;
}
</style>