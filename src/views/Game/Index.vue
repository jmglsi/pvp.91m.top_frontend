<template>
  <div class="game-home">
    <router-view />
    <AppBottomTabbar />
  </div>
</template>

<style>
@import url("/css/app-style/game.css");
</style>

<script>
export default {
  name: "GameHome",
  components: {
    AppBottomTabbar: (resolve) =>
      require(["@/components/App/BottomTabbar.vue"], resolve),
  },
};
</script>
