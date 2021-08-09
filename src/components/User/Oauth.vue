<template>
  <div class="oauth-home">
    <div class="oauth-ceb83cb85dff6aa94a65ed6cac1f563f">
      <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >
        {{ accessToken ? "第三方授权" : "第三方登录" }}
      </van-divider>
    </div>

    <div class="oauth-4a62ae82084ebecb1ea7d1b7f67ef7c4">
      <ul class="oauth-fae0b4b90bcae3951a2a115697b83089">
        <li
          v-for="(data, index) in authInfo"
          :key="'oauth-50855523bbe392b3bd5aad8624faa32f-' + index"
          class="oauth-d7c4aa2641b836c39a069c80c569f682"
        >
          <img
            width="35"
            height="35"
            v-lazy="data.img"
            class="oauth-523290da497b3b91d14b1699ba5b4316"
            @click="onOauthClick(data)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Oauth",
  props: {
    openId: {
      type: String,
      default: "",
    },
    accessToken: {
      type: String,
      default: "",
    },
  },
  computed: {
    listenChange() {
      const { openId, accessToken } = this;
      return { openId, accessToken };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (newValue.accessToken == null) return;
      },
    },
  },
  data() {
    return {
      authInfo: [
        {
          type: "qq",
          img: "/img/app-icons/qq.ico",
        },
        {
          type: "github",
          img: "/img/app-icons/github.ico",
        },
        {
          type: "coding",
          img: "/img/app-icons/coding.ico",
        },
      ],
    };
  },
  methods: {
    onOauthClick: function (oauth) {
      location.href =
        "https://api.91m.top/hero/v1/login.php?oauthType=" +
        oauth.type +
        "&host=" +
        location.host +
        "&openId=" +
        this.openId +
        "&accessToken=" +
        this.accessToken;
    },
  },
};
</script>

<style scoped lang="less">
img.oauth-523290da497b3b91d14b1699ba5b4316 {
  border-radius: unset;
}

ul.oauth-fae0b4b90bcae3951a2a115697b83089 {
  display: inline-block;
  vertical-align: middle;

  li.oauth-d7c4aa2641b836c39a069c80c569f682 {
    float: left;
    margin: 0 8px;
  }
}

div.oauth-home {
  margin-top: 30px;
}
</style>