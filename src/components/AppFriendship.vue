<template>
  <div class="friendship">
    <van-grid :border="false" :column-num="3">
      <van-grid-item
        v-for="(data, index) in setting.friendship"
        :key="index + '-friendship-1'"
        :icon="data.icon"
        :text="data.text"
        :url="data.url"
        class="link-item"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "Friendship",
  props: {
    aid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      setting: {}
    };
  },
  mounted() {
    this.getFriendship(this.aid);
  },
  methods: {
    getFriendship: function(e) {
      this.axios.get(this.appApi.list.getFriendship + "&aid=" + e).then(ret => {
        this.setting = ret.data.data;
      });
    }
  }
};
</script>