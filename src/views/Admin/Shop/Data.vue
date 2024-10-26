<template>
  <div class="admin-shop-data">
    <!-- <div>这里是 shop-data</div> -->
    <div class="app-4717d11da95ed90ccdb4d4a0648bad39">
      <div class="admin-49657711d4f79ee0e5501a5c554026b8">
        <a-dropdown :trigger="['click']">
          <h1>
            <span>🛍️ 主人，很高兴为您服务。</span>
          </h1>
        </a-dropdown>
      </div>
    </div>

    <div
      class="app-4717d11da95ed90ccdb4d4a0648bad39 admin-8e086eb841d9b5cd2f89212ac8fd0527"
    >
      <a-row>
        <a-col :span="4" @click="onRowClick('commodity', 0)">
          <a-statistic title="商品数" :value="tableData.commodity.total" />
        </a-col>
        <a-col :span="4" @click="onRowClick('order', 1)">
          <a-statistic title="订单数" :value="tableData.order.total" />
        </a-col>
        <a-col :span="4" @click="onRowClick('nfc', 2)">
          <a-statistic title="碰一碰" :value="tableData.nfc.total" />
        </a-col>
      </a-row>
    </div>

    <div class="admin-bfee7d52ba8fdb819662db5383073de4">
      <div v-show="showInfo.type == 'commodity'">
        <vxe-table
          ref="refAdminShop"
          id="refAdminShop"
          align="left"
          border="inner"
          :custom-config="{ storage: true }"
          :data="tableData.commodity.rows"
        >
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column width="200" field="sId" title="序号" sortable />
          <vxe-column
            width="200"
            field="name"
            title="名称"
            show-overflow="ellipsis"
            sortable
          />
          <vxe-column
            width="400"
            field="description"
            title="描述"
            show-overflow="ellipsis"
            sortable
          />
          <vxe-column width="75" field="price" title="价格" sortable />
          <vxe-column field="updateTime" title="更新时间" sortable></vxe-column>
        </vxe-table>
      </div>

      <div v-show="showInfo.type == 'order'">
        <vxe-table
          ref="refAdminShop"
          id="refAdminShop"
          align="left"
          border="inner"
          :custom-config="{ storage: true }"
          :data="tableData.order.rows"
        >
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column
            width="200"
            field="sId"
            title="订单"
            show-overflow="ellipsis"
            sortable
          >
            <template #default="{ row }">
              <span>{{ row.type }}&nbsp;|&nbsp;{{ row.trade_no }}</span>
              <br />
              <span>{{ row.out_trade_no }}</span>
            </template>
          </vxe-column>
          <vxe-column
            width="175"
            field="name"
            title="名称"
            show-overflow="ellipsis"
            sortable
          >
            <template #default="{ row }">
              <span>{{ row.sId }}&nbsp;|&nbsp;{{ row.name }}</span>
            </template>
          </vxe-column>
          <vxe-column
            width="225"
            field="param"
            title="参数"
            show-overflow="ellipsis"
          />
          <vxe-column width="75" field="money" title="金额" sortable />
          <vxe-column width="75" field="trade_status" title="状态" sortable />
          <vxe-column field="addTime" title="创建时间" sortable></vxe-column>
          <vxe-column field="updateTime" title="更新时间" sortable></vxe-column>
        </vxe-table>

        <div class="app-face1cbe136c70e1fc08cff038596944">
          <van-pagination
            v-model="paginationInfo.model"
            :total-items="tableData.order.total"
            :items-per-page="tableData.order.pageSize"
            @change="onPaginationChange"
            class="hero-fe7cd4d1bf3fea9a0d921e224b3fa24c"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "adminShopData",
  data() {
    return {
      tableData: {
        commodity: {
          rows: [],
          total: 25,
          totalPage: 0,
          pageSize: 25,
        },
        order: {
          rows: [],
          total: 25,
          totalPage: 0,
          pageSize: 25,
        },
        nfc: {
          rows: [],
          total: 25,
          totalPage: 0,
          pageSize: 25,
        },
      },
      paginationInfo: {
        model: 0,
      },
      showInfo: {
        type: "commodity",
        index: 0,
      },
    };
  },
  mounted() {
    this.getDataByShopData();
    this.getSkuList(0, 0);
  },
  methods: {
    onRowClick: function (type, index) {
      this.showInfo.type = type;
      this.showInfo.index = index;

      this.getSkuList(index, 0);
    },
    getDataByShopData: function () {
      this.$axios.post(this.$appApi.app.getDataByShopData).then((res) => {
        let data = res.data.data,
          status = res.data.status;

        if (status.code == 200) {
          this.dataInfo = data;
        } else {
          this.$message.error(status.msg);
        }
      });
    },
    getSkuList: function (aid = 0, page = 0) {
      this.$axios
        .post(this.$appApi.pay.getSkuList + "&aid=" + aid + "&page=" + page)
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onPaginationChange: function (e) {
      this.getSkuList(this.showInfo.index, e - 1);
    },
  },
};
</script>
