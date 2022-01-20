<template>
  <div class="oauth-home">
    <div class="oauth-ceb83cb85dff6aa94a65ed6cac1f563f">
      <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
        >{{ accessToken ? "第三方授权" : "第三方登录" }}</van-divider
      >
    </div>

    <div class="oauth-4a62ae82084ebecb1ea7d1b7f67ef7c4">
      <ul class="oauth-fae0b4b90bcae3951a2a115697b83089">
        <li
          v-for="(data, index) in oauthInfo"
          :key="'oauth-50855523bbe392b3bd5aad8624faa32f-' + index"
          class="oauth-d7c4aa2641b836c39a069c80c569f682"
        >
          <img
            v-lazy="'/img/app-icons/' + data.type + '.ico'"
            :style="
              accessToken && data.status == 0 ? { filter: 'grayscale(1)' } : {}
            "
            width="35"
            height="35"
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
    oauthList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  computed: {
    listenChange() {
      const { openId, accessToken, oauthList } = this;
      return { openId, accessToken, oauthList };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        newValue.oauthList.map((x) => {
          this.oauthInfo.map((y, i) => {
            if (y.type == x.type) this.oauthInfo[i].status = 1;
          });
        });
      },
    },
  },
  data() {
    return {
      oauthInfo: [
        {
          type: "qq",
          status: 0,
        },
        {
          type: "github",
          status: 0,
        },
        {
          type: "coding",
          status: 0,
        },
        {
          type: "yuque",
          status: 0,
        },
      ],
    };
  },
  methods: {
    onOauthClick: function (oauth) {
      let url = location;

      this.$appDelectAllLocalStorage();

      url.href =
        this.$appApi.login.getLogin +
        "?oauthType=" +
        oauth.type +
        "&openId=" +
        this.openId +
        "&accessToken=" +
        this.accessToken +
        "&host=" +
        url.host;
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