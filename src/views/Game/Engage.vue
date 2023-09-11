<template>
  <div class="game-engage">
    <div class="game-25c0219f67e7581f29f4956d75fca11f">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :left-text="$t('nav-bar.left-text')"
        @click-left="$appBack()"
        @click-right="onNavBarRightClick"
        title="交战"
        z-index="99999999"
        class="game-7140a921b48604a7db01e6b676e34174"
      >
        <van-icon name="down" slot="right" />
      </van-nav-bar>
    </div>

    <div
      class="game-71ddd6fc31e5033696c4a7f66111b5f9"
      :style="
        $appIsApple && $appConfigInfo.appInfo.pwa == 1
          ? { marginTop: '-50px' }
          : {}
      "
    >
      <van-grid
        :border="false"
        :column-num="1"
        class="game-b2ecdf6163952cf377f932aff4b736be"
      >
        <van-grid-item
          v-for="(data, index) in tableData.result.rows"
          :key="'app-a15836c76bf09c02a9181d1dee61315b-' + index"
          class="game-f24a222ebfb0f6b85f63749653659063"
        >
          <div class="game-237b90fb6955b98328736810edefe6e7">
            <van-row
              @click="$appPush({ path: '/game/' + data.engage.label + '/bp' })"
            >
              <van-col span="7">
                <img
                  v-lazy="data.team_1.logo"
                  width="50"
                  height="50"
                  class="game-1ab74bf7276acc5985f078fee7e63109"
                />
                <div class="app-82f6ee2b57fb59b0b7b3803164d6b9d8">
                  {{ data.team_1.name }}
                </div>
              </van-col>
              <van-col span="10">
                <span class="app-07cc694b9b3fc636710fa08b6922c42b">
                  {{ data.engage.time }}
                </span>
                <br />
                <span class="app-f4842dcb685d490e2a43212b8072a6fe">Vs</span>
              </van-col>
              <van-col span="7">
                <img
                  v-lazy="data.team_2.logo"
                  width="50"
                  height="50"
                  class="game-1ab74bf7276acc5985f078fee7e63109"
                />
                <div class="app-82f6ee2b57fb59b0b7b3803164d6b9d8">
                  {{ data.team_2.name }}
                </div>
              </van-col>
            </van-row>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="app-face1cbe136c70e1fc08cff038596944">
      <van-pagination
        v-model="paginationInfo.model"
        :total-items="tableData.result.total"
        :items-per-page="tableData.result.pageSize"
        @change="onPaginationChange"
      />
    </div>

    <AppHello height="50px" />
  </div>
</template>

<script>
export default {
  name: "gameEngage",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
  },
  data() {
    return {
      tableData: {
        result: {
          rows: [],
        },
        type: 0,
      },
      paginationInfo: {
        model: 1,
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.getGameDashboard(0);
    }, 500);
  },
  methods: {
    getGameDashboard: function (page = 0) {
      this.$axios
        .post(this.$appApi.game.getGameDashboard + "&aid=1&page=" + page)
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
    onNavBarRightClick: function (aid = 0) {
      this.$axios
        .post(this.$appApi.game.getGameBPFile + "&aid" + aid)
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.$appOpenUrl("是否下载对局记录?", null, { path: data.csv }, 0);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onPaginationChange: function (e) {
      this.getGameDashboard(e - 1);
    },
  },
};
</script>