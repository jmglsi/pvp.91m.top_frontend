<template>
  <div class="admin-d6408d06252dc6f6454fa342eab75e01">
    <div class="admin-1bc7ec347bf21539b57f61784a05eba6">
      <span class="admin-ee86c7f2e154cb36ed0c1a975f28b7b0">其他：</span>
      <br />
      <van-button round type="info" size="mini" @click="getSign(3, 0, row)">
        加积分
      </van-button>
      <van-button round type="danger" size="mini" @click="getSign(3, 1, row)">
        减积分
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RobotFunction",
  props: {
    row: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    listenChange() {
      const { row } = this;
      return { row };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (!newValue.row) return;

        //
      },
    },
  },
  data() {
    return {
      tableData: {
        result: {
          rows: [],
        },
      },
    };
  },
  methods: {
    getSign: function (aid = 3, bid = 0, row = {}) {
      if (row == {}) return;

      let cid = 0,
        did = 0,
        integral = 0;

      if (bid == 0) {
        integral = prompt("【加】多少？", 100);
      } else if (bid == 1) {
        integral = prompt("【减】多少？", 100) * -1;
      }

      bid = 0;
      cid = integral || 0;

      this.$axios
        .post(
          this.$appApi.app.getSign +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&cid=" +
            cid +
            "&did=" +
            did,
          this.$qs.stringify({
            frameId: row.frameId,
            robotUin: "wx.mp",
            msgSource: row.robot,
            id: row.group,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.$message.info(data);

            setTimeout(() => {
              window.location.reload();
            }, 500);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
  },
};
</script>

<style scoped lang="less">
span.admin-ee86c7f2e154cb36ed0c1a975f28b7b0 {
  font-size: @app-font-size;
}

div.admin-1bc7ec347bf21539b57f61784a05eba6 {
  margin: 10px;
}
</style>