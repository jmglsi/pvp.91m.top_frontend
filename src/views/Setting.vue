<template>
  <div class="setting">
    <div class="data">
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

      <van-cell-group title="友情链接" class="app-cell-group">
        <AppFriendship :aid="2" />
      </van-cell-group>
    </div>

    <span class="record">
      <a href="http://beian.miit.gov.cn/" target="_blank" style="color: black;">沪ICP备16031287号-2</a>
    </span>

    <AppBottomTabbar v-show="appDevice" />
  </div>
</template>

<style>
div.ex-icons img.van-icon__image {
  margin-top: -6px;
}
</style>

<style scoped>
.data {
  text-align: left;
  margin-bottom: 25px;
}

.record {
  font-size: 10px;
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