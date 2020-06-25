<template>
  <div class="game-home">
    <router-view />
    <AppBottomTabbar />
  </div>
</template>

<style>
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
  components: {
    AppBottomTabbar: resolve =>
      require(["@/components/App/BottomTabbar.vue"], resolve)
  }
};
</script>