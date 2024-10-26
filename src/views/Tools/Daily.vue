<template>
  <div class="tools-daily">
    <div>
      <ChartsHeroLine :aid="10" />
    </div>
  </div>
</template>

<script>
export default {
  name: "toolsDaily",
  components: {
    ChartsHeroLine: () => import("@/components/Charts/HeroLine.vue"),
  },
};
</script>

<style scoped lang="less">
div.tools-daily {
  text-align: left;
}
</style>