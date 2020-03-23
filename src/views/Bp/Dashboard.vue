<template>
  <div class="bp-dashboard">
    <van-nav-bar :border="false" @click-left="onClickLeft" @click-right="onClickRight">
      <van-icon name="add-o" slot="left" />
      <van-icon name="question-o" slot="right" />
    </van-nav-bar>

    <router-view />

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
  name: "BpDashboard",
  data() {
    return {
      actionSheetShow: false,
      actions: [
        { name: "BP模拟", subname: "分享我的阵容", value: 0 },
        { name: "请我喝咖啡", subname: "制作不易", value: 1 }
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
        query: { type: 4, from: "bp-dashboard" }
      });
    },
    onSelect: function(item) {
      let from = "bp-dashboard";

      if (item.value == 0) {
        this.$router.push({
          path: "/bp/add",
          query: { from: from }
        });
      }
    }
  }
};
</script>