<template>
  <div class="bp-dashboard">
    <van-nav-bar
      :border="false"
      @click-right="onClickRight"
    >
      <van-icon
        name="question-o"
        slot="right"
      />
    </van-nav-bar>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "BpDashboard",
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    onClickRight: function () {
      this.$router.push({
        path: "/about",
        query: { type: 4, from: "bpdashboard" }
      });
    }
  }
}
</script>