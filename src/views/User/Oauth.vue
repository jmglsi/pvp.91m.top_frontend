<template>
  <div class="auth-home">
    <div class="auth-ceb83cb85dff6aa94a65ed6cac1f563f">
      <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >
        其他方式
      </van-divider>
    </div>

    <div class="auth-4a62ae82084ebecb1ea7d1b7f67ef7c4">
      <span>
        <img
          width="25"
          height="25"
          v-lazy="'/img/app-icons/qq.png'"
          class="auth-523290da497b3b91d14b1699ba5b4316"
        />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Oauth",
  metaInfo() {
    return {
      script: [
        {
          src: "//connect.qq.com/qc_jssdk.js",
          type: "text/javascript",
        },
      ],
    };
  },
  methods: {
    onOauthClick: function () {
      // eslint-disable-next-line no-undef
      QC.Login.showPopup({
        appId: 101964690,
        redirectURI: "https://api.91m.top/hero/v1/login.php?type=qq",
      });
    },
  },
};
</script>

<style scoped lang="less">
img.auth-523290da497b3b91d14b1699ba5b4316 {
  border-radius: unset;
}
</style>