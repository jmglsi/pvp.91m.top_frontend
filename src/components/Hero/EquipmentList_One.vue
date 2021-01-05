<template>
  <div class="hero-equipmentListOne app-equipmentListOne">
    <vxe-grid
      ref="heroEquipmentListOne"
      show-overflow
      :loading="tableData.loading"
      :data="tableData.result.rows"
      :sort-config="{ trigger: 'cell' }"
      :show-footer="equipmentInfo.type == 2 ? true : false"
      :footer-method="footerMethod"
      :footer-cell-class-name="footerCellClassName"
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
            width="23"
            height="23"
            class="app-3b9655ab218c7f1a18f5dacd778a52f0 app-e56cff3ad6321a4fec672c0ecc2aa8e9"
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
            width="23"
            height="23"
            class="hero-785aadb8cf1105bafaef41fd3e44a292 app-e56cff3ad6321a4fec672c0ecc2aa8e9"
          />
        </template>
      </vxe-table-column>

      <vxe-table-column title="#" type="seq" width="50" />

      <vxe-table-column title="全部 (%)">
        <vxe-table-column
          title="出场"
          field="allPickRate"
          :filters="[{ data: 2.5, checked: true }]"
          :filter-method="filterMethod"
          :width="listWidth"
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
              class="app-fa42596ed8c1eff3ed8b93bba913bde3"
            />
            %
          </template>
        </vxe-table-column>
        <vxe-table-column
          title="胜率"
          field="allWinRate"
          :filters="[{ data: 45, checked: true }]"
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

      <vxe-table-column
        v-for="(data, index) in 6"
        :key="'hero-equipment-5306afd97611c2ddc21400d0fcd9139c-' + index"
        :title="'格子_' + (index + 1).toString() + ' (%)'"
      >
        <vxe-table-column
          title="出场"
          :field="'pickRate_' + index"
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
          title="胜率"
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
      <div class="app-044a82dc9b34eebf2c54fe2c3c904368">
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
          class="app-3b9655ab218c7f1a18f5dacd778a52f0"
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
          1.格子出场不高但是胜率接近 100%
          可能是因为样本较少、针对出、还没出完就结束的
          <br />
          2.全部出场 > 100% 是因为买了多件,例如:双无尽蒙犽
          <br />
          3.核心装在前面可能是因为先买的小件后面合的
          <br />
          4.保命装在前面可能是因为最后卖了前几件换的
          <br />
          5.大小件胜率不一样说明合成也需要时间呀 ;(
          <br />
          6.少数傻逼最后会卖装备甚至买其他职业的
          <br />
          7.格子上的装备不等于必出顺序,请结合 占比、胜率、 体感 来看
        </span>

        <AppBottomTabbar v-if="isMobile" height="50px" />
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import XEUtils from "xe-utils";

export default {
  name: "HeroEquipmentListOne",
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
        if (newValue.heroId == 0) return;

        this.equipmentInfo.type = 1;
        this.getHeroEquipment(newValue.heroId, this.equipmentInfo.type);
      },
    },
  },
  components: {
    EquipmentLine: (resolve) =>
      require(["@/components/Equipment/Line.vue"], resolve),
    AppBottomTabbar: (resolve) =>
      require(["@/components/App/BottomTabbar.vue"], resolve),
  },
  data() {
    return {
      listWidth: 0,
      showInfo: {
        actionSheet: false,
      },
      tableData: {
        loading: true,
        result: {
          rows: [],
        },
      },
      lineData: {
        equipmentId: 0,
        row: {},
      },
      equipmentInfo: {
        type: 1,
      },
    };
  },
  created() {
    this.listWidth = this.appInitTableWidth(1450);
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

            aid == 1
              ? (tipsText = "正在查看【该英雄】的装备数据")
              : (tipsText = "正在查看出【该装备】的英雄数据");

            this.$message.success(tipsText);

            this.tableData.loading = false;
          } else {
            this.appOpenUrl(status.msg, null, { path: "/my" }, 1);
          }
        });
    },
    filterMethod({ option, row, column }) {
      if (column.property === "allPickRate") {
        return row.allPickRate >= option.data;
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
    footerMethod({ columns, data }) {
      let means = [];
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          means.push("平均");
        } else if (columnIndex == 3 || columnIndex == 4) {
          means.push(XEUtils.mean(data, column.property).toFixed(2));
        } else {
          means.push("-");
        }
      });

      return [means];
    },
    updateFooterEvent() {
      let xTable = this.$refs.heroEquipmentListOne;

      xTable.updateFooter();
    },
    footerCellClassName: function ({ column }) {
      if (column.property == "heroId") {
        return "ranking-ef96f47f5516788b4273bd9ff8c9fa19";
      }
    },
    onCellClick: function ({ row, column }) {
      if (column.property == "heroId") {
        this.equipmentInfo.type = 1;
        this.getHeroEquipment(row.heroId, this.equipmentInfo.type);
        return;
      }

      if (column.property == "equipmentId") {
        this.equipmentInfo.type = 2;
        this.getHeroEquipment(row.equipmentId, this.equipmentInfo.type);
        return;
      }
      this.showInfo.actionSheet = true;

      this.lineData.heroId = row.heroId;
      this.lineData.equipmentId = row.equipmentId;

      this.lineData.row = {
        columns: ["格子", "胜率", "占比"],
        rows: [
          {
            格子: "格子_1",
            占比: row.pickRate_0 / 100,
            胜率: row.winRate_0 / 100,
          },
          {
            格子: "格子_2",
            占比: row.pickRate_1 / 100,
            胜率: row.winRate_1 / 100,
          },
          {
            格子: "格子_3",
            占比: row.pickRate_2 / 100,
            胜率: row.winRate_2 / 100,
          },
          {
            格子: "格子_4",
            占比: row.pickRate_3 / 100,
            胜率: row.winRate_3 / 100,
          },
          {
            格子: "格子_5",
            占比: row.pickRate_4 / 100,
            胜率: row.winRate_4 / 100,
          },
          {
            格子: "格子_6",
            占比: row.pickRate_5 / 100,
            胜率: row.winRate_5 / 100,
          },
        ],
      };

      this.showInfo.actionSheet = true;
    },
  },
};
</script>
