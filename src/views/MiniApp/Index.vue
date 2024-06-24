<template>
  <div class="miniapp-index">
    <div class="miniapp-5acbc85c0ac59d5f69197b9fdb893b00">
      <van-nav-bar
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        title=" "
        z-index="2000"
        class="miniapp-cce79bfde37d3f930a50bbaed2d29135"
      />
    </div>

    <div
      class="miniapp-8d777f385d3dfec8815d20f7496026dc app-4eb2044800e2b7b9e5c44d370af22b27"
      :style="
        $appIsApple && $appConfigInfo.appInfo.pwa == 1
          ? { marginTop: '-50px' }
          : {}
      "
    >
      <div
        class="miniapp-7c8fdd065963838acab323de542586ee miniapp-c5a8ea51876ffac858c47176d08a0fff"
      >
        <van-cell-group
          :border="false"
          title="优势"
          class="miniapp-e92a4998df8669fd2f0d92b7f3d41ac5"
        >
          <van-grid
            :border="false"
            :column-num="3"
            class="miniapp-074e15e6992043a4a47e781cc3008693"
          >
            <van-grid-item
              v-for="(data, index) in miniapp.result.a"
              :key="'miniapp-0cc175b9c0f1b6a831c399e269772661-' + index"
              :icon="data.icon"
              :text="data.text"
              icon-prefix="app-b10034712510883e9d2c45b4ec90772d miniapp-dfc72e0d49207e3dd9a8244d6abf7021"
            />
          </van-grid>
        </van-cell-group>
      </div>

      <div class="miniapp-7c8fdd065963838acab323de542586ee">
        <van-cell-group
          :border="false"
          title="小程序"
          class="miniapp-b377992f355a56a90c6120fb8559de59"
        >
          <van-grid
            :border="false"
            :column-num="3"
            class="miniapp-a713c75193d032a9ea6df8a0665471eb"
          >
            <van-grid-item
              v-for="(data, index) in miniapp.result.c"
              :key="'miniapp-92eb5ffee6ae2fec3ad71c777531578f-' + index"
              :icon="data.icon"
              :text="data.text"
              :to="data.to"
              :url="data.url"
              icon-prefix="app-b10034712510883e9d2c45b4ec90772d"
            />
          </van-grid>
        </van-cell-group>
      </div>

      <div class="miniapp-7c8fdd065963838acab323de542586ee">
        <van-cell-group
          :border="false"
          title="他们都在用"
          class="miniapp-e92a4998df8669fd2f0d92b7f3d41ac5"
        >
          <van-grid
            :border="false"
            :column-num="3"
            class="miniapp-074e15e6992043a4a47e781cc3008693"
          >
            <van-grid-item
              v-for="(data, index) in cooperation"
              :key="'miniapp-0cc175b9c0f1b6a831c399e269772661-' + index"
              class="miniapp-d3e330ee22e3d913f39e291c7f1468ab"
              @click="getQrCode(data)"
            >
              <div
                :style="{
                  position: 'relative',
                }"
                class="miniapp-4db8e25cf2f70a4b5f72062871f970a7"
              >
                <img
                  v-lazy="data.icon"
                  width="50"
                  height="50"
                  class="app-border-radius"
                />
                <div class="miniapp-bb351527dd7ab2526a28e42d9e17ddf3">
                  {{ data.text }}
                </div>
              </div>
            </van-grid-item>
          </van-grid>
        </van-cell-group>
      </div>
    </div>

    <div
      class="miniapp-021a7599a708a3781fabe39f7631edfc"
      @click="
        $appPush({
          path: '/',
        })
      "
    >
      <img
        v-lazy="$appCache + '/img/icons-app/stow.png'"
        width="25"
        height="25"
      />
    </div>

    <div class="miniapp-5bce5b8f873dd260895c472435bfcdf4">
      <van-dialog v-model="showInfo.qrcode">
        <template #title>
          <div class="miniapp-faf7002d3f2741ac9bc7f60cfc4d888d">
            <img
              v-lazy="qrcodeInfo.favicon"
              width="20"
              height="20"
              class="miniapp-2259b1e5ad5ffd24b6fd4dcd1a89f19e"
            />
            扫一扫 或
            <span class="miniapp-9ad284a8297802bd67af0356d21ae35f">
              点击下方
            </span>
          </div>
        </template>
        <img
          v-lazy="qrcodeInfo.qrcode"
          width="150"
          height="150"
          class="miniapp-53eb3ce1747e8a37d3f912fab5a6f24e"
          @click="
            qrcodeInfo.url
              ? onUrlClick(qrcodeInfo)
              : $message.warning($appMsg.warning[1006])
          "
        />

        <div class="miniapp-aa79b87e9649590354fb9181f371e5bc">
          关注
          <span class="miniapp-9ad284a8297802bd67af0356d21ae35f">
            {{ qrcodeInfo.text }}
          </span>
        </div>
      </van-dialog>
    </div>

    <AppHello height="75px" />
  </div>
</template>

<script>
export default {
  name: "miniAppIndex",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
  },
  watch: {
    $route: function () {
      setTimeout(() => {
        this.initQrcode();
      }, 500);
    },
  },
  data() {
    return {
      miniapp: {
        result: {
          a: [],
          b: [],
          c: [],
        },
      },
      cooperation: [],
      qrcodeInfo: {},
      showInfo: {
        qrcode: false,
      },
    };
  },
  mounted() {
    this.getMiniAppInfo();
  },
  methods: {
    initQrcode: function () {
      let q = this.$route.query,
        index = Number(q.index || -1);

      if (index > -1) {
        this.qrcodeInfo = this.miniapp.result.b[index];
        this.showInfo.qrcode = true;
      }
    },
    shuffle: function (arr) {
      return arr.sort(() => Math.random() - 0.5);
    },
    getMiniAppInfo: function () {
      this.$axios.post(this.$appApi.app.getMiniAppInfo).then((res) => {
        let data = res.data.data,
          status = res.data.status;

        if (status.code == 200) {
          this.cooperation = data.result.b;
          this.miniapp = data;

          this.initQrcode();
        } else {
          this.$message.error(status.msg);
        }
      });
    },
    getQrCode: function (data) {
      this.qrcodeInfo = data;
      this.showInfo.qrcode = true;
    },
    onUrlClick: function (data) {
      this.$appOpenUrl(
        "是否打开" + (data.url ? "外部" : "内部") + "链接?",
        null,
        { path: data.url ? data.url : data.to },
        data.url ? 0 : 1
      );
    },
  },
};
</script>

<style lang="less">
i.miniapp-dfc72e0d49207e3dd9a8244d6abf7021 {
  img.van-icon__image {
    border-radius: unset;
  }
}

img.miniapp-53eb3ce1747e8a37d3f912fab5a6f24e,
img.miniapp-2259b1e5ad5ffd24b6fd4dcd1a89f19e {
  border-radius: unset;
}

img.miniapp-53eb3ce1747e8a37d3f912fab5a6f24e {
  margin: 25px 0;
}

img.miniapp-2259b1e5ad5ffd24b6fd4dcd1a89f19e {
  margin-top: -3px;
}

span.miniapp-9ad284a8297802bd67af0356d21ae35f {
  color: #1989fa !important;
}

div.miniapp-bb351527dd7ab2526a28e42d9e17ddf3 {
  font-size: 12px;
  margin-top: 5px;
}

div.miniapp-7c8fdd065963838acab323de542586ee {
  margin-bottom: 35px;
}

div.miniapp-c5a8ea51876ffac858c47176d08a0fff {
  div.van-cell-group__title {
    font-size: 25px;
  }
}

div.miniapp-aa79b87e9649590354fb9181f371e5bc {
  margin-bottom: 25px;
  margin-top: -15px;
}

div.miniapp-021a7599a708a3781fabe39f7631edfc {
  bottom: 35px;
  left: 0;
  margin: 0 auto;
  position: fixed;
  right: 0;
}
</style>