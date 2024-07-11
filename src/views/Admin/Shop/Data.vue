<template>
  <div class="admin-shop-data">
    <!-- <div>这里是 shop-data</div> -->
    <div class="app-4717d11da95ed90ccdb4d4a0648bad39">
      <div class="admin-49657711d4f79ee0e5501a5c554026b8">
        <a-dropdown :trigger="['click']">
          <h1>
            <span>🛍️ 管理员，很高兴为您服务。</span>
          </h1>
        </a-dropdown>
      </div>
    </div>

    <div
      class="app-4717d11da95ed90ccdb4d4a0648bad39 admin-8e086eb841d9b5cd2f89212ac8fd0527"
    >
      <a-row>
        <a-col :span="4">
          <a-statistic title="商品数" :value="tableData.result.rows.length" />
        </a-col>
      </a-row>
    </div>

    <div class="admin-bfee7d52ba8fdb819662db5383073de4">
      <vxe-table
        ref="refAdminRobot"
        align="left"
        border="inner"
        :data="tableData.result.rows"
      >
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column width="200" field="sId" title="sId" sortable />
        <vxe-column width="200" field="name" title="名称" sortable />
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
  </div>
</template>

<script>
export default {
  name: "adminShopData",
  data() {
    return {
      tableData: {
        result: {
          rows: [],
        },
      },
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    getSkuList: function () {
      this.$axios.post(this.$appApi.pay.getSkuList).then((res) => {
        let data = res.data.data,
          status = res.data.status;

        if (status.code == 200) {
          this.tableData.result.rows = data;
        } else {
          this.$message.error(status.msg);
        }
      });
    },
  },
};
</script>
