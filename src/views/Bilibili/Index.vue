<template>
  <div class="bilibili-home">
    <div class="bilibili-727f1cf32d65577632c02b9225ecbb67">
      <van-search
        v-model="search.value"
        :placeholder="tableData.searchPlaceholder"
        @clear="onClearInputData"
        @search="search.value ? getSearch(search.value) : null"
        shape="round"
        class="app-c1130d301aabe8d6a9d46c322fd6150a"
      />
    </div>

    <div class="bilibili-8b0f547eb9990da1c540f7f31fb437b8">
      <van-switch
        v-model="orderInfo.checked"
        @change="onSwitchChange"
        class="bilibili-a47ba339330136bcab5b4c91d5d10882"
      />
    </div>

    <div class="bilibili-7bf050eec9dadca430cb5b7c7fac4a0d">
      <vxe-grid
        ref="refBilibili"
        :isLoading="tableData.loading"
        :data="tableData.result.rows"
        :height="clientHeight"
        @cell-click="onCellClick"
      >
        <vxe-table-column title="id" field="uid" fixed="left" width="150" />

        <vxe-table-column title="#" type="seq" width="50" />

        <vxe-table-column
          title="类型"
          field="type"
          sortable
          :width="listWidth"
        />

        <vxe-table-column
          title="开始数量"
          field="start_num"
          sortable
          :width="listWidth"
        />

        <vxe-table-column
          title="目标数量"
          field="num"
          sortable
          :width="listWidth"
        />

        <vxe-table-column
          title="剩余数量"
          field="task_num"
          sortable
          :width="listWidth"
        />

        <vxe-table-column title="备注" field="bz" :width="listWidth" />

        <vxe-table-column
          title="更新时间"
          field="update_time"
          sortable
          width="200"
        />

        <vxe-table-column title="状态" field="is_running" width="75" />
      </vxe-grid>
    </div>

    <div class="bilibili-71f262d796bed1ab30e8a2d5a8ddee6f">
      <van-pagination
        v-model="paginationModel"
        :total-items="tableData.result.total"
        :items-per-page="tableData.result.pageSize"
        @change="onPaginationChange"
      />
    </div>

    <div class="bilibili-8fd741f0ce683493b1bed18a2ed32d4a">
      <van-action-sheet
        v-model="showInfo.actionSheet"
        :title="tableDataRow.uid + ' 如何操作'"
        :actions="actions"
        :close-on-click-action="true"
        @select="onActionSheetSelect"
        safe-area-inset-bottom
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "BilibiliHome",
  data() {
    return {
      copyData: "",
      search: {
        value: this.$route.query.q || "",
      },
      tableData: {
        searchPlaceholder: "请输入【视频id】,例如:bv12345",
        loading: true,
        result: {
          rows: [],
        },
        total: 200,
        pageSize: 50,
      },
      tableDataRow: {
        uid: 0,
      },
      paginationModel: 1,
      actions: [
        { name: "复制订单", value: 0 },
        { name: "查看相关", value: 1 },
      ],
      clientHeight: 0,
      listWidth: 0,
      copyAv: "",
      orderInfo: {
        checked: false,
      },
      showInfo: {
        actionSheet: false,
      },
    };
  },
  created() {
    this.clientHeight = this.$appInitTableHeight() - 50;
    this.listWidth = this.$appInitTableWidth(750);
  },
  mounted() {
    this.getRanking(this.search.value, 0);
  },
  methods: {
    getRanking: function (id, page) {
      this.$axios
        .post(
          this.$appApi.bili.getOrderInfo +
            "&id=" +
            encodeURIComponent(id) +
            "&page=" +
            page
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;

            let copyAv = this.copyAv;

            if (copyAv) {
              setTimeout(
                (copyData) => {
                  this.$appCopyData(copyData);
                },
                750,
                this.copyData
              );

              this.copyAv = null;
            }
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    getOrderInfo: function (row) {
      this.tableDataRow = row;

      this.showInfo.actionSheet = true;
    },
    onBilibiliCopy: function (row) {
      let longUrl = location.origin + location.pathname + "?q=" + row.uid;

      this.$axios
        .post(this.$appApi.s.url, {
          url: longUrl,
        })
        .then((res) => {
          let shortUrl = res.data.data.url;

          this.copyData =
            "id:" +
            row.uid +
            "\r类型:" +
            row.type +
            "\r开始:" +
            row.start_num +
            "\r目标:" +
            row.num +
            "\r剩余:" +
            row.task_num +
            "\r更新时间:" +
            row.update_time +
            "\r状态:" +
            row.is_running +
            "\r备注:" +
            row.bz +
            "\r-\r" +
            shortUrl;

          setTimeout(
            (copyData) => {
              this.$appCopyData(copyData);
            },
            750,
            this.copyData
          );
        });
    },
    onClearInputData: function () {
      this.search.value = null;
      this.tableData = [];

      clearInterval(this.getOrderInfoInterval);
    },
    getSearch: function () {
      clearInterval(this.getRankingInterval);

      this.getRanking(this.search.value, 0);
    },
    onSwitchChange: function (e) {
      if (e) {
        this.getRankingInterval = setInterval(() => {
          this.getRanking(this.search.value, this.paginationModel);
        }, 10000);

        this.$message.success(this.$appMsg.success[1000]);
      } else {
        clearInterval(this.getOrderInfoInterval);
      }
    },
    onPaginationChange: function (e) {
      this.getRanking(this.search.value, e - 1);
    },
    onCellClick: function ({ row }) {
      this.getOrderInfo(row);
    },
    onActionSheetSelect: function (item) {
      let orderInfo = this.tableDataRow;

      if (item.value == 0) {
        this.onBilibiliCopy(orderInfo);
      }

      if (item.value == 1) {
        this.search.value = orderInfo.uid;
        this.getOrderInfo(orderInfo.uid, 1);
      }
    },
  },
};
</script>

<style lang="less">
div.bilibili-a47ba339330136bcab5b4c91d5d10882 {
  left: 30px;
  position: absolute;
  z-index: 2;
}

div.bilibili-71f262d796bed1ab30e8a2d5a8ddee6f {
  margin-top: 25px;
}
</style>