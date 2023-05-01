<template>
  <div class="hero-complement app-complement">
    <vxe-table
      ref="refHeroComplement"
      :data="tableData.result.rows"
      :loading="tableData.loading"
      @cell-click="onCellClick"
      height="446"
    >
      <vxe-table-colgroup
        title="谁拉低了数据?"
        fixed="left"
        :title-prefix="{ content: $appMsg.tips[1019] }"
      >
        <vxe-table-column
          title="1"
          field="hero[0]"
          :filters="[
            { value: 1, label: '对抗路' },
            { value: 2, label: '中路' },
            { value: 3, label: '发育路' },
            { value: 4, label: '打野' },
            { value: 5, label: '游走' },
          ]"
          :filter-method="filterMethod"
          width="90"
        >
          <template #default="{ row }">
            <div :style="{ position: 'relative' }">
              <img
                v-lazy="{
                  src: '/img/icons-hero/' + row.hero[0].id + '.jpg',
                  error:
                    '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                    row.hero[0].id +
                    '/' +
                    row.hero[0].id +
                    '.jpg',
                }"
                width="25"
                height="25"
                class="app-border-radius"
              />
            </div>
          </template>
        </vxe-table-column>

        <vxe-table-column
          title="2"
          field="hero[1]"
          :filters="[
            { value: 1, label: '对抗路' },
            { value: 2, label: '中路' },
            { value: 3, label: '发育路' },
            { value: 4, label: '打野' },
            { value: 5, label: '游走' },
          ]"
          :filter-method="filterMethod"
          width="90"
        >
          <template #default="{ row }">
            <div :style="{ position: 'relative' }">
              <img
                v-lazy="{
                  src: '/img/icons-hero/' + row.hero[1].id + '.jpg',
                  error:
                    '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                    row.hero[1].id +
                    '/' +
                    row.hero[1].id +
                    '.jpg',
                }"
                width="25"
                height="25"
                class="app-border-radius"
              />
            </div>
          </template>
        </vxe-table-column>
      </vxe-table-colgroup>

      <vxe-table-column title="#" type="seq" width="50" />

      <vxe-table-column
        title="场次"
        field="pickTimes"
        :filters="[{ value: 100, checked: true }]"
        :filter-method="filterMethod"
        :width="listWidth"
        sortable
      >
        <template #filter="{ $panel, column }">
          ≥
          <input
            v-model="option.value"
            v-for="(option, index) in column.filters"
            :key="'hero-complement-3884d17acbdfbe7dd4921e00606d4e93-' + index"
            type="type"
            placeholder="0"
            @input="$panel.changeOption($event, !!option.value, option)"
            class="app-fa42596ed8c1eff3ed8b93bba913bde3"
          />
        </template>
      </vxe-table-column>

      <vxe-table-column
        title="胜率 (%)"
        field="winRate"
        :filters="[{ value: 0 }]"
        :filter-method="filterMethod"
        width="125"
        sortable
      >
        <template #filter="{ $panel, column }">
          ≥
          <input
            v-model="option.value"
            v-for="(option, index) in column.filters"
            :key="'hero-equipment-3884d17acbdfbe7dd4921e00606d4e93-' + index"
            type="type"
            placeholder="0"
            @input="$panel.changeOption($event, !!option.value, option)"
            class="app-fa42596ed8c1eff3ed8b93bba913bde3"
          />
          %
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  name: "HeroComplement",
  props: {
    complementId: {
      type: Number,
      default: 0,
    },
    complementType: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { complementId, complementType } = this;
      return { complementId, complementType };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (!newValue.complementId) return;

        if (this.$appConfigInfo.appInfo.isReadme == 1) {
          this.getRanking(
            newValue.complementId,
            17,
            newValue.complementType,
            0,
            0
          );
        }
      },
    },
  },
  data() {
    return {
      listWidth: 0,
      tableData: {
        loading: false,
        result: {
          rows: [],
        },
      },
      complementInfo: {
        type: 1,
      },
    };
  },
  created() {
    this.listWidth = this.$appInitTableWidth(750);
  },
  methods: {
    getRanking: function (heroId = 111, aid = 17, bid = 1, cid = 0, did = 0) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + heroId
        );

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.update.timeout) {
        return (this.tableData = ls);
      }

      this.tableData.loading = true;

      this.$axios
        .post(
          this.$appApi.app.getRanking +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&cid=" +
            cid +
            "&did=" +
            did +
            "&heroId=" +
            heroId
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;
            this.tableData.updateTime = ts;

            this.$appSetLocalStorage(
              "ranking-" +
                aid +
                "-" +
                bid +
                "-" +
                cid +
                "-" +
                did +
                "-" +
                heroId,
              this.tableData
            );
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    filterMethod: function ({ option, row, column }) {
      if (column.property == "hero[0]") {
        return row.hero[0].type == option.value;
      }

      if (column.property == "hero[1]") {
        return row.hero[1].type == option.value;
      }

      if (column.property == "pickTimes") {
        return row.pickTimes >= option.value;
      }

      if (column.property == "winRate") {
        return row.winRate >= option.value;
      }
    },
    onCellClick: function ({ row, column }) {
      if (column.property == "hero[0]") {
        this.complementInfo.type = 1;
        return this.getRanking(
          row.hero[0].id,
          17,
          this.complementInfo.type,
          0,
          0
        );
      }

      if (column.property == "hero[1]") {
        this.complementInfo.type = 2;
        return this.getRanking(
          row.hero[1].id,
          17,
          this.complementInfo.type,
          0,
          0
        );
      }
    },
  },
};
</script>