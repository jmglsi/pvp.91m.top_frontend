<template>
  <div class="admin-d6408d06252dc6f6454fa342eab75e01">
    <div
      v-if="row.frameId != 5000"
      class="admin-1bc7ec347bf21539b57f61784a05eba6"
    >
      <span class="admin-ee86c7f2e154cb36ed0c1a975f28b7b0">订阅列表：</span>
      <br />
      <span v-show="getRssList(row)"></span>
      <van-button
        v-for="(data, index) in tableData.result.rows"
        :key="'admin-2e18d726e34c59f679fbf74316c67b68' + index"
        :type="data.switch == 1 ? 'danger' : 'info'"
        size="mini"
        round
        @click="updateRssInfo(row, data.rssId, index)"
      >
        {{ data.rssId }}
      </van-button>
    </div>

    <div v-else class="admin-1bc7ec347bf21539b57f61784a05eba6">
      <span class="admin-ee86c7f2e154cb36ed0c1a975f28b7b0">其他：</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "robotFunction",
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

        this.getRssList(newValue.row);
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
    getRssList: function (row) {
      this.$axios
        .post(
          this.$appApi.robot.getRssList + "&aid=2",
          this.$qs.stringify({
            frameId: row.frameId,
            robotUin: row.robot,
            msgSource: row.group,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData.result.rows = data;
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    updateRssInfo: function (row, rssId, e) {
      this.$axios
        .post(
          this.$appApi.robot.getRssList + "&aid=1",
          this.$qs.stringify({
            frameId: row.frameId,
            robotUin: row.robot,
            msgSource: row.group,
            rssId: rssId,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            let rssSwitch = this.tableData.result.rows[e].switch || 0;

            rssSwitch == 1
              ? (this.tableData.result.rows[e].switch = 0)
              : (this.tableData.result.rows[e].switch = 1);

            this.$message.info(data);
          } else {
            this.$message.error(status.msg);
          }

          //resolve();
        });
      //});
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