<template>
  <div class="oauth-home">
    <div class="oauth-ceb83cb85dff6aa94a65ed6cac1f563f">
      <van-divider
        :style="{
          color: '#1680d1 !important',
          borderColor: '#1680d1 !important',
          padding: '0 16px',
        }"
      >
        {{
          accessToken
            ? $t("oauth.third-party-authorization")
            : $t("oauth.sign-in-with")
        }}
      </van-divider>
    </div>

    <div class="oauth-4a62ae82084ebecb1ea7d1b7f67ef7c4">
      <ul class="oauth-fae0b4b90bcae3951a2a115697b83089">
        <li
          v-for="(data, index) in allOauthInfo"
          :key="'oauth-50855523bbe392b3bd5aad8624faa32f-' + index"
          class="oauth-d7c4aa2641b836c39a069c80c569f682"
        >
          <img
            v-lazy="$appCache + '/img/icons-login/' + data.type + '.ico'"
            :style="
              accessToken && data.status == 1 ? { filter: 'grayscale(1)' } : {}
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
  name: "userOauth",
  props: {
    openId: {
      type: String,
      default: "",
    },
    accessToken: {
      type: String,
      default: "",
    },
    redirect: {
      type: String,
      default: "",
    },
    oauthInfo: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    listenChange() {
      const { openId, accessToken, redirect, oauthInfo } = this;
      return { openId, accessToken, redirect, oauthInfo };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        let o = this.$appConfigInfo.oauthInfo,
          p = newValue.oauthInfo || [];

        this.allOauthInfo = [];
        o.map((a) => {
          this.allOauthInfo.push({
            type: a,
            status: 0,
          });
        });

        o.map((x, i) => {
          p.map((y) => {
            if (x == y) this.allOauthInfo[i].status = 1;
          });
        });
      },
    },
  },
  data() {
    return {
      allOauthInfo: [],
    };
  },
  methods: {
    onOauthClick: function (oauth) {
      let url = location;

      if (oauth.status == 0) {
        this.$appDelectAllLocalStorage();

        url.href =
          this.$appApi.login.getLogin +
          "&oauthType=" +
          oauth.type +
          "&openId=" +
          this.openId +
          "&accessToken=" +
          this.accessToken +
          "&redirect=" +
          encodeURIComponent(this.redirect) +
          "&host=" +
          encodeURIComponent(url.host);
      } else {
        this.$message.warning(this.$appMsg.warning[1010]);
      }
    },
  },
};
</script>

<style scoped lang="less">
img.oauth-523290da497b3b91d14b1699ba5b4316 {
  border-radius: unset;
}

ul.oauth-fae0b4b90bcae3951a2a115697b83089 {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  vertical-align: middle;

  li.oauth-d7c4aa2641b836c39a069c80c569f682 {
    margin: 0 8px;
    margin-bottom: 10px;
  }
}

div.oauth-home {
  margin-top: 30px;
}
</style>