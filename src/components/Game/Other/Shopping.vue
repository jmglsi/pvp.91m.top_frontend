<template>
  <div class="shopping-home">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onPullRefresh"
      class="shopping-455e49c9b0bfa3c5ec10682928f4608e"
    >
      <div class="shopping-b5a05f6e930df2c37028e41c29fc4fa5">
        <van-row>
          <van-col span="5" class="home-56677dd04cbe46e7b175e734b4ec94ef">
            <van-sidebar
              v-model="shoppingInfo.model"
              class="shopping-acc07db0e8fdce8ec786380480c4c83c"
            >
              <van-sidebar-item title="营地小铺" />
              <van-sidebar-item title="填表搜集" />
              <van-sidebar-item title="分配链接" />
              <van-sidebar-item title="小铺客服" />
            </van-sidebar>
          </van-col>

          <van-col span="19" class="home-56677dd04cbe46e7b175e734b4ec94ef">
            <div v-if="shoppingInfo.model == 0">
              <div
                class="shopping-4284623d861595aeecdd1504dbb911c0"
                v-html="shoppingInfo.html[0]"
              ></div>
            </div>

            <div v-if="shoppingInfo.model == 1">
              <div class="shopping-3cf4599bd7daaf570a6094950c69164d">
                <van-cell-group :border="false" title=" ">
                  <van-field
                    v-model="shoppingInfo.price"
                    label="保底消费"
                    placeholder="最低消费多少"
                    required
                  >
                    <template #right-icon>点券</template>
                  </van-field>
                  <van-field
                    v-model="shoppingInfo.gamePlayerName"
                    label="游戏昵称"
                    placeholder="主页复制，方便审核通过"
                    required
                  />
                  <van-field label="游戏大区" required>
                    <template #input>
                      <div class="shopping-8e6397df01734dda9ae234cef94f8081">
                        <van-radio-group
                          v-model="shoppingInfo.areaIndex"
                          direction="horizontal"
                        >
                          <van-radio
                            name="1"
                            class="app-e7cc92f4d89cae11c55145231f702389"
                          >
                            安卓 QQ
                          </van-radio>
                          <van-radio
                            name="2"
                            class="app-e7cc92f4d89cae11c55145231f702389"
                          >
                            苹果 QQ
                          </van-radio>
                          <van-radio
                            name="3"
                            class="app-e7cc92f4d89cae11c55145231f702389"
                          >
                            安卓 WX
                          </van-radio>
                          <van-radio
                            name="4"
                            class="app-e7cc92f4d89cae11c55145231f702389"
                          >
                            苹果 WX
                          </van-radio>
                        </van-radio-group>
                      </div>
                    </template>
                  </van-field>
                  <van-field
                    v-model="shoppingInfo.wechat"
                    label="微信号"
                    placeholder="以便拉您进群"
                    required
                  />
                </van-cell-group>
              </div>

              <div class="shopping-ddfd9fc43cee857f7e02c212719221c2">
                务必认真填写，保存可以更新
              </div>

              <div class="shopping-cf8410cc6b96379427bfb2b2d083fef2">
                <van-uploader :after-read="onAfterRead">
                  <van-button
                    :style="{ width: '100px' }"
                    round
                    type="danger"
                    size="mini"
                  >
                    上传资料
                  </van-button>
                </van-uploader>
                &nbsp;
                <van-button
                  :disabled="!isTimeout"
                  @click="updateShoppingInfo"
                  round
                  type="info"
                  size="mini"
                >
                  {{ intervalTitle }}
                </van-button>
              </div>
            </div>

            <div v-if="shoppingInfo.model == 2">
              <div
                class="shopping-4284623d861595aeecdd1504dbb911c0"
                v-html="shoppingInfo.html[1]"
              ></div>
            </div>

            <div v-if="shoppingInfo.model == 3">
              <div
                class="shopping-4284623d861595aeecdd1504dbb911c0"
                v-html="shoppingInfo.html[2]"
              ></div>
            </div>
          </van-col>
        </van-row>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: "gameShopping",
  data() {
    return {
      interval: 30,
      intervalTitle: "保存信息",
      isLoading: false,
      isTimeout: false,
      shoppingInfo: {
        model: 0,
        html: ["", "", ""],
        price: "",
        gamePlayerName: "",
        areaIndex: 0,
        wechat: "",
        isUpload: 0,
      },
    };
  },
  mounted() {
    this.getShoppingInfo();
  },
  methods: {
    getShoppingInfo: function () {
      this.$axios.post(this.$appApi.app.getShoppingInfo).then((res) => {
        let data = res.data.data,
          status = res.data.status;

        if (status.code == 200) {
          let nowInterval = setInterval(() => {
            this.interval--;

            if (this.interval <= 0) {
              this.isTimeout = true;
              this.intervalTitle = "保存信息";

              clearInterval(nowInterval);
            } else {
              this.intervalTitle = "保存信息 (" + this.interval + " 秒)";
            }
          }, 1000);

          this.shoppingInfo = data;
        } else {
          this.$message.error(status.msg);
        }
      });
    },
    updateShoppingInfo: function () {
      console.log(this.shoppingInfo);

      this.$axios
        .post(
          this.$appApi.app.updateShoppingInfo,
          this.$qs.stringify({
            price: this.shoppingInfo.price,
            gamePlayerName: this.shoppingInfo.gamePlayerName,
            areaIndex: this.shoppingInfo.areaIndex,
            wechat: this.shoppingInfo.wechat,
            isUpload: this.shoppingInfo.isUpload,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.shoppingInfo = data;

            this.getShoppingInfo();

            this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onPullRefresh: function () {
      setTimeout(() => {
        this.isLoading = false;

        this.getShoppingInfo();
      }, 1000 * 2.5);
    },
    onAfterRead: function (e) {
      let data = e.content;

      if (data) {
        this.shoppingInfo.isUpload = 1;

        this.$message.success(this.$appMsg.success[1000]);
      }
    },
  },
};
</script>

<style lang="less" scoped>
div.shopping-home {
  text-align: center;
}

div.shopping-4284623d861595aeecdd1504dbb911c0 {
  padding-top: 10px;
  padding-right: 10px;
}

div.shopping-cf8410cc6b96379427bfb2b2d083fef2 {
  margin-top: 25px;
}

div.shopping-ddfd9fc43cee857f7e02c212719221c2 {
  color: red;
  margin-top: 25px;
}

div.shopping-acc07db0e8fdce8ec786380480c4c83c {
  padding: 10px;
}
</style>