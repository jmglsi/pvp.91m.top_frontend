<template>
  <div class="tools-zl">
    <div class="tools-8c35b9de834af969baf22173b9539eb9">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        :left-text="$t('nav-bar.left-text')"
        @click-left="$appBack()"
        z-index="2000"
        class="tools-cf6d59913ef0046e9a11dd73ce8c8545"
      >
        <template #title>
          <span
            @click="$message.warning($appMsg.warning[1005])"
            class="tools-2de2ce7733cbb350c6aa2862912c853b"
          >
            助力
          </span>
        </template>
        <template #right>
          <span @click="getRanking(-2, 0, 0, 0)">
            <van-icon name="replay" />
          </span>
        </template>
      </van-nav-bar>
    </div>

    <div class="tools-aaa5fbf0b4fecc42e01468a7e7331cfd">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onPullRefresh"
        class="shopping-455e49c9b0bfa3c5ec10682928f4608e"
      >
        <div class="tools-31eb185c5f697eff55da431727bbc208">
          <van-grid :border="false" :gutter="10" :column-num="2">
            <van-grid-item
              v-for="(data, index) in tableData.result.rows"
              :key="'tools-02180051e706f859a515278bb4a4c0ca-' + index"
              class="tools-6b21c2d4535331d59270fc6fafc49bbe"
            >
              <template #text>
                <div>
                  <van-tag color="#666">{{ data.created_at }}</van-tag>

                  <span v-if="data.isTag">
                    &nbsp;
                    <van-tag :color="data.tagColor">
                      {{ data.tagValue }}
                    </van-tag>
                  </span>
                </div>

                <div
                  v-html="data.value"
                  class="tools-976557a5817b8cc329f662b64fcc3248"
                ></div>
                <div
                  v-if="data.getType == 'text'"
                  class="tools-031ccbebb8e69f41aaded216a32c9368"
                >
                  <span>
                    <van-button
                      round
                      :color="data.tagColor"
                      size="mini"
                      @click="onCopy(data.value)"
                    >
                      {{ data.copyValue }}
                    </van-button>
                  </span>
                </div>
              </template>
            </van-grid-item>
          </van-grid>
        </div>
      </van-pull-refresh>
    </div>

    <div class="tools-a14c7eab75f1c40e073c8e492ccdf5a4">
      该灵感由
      <span
        :style="{
          color: '#1680d1 !important',
        }"
      >
        @夏天天
      </span>
      提供
    </div>

    <AppHello height="50px" />
  </div>
</template>

<script>
export default {
  name: "toolsZhuLi",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
  },
  data() {
    return {
      isLoading: false,
      tableData: {
        loading: true,
        result: {
          rows: [],
        },
      },
    };
  },
  mounted() {
    this.getRanking();
  },
  methods: {
    getRanking: function (aid = -2, bid = 0, cid = 0, did = 0) {
      this.$axios
        .post(
          this.$appApi.app.getRanking +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&cid=" +
            cid +
            "&did=" +
            did
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;

            this.$message.success(this.$appMsg.success[1005]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onPullRefresh: function () {
      setTimeout(() => {
        this.isLoading = false;

        this.getRanking();
      }, 1000 * 2.5);
    },
    onCopy: function (text) {
      this.copyData = text;

      this.$appCopyData(this.copyData);
    },
  },
};
</script>

<style lang="less" scoped>
div.tools-zl {
  text-align: center;
}

div.tools-aaa5fbf0b4fecc42e01468a7e7331cfd {
  margin-top: 25px;
}

div.tools-a14c7eab75f1c40e073c8e492ccdf5a4 {
  margin-top: 25px;
  font-size: @app-font-size;
}

div.tools-976557a5817b8cc329f662b64fcc3248 {
  font-size: 12px;
  margin-top: 10px;
}

div.tools-031ccbebb8e69f41aaded216a32c9368 {
  margin-top: 10px;
}

div.tools-31eb185c5f697eff55da431727bbc208 {
  padding: 10px;
}
</style>