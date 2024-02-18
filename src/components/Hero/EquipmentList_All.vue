<template>
  <div class="hero-equipmentListAll app-equipmentListAll">
    <vxe-table
      ref="refHeroEquipmentListAll"
      :data="tableData.result.rows"
      :loading="tableData.loading"
      height="443"
    >
      <vxe-table-column
        title="技能"
        field="skillId"
        fixed="left"
        width="50"
        sortable
      >
        <template #default="{ row }">
          <div :style="{ position: 'relative' }">
            <img
              v-lazy="{
                //src: '/img/icons-skill/' + row.skillId + '.jpg',
                //error: '//game.gtimg.cn/images/yxzj/img201606/summoner/' + row.skillId + '.jpg',
                src: '//game.gtimg.cn/images/yxzj/img201606/summoner/' + row.skillId + '.jpg',
              }"
              width="25"
              height="25"
              class="app-border-radius"
            />
          </div>
        </template>
      </vxe-table-column>

      <vxe-table-column title="#" type="seq" width="50" />

      <vxe-table-colgroup
        title="最终结果，空的就是没出"
        :title-prefix="{ content: $appMsg.tips[1000] }"
      >
        <vxe-table-column
          v-for="(data, index) in 6"
          :key="'hero-equipment-63533b8c27ff8e8051af3dd96ed6e9be-' + index"
          :title="(index + 1).toString()"
          :field="'list[' + index + ']'"
          :width="$appIsMobile ? 60 : 0"
          sortable
        >
          <template #default="{ row }">
            <div :style="{ position: 'relative' }">
              <img
                v-if="row.list[index] > 0"
                v-lazy="{
                  //src: '/img/icons-equipment/' + row.list[index] + '.jpg',
                  //error: '//game.gtimg.cn/images/yxzj/img201606/itemimg/' + row.list[index] + '.jpg',
                  src:
                    '//game.gtimg.cn/images/yxzj/img201606/itemimg/' +
                    row.list[index] +
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

      <vxe-table-column
        title="价格"
        field="money"
        :width="listWidth"
        sortable
      />

      <vxe-table-column
        title="场次"
        field="pickTimes"
        :width="listWidth"
        sortable
      />

      <vxe-table-column
        title="胜率 (%)"
        field="winRate"
        :filters="[{ value: 0 }]"
        :filter-method="onTableColumnFilterMethod"
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

      <vxe-table-column
        title="时长"
        field="usedtime"
        :width="listWidth"
        sortable
      />

      <vxe-table-colgroup title="MVP (%)">
        <vxe-table-column
          title="胜方"
          field="mvpRate"
          :width="listWidth"
          sortable
        />
      </vxe-table-colgroup>
    </vxe-table>
  </div>
</template>

<script>
export default {
  name: "HeroEquipmentList_All",
  props: {
    heroId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { heroId } = this;
      return { heroId };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (!newValue.heroId) return;

        if (this.$appConfigInfo.appInfo.isReadme == 1) {
          this.getRanking(newValue.heroId, 6, 0, 0, 0);
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
    };
  },
  created() {
    this.listWidth = this.$appInitTableWidth(1450);
  },
  methods: {
    getRanking: function (heroId = 111, aid = 6, bid = 0, cid = 0, did = 0) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + heroId
        );

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.updateInfo.timeout) {
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
    onTableColumnFilterMethod: function ({ option, row, column }) {
      if (column.property == "winRate") {
        return row.winRate >= option.value;
      }
    },
  },
};
</script>