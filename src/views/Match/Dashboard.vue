<template>
  <div class="match-dashboard">
    <van-nav-bar :border="false" @click-left="onClickLeft" @click-right="onClickRight">
      <van-icon name="add-o" slot="left" />
      <van-icon name="question-o" slot="right" />
    </van-nav-bar>

    <router-view />
    <AppBottomTabbar />

    <van-action-sheet
      title="如何打开"
      v-model="actionSheetShow"
      safe-area-inset-bottom
      :actions="actions"
      :close-on-click-action="true"
      @select="onSelect"
      class="app-action-sheet"
    />
  </div>
</template>

<script>
export default {
  name: "MatchDashboard",
  components: {
    AppBottomTabbar: resolve =>
      require(["@/components/AppBottomTabbar.vue"], resolve)
  },
  data() {
    return {
      actionSheetShow: false,
      actions: [
        { name: "模拟 BP", subname: "分享阵容", value: 0 },
        { name: "制作不易", subname: "请喝咖啡", value: 1 }
      ]
    };
  },
  mounted() {},
  methods: {
    onClickLeft: function() {
      this.actionSheetShow = true;
    },
    onClickRight: function() {
      this.$router.push({
        path: "/about",
        query: { type: 4 }
      });
    },
    onSelect: function(item) {
      if (item.value == 0) {
        this.$router.push({
          path: "/match/add"
        });
      }
    }
  }
};
</script>