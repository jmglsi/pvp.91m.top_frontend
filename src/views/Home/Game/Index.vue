<template>
  <div class="game-home">
    <div class="game-c8d46d341bea4fd5bff866a65ff8aea9 grid-4eb2044800e2b7b9e5c44d370af22b27">
      <van-cell-group title="官方赛事" class="game-4feddb79ff97efc66d712eac076a675b">
        <van-cell
          v-for="(data, index) in tableData.official.result"
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
                  class="game-447b7147e84be512208dcc0995d67ebc"
                />
                <van-grid-item class="game-447b7147e84be512208dcc0995d67ebc">
                  <span class="game-07cc694b9b3fc636710fa08b6922c42b">{{ data.game.time}}</span>
                  <span class="game-f4842dcb685d490e2a43212b8072a6fe">VS</span>
                </van-grid-item>
                <van-grid-item
                  :text="data.team_2.name"
                  :icon="data.team_2.logo"
                  class="game-447b7147e84be512208dcc0995d67ebc"
                />
              </van-grid>
            </div>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group title="玩家分享" class="game-a5029583e1edb999c122d6bbd6cc10ea">
        <van-cell
          v-for="(data, index) in tableData.player.result"
          :key="'player-da72e7ff477a6dbf4430a69af9576154-' + index"
          :border="false"
          class="player-d66e27fa9d570dc118a168a899f07ba0"
          @click="onGameCellClick(data.game.label)"
        >
          <template #title>
            <van-grid :border="false" :column-num="3" class="game-557b5ba32a82f80ad96616dc118afae5">
              <van-grid-item
                :text="data.team_1.name"
                :icon="data.team_1.logo"
                class="game-447b7147e84be512208dcc0995d67ebc"
              />
              <van-grid-item class="game-447b7147e84be512208dcc0995d67ebc">
                <span class="game-07cc694b9b3fc636710fa08b6922c42b">{{ data.game.time}}</span>
                <span class="game-f4842dcb685d490e2a43212b8072a6fe">VS</span>
              </van-grid-item>
              <van-grid-item
                :text="data.team_2.name"
                :icon="data.team_2.logo"
                class="game-447b7147e84be512208dcc0995d67ebc"
              />
            </van-grid>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<style scoped>
.game-home {
  text-align: left;
}
</style>

<script>
export default {
  name: "GameHome",
  data() {
    return {
      tableData: {
        official: [],
        player: []
      }
    };
  },
  mounted() {
    this.getGameHome();
  },
  methods: {
    getGameHome() {
      this.axios.get(this.apiList.game.getGameHome).then(res => {
        this.tableData = res.data.data;
      });
    },
    onGameCellClick: function(e) {
      this.$router.push({
        path: "/game/" + e + "/bp",
        query: { from: "f34f122844890855d125cdfccd6bc973" }
      });
    }
  }
};
</script>