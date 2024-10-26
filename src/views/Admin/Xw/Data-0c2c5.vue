<template>
  <div class="admin-xw-data">
    <!-- <div>这里是 xw-data-0c2c5</div> -->
    <div class="app-4717d11da95ed90ccdb4d4a0648bad39">
      <div class="admin-49657711d4f79ee0e5501a5c554026b8">
        <a-dropdown :trigger="['click']">
          <h1>
            <span>📒 主人，很高兴为您服务。</span>
          </h1>
        </a-dropdown>
      </div>
    </div>

    <div
      class="app-4717d11da95ed90ccdb4d4a0648bad39 admin-8e086eb841d9b5cd2f89212ac8fd0527"
    >
      <a-row>
        <a-col :span="4">
          <a-statistic title="总项目" :value="tableData.result.rows.length" />
        </a-col>
        <a-col :span="4">
          <a-statistic title="今年项目" :value="5" />
        </a-col>
        <a-col :span="4">
          <a-statistic title="当前进行" :value="1" />
        </a-col>
      </a-row>
    </div>

    <div class="admin-bfee7d52ba8fdb819662db5383073de4">
      <vxe-table
        ref="refAdminRobot"
        id="refAdminRobot"
        align="left"
        border="inner"
        :custom-config="{ storage: true }"
        :data="tableData.result.rows"
      >
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column
          width="350"
          field="project"
          title="项目名"
          show-overflow="ellipsis"
          sortable
        />
        <vxe-column
          width="200"
          field="principal"
          title="负责人"
          show-overflow="ellipsis"
          sortable
        />
        <vxe-column
          width="100"
          field="status"
          title="状态"
          show-overflow="ellipsis"
          sortable
        >
          <template #default="{ row }">
            <van-tag :color="statusInfo[row.status].color">
              {{ statusInfo[row.status].text }}
            </van-tag>
          </template>
        </vxe-column>
        <vxe-column
          width="200"
          field="addTime"
          title="添加时间"
          show-overflow="ellipsis"
          sortable
        />
        <vxe-column field="updateTime" title="更新时间" sortable></vxe-column>
      </vxe-table>

      <vxe-pager
        :current-page="1"
        :page-size="25"
        :total="tableData.result.rows.length"
        :layouts="[
          'PrevJump',
          'PrevPage',
          'NextPage',
          'NextJump',
          'Sizes',
          'FullJump',
          'Total',
        ]"
      >
      </vxe-pager>
    </div>

    <AppHello height="100px" />
  </div>
</template>

<script>
export default {
  name: "adminXwData",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
  },
  data() {
    return {
      tableData: {
        result: {
          rows: [
            {
              project: "项目1",
              principal: "负责人1",
              status: 0,
              addTime: "2024-07-01 12:00:00",
              updateTime: "2024-07-01 12:00:00",
            },
            {
              project: "项目2",
              principal: "负责人2",
              status: 1,
              addTime: "2024-07-01 12:00:00",
              updateTime: "2024-07-01 12:00:00",
            },
            {
              project: "项目3",
              principal: "负责人3",
              status: 0,
              addTime: "2024-07-01 12:00:00",
              updateTime: "2024-07-01 12:00:00",
            },
            {
              project: "项目4",
              principal: "负责人4",
              status: 2,
              addTime: "2024-07-01 12:00:00",
              updateTime: "2024-07-01 12:00:00",
            },
            {
              project: "项目5",
              principal: "负责人5",
              status: 3,
              addTime: "2024-07-01 12:00:00",
              updateTime: "2024-07-01 12:00:00",
            },
          ],
        },
      },
      statusInfo: {
        0: {
          color: "blue",
          text: "未开始",
        },
        1: {
          color: "green",
          text: "进行中",
        },
        2: {
          color: "red",
          text: "已完成",
        },
        3: {
          color: "black",
          text: "其他",
        },
      },
    };
  },
};
</script>

<style>
</style>