<template>
  <div class="hero-fightPower">
    <baidu-map
      class="hero-7a1bcbe98d47bf7b725ed725d779ed42"
      ak="i9piReiaYLrOQy8GzQxU54uN82NpvWgU"
      center="长沙"
      :scroll-wheel-zoom="true"
      :zoom="7"
      :min-zoom="6"
      :max-zoom="8"
    >
      <Navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></Navigation>
      <div class="hero-22d31dee10cba69e2d1de86edea86c2d">
        <i class="vxe-icon--funnel" />
      </div>
      <Geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></Geolocation>
    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import Navigation from "vue-baidu-map/components/controls/Navigation.vue";
import Geolocation from "vue-baidu-map/components/controls/Geolocation.vue";

export default {
  name: "HeroFightPower",
  components: {
    BaiduMap,
    Navigation,
    Geolocation,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
div.hero-7a1bcbe98d47bf7b725ed725d779ed42 {
  height: 100%;
  position: absolute;
  width: 100%;
}

div.hero-22d31dee10cba69e2d1de86edea86c2d {
  position: absolute;
  background-color: red;
  border-radius: 100%;
  color: white;
  height: 25px;
  right: 14px;
  top: 150px;
  width: 25px;
}
</style>