<template>
  <div class="game-home">
    <div class="game-c8d46d341bea4fd5bff866a65ff8aea9">
      <van-cell-group title="官方赛事">
        <van-cell
          v-for="(data, index) in gameHomeInfo.officialShareInfo.result"
          :border="false"
          :key="'official-b02986e365a0828581dffc56b591ffa9-' + index"
          @click="onGameCellClick(data.id)"
        >
          <template #title>
            <van-grid :border="false" :column-num="3">
              <van-grid-item
                :icon="data.campImg_1"
                :text="data.campName_1"
                class="game-447b7147e84be512208dcc0995d67ebc"
              />
              <van-grid-item>
                <span class="game-07cc694b9b3fc636710fa08b6922c42b">{{ data.time}}</span>
                <span class="game-f4842dcb685d490e2a43212b8072a6fe">VS</span>
                <span class="game-0ecee728bf87a4c1a02883004044dcd5">{{ data.des }}</span>
              </van-grid-item>
              <van-grid-item
                :icon="data.campImg_2"
                :text="data.campName_2"
                class="game-447b7147e84be512208dcc0995d67ebc"
              />
            </van-grid>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group title="玩家分享">
        <van-cell
          v-for="(data, index) in gameHomeInfo.playerShareInfo.result"
          :border="false"
          :key="'player-da72e7ff477a6dbf4430a69af9576154-' + index"
          @click="onGameCellClick(data.id)"
        >
          <template #title>
            <van-grid :border="false" :column-num="3">
              <van-grid-item
                :icon="data.campImg_1"
                :text="data.campName_1"
                class="game-447b7147e84be512208dcc0995d67ebc"
              />
              <van-grid-item>
                <span class="game-07cc694b9b3fc636710fa08b6922c42b">{{ data.time}}</span>
                <span class="game-f4842dcb685d490e2a43212b8072a6fe">VS</span>
                <span class="game-0ecee728bf87a4c1a02883004044dcd5">{{ data.des }}</span>
              </van-grid-item>
              <van-grid-item
                :icon="data.campImg_2"
                :text="data.campName_2"
                class="game-447b7147e84be512208dcc0995d67ebc"
              />
            </van-grid>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<style>
div.game-c8d46d341bea4fd5bff866a65ff8aea9
  div.van-grid-item__content.van-grid-item__content--center
  span.van-grid-item__text {
  font-weight: 600;
}

div.game-447b7147e84be512208dcc0995d67ebc
  i.van-icon.van-grid-item__icon
  img.van-icon__image {
  border-radius: 100%;
  width: 40px;
  height: 40px;
}
</style>

<style scoped>
.game-home {
  text-align: left;
}

.game-07cc694b9b3fc636710fa08b6922c42b {
  font-size: 12px;
}

.game-0ecee728bf87a4c1a02883004044dcd5 {
  font-size: 10px;
}

.game-f4842dcb685d490e2a43212b8072a6fe {
  color: #969799;
}
</style>

<script>
export default {
  name: "GameHome",
  data() {
    return {
      gameHomeInfo: {
        officialShareInfo: [],
        playerShareInfo: []
      }
    };
  },
  mounted() {
    this.getGameHome();
  },
  methods: {
    getGameHome() {
      this.axios.get(this.apiList.game.getGameHome).then(ret => {
        this.gameHomeInfo = ret.data.data;
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