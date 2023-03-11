<template>
  <div class="admin-system-assignment">
    <!-- <div>这里是 system-assignment</div> -->
    <div class="app-4717d11da95ed90ccdb4d4a0648bad39">
      <div class="admin-49657711d4f79ee0e5501a5c554026b8">
        <a-dropdown :trigger="['click']">
          <h1>📒 正在执行以下任务。</h1>
          <template #overlay>
            <a-menu :style="{ textAlign: 'left', width: '100px' }">
              <a-sub-menu key="web" title="网站">
                <a-menu-item>首页 (轮播)</a-menu-item>
                <a-menu-item>首页 (龙珠)</a-menu-item>
                <a-menu-item>导航 (置底)</a-menu-item>
                <a-menu-item>搜索 (中间)</a-menu-item>
                <a-menu-item>弹窗 (右上)</a-menu-item>
                <a-menu-item>接口 (参数)</a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="robot" title="机器人">
                <a-menu-item>信息 (置底)</a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="mp" title="公众号">
                <a-menu-item>信息 (置底)</a-menu-item>
              </a-sub-menu>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>

    <div class="admin-80a85e28540b6b4149d1577c4d90bb92">
      <a-table :columns="columns" :dataSource="dataSource" />
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminSystemAssignment",
  data() {
    return {
      dataSource: [
        {
          key: "1",
          name: "这里是任务名...",
          type: "网站-首页 (轮播) | 10000",
          tag: ["系统"],
          startTime: "2023-02-26 14:05:03",
          endTime: "永久",
          function: "操作",
        },
        {
          key: "2",
          name: "这里是任务名...",
          type: "网站-首页 (龙珠) | 10001",
          tag: ["系统"],
          startTime: "2023-02-26 14:05:03",
          endTime: "永久",
          function: "操作",
        },
        {
          key: "3",
          name: "这里是任务名...",
          type: "网站-导航 (置底) | 10002",
          tag: ["系统"],
          startTime: "2023-02-26 14:05:03",
          endTime: "永久",
          function: "操作",
        },
        {
          key: "4",
          name: "这里是任务名...",
          type: "网站-搜索 (中间) | 10003",
          tag: ["系统"],
          startTime: "2023-02-26 14:05:03",
          endTime: "永久",
          function: "操作",
        },
        {
          key: "5",
          name: "这里是任务名...",
          type: "网站-弹窗 (右上) | 10004",
          tag: ["系统"],
          startTime: "2023-02-26 14:05:03",
          endTime: "永久",
          function: "操作",
        },
        {
          key: "6",
          name: "这里是任务名...",
          type: "网站-接口 (参数) | 10005",
          tag: ["系统"],
          startTime: "2023-02-26 14:05:03",
          endTime: "永久",
          function: "操作",
        },
        {
          key: "7",
          name: "这里是任务名...",
          type: "机器人-信息 (置底) | 20000",
          tag: ["系统"],
          startTime: "2023-02-26 14:05:03",
          endTime: "永久",
          function: "操作",
        },
        {
          key: "8",
          name: "这里是任务名...",
          type: "公众号-信息 (置底) | 30000",
          tag: ["系统"],
          startTime: "2023-02-26 14:05:03",
          endTime: "永久",
          function: "操作",
        },
        {
          key: "7",
          name: "这里是任务名...",
          type: "机器人-信息 (置底) | 20000",
          tag: ["系统"],
          startTime: "2023-02-26 14:05:03",
          endTime: "永久",
          function: "操作",
        },
        {
          key: "8",
          name: "这里是任务名...",
          type: "公众号-信息 (置底) | 30000",
          tag: ["系统"],
          startTime: "2023-02-26 14:05:03",
          endTime: "永久",
          function: "操作",
        },
        {
          key: "7",
          name: "这里是任务名...",
          type: "机器人-信息 (置底) | 20000",
          tag: ["系统"],
          startTime: "2023-02-26 14:05:03",
          endTime: "永久",
          function: "操作",
        },
        {
          key: "8",
          name: "这里是任务名...",
          type: "公众号-信息 (置底) | 30000",
          tag: ["系统"],
          startTime: "2023-02-26 14:05:03",
          endTime: "永久",
          function: "操作",
        },
      ],
      columns: [
        {
          title: "任务",
          dataIndex: "name",
          key: "name",
          slots: {
            title: "customName",
            customRender: "name",
          },
        },
        {
          title: "类型",
          dataIndex: "type",
          key: "type",
        },
        {
          title: "Tag",
          dataIndex: "tag",
          key: "tag",
        },
        {
          title: "开始时间",
          dataIndex: "startTime",
          key: "startTime",
        },
        {
          title: "结束时间",
          dataIndex: "endTime",
          key: "endTime",
        },
        {
          title: "功能",
          dataIndex: "function",
          key: "function",
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="less">
div.admin-49657711d4f79ee0e5501a5c554026b8 {
  text-align: @app-text-align;
}

div.admin-80a85e28540b6b4149d1577c4d90bb92 {
  border-radius: 10px;
  overflow: hidden;
}
</style>