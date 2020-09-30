<template>
  <div class="app-game">
    <div
      class="game-c8d46d341bea4fd5bff866a65ff8aea9 grid-4eb2044800e2b7b9e5c44d370af22b27"
    >
      <van-cell-group
        :border="false"
        title=" "
        class="game-11919d5ca20d292c64673bc807d852e2"
      >
        <van-cell
          v-for="(data, index) in tableData.result"
          :key="'official-b02986e365a0828581dffc56b591ffa9-' + index"
          :border="false"
          class="official-ed4838a6d4554b1829c7f86a58e3f20f"
          @click="onGameCellClick(data.game.label)"
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
                  <span class="game-07cc694b9b3fc636710fa08b6922c42b">{{
                    data.game.time
                  }}</span>
                  <span class="game-f4842dcb685d490e2a43212b8072a6fe">Vs</span>
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
        result: [],
      },
    };
  },
  mounted() {
    this.getGameHome();
  },
  methods: {
    getGameHome() {
      this.axios.get(this.apiList.game.getGameHome).then((res) => {
        this.tableData = res.data.data;
      });
    },
    onGameCellClick: function (e) {
      this.appPush("/game/" + e + "/bp");
    },
  },
};
</script>