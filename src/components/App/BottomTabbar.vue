<template>
  <div class="miao" :style="{ height: height + 'px' }"></div>
</template>

<style scoped>
.hello {
  font-size: 10px;
}
</style>

<script>
export default {
  name: "Miao",
  props: {
    height: {
      type: Number,
      default: 50
    }
  }
};
</script>