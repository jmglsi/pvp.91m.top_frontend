<template>
  <div class="game-home">
    <router-view />
    <AppBottomTabbar />
  </div>
</template>

<script>
export default {
  name: "GameHome",
  components: {
    AppBottomTabbar: resolve =>
      require(["@/components/App/BottomTabbar.vue"], resolve)
  }
};
</script>