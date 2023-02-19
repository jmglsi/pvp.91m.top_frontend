<template>
  <div class="ranking-progress">
    <div
      :style="{
        position: 'absolute',
        marginLeft: '5px',
        marginTop: '15px',
        width: listWidth + 'px',
      }"
      class="ranking-a3fd53ec3fe479fbe3c694273f43ef64"
    >
      <van-progress
        :show-pivot="false"
        :percentage="progressData[0]"
        :style="{ position: 'absolute', width: '100%', zIndex: '2 !important' }"
        color="green"
        class="ranking-03469a1583e7d299f9416feb1358059d"
      />
      <van-progress
        :show-pivot="false"
        :percentage="progressData[0] + progressData[1]"
        :style="{ position: 'absolute', width: '100%', zIndex: '1 !important' }"
        color="orange"
      />
      <van-progress
        :show-pivot="false"
        :percentage="100"
        :style="{ position: 'absolute', width: '100%', zIndex: '0 !important' }"
        color="red"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "ChartsHeroProgress",
  props: {
    listWidth: {
      type: Number,
      default: 0,
    },
    progressData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>