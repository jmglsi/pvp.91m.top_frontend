<template>
  <div class="hero-equipmentListOne">
    <vxe-grid
      ref="heroEquipmentListOne"
      auto-resize
      :data="tableData.result.rows"
      :sort-config="{ trigger: 'cell' }"
      @cell-click="onCellClick"
      height="547"
    >
      <vxe-table-column
        title="英雄"
        field="heroId"
        fixed="left"
        width="50"
        sortable
      >
        <template v-slot="{ row }">
          <img
            v-if="row.heroId > 0"
            v-lazy="
              '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
              row.heroId +
              '/' +
              row.heroId +
              '.jpg'
            "
            width="25"
            height="25"
            class="hero-77f7a84f403e0f3c0366160c890e42c9"
          />
        </template>
      </vxe-table-column>

      <vxe-table-column
        title="装备"
        field="equipmentId"
        fixed="left"
        width="50"
        sortable
      >
        <template v-slot="{ row }">
          <img
            v-if="row.equipmentId > 0"
            v-lazy="
              '//image.ttwz.qq.com/h5/images/bangbang/mobile/wzry/equip/' +
              row.equipmentId +
              '.png'
            "
            width="25"
            height="25"
            class="hero-785aadb8cf1105bafaef41fd3e44a292"
          />
        </template>
      </vxe-table-column>

      <vxe-table-column title="#" type="seq" width="50" />

      <vxe-table-column title="全部">
        <vxe-table-column
          title="场次"
          field="allPickTimes"
          :filters="[{ data: 0 }]"
          :filter-method="filterMethod"
          width="100"
          sortable
        >
          <template v-slot:filter="{ $panel, column }">
            ≥
            <input
              v-model="option.data"
              v-for="(option, index) in column.filters"
              :key="'hero-equipment-92423e1b31d3e7fdac76d2ac26c45699-' + index"
              type="type"
              placeholder="0"
              @input="$panel.changeOption($event, !!option.data, option)"
              class="app-fa42596ed8c1eff3ed8b93bba913bde3 hero-dcbe629f0402b28b010742b30efe8bdf"
            />
          </template>
        </vxe-table-column>

        <vxe-table-column
          title="胜率 (%)"
          field="allWinRate"
          :filters="[{ data: 45, checked: true }]"
          :filter-method="filterMethod"
          width="125"
          sortable
        >
          <template v-slot:filter="{ $panel, column }">
            ≥
            <input
              v-model="option.data"
              v-for="(option, index) in column.filters"
              :key="'hero-equipment-92089e17c1e005ddc0336c65dfa6b63b-' + index"
              type="type"
              placeholder="0"
              @input="$panel.changeOption($event, !!option.data, option)"
              class="app-fa42596ed8c1eff3ed8b93bba913bde3"
            />
            %
          </template>
        </vxe-table-column>
      </vxe-table-column>

      <vxe-table-column
        v-for="(data, index) in 6"
        :key="'hero-equipment-5306afd97611c2ddc21400d0fcd9139c-' + index"
        :title="'格子_' + (index + 1).toString() + ' (%)'"
      >
        <vxe-table-column
          title="出场"
          :field="'allPickRate_' + index"
          :filters="[{ data: 0 }]"
          :filter-method="filterMethod"
          :width="listWidth"
          sortable
        >
          <template v-slot:filter="{ $panel, column }">
            ≥
            <input
              v-model="option.data"
              v-for="(option, index) in column.filters"
              :key="'hero-equipment-ec3049b6fc592a98856d838ecfbfc3de-' + index"
              type="type"
              placeholder="0"
              @input="$panel.changeOption($event, !!option.data, option)"
              class="app-fa42596ed8c1eff3ed8b93bba913bde3"
            />
            %
          </template>
        </vxe-table-column>

        <vxe-table-column
          title="净胜"
          :field="'winRate_' + index"
          :filters="[{ data: 0 }]"
          :filter-method="filterMethod"
          :width="listWidth"
          sortable
        >
          <template v-slot:filter="{ $panel, column }">
            ≥
            <input
              v-model="option.data"
              v-for="(option, index) in column.filters"
              :key="'hero-equipment-92089e17c1e005ddc0336c65dfa6b63b-' + index"
              type="type"
              placeholder="0"
              @input="$panel.changeOption($event, !!option.data, option)"
              class="app-fa42596ed8c1eff3ed8b93bba913bde3"
            />
            %
          </template>
        </vxe-table-column>
      </vxe-table-column>
    </vxe-grid>

    <van-action-sheet
      v-model="showInfo.actionSheet"
      :round="false"
      safe-area-inset-bottom
      class="app-aaf877dc2d49f8e1494e6a7dcf8b475c"
    >
      <div class="hero-b0465f9b8806e2e4f4c06dc5f3cba9c0">
        <img
          v-if="lineData.heroId > 0"
          v-lazy="
            '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
            lineData.heroId +
            '/' +
            lineData.heroId +
            '.jpg'
          "
          width="25"
          height="25"
          class="hero-77f7a84f403e0f3c0366160c890e42c9"
        />&nbsp;和&nbsp;<img
          v-if="lineData.equipmentId > 0"
          v-lazy="
            '//image.ttwz.qq.com/h5/images/bangbang/mobile/wzry/equip/' +
            lineData.equipmentId +
            '.png'
          "
          width="25"
          height="25"
        />&nbsp;的契合度
      </div>

      <div class="hero-2acf2be2c6fdd22f4a6282a72817bdb1">
        <EquipmentLine :heroEquipment="lineData.row" />
      </div>

      <div
        class="app-61046f2f5eefe3dc179e52af32241062 hero-386260160edfd75a6b62facc140fd3a4"
      >
        <span class="app-e4c9479b11955648dad558fe717a4eb2">
          1.场次不高但是胜率接近 100%
          可能是因为样本较少、针对出、还没出完就结束的
          <br />
          2.核心装在前面可能是因为先买的小件后面合的
          <br />
          3.保命装在前面可能是因为最后卖了前几件换的
          <br />
          4.大小件胜率不一样说明合成也需要时间呀 ;(
          <br />
          5.少数傻逼最后会卖装备甚至买其他职业的
          <br />
          6.格子上的装备不等于必出顺序,请结合 占比、胜率、 体感 来看
        </span>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: "HeroEquipmentListOne",
  components: {
    EquipmentLine: (resolve) =>
      require(["@/components/Equipment/Line.vue"], resolve),
  },
  data() {
    return {
      listWidth: 0,
      heroInfo: {
        id: 0,
      },
      showInfo: {
        actionSheet: false,
      },
      tableData: {
        result: {
          rows: [],
        },
      },
      lineData: {
        equipmentId: 0,
        row: {},
      },
    };
  },
  created() {
    this.appInitTableWidth();
  },
  mounted() {
    this.heroInfo.id = this.$route.params.id;

    this.getHeroEquipment(this.heroInfo.id, 1);
  },
  methods: {
    getHeroEquipment: function (id = 111, aid = 1) {
      this.axios
        .post(this.apiList.pvp.getHeroEquipment + "&aid=" + aid + "&id=" + id)
        .then((res) => {
          let tipsText,
            data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;
            this.tableData.row = {
              id: 0,
              name: "加载中",
              updateId: 0,
            };

            aid == 1
              ? (tipsText = "正在查看【该英雄】的装备数据")
              : (tipsText = "正在查看出【该装备】的英雄数据");

            this.$message.success(tipsText);
          } else {
            this.appOpenUrl(status.msg, null, { path: "/my" }, 1);
          }
        });
    },
    appInitTableWidth: function () {
      this.listWidth = 90;

      if (localStorage.VXE_TABLE_CUSTOM_COLUMN_VISIBLE == undefined) return;

      let tableColumn = JSON.parse(
        localStorage.VXE_TABLE_CUSTOM_COLUMN_VISIBLE
      );

      if (tableColumn["heroEquipmentListOne"] == undefined) return;

      let visibleColumn = tableColumn.heroEquipmentListOne.split(",");

      !this.isMobile || visibleColumn.length > 6
        ? (this.listWidth = 0)
        : (this.listWidth = 90);
    },
    filterMethod({ option, row, column }) {
      if (column.property === "allPickTimes") {
        return row.allPickTimes >= option.data;
      }

      if (column.property === "allWinRate") {
        return row.allWinRate >= option.data;
      }

      if (column.property === "pickRate_0") {
        return row.pickRate_0 >= option.data;
      }

      if (column.property === "winRate_0") {
        return row.winRate_0 >= option.data;
      }

      if (column.property === "pickRate_1") {
        return row.pickRate_1 >= option.data;
      }

      if (column.property === "winRate_1") {
        return row.winRate_1 >= option.data;
      }

      if (column.property === "pickRate_2") {
        return row.pickRate_2 >= option.data;
      }

      if (column.property === "winRate_2") {
        return row.winRate_2 >= option.data;
      }

      if (column.property === "pickRate_3") {
        return row.pickRate_3 >= option.data;
      }

      if (column.property === "winRate_3") {
        return row.winRate_3 >= option.data;
      }

      if (column.property === "pickRate_4") {
        return row.pickRate_4 >= option.data;
      }

      if (column.property === "winRate_4") {
        return row.winRate_4 >= option.data;
      }

      if (column.property === "pickRate_5") {
        return row.pickRate_5 >= option.data;
      }

      if (column.property === "winRate_5") {
        return row.winRate_5 >= option.data;
      }
    },
    onCellClick: function ({ row, column }) {
      if (column.property == "heroId") {
        this.getHeroEquipment(row.heroId, 1);
        return;
      }

      if (column.property == "equipmentId") {
        this.getHeroEquipment(row.equipmentId, 2);
        return;
      }
      this.showInfo.actionSheet = true;

      this.lineData.heroId = row.heroId;
      this.lineData.equipmentId = row.equipmentId;

      this.lineData.row = {
        columns: ["格子", "胜率", "占比:净胜", "占比:全局"],
        rows: [
          {
            格子: "格子_1",
            "占比:净胜": row.allPickRate_0 / 100,
            "占比:全局": row.winPickRate_0 / 100,
            胜率: row.winRate_0 / 100,
          },
          {
            格子: "格子_2",
            "占比:净胜": row.allPickRate_1 / 100,
            "占比:全局": row.winPickRate_1 / 100,
            胜率: row.winRate_1 / 100,
          },
          {
            格子: "格子_3",
            "占比:净胜": row.allPickRate_2 / 100,
            "占比:全局": row.winPickRate_2 / 100,
            胜率: row.winRate_2 / 100,
          },
          {
            格子: "格子_4",
            "占比:净胜": row.allPickRate_3 / 100,
            "占比:全局": row.winPickRate_3 / 100,
            胜率: row.winRate_3 / 100,
          },
          {
            格子: "格子_5",
            "占比:净胜": row.allPickRate_4 / 100,
            "占比:全局": row.winPickRate_4 / 100,
            胜率: row.winRate_4 / 100,
          },
          {
            格子: "格子_6",
            "占比:净胜": row.allPickRate_5 / 100,
            "占比:全局": row.winPickRate_5 / 100,
            胜率: row.winRate_5 / 100,
          },
        ],
      };

      this.showInfo.actionSheet = true;
    },
  },
};
</script>
