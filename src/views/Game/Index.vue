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
    AppBottomTabbar: (resolve) =>
      require(["@/components/App/BottomTabbar.vue"], resolve),
  },
};
</script>

<style >
img.game-1ab74bf7276acc5985f078fee7e63109 {
  border-radius: 100%;
}

div.game-237b90fb6955b98328736810edefe6e7 {
  width: 100%;
}
</style>