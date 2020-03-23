<template>
  <div class="setting">
    <van-cell-group title="功能">
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
      <van-cell
        title="全局BP模拟器"
        icon="cluster-o"
        :to="{ path: '/match', query: { from: 'setting' } }"
        is-link
      />
    </van-cell-group>

    <van-cell-group title="其它">
      <van-switch-cell v-model="particlesSwitch" icon="photo-o" title="粒子背景" @change="onChange" />
    </van-cell-group>

    <van-cell-group title="友情链接">
      <van-grid :border="false">
        <van-grid-item
          v-for="(data, index) in setting.friendship"
          :key="index + '-friendship'"
          :icon="data.icon"
          :text="data.text"
          :url="data.url"
          class="link-item"
        />
      </van-grid>
    </van-cell-group>

    <AppBottomTabbar v-show="appDevice" />
  </div>
</template>

<style>
div.ex-icons img.van-icon__image {
  margin-top: -6px;
}

i.van-icon.van-grid-item__icon img.van-icon__image {
  border-radius: 100%;
  width: 40px;
  height: 40px;
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
      require(["@/components/AppBottomTabbar.vue"], resolve)
  },
  data() {
    return {
      key: "",
      particlesSwitch: true,
      setting: {}
    };
  },
  mounted() {
    this.init();
    this.getSetting();
  },
  methods: {
    init: function() {
      this.$cookie.get("bg-lz") == "true"
        ? (this.particlesSwitch = true)
        : (this.particlesSwitch = false);

      let key = this.$cookie.get("key");
      if (key) this.key = key;
    },
    getSetting: function() {
      this.axios.get(this.appApi.list.getSetting).then(ret => {
        this.setting = ret.data.data;
      });
    },
    saveKey: function() {
      this.$cookie.set("key", this.key, { expires: "1Y" });
    },
    onChange: function(e) {
      this.$cookie.set("bg-lz", e, { expires: "1Y" });
    }
  }
};
</script>