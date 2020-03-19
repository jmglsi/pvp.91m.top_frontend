<template>
  <div class="bp-home">
    <van-button
      @click="onClick"
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
    >
      添加对局
    </van-button>
    <br />
    <br />
    待开发
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  methods: {
    onClick: function () {
      this.$router.push({
        path: "/bp/add",
        query: { from: "bp-home" }
      });
    }
  }
}
</script>