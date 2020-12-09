<template>
  <div class="bilibili-home">
    <div class="bilibili-727f1cf32d65577632c02b9225ecbb67">
      <van-search
        v-model="search.value"
        :placeholder="tableData.searchPlaceholder"
        @search="onSearch"
        @clear="onSearchClear"
        shape="round"
        class="app-c1130d301aabe8d6a9d46c322fd6150a"
      />
    </div>

    <div class="bilibili-8b0f547eb9990da1c540f7f31fb437b8">
      <van-checkbox
        v-model="checkModel"
        class="bilibili-a47ba339330136bcab5b4c91d5d10882"
        @change="onCheckBoxChange"
      />
    </div>

    <div class="bilibili-7bf050eec9dadca430cb5b7c7fac4a0d">
      <vxe-grid
        :isLoading="isLoading"
        :data="tableData.result.rows"
        :height="clientHeight"
        :sort-config="{ trigger: 'cell' }"
        @cell-click="onCellClick"
      >
        <vxe-table-column title="id" field="uid" fixed="left" width="125" />
        <vxe-table-column title="bv" field="bv" width="150">
          <template v-slot="{ row }">{{ av2bv(row.uid) }}</template>
        </vxe-table-column>
        <vxe-table-column title="#" type="seq" width="75" />
        <vxe-table-column title="类型" field="type" sortable :width="listWidth" />
        <vxe-table-column
          title="开始数量"
          field="start_num"
          sortable
          :width="listWidth"
        />
        <vxe-table-column title="目标数量" field="num" sortable :width="listWidth" />
        <vxe-table-column title="剩余数量" field="task_num" sortable :width="listWidth" />
        <vxe-table-column title="实时数量" field="bz" :width="listWidth" />
        <vxe-table-column title="更新时间" field="update_time" sortable width="200" />
        <vxe-table-column title="状态" field="is_running" width="75" />
        <template v-slot:empty>暂无数据</template>
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
        :title="tableData.row.uid + ' 如何操作'"
        :actions="actions"
        :close-on-click-action="true"
        safe-area-inset-bottom
        @select="onActionSheetSelect"
      />
    </div>
  </div>
</template>

<style>
@import url("/css/app-style/bilibili.css");
</style>

<script>
export default {
  name: "BilibiliHome",
  data() {
    return {
      getOrderInfoInterval: 0,
      search: {
        value: "",
      },
      tableData: {
        searchPlaceholder: "请输入【视频id】,例如:bv12345",
        loading: true,
        result: [],
        total: 200,
        pageSize: 50,
        row: {
          uid: 0,
        },
      },
      paginationModel: 1,
      listWidth: 0,
      showInfo: {
        actionSheet: false,
      },
      actions: [
        { name: "复制订单", value: 0 },
        { name: "查看相关", value: 1 },
      ],
      clientHeight: 0,
      copyAv: "",
      copyData: "",
      checkModel: false,
    };
  },
  created() {
    this.initAppTable();
    this.initBiliBiliTable();
  },
  mounted() {
    let uid = this.$route.query.uid;

    !uid ? (this.search.value = "") : (this.search.value = uid);

    this.getOrderInfoInterval = setInterval(() => {
      this.getOrderInfo(this.search.value, this.paginationModel);
    }, 1000 * 10);
  },
  methods: {
    initBiliBiliTable: function () {
      this.appDevice ? (this.listWidth = 100) : (this.listWidth = 0);
    },
    getOrderInfo: function (uid, page) {
      this.axios
        .get(
          this.apiList.bili.getOrderInfo +
            "&uid=" +
            encodeURIComponent(uid) +
            "&page=" +
            page
        )
        .then((res) => {
          this.tableData = res.data.data;
          this.tableData.loading = false;
          this.tableData.row = {
            uid: 0,
          };

          let copyAv = this.copyAv;

          if (copyAv) {
            this.copyDataByAv(copyAv);
          }
        });
    },
    copyDataByAv: function (e) {
      this.appCopyData(e);
      this.copyAv = "";
    },
    onBilibiliActionSheetClick: function (row) {
      this.tableData.row = row;

      this.axios
        .get(
          "//s.91m.top/?url=" +
            encodeURIComponent(location.origin + location.pathname + "?uid=" + row.uid)
        )
        .then((res) => {
          this.copyData =
            "id:" +
            row.uid +
            "(" +
            this.av2bv(row.uid) +
            ")" +
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
            res.data.data.url;
        });

      this.showInfo.actionSheet = true;
    },
    onSearchClear: function () {
      this.search.value = "";
      this.tableData = [];
      clearInterval(this.getOrderInfoInterval);
    },
    onSearch: function () {
      clearInterval(this.getOrderInfoInterval);

      let searchValue = this.search.value;
      if (!searchValue) return;

      let newValue;

      if (/[bv]{2}/i.test(searchValue.substr(0, 2))) {
        newValue = this.bv2av(searchValue);
        this.copyAv = newValue;
      }

      this.getOrderInfo(this.search.value, this.paginationModel);
    },
    onCheckBoxChange: function (e) {
      if (e == true) {
        this.getOrderInfoInterval = setInterval(() => {
          this.getOrderInfo(this.search.value, this.paginationModel);
        }, 1000 * 10);
      } else {
        clearInterval(this.getOrderInfoInterval);
      }
    },
    onPaginationChange: function (e) {
      this.getOrderInfo(this.search.value, e);
    },
    onCellClick: function ({ row }) {
      this.onBilibiliActionSheetClick(row);
    },
    onActionSheetSelect: function (item) {
      let orderInfo = this.tableData.row;

      if (item.value == 0) {
        this.appCopyData(this.copyData);
      }

      if (item.value == 1) {
        this.search.value = orderInfo.uid;
        this.getOrderInfo(orderInfo.uid, 1);
      }
    },
  },
};
</script>
