<template>
  <div class="game-home">
    <div class="game-c8d46d341bea4fd5bff866a65ff8aea9">
      <van-cell-group title="官方赛事">
        <van-cell
          v-for="(data, index) in gameShareInfo.official.result"
          :key="'official-b02986e365a0828581dffc56b591ffa9-' + index"
          :border="false"
          @click="onGameCellClick(data.game.label)"
        >
          <template #title>
            <div class="game-a88ef988e9c52677b975726c94e54f5a">
              <van-grid :border="false" :column-num="3">
                <van-grid-item
                  :icon="data.camp_1.img"
                  :text="data.camp_1.name"
                  class="game-447b7147e84be512208dcc0995d67ebc"
                />
                <van-grid-item>
                  <span class="game-07cc694b9b3fc636710fa08b6922c42b">{{ data.game.time}}</span>
                  <span class="game-f4842dcb685d490e2a43212b8072a6fe">VS</span>
                  <span class="game-0ecee728bf87a4c1a02883004044dcd5">{{ data.game.des }}</span>
                </van-grid-item>
                <van-grid-item
                  :icon="data.camp_2.img"
                  :text="data.camp_2.name"
                  class="game-447b7147e84be512208dcc0995d67ebc"
                />
              </van-grid>
            </div>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group title="玩家分享">
        <van-cell
          v-for="(data, index) in gameShareInfo.player.result"
          :key="'player-da72e7ff477a6dbf4430a69af9576154-' + index"
          :border="false"
          @click="onGameCellClick(data.game.label)"
        >
          <template #title>
            <van-grid :border="false" :column-num="3">
              <van-grid-item
                :icon="data.camp_1.img"
                :text="data.camp_1.name"
                class="game-447b7147e84be512208dcc0995d67ebc"
              />
              <van-grid-item>
                <span class="game-07cc694b9b3fc636710fa08b6922c42b">{{ data.game.time}}</span>
                <span class="game-f4842dcb685d490e2a43212b8072a6fe">VS</span>
                <span class="game-0ecee728bf87a4c1a02883004044dcd5">{{ data.game.des }}</span>
              </van-grid-item>
              <van-grid-item
                :icon="data.camp_2.img"
                :text="data.camp_2.name"
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
      gameShareInfo: {
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
      this.axios.get(this.apiList.game.getGameHome).then(ret => {
        this.gameShareInfo = ret.data.data;
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