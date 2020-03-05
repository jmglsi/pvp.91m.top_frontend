<template>
  <div class="bilibili">
    <van-search
      v-model="searchValue"
      :placeholder="tableData.searchPlaceholder"
      shape="round"
      @search="onSearch"
      @clear="onClear"
      class="app-top-search"
    />

    <van-checkbox
      v-model="checked"
      class="auto-refresh"
      @change="onCheckBoxChange"
    />

    <vxe-grid
      :loading="loading"
      :data="tableData.list"
      :height="clientHeight"
      :sort-config="{trigger: 'cell'}"
      @cell-click="onCellClick"
      class="app-table"
    >
      <vxe-table-column
        title="id"
        field="uid"
        fixed="left"
        width="100"
      ></vxe-table-column>
      <vxe-table-column
        title="#"
        type="seq"
        width="75"
      />
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
      <vxe-table-column
        title="实时数量"
        field="bz"
        :width="listWidth"
      />
      <vxe-table-column
        title="更新时间"
        field="update_time"
        sortable
        width="200"
      />
      <vxe-table-column
        title="状态"
        field="is_running"
        width="75"
      />
      <template v-slot:empty>暂无数据</template>
    </vxe-grid>

    <div class="bilibili-bottom">
      <van-pagination
        v-model="currentPage"
        :total-items="tableData.num"
        :items-per-page="tableData.page"
        @change="onPaginationChange"
      />

      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa' }">有问题请联系相关客服</van-divider>
    </div>

    <van-action-sheet
      v-model="actionSheetShow"
      :title="orderInfo.uid + ' 的其他数据'"
      safe-area-inset-bottom
      class="app-action-sheet"
    >
      <van-cell-group>
        <van-cell
          title="复制订单"
          v-clipboard:copy="copyData"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          is-link
        />
        <van-cell
          title="查看相关"
          :url="'/bilibili?from=search&uid=' + orderInfo.uid"
          is-link
        />
      </van-cell-group>
    </van-action-sheet>
  </div>
</template>

<style scoped>
.auto-refresh {
  position: absolute;
  z-index: 2;
  left: 40px;
  margin-top: 15px;
}

.bilibili-bottom {
  margin-top: 25px;
}
</style>

<script>
export default {
  name: "Bilibili",
  data () {
    return {
      checked: true,
      getOrderInterval: 0,
      searchValue: "",
      tableData: {
        searchPlaceholder: "请输入搜索关键词",
        list: []
      },
      currentPage: 1,
      listWidth: 0,
      actionSheetShow: false,
      orderInfo: {},
      clientHeight: 0,
      copyData: "",
      loading: true
    };
  },
  created () {
    const cHeight = document.documentElement.clientHeight;
    const cWidth = document.documentElement.clientWidth;

    cWidth > cHeight
      ? (this.clientHeight = cHeight - (84 + 125))
      : (this.clientHeight = cHeight - (129 + 80));

    cWidth > cHeight && cWidth >= 900
      ? (this.listWidth = 0)
      : (this.listWidth = 100);
  },
  activated () {
    /* https://cn.vuejs.org/v2/api/#activated */

    this.searchValue = "";
    let uid = this.$route.query.uid;

    if (!uid) {
      uid = "";
    } else {
      uid = decodeURIComponent(uid);
      this.searchValue = uid;
    }

    this.getOrder(uid, 1);
    this.getOrderInterval = setInterval(() => {
      if (uid) {
        this.getOrder(uid, 1);
      }
    }, 1000 * 10);
  },
  methods: {
    getOrder: function (uid, page) {
      this.axios
        .get(
          this.appApi.list.getOrder +
          "&uid=" +
          encodeURIComponent(uid) +
          "&page=" +
          page
        )
        .then(ret => {
          this.tableData = ret.data.data;
          this.loading = false;
        });
    },
    getOrderInfo: function (row) {
      this.actionSheetShow = true;
      this.orderInfo = row;

      this.axios
        .get(
          "https://s.91m.top/?url=" +
          encodeURIComponent(
            location.origin +
            location.pathname +
            "?from=copyshare&uid=" +
            encodeURIComponent(row.uid)
          )
        )
        .then(ret => {
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
            ret.data.data.url;
        });
    },
    onClear: function () {
      this.searchValue = "";
      this.tableData = [];
      clearInterval(this.getOrderInterval);
      this.getOrder("", this.currentPage);
    },
    onSearch: function () {
      if (!this.searchValue) return;
      this.getOrder(this.searchValue, this.currentPage);

      clearInterval(this.getOrderInterval);
      this.getOrderInterval = setInterval(() => {
        this.getOrder(this.searchValue, this.currentPage);
      }, 1000 * 10);
    },
    onCheckBoxChange: function (e) {
      if (e == false) {
        clearInterval(this.getOrderInterval);
      }
    },
    onPaginationChange: function (e) {
      this.getOrder(this.searchValue, e);
    },
    onCopy: function () {
      this.$message.success("复制成功");
      this.actionSheetShow = false;
    },
    onError: function () {
      this.$message.error("复制失败");
    },
    onCellClick: function ({ row }) {
      this.getOrderInfo(row, this.currentPage);
    }
  }
};
</script>