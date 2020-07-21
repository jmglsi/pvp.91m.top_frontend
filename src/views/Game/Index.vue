<template>
  <div class="game-home">
    <router-view />
    <AppBottomTabbar />
  </div>
</template>

<style>
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