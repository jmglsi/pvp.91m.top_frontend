<template>
  <div class="miao" :style="{ height: height + 'px' }"></div>
</template>

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