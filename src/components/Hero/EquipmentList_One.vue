<template>
  <div class="hero-equipmentListOne">
    <vxe-grid
      ref="heroEquipmentListOne"
      auto-resize
      :data="tableData.result.rows"
      @cell-click="onCellClick"
      height="547"
    >
      <vxe-table-column
        title="装备"
        field="id"
        fixed="left"
        width="50"
        sortable
      >
        <template v-slot="{ row }">
          <img
            v-if="row.id > 0"
            v-lazy="
              '//image.ttwz.qq.com/h5/images/bangbang/mobile/wzry/equip/' +
              row.id +
              '.png'
            "
            width="25"
            height="25"
            class="hero-785aadb8cf1105bafaef41fd3e44a292"
          />
        </template>
      </vxe-table-column>

      <vxe-table-column title="#" type="seq" width="50" />

      <vxe-table-column
        v-for="(data, index) in 6"
        :key="'hero-equipment-5306afd97611c2ddc21400d0fcd9139c-' + index"
        :title="'格子_' + (index + 1).toString()"
      >
        <vxe-table-column
          title="场次"
          :field="'pickTimes_' + index"
          :width="listWidth"
          sortable
        />
        <vxe-table-column
          title="胜率 (%)"
          :field="'winRate_' + index"
          :filters="[{ data: 0 }]"
          :filter-method="filterWinRateMethod"
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
    </vxe-grid>

    <van-action-sheet
      v-model="showInfo.actionSheet"
      class="app-aaf877dc2d49f8e1494e6a7dcf8b475c"
    >
      <div class="hero-b0465f9b8806e2e4f4c06dc5f3cba9c0">
        <img
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
          1.场次不高但是胜率接近 100% 可能是因为样本较少 或 针对出的
          <br />
          2.核心装在前面可能是因为先买的小件后面合成的
          <br />
          3.大小件胜率不一样说明合成也是需要时间的呀 ;(
          <br />
          4.少数傻逼最后会卖装备甚至买其他职业的
          <br />
          5.格子上的装备不等于必出顺序,请结合 场次、胜率 以及 自己的体感 来看
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
  props: {
    heroEquipment: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    listenChange() {
      const { heroEquipment } = this;
      return { heroEquipment };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (newValue.heroEquipment == []) return;

        this.tableData.result.rows = newValue.heroEquipment;
      },
    },
  },
  data() {
    return {
      listWidth: 0,
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
    this.isMobile ? (this.listWidth = 85) : (this.listWidth = 0);
  },
  methods: {
    filterWinRateMethod({ option, row, column }) {
      if (column.property === "winRate_0") {
        return row.winRate_0 >= option.data;
      }

      if (column.property === "winRate_1") {
        return row.winRate_1 >= option.data;
      }

      if (column.property === "winRate_2") {
        return row.winRate_2 >= option.data;
      }

      if (column.property === "winRate_3") {
        return row.winRate_3 >= option.data;
      }

      if (column.property === "winRate_4") {
        return row.winRate_4 >= option.data;
      }

      if (column.property === "winRate_5") {
        return row.winRate_5 >= option.data;
      }
    },
    onCellClick: function ({ row }) {
      this.showInfo.actionSheet = true;

      this.lineData.equipmentId = row.id;

      this.lineData.row = {
        columns: ["格子", "胜率", "场次"],
        rows: [
          {
            格子: "格子_1",
            场次: row.pickTimes_0,
            胜率: row.winRate_0 / 100,
          },
          {
            格子: "格子_2",
            场次: row.pickTimes_1,
            胜率: row.winRate_1 / 100,
          },
          {
            格子: "格子_3",
            场次: row.pickTimes_2,
            胜率: row.winRate_2 / 100,
          },
          {
            格子: "格子_4",
            场次: row.pickTimes_3,
            胜率: row.winRate_3 / 100,
          },
          {
            格子: "格子_5",
            场次: row.pickTimes_4,
            胜率: row.winRate_4 / 100,
          },
          {
            格子: "格子_6",
            场次: row.pickTimes_5,
            胜率: row.winRate_5 / 100,
          },
        ],
      };

      this.showInfo.actionSheet = true;
    },
  },
};
</script>
