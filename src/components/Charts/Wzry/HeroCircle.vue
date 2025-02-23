<template>
  <div class="ranking-circle">
    <div class="ranking-b4f7c7e8fa453e4f092e63945c548a2f">
      <van-circle
        v-model="currentRate[0]"
        :rate="extraList[0] * 0.25"
        :clockwise="false"
        :style="{
          zIndex: '2 !important',
        }"
        size="60px"
        color="green"
      />
    </div>
    <div class="ranking-b4f7c7e8fa453e4f092e63945c548a2f">
      <van-circle
        v-model="currentRate[1]"
        :rate="(extraList[0] + extraList[1]) * 0.25"
        :clockwise="false"
        :style="{
          zIndex: '1 !important',
        }"
        size="60px"
        color="orange"
      />
    </div>
    <div class="ranking-b4f7c7e8fa453e4f092e63945c548a2f">
      <van-circle
        v-model="currentRate[2]"
        :rate="25"
        :clockwise="false"
        :style="{
          zIndex: '0 !important',
        }"
        size="60px"
        color="red"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "chartsHeroCircle",
  props: {
    extraList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      currentRate: [0, 0, 0],
    };
  },
};
</script>

<style scoped lang="less">
div.ranking-b4f7c7e8fa453e4f092e63945c548a2f {
  margin-left: -6px;
  margin-top: -6px;
  position: absolute;
}
</style>