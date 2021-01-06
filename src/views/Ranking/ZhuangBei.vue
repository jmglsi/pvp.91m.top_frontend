<template>
  <div class="ranking-zb">
    <div class="ranking-3ede7e85e7bd91a85bce2a134d18fb18">
      <vxe-grid
        ref="zhuangbei"
        :loading="tableData.loading"
        :data="tableData.result.rows"
        :sort-config="{ trigger: 'cell' }"
        :height="clientHeight"
        @cell-click="onCellClick"
      >
        <vxe-table-column
          title="装备"
          field="equipmentId"
          fixed="left"
          width="75"
          :filters="[{ label: '不含鞋子' }]"
          :filter-method="filterMethod"
        >
          <template v-slot="{ row }">
            <img
              v-lazy="
                '//image.ttwz.qq.com/h5/images/bangbang/mobile/wzry/equip/' +
                row.equipmentId +
                '.png'
              "
              width="50"
              height="50"
              class="ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
            />
          </template>
        </vxe-table-column>

        <vxe-table-column title="#" type="seq" width="75" />

        <vxe-table-column
          title="名字"
          field="equipmentName"
          :width="listWidth > 0 ? listWidth + 25 : listWidth"
        />

        <vxe-table-column title="英雄">
          <vxe-table-column
            title="数量"
            field="heroNum"
            :width="listWidth"
            sortable
          />
        </vxe-table-column>

        <vxe-table-column title="装备 (%)">
          <vxe-table-column
            title="出场"
            field="allPickRate"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            title="胜率"
            field="allWinRate"
            :width="listWidth"
            sortable
          />
        </vxe-table-column>
      </vxe-grid>
    </div>

    <div class="ranking-84226baebc9c90dd5bba99237b39725a">
      <van-action-sheet
        v-model="showInfo.heroSkill"
        :title="tableDataRow.equipmentName + ' 的其他数据 (上周)'"
        safe-area-inset-bottom
      >
        <HeroEquipmentListOne
          v-if="showInfo.heroSkill"
          :equipmentId="tableDataRow.equipmentId"
          :equipmentType="2"
        />
      </van-action-sheet>
    </div>

    <div class="ranking-c654dca3c049bcd2c955393eeb98ee68">
      <van-action-sheet
        v-model="showInfo.equipmentMenu"
        :title="tableDataRow.equipmentName + ' 如何操作'"
        :actions="actions"
        :close-on-click-action="true"
        @select="onActionSheetSelect"
        safe-area-inset-bottom
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "RankingZhuangBei",
  components: {
    HeroEquipmentListOne: (resolve) =>
      require(["@/components/Hero/EquipmentList_One.vue"], resolve),
  },
  data() {
    return {
      copyData: "",
      tableData: {
        loading: true,
        result: {
          rows: [],
        },
      },
      tableDataRow: {
        equipmentName: "加载中",
      },
      actions: [
        { name: "复制链接", value: 0 },
        { name: "查看英雄", value: 1 },
        { name: "更新记录", subname: "NGA @破笼之鸟", value: 2 },
      ],
      clientHeight: 0,
      listWidth: 0,
      showInfo: {
        heroSkill: false,
        equipmentMenu: false,
      },
      skillInfo: {
        model: 0,
      },
      tipsInfo: [0, 0, 0],
    };
  },
  created() {
    this.clientHeight = this.$appInitTableHeight() + 48;
    this.listWidth = this.$appInitTableWidth(750);
  },
  mounted() {
    let equipmentId = parseInt(this.$route.query.equipmentId) || 0,
      equipmentName = this.$route.query.equipmentName || "加载中";

    if (equipmentId) {
      this.tableDataRow.equipmentId = equipmentId;
      this.tableDataRow.equipmentName = equipmentName;
      this.showInfo.heroSkill = true;
    }

    this.getRanking();
  },
  methods: {
    getRanking: function (aid = 3) {
      this.$axios
        .post(this.$appApi.pvp.getRanking + "&aid=" + aid)
        .then((res) => {
          let data = res.data.data;

          this.tableData = data;
          this.tableData.loading = false;
        });
    },
    filterMethod({ row, column }) {
      if (column.property == "equipmentId") {
        let shoes = [1421, 1422, 1423, 1424, 1425, 1426];

        return shoes.indexOf(row.equipmentId) == -1;
      }
    },
    onCellClick: function ({ row }) {
      this.tableDataRow = row;
      this.showInfo.equipmentMenu = true;
    },
    onCopyEquipmentInfo: function (row) {
      this.copyData =
        row.equipmentName +
        "\r-\r更多装备信息 ↓\r" +
        location.origin +
        location.pathname +
        "?type=3&equipmentId=" +
        row.equipmentId +
        "&equipmentName=" +
        encodeURIComponent(row.equipmentName);

      this.$appCopyData(this.copyData);
    },
    onActionSheetSelect: function (item) {
      let equipmentInfo = this.tableDataRow;

      if (item.value == 0) {
        this.onCopyEquipmentInfo(equipmentInfo);
      }

      if (item.value == 1) {
        this.showInfo.heroSkill = true;
      }

      if (item.value == 2) {
        this.$appOpenUrl("是否查看装备更新记录?", "NGA @破笼之鸟", {
          path: "//ngabbs.com/read.php?tid=19902976",
        });
      }
    },
  },
};
</script>