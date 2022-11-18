<template>
  <div class="choose-a951404cf72bbe54a7fbac9cdf0908af">
    <div class="choose-f4947bf65fb55ef270296ea141e6a5b4" @click="test">
      <slot></slot>
    </div>

    <van-action-sheet v-model="showInfo.actionSheet" title="请选择英雄">
      <div @click="getHeroId" class="choose-164050dcb4e46bbf16cd81a95f499980">
        已选 125
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: "ChooseHero",
  data() {
    return {
      showInfo: {
        actionSheet: false,
      },
    };
  },
  methods: {
    getHeroId: function () {
      this.$emit("select", "125");

      this.showInfo.actionSheet = false;
    },
    test: function () {
      this.showInfo.actionSheet = true;
    },
  },
};
</script>

<style scoped>
div.choose-164050dcb4e46bbf16cd81a95f499980 {
  height: 200px;
}
</style>