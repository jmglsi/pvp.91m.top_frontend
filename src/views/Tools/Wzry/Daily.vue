<template>
  <div class="tools-daily">
    <div>
      <ChartsWzryHeroLine :aid="10" />
    </div>
  </div>
</template>

<script>
export default {
  name: "toolsDaily",
  components: {
    ChartsWzryHeroLine: () => import("@/components/Charts/Wzry/HeroLine.vue"),
  },
};
</script>

<style scoped lang="less">
div.tools-daily {
  text-align: left;
}
</style>