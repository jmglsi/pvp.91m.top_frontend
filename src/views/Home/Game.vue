<template>
  <div class="app-game">
    <div
      class="game-c8d46d341bea4fd5bff866a65ff8aea9 app-4eb2044800e2b7b9e5c44d370af22b27"
    >
      <van-cell-group
        :border="false"
        class="game-11919d5ca20d292c64673bc807d852e2"
      >
        <van-cell
          v-for="(data, index) in tableData.result.rows"
          :key="'game-b02986e365a0828581dffc56b591ffa9-' + index"
          :border="false"
          @click="$appPush({ path: '/game/' + data.game.label + '/bp' })"
          class="game-ed4838a6d4554b1829c7f86a58e3f20f"
        >
          <template #title>
            <div class="game-a88ef988e9c52677b975726c94e54f5a">
              <van-grid
                :border="false"
                :column-num="3"
                class="game-987e845860b29a0bb6ca902ba902b4f2"
              >
                <van-grid-item
                  icon-prefix="app-b10034712510883e9d2c45b4ec90772d"
                >
                  <template #icon>
                    <img
                      v-lazy="data.team_1.logo"
                      width="50"
                      height="50"
                      class="game-1ab74bf7276acc5985f078fee7e63109"
                    />
                  </template>
                  <template #text>
                    <div class="app-82f6ee2b57fb59b0b7b3803164d6b9d8">
                      {{ data.team_1.name }}
                    </div>
                  </template>
                </van-grid-item>
                <van-grid-item>
                  <span class="app-07cc694b9b3fc636710fa08b6922c42b">
                    {{ data.game.time }}
                  </span>
                  <span class="app-f4842dcb685d490e2a43212b8072a6fe">Vs</span>
                </van-grid-item>
                <van-grid-item
                  icon-prefix="app-b10034712510883e9d2c45b4ec90772d"
                >
                  <template #icon>
                    <img
                      v-lazy="data.team_2.logo"
                      width="50"
                      height="50"
                      class="game-1ab74bf7276acc5985f078fee7e63109"
                    />
                  </template>
                  <template #text>
                    <div class="app-82f6ee2b57fb59b0b7b3803164d6b9d8">
                      {{ data.team_2.name }}
                    </div>
                  </template>
                </van-grid-item>
              </van-grid>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameHome",
  data() {
    return {
      tableData: {
        result: {
          rows: [],
        },
      },
    };
  },
  mounted() {
    this.getGameHome();
  },
  methods: {
    getGameHome: function (aid = 0) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage("gameHome");

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.update.timeout) {
        return (this.tableData = ls);
      }

      this.$axios
        .post(this.$appApi.game.getGameHome + "&aid=" + aid)
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.updateTime = ts;

            this.$appSetLocalStorage("gameHome", this.tableData);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
  },
};
</script>