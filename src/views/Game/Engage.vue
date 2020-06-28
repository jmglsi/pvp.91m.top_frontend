<template>
  <div class="game-engage">
    <div class="game-25c0219f67e7581f29f4956d75fca11f">
      <van-nav-bar
        :border="false"
        :fixed="true"
        :placeholder="true"
        title="我的交战"
        @click-left="$router.go(-1)"
      >
        <van-icon name="arrow-left" slot="left" />
      </van-nav-bar>
    </div>

    <div class="game-71ddd6fc31e5033696c4a7f66111b5f9">
      <van-grid :border="false" :column-num="1">
        <van-grid-item
          v-for="(data, index) in engageInfo.result"
          :key="'app-a15836c76bf09c02a9181d1dee61315b-' + index"
        >
          <div class="game-237b90fb6955b98328736810edefe6e7">
            <van-row
              @click="$router.push({path:'/game/' + data.engage.label + '/bp', query: { from: '289ccb94bf3dec52e01fd5b5503c4225' }})"
            >
              <van-col span="7">
                <img
                  width="50"
                  height="50"
                  v-lazy="data.team_1.logo"
                  class="game-1ab74bf7276acc5985f078fee7e63109"
                />
                <div class="game-f56ae939694a0488cc9e8ecdd47a46ab">{{ data.team_1.name }}</div>
              </van-col>
              <van-col span="10">
                <span class="game-77b1c148b592b279e2040a4d7832ce91">Vs</span>
                <div class="game-2447b032a0df6ee75028bf69e901f526">{{ data.engage.time }}</div>
              </van-col>
              <van-col span="7">
                <img
                  width="50"
                  height="50"
                  v-lazy="data.team_2.logo"
                  class="game-1ab74bf7276acc5985f078fee7e63109"
                />
                <div class="game-f56ae939694a0488cc9e8ecdd47a46ab">{{ data.team_2.name }}</div>
              </van-col>
            </van-row>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <AppBottomTabbar v-if="appDevice" :height="100" />
  </div>
</template>

<style scoped>
.game-237b90fb6955b98328736810edefe6e7 {
  width: 100%;
}

.game-1ab74bf7276acc5985f078fee7e63109 {
  border-radius: 100%;
}

.game-f56ae939694a0488cc9e8ecdd47a46ab {
  font-size: 12px;
  margin-top: 5px;
}
</style>

<script>
export default {
  name: "GameEngage",
  components: {
    AppBottomTabbar: resolve =>
      require(["@/components/App/BottomTabbar.vue"], resolve)
  },
  data() {
    return {
      loginInfo: {
        openId: null,
        accessToken: null
      },
      show: {
        engage: false
      },
      engageInfo: {
        type: 0,
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

    this.getGameDashboard();
  },
  methods: {
    getGameDashboard: function() {
      let loginInfo = this.loginInfo;

      this.axios
        .post(
          this.apiList.pvp.getGameDashboard + "&aid=1",
          this.$qs.stringify({
            openId: loginInfo.openId,
            accessToken: loginInfo.accessToken
          })
        )
        .then(res => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.engageInfo.result = data.result;
          } else {
            this.$message.error(status.msg);
          }
        });
    }
  }
};
</script>