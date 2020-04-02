<template>
  <div class="setting">
    <van-cell-group title="功能">
      <van-cell
        title="全局BP模拟器"
        icon="cluster-o"
        :to="{ path: '/match', query: { from: 'setting' } }"
        is-link
      />
    </van-cell-group>

    <van-cell-group title="其它">
      <van-field
        v-model="key"
        clearable
        label="密钥"
        left-icon="/img/app-icons/password.png"
        right-icon="question-o"
        placeholder="请输入密钥"
        @click-right-icon="$message.info('待开发')"
        @blur="saveKey"
        class="ex-icons"
      />
      <van-switch-cell v-model="particlesSwitch" icon="photo-o" title="粒子背景" @change="onChange" />
    </van-cell-group>

    <van-cell-group title="友情链接">
      <AppFriendship :aid="2" />
    </van-cell-group>

    <AppBottomTabbar v-show="appDevice" />
  </div>
</template>

<style>
div.ex-icons img.van-icon__image {
  margin-top: -6px;
}
</style>

<style scoped>
.setting {
  text-align: left;
}
</style>

<script>
export default {
  name: "Setting",
  components: {
    AppBottomTabbar: resolve =>
      require(["@/components/AppBottomTabbar.vue"], resolve),
    AppFriendship: resolve =>
      require(["@/components/AppFriendship.vue"], resolve)
  },
  data() {
    return {
      key: "",
      particlesSwitch: true
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      this.$cookie.get("lz-bg") == "true"
        ? (this.particlesSwitch = true)
        : (this.particlesSwitch = false);

      let key = this.$cookie.get("key");
      if (key) this.key = key;
    },
    saveKey: function() {
      this.$cookie.set("key", this.key, { expires: "1Y" });
    },
    onChange: function(e) {
      this.$cookie.set("lz-bg", e, { expires: "1Y" });
    }
  }
};
</script>