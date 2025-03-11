<template>
  <div class="hero-more-a0334c9af0143099ea1321f71e3cf4fe">
    <van-tabs v-model="extraInfo.model">
      <van-tab title="趋势图">
        <div class="hero-more-573d2513dcc46a2d2d505fb0d41ccda8">
          <van-button
            round
            type="danger"
            size="small"
            @click="$appPush({ path: '/hero/' + extraId + '/info' })"
          >
            更多趋势
          </van-button>
        </div>
      </van-tab>
      <van-tab title="热力图">
        <div class="hero-more-573d2513dcc46a2d2d505fb0d41ccda8">
          <!--
          <video-player
            ref="videoPlayer"
            :options="{
              sources: [
                {
                  type: 'video/avi',
                  src: '',
                },
              ],
            }"
          ></video-player>
          -->
          <van-button round size="small">尽情期待</van-button>
        </div>
      </van-tab>
      <van-tab disabled title="待定"></van-tab>
    </van-tabs>
  </div>
</template>


<script>
//import { videoPlayer } from "vue-video-player";
//import "video.js/dist/video-js.css";

export default {
  name: "heroMore",
  components: {
    //videoPlayer,
    //ChartsWzryHeroLine: () => import("@/components/Charts/Wzry/HeroLine.vue"),
  },
  props: {
    extraId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { extraId } = this;
      return { extraId };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (!newValue.extraId) return;
      },
    },
  },
  data() {
    return {
      extraInfo: {
        model: 0,
      },
    };
  },
};
</script>

<style lang="less" scoped>
div.hero-more-573d2513dcc46a2d2d505fb0d41ccda8 {
  margin: 25px;
}
</style>