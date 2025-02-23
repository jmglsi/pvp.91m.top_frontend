<template>
  <div class="admin-shop-data">
    <!-- <div>这里是 shop-data</div> -->
    <div class="app-4717d11da95ed90ccdb4d4a0648bad39">
      <div class="admin-49657711d4f79ee0e5501a5c554026b8">
        <a-dropdown :trigger="['click']">
          <h1>
            <span>🏬 您好，很高兴为您服务。</span>
          </h1>
        </a-dropdown>
      </div>
    </div>

    <div
      class="app-4717d11da95ed90ccdb4d4a0648bad39 admin-8e086eb841d9b5cd2f89212ac8fd0527"
    >
      <a-row>
        <a-col :span="3" @click="onRowClick('robot', 0)">
          <a-statistic title="商品数" :value="tableData[0].total" />
        </a-col>
        <a-col :span="3" @click="onRowClick('group', 1)">
          <a-statistic title="订单数" :value="tableData[1].total" />
        </a-col>
      </a-row>
    </div>

    <div class="admin-bfee7d52ba8fdb819662db5383073de4">
      <div v-show="showInfo.type == 'robot'">
        <vxe-table
          ref="refAdminShopRobot"
          id="refAdminShopRobot"
          align="left"
          border="inner"
          :custom-config="{ storage: true }"
          :data="tableData[0].rows"
        >
          <vxe-column type="seq" width="60" />
          <!--
          <vxe-column width="200" field="sId" title="序号" sortable />
          -->
          <vxe-column
            :filters="[
              { value: 1000, label: '手机' },
              { value: 2000, label: '电脑' },
              { value: 3000, label: '智能穿戴' },
              { value: 9999, label: '其他' },
            ]"
            :filter-method="onTableColumnFilterMethod"
            width="75"
            field="type.id"
            title="类型"
          >
            <template #default="{ row }">
              {{ row.type.label }}
            </template>
          </vxe-column>
          <vxe-column
            width="100"
            field="brand.name"
            title="品牌"
            show-overflow="ellipsis"
          >
            <template #default="{ row }">
              <img
                width="15"
                height="15"
                v-lazy="row.brand.img"
                class="admin-886408eeb59b2d1c9c237c3c340b7cda"
              />
              <span class="admin-9e1e499daa30b9075bb557cc3a7b0899">
                {{ row.brand.name }}
              </span>
            </template>
          </vxe-column>
          <vxe-column
            width="325"
            field="name"
            title="名称"
            show-overflow="ellipsis"
          >
            <template #default="{ row }">
              {{ row.status }}&nbsp;|&nbsp;{{ row.name }}
            </template>
          </vxe-column>
          <vxe-column
            width="150"
            field="description"
            title="描述"
            show-overflow="ellipsis"
          />
          <vxe-column width="75" field="condition" title="成色" sortable />
          <vxe-column width="75" field="price" title="价格" sortable />
          <vxe-column width="75" field="num" title="库存" sortable />
          <vxe-column field="updated_at" title="更新时间" sortable />
        </vxe-table>

        <div class="app-face1cbe136c70e1fc08cff038596944">
          <van-pagination
            v-model="paginationInfo.model"
            :total-items="tableData[0].total"
            :items-per-page="tableData[0].pageSize"
            @change="onPaginationChange"
            class="admin-44e675bf674e7760df79b8b7f2360008"
          />
        </div>
      </div>

      <div v-show="showInfo.type == 'group'">
        <vxe-table
          ref="refAdminShopGroup"
          id="refAdminShopGroup"
          align="left"
          border="inner"
          :custom-config="{ storage: true }"
          :data="tableData[1].rows"
        >
          <vxe-column type="seq" width="60" />
          <vxe-column
            width="225"
            field="sId"
            title="订单"
            show-overflow="ellipsis"
          >
            <template #default="{ row }">
              <span>{{ row.type }}&nbsp;|&nbsp;{{ row.trade_no }}</span>
              <br />
              <span>
                {{ row.trade_status }}&nbsp;|&nbsp;{{ row.out_trade_no }}
              </span>
            </template>
          </vxe-column>
          <vxe-column
            width="175"
            field="name"
            title="名称"
            show-overflow="ellipsis"
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
          <vxe-column field="created_at" title="创建时间" sortable />
          <vxe-column field="updated_at" title="更新时间" sortable />
        </vxe-table>

        <div class="app-face1cbe136c70e1fc08cff038596944">
          <van-pagination
            v-model="paginationInfo.model"
            :total-items="tableData[1].total"
            :items-per-page="tableData[1].pageSize"
            @change="onPaginationChange"
            class="admin-44e675bf674e7760df79b8b7f2360008"
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
      tableData: [
        {
          rows: [],
          total: 25,
          totalPage: 0,
          pageSize: 25,
        },
        {
          rows: [],
          total: 25,
          totalPage: 0,
          pageSize: 25,
        },
        {
          rows: [],
          total: 25,
          totalPage: 0,
          pageSize: 25,
        },
      ],
      paginationInfo: {
        model: 0,
      },
      showInfo: {
        type: "robot",
        index: 0,
      },
    };
  },
  mounted() {
    this.getAdminData(4, 0, 0);
  },
  methods: {
    onRowClick: function (type, index) {
      this.showInfo.type = type;
      this.showInfo.index = index;
    },
    onTableColumnFilterMethod: function ({ option, row, column }) {
      if (column.property == "type.id") {
        return row.type.id == option.value;
      }
    },
    getAdminData: function (aid = 4, bid = 0, page = 0) {
      this.$axios
        .post(
          this.$appApi.pay.getAdminData +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&page=" +
            page
        )
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
      this.getAdminData(4, this.showInfo.index, e - 1);
    },
  },
};
</script>
