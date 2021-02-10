<template>
  <div class="app-game">
    <div
      class="game-c8d46d341bea4fd5bff866a65ff8aea9 app-4eb2044800e2b7b9e5c44d370af22b27"
    >
      <van-cell-group
        :border="false"
        title=" "
        class="game-11919d5ca20d292c64673bc807d852e2"
      >
        <van-cell
          v-for="(data, index) in tableData.result.rows"
          :key="'game-b02986e365a0828581dffc56b591ffa9-' + index"
          :border="false"
          @click="onGameCellClick(data.game.label)"
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
                  :text="data.team_1.name"
                  :icon="data.team_1.logo"
                  class="game-8641f340ea40fb261780ef0eb048239a"
                />
                <van-grid-item class="game-8641f340ea40fb261780ef0eb048239a">
                  <span class="app-07cc694b9b3fc636710fa08b6922c42b">{{
                    data.game.time
                  }}</span>
                  <span class="app-f4842dcb685d490e2a43212b8072a6fe">Vs</span>
                </van-grid-item>
                <van-grid-item
                  :text="data.team_2.name"
                  :icon="data.team_2.logo"
                  class="game-8641f340ea40fb261780ef0eb048239a"
                />
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
    getGameHome: function () {
      let appConfigInfo = this.$appGetLocalStorage("appConfigInfo"),
        ranking = this.$appGetLocalStorage("gameHome");

      if (
        ranking &&
        this.$appTs - appConfigInfo.updateInfo.time <
          appConfigInfo.updateInfo.timeout &&
        this.$appTs_H != 11 &&
        this.$appTs_H != 23
      ) {
        this.tableData = ranking;

        return;
      }

      this.$axios.post(this.$appApi.game.getGameHome).then((res) => {
        this.tableData = res.data.data;

        this.$appSetLocalStorage("gameHome", this.tableData);
      });
    },
    onGameCellClick: function (e) {
      this.$appPush({ path: "/game/" + e + "/bp" });
    },
  },
};
</script>
