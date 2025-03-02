<template>
  <div class="tools-shop">
    <div class="tools-8c35b9de834af969baf22173b9539eb9">
      <van-nav-bar
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        title="小商店"
        z-index="2000"
        class="tools-cf6d59913ef0046e9a11dd73ce8c8545"
      />
    </div>

    <div>
      <van-sticky :offset-top="50">
        <van-search
          v-model="value"
          @search="getSearch"
          shape="round"
          placeholder="请输入关键词"
        />
      </van-sticky>
    </div>

    <div class="tools-24e57623bd0b6b25e223622ef9de55d2">
      <van-cell-group :border="false">
        <van-cell
          v-for="(data, index) in tableData.result.rows"
          :key="'tools-ba5156a583349f932c5e15dd3122954c-' + index"
          :icon="data.icon"
          :title="data.title"
          :label="data.label"
          :value="data.value"
          :is-link="data.isLink"
          @click="data.isLink ? onUrlClick(data) : null"
          icon-prefix="tools-e5b16c574126d406091e1dd4332de7ea"
          class="tools-c8f5a40ab85578e78e862dc947d397c3"
        />
      </van-cell-group>
    </div>

    <div>
      <van-divider>联系方式</van-divider>
      <span
        class="tools-dcfae711f8ccd006202e2fac16805cbb"
        v-html="tableData.result.html"
      ></span>
    </div>

    <AppHello height="50px" />
  </div>
</template>

<script>
export default {
  name: "toolsShop",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
  },
  data() {
    return {
      value: "",
      tableData: {
        result: {
          rows: [],
          html: "加载中",
        },
      },
    };
  },
  mounted() {
    this.getRanking();
  },
  methods: {
    getSearch: function () {
      this.getRanking(20, 0, 0, 0, this.value);
    },
    getRanking: function (aid = 20, bid = 0, cid = 0, did = 0, q = "") {
      let ts = this.$appTs;

      this.tableData.loading = true;

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
            did +
            "&q=" +
            encodeURIComponent(q)
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;
            this.tableData.updateTime = ts;
          } else {
            this.$message.error(status.msg);
          }
        });
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

<style scoped lang="less">
i.tools-e5b16c574126d406091e1dd4332de7ea {
  img.van-icon__image {
    margin-top: 3px;
  }
}

span.tools-dcfae711f8ccd006202e2fac16805cbb {
  font-size: @app-font-size;
}

div.tools-24e57623bd0b6b25e223622ef9de55d2 {
  text-align: left;
}
</style>