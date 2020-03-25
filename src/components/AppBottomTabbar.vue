<template>
  <div class="miao">
    <van-divider v-if="hello" :style="{color: '#969799', marginTop: '25px' }">
      <span class="hello" @click="onClick">{{ hello }}</span>
    </van-divider>
  </div>
</template>

<style scoped>
.miao {
  height: 100px;
}

.hello {
  font-size: 10px;
}
</style>

<script>
export default {
  name: "Miao",
  data() {
    return { hello: "" };
  },
  mounted() {
    /\/setting/i.test(location.pathname) && this.appDevice
      ? this.getHitokoto()
      : (this.hello = "");
  },
  methods: {
    getHitokoto: function() {
      this.axios.get(this.appApi.list.getHitokoto).then(ret => {
        this.hello = ret.data.hitokoto;
      });
    },
    onClick: function() {
      this.getHitokoto();
    }
  }
};
</script>