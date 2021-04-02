<template>
  <div class="hero-equipmentListOne app-equipmentListOne">
    <vxe-grid
      ref="refHeroEquipmentListOne"
      :loading="tableData.loading"
      :data="tableData.result.rows"
      @cell-click="onCellClick"
      height="543"
    >
      <vxe-table-column title="英雄" field="heroId" fixed="left" width="50">
        <template v-slot="{ row }">
          <img
            v-lazy="
              '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
              row.heroId +
              '/' +
              row.heroId +
              '.jpg'
            "
            width="25"
            height="25"
            class="app-3b9655ab218c7f1a18f5dacd778a52f0"
          />
        </template>
      </vxe-table-column>

      <vxe-table-column
        title="装备"
        field="equipment.id"
        fixed="left"
        width="50"
      >
        <template v-slot="{ row }">
          <img
            v-lazy="
              '//image.ttwz.qq.com/h5/images/bangbang/mobile/wzry/equip/' +
              row.equipment.id +
              '.png'
            "
            width="25"
            height="25"
            class="hero-785aadb8cf1105bafaef41fd3e44a292"
          />
        </template>
      </vxe-table-column>

      <vxe-table-column
        title="优先级"
        field="equipment.updateIndex"
        :width="listWidth"
        sortable
      >
        <template v-slot="{ row }">
          <span class="hero-b1bd56e896540535e327e5a177ede4a8">{{
            row.equipment.updateType == 0
              ? "-"
              : Math.abs(row.equipment.updateIndex)
          }}</span>
          <img
            v-if="row.equipment.updateType != 0"
            v-lazy="'/img/app-icons/hot_' + row.equipment.updateType + '.png'"
            width="15"
            height="15"
            class="app-db21bca782a535e91eb87f56b8abdc45"
          />
        </template>
      </vxe-table-column>

      <vxe-table-column title="#" type="seq" width="50" />

      <vxe-table-column title="全部 (%)">
        <vxe-table-column
          title="出场"
          field="allPickRate"
          :filters="[{ data: 0.25, checked: true }]"
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

      <vxe-table-column
        v-for="(data, index) in 6"
        :key="'hero-equipment-5306afd97611c2ddc21400d0fcd9139c-' + index"
        :title="'格子_' + (index + 1).toString() + ' (%)'"
      >
        <vxe-table-column
          title="占比"
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
      v-model="showInfo.equipmentMenu"
      :round="false"
      safe-area-inset-bottom
    >
      <div class="app-044a82dc9b34eebf2c54fe2c3c904368">
        <img
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
        <EquipmentLine :heroEquipment="lineDataRow" />
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
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: "HeroEquipmentListOne",
  props: {
    equipmentId: {
      type: Number,
      default: 0,
    },
    equipmentType: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    listenChange() {
      const { equipmentId, equipmentType } = this;
      return { equipmentId, equipmentType };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (newValue.equipmentId == null) return;

        this.getRanking(newValue.equipmentId, 6, newValue.equipmentType, 0, 0);
      },
    },
  },
  components: {
    EquipmentLine: () => import("@/components/Equipment/Line.vue"),
  },
  data() {
    return {
      listWidth: 0,
      tableData: {
        loading: true,
        result: {
          rows: [],
        },
      },
      lineData: {
        equipmentId: 0,
      },
      lineDataRow: {},
      equipmentInfo: {
        type: 1,
      },
      showInfo: {
        equipmentMenu: false,
      },
    };
  },
  created() {
    this.listWidth = this.$appInitTableWidth(1450);
  },
  methods: {
    getRanking: function (id = 111, aid = 6, bid = 1, cid = 0, did = 0) {
      let appConfigInfo = this.$appConfigInfo,
        ranking = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + id
        );

      if (
        ranking &&
        this.$appTs - appConfigInfo.appInfo.updateTime <
          appConfigInfo.updateInfo.timeout
      ) {
        this.tableData = ranking;

        return;
      }

      this.$axios
        .post(
          this.$appApi.pvp.getRanking +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&cid=" +
            cid +
            "&did=" +
            did +
            "&id=" +
            id
        )
        .then((res) => {
          let tipsText,
            data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;

            this.$appSetLocalStorage(
              "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + id,
              this.tableData
            );

            bid == 1
              ? (tipsText = this.$appMsg.success[1001])
              : (tipsText = this.$appMsg.success[1002]);

            this.$message.success(tipsText);
          } else {
            this.$appOpenUrl(status.msg, null, { path: "/my" }, 1);
          }
        });
    },
    filterMethod: function ({ option, row, column }) {
      if (column.property == "allPickRate") {
        return row.allPickRate >= option.data;
      }

      if (column.property == "allWinRate") {
        return row.allWinRate >= option.data;
      }

      if (column.property == "pickRate_0") {
        return row.pickRate_0 >= option.data;
      }

      if (column.property == "winRate_0") {
        return row.winRate_0 >= option.data;
      }

      if (column.property == "pickRate_1") {
        return row.pickRate_1 >= option.data;
      }

      if (column.property == "winRate_1") {
        return row.winRate_1 >= option.data;
      }

      if (column.property == "pickRate_2") {
        return row.pickRate_2 >= option.data;
      }

      if (column.property == "winRate_2") {
        return row.winRate_2 >= option.data;
      }

      if (column.property == "pickRate_3") {
        return row.pickRate_3 >= option.data;
      }

      if (column.property == "winRate_3") {
        return row.winRate_3 >= option.data;
      }

      if (column.property == "pickRate_4") {
        return row.pickRate_4 >= option.data;
      }

      if (column.property == "winRate_4") {
        return row.winRate_4 >= option.data;
      }

      if (column.property == "pickRate_5") {
        return row.pickRate_5 >= option.data;
      }

      if (column.property == "winRate_5") {
        return row.winRate_5 >= option.data;
      }
    },
    onCellClick: function ({ row, column }) {
      if (column.property == "heroId") {
        this.equipmentInfo.type = 1;
        this.getRanking(row.heroId, 6, this.equipmentInfo.type, 0, 0);

        return;
      }

      if (column.property == "equipment.id") {
        this.equipmentInfo.type = 2;
        this.getRanking(row.equipment.id, 6, this.equipmentInfo.type, 0, 0);

        return;
      }

      this.lineData.heroId = row.heroId;
      this.lineData.equipmentId = row.equipment.id;

      this.lineDataRow = {
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

      this.showInfo.equipmentMenu = true;
    },
  },
};
</script>
