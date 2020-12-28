<template>
  <div class="game-engage">
    <div class="game-25c0219f67e7581f29f4956d75fca11f">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        @click-left="appPush({ path: '/my' })"
        left-text="返回"
        z-index="99999999"
        title="我的交战"
        class="game-7140a921b48604a7db01e6b676e34174"
      />
    </div>

    <div class="game-71ddd6fc31e5033696c4a7f66111b5f9">
      <van-grid
        :border="false"
        :column-num="1"
        class="game-b2ecdf6163952cf377f932aff4b736be"
      >
        <van-grid-item
          v-for="(data, index) in engageInfo.result.rows"
          :key="'app-a15836c76bf09c02a9181d1dee61315b-' + index"
          class="game-f24a222ebfb0f6b85f63749653659063"
        >
          <div class="game-237b90fb6955b98328736810edefe6e7">
            <van-row
              @click="appPush({ path: '/game/' + data.engage.label + '/bp' })"
            >
              <van-col span="7">
                <img
                  width="40"
                  height="40"
                  v-lazy="data.team_1.logo"
                  class="game-1ab74bf7276acc5985f078fee7e63109"
                />
                <div class="app-f56ae939694a0488cc9e8ecdd47a46ab">
                  {{ data.team_1.name }}
                </div>
              </van-col>
              <van-col span="10">
                <span class="app-07cc694b9b3fc636710fa08b6922c42b">{{
                  data.engage.time
                }}</span>
                <br />
                <span class="app-f4842dcb685d490e2a43212b8072a6fe">Vs</span>
              </van-col>
              <van-col span="7">
                <img
                  width="40"
                  height="40"
                  v-lazy="data.team_2.logo"
                  class="game-1ab74bf7276acc5985f078fee7e63109"
                />
                <div class="app-f56ae939694a0488cc9e8ecdd47a46ab">
                  {{ data.team_2.name }}
                </div>
              </van-col>
            </van-row>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <AppBottomTabbar v-if="isMobile" height="100" />
  </div>
</template>

<script>
export default {
  name: "GameEngage",
  components: {
    AppBottomTabbar: (resolve) =>
      require(["@/components/App/BottomTabbar.vue"], resolve),
  },
  data() {
    return {
      show: {
        engage: false,
      },
      engageInfo: {
        type: 0,
        result: [],
        row: {
          id: null,
          name: null,
          logo: null,
        },
      },
    };
  },
  mounted() {
    this.getGameDashboard();
  },
  methods: {
    getGameDashboard: function () {
      this.axios
        .post(this.apiList.pvp.getGameDashboard + "&aid=1")
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.engageInfo.result = data.result;
          } else {
            this.$message.error(status.msg);

            this.appPush({ path: "/login" });
          }
        });
    },
  },
};
</script>
