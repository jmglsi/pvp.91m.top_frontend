<template>
  <div class="my">
    <div class="my-7dc22b2c6a992f0232345df41303f5ea">
      <van-cell-group :border="false" title="设置" class="my-058928a73f2a944d621b028eb9addd36">
        <van-field
          v-model="myKey"
          :border="false"
          clearable
          label="密钥"
          left-icon="/img/app-icons/password.png"
          right-icon="question-o"
          placeholder="请输入密钥"
          @click-right-icon="$message.info('待开发')"
          @blur="saveKey"
          class="ex-bd21190449b7e88db48fa0f580a8f666 my-7ba06fc75951168b5c44297fa2e6a607"
        />
      </van-cell-group>

      <van-cell-group :border="false" title="全局BP模拟器" class="my-058928a73f2a944d621b028eb9addd36">
        <van-cell title="管理对局" is-link to="/game/management" />
      </van-cell-group>

      <van-cell-group :border="false" title="其它" class="my-058928a73f2a944d621b028eb9addd36">
        <van-cell title="常见问题" value="自豪的使用语雀" is-link url="https://doc.91m.top/pvp" />
        <van-cell
          title="意见/建议/咨询/交友"
          value="jmglsi (苏苏)"
          is-link
          url="//wpa.qq.com/msgrd?v=3&uin=947065098&site=qq&menu=yes"
        />
      </van-cell-group>
    </div>

    <span class="app-de17f0f24b49f8364187891f8550ffbb">
      <a href="http://beian.miit.gov.cn/" target="_blank" style="color: black;">沪ICP备16031287号-2</a>
    </span>
  </div>
</template>

<style>
div.ex-bd21190449b7e88db48fa0f580a8f666 img.van-icon__image {
  margin-top: -6px;
}
</style>

<style scoped>
.my-7dc22b2c6a992f0232345df41303f5ea {
  text-align: left;
  margin-bottom: 25px;
}

.app-de17f0f24b49f8364187891f8550ffbb {
  font-size: 10px;
}
</style>

<script>
export default {
  name: "My",
  data() {
    return {
      myKey: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      let myKey = this.$cookie.get("myKey");
      if (myKey) this.myKey = myKey;
    },
    saveKey: function() {
      this.$cookie.set("key", this.myKey, { expires: "1Y" });
    }
  }
};
</script>