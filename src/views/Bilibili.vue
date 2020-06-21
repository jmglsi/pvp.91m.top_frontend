<template>
  <div class="bilibili">
    <van-search
      v-model="searchValue"
      :placeholder="tableData.searchPlaceholder"
      @search="onSearch"
      @clear="onSearchClear"
      shape="round"
      class="app-c1130d301aabe8d6a9d46c322fd6150a"
    />

    <van-checkbox
      v-model="checked"
      class="bilibili-a47ba339330136bcab5b4c91d5d10882"
      @change="onCheckBoxChange"
    />

    <vxe-grid
      ref="bilibili-ff4a008470319a22d9cf3d14af485977"
      :loading="loading"
      :data="tableData.result"
      :height="clientHeight"
      :sort-config="{trigger: 'cell'}"
      @cell-click="onCellClick"
    >
      <vxe-table-column title="id" field="uid" fixed="left" width="125" />
      <vxe-table-column title="bv" field="bv" width="150">
        <template v-slot="{ row }">{{ av2bv(row.uid) }}</template>
      </vxe-table-column>
      <vxe-table-column title="#" type="seq" width="75" />
      <vxe-table-column title="类型" field="type" sortable :width="listWidth" />
      <vxe-table-column title="开始数量" field="start_num" sortable :width="listWidth" />
      <vxe-table-column title="目标数量" field="num" sortable :width="listWidth" />
      <vxe-table-column title="剩余数量" field="task_num" sortable :width="listWidth" />
      <vxe-table-column title="实时数量" field="bz" :width="listWidth" />
      <vxe-table-column title="更新时间" field="update_time" sortable width="200" />
      <vxe-table-column title="状态" field="is_running" width="75" />
      <template v-slot:empty>暂无数据</template>
    </vxe-grid>

    <div class="bilibili-71f262d796bed1ab30e8a2d5a8ddee6f">
      <van-pagination
        v-model="currentPage"
        :total-items="tableData.total"
        :items-per-page="tableData.pageSize"
        @change="onPaginationChange"
      />

      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa' }">有问题请联系相关客服</van-divider>
    </div>

    <van-action-sheet
      v-model="actionSheetShow"
      :title="orderInfo.uid + ' 如何打开'"
      :actions="actions"
      :close-on-click-action="true"
      safe-area-inset-bottom
      @select="onActionSheetSelect"
    />
  </div>
</template>

<style scoped>
.bilibili-a47ba339330136bcab5b4c91d5d10882 {
  position: absolute;
  z-index: 2;
  left: 55px;
  margin-top: 13px;
}

.bilibili-71f262d796bed1ab30e8a2d5a8ddee6f {
  margin-top: 25px;
}
</style>

<script>
export default {
  name: "Bilibili",
  data() {
    return {
      checked: true,
      getOrderInterval: 0,
      searchValue: "",
      tableData: {
        searchPlaceholder: "请输入搜索关键词",
        result: [],
        total: 200,
        pageSize: 50
      },
      currentPage: 1,
      listWidth: 0,
      actionSheetShow: false,
      actions: [
        { name: "复制订单", value: 0 },
        { name: "查看相关", value: 1 }
      ],
      orderInfo: {},
      clientHeight: 0,
      copyAv: "",
      copyData: "",
      loading: true
    };
  },
  created() {
    const cHeight = document.documentElement.clientHeight;
    const cWidth = document.documentElement.clientWidth;

    cWidth > cHeight
      ? (this.clientHeight = cHeight - (84 + 125))
      : (this.clientHeight = cHeight - (129 + 80));

    cWidth > cHeight && cWidth >= 900
      ? (this.listWidth = 0)
      : (this.listWidth = 100);
  },
  activated() {
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
    getOrder: function(uid, page) {
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

          if (this.copyAv) {
            this.copyDataByAv(this.copyAv);
          }
        });
    },
    copyDataByAv: function(e) {
      this.appCopyData(e);
      this.copyAv = "";
    },
    getOrderInfo: function(row) {
      this.actionSheetShow = true;
      this.orderInfo = row;

      this.axios
        .get(
          "https://s.91m.top/?url=" +
            encodeURIComponent(
              location.origin +
                location.pathname +
                "?from=71f24db02647f7d930444128c0b02003&uid=av" +
                row.uid
            )
        )
        .then(ret => {
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
            ret.data.data.url;
        });
    },
    onSearchClear: function() {
      this.searchValue = "";
      this.tableData = [];
      clearInterval(this.getOrderInterval);
      this.getOrder("", this.currentPage);
    },
    onSearch: function() {
      let searchValue = this.searchValue;
      if (!searchValue) return;

      let newValue;
      if (/[bv]{2}/i.test(searchValue.substr(0, 2))) {
        newValue = this.bv2av(searchValue);
        this.copyAv = newValue;
      } else {
        newValue = searchValue;
      }

      this.getOrder(newValue, this.currentPage);

      clearInterval(this.getOrderInterval);
      this.getOrderInterval = setInterval(() => {
        this.getOrder(newValue, this.currentPage);
      }, 1000 * 10);
    },
    onCheckBoxChange: function(e) {
      if (e == false) {
        clearInterval(this.getOrderInterval);
      }
    },
    onPaginationChange: function(e) {
      this.getOrder(this.searchValue, e);
    },
    onCellClick: function({ row }) {
      this.getOrderInfo(row, this.currentPage);
    },
    onActionSheetSelect: function(item) {
      let orderInfo = this.orderInfo;

      if (item.value == 0) {
        this.appCopyData(this.copyData);
      }

      if (item.value == 1) {
        this.searchValue = orderInfo.uid;
        this.getOrder(orderInfo.uid, 1);
      }
    }
  }
};
</script>