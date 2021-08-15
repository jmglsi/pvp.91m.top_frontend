<template>
  <div class="ranking-zb app-zb">
    <div class="ranking-3ede7e85e7bd91a85bce2a134d18fb18">
      <vxe-grid
        ref="refZhuangBei"
        :loading="tableData.loading"
        :data="tableData.result.rows"
        :height="clientHeight"
        @cell-click="onCellClick"
      >
        <vxe-table-column
          title="装备"
          field="equipment.id"
          fixed="left"
          width="75"
          :filters="[
            { label: '其他', data: 0 },
            { label: '鞋子', data: 1 },
            { label: '打野刀', data: 2 },
            { label: '辅助装', data: 3 },
            { label: '保命装', data: 4 },
            { label: '神装', data: 5 },
          ]"
          :filter-method="filterMethod"
        >
          <template v-slot="{ row }">
            <div
              :class="
                isSmallMobile == 1
                  ? 'app-1de7efdd403ec02d55f5c1d9557a2fc4'
                  : null
              "
            >
              <img
                v-lazy="
                  '//image.ttwz.qq.com/h5/images/bangbang/mobile/wzry/equip/' +
                  row.equipment.id +
                  '.png'
                "
                width="50"
                height="50"
                class="ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
              />
            </div>
          </template>
        </vxe-table-column>

        <vxe-table-column title="#" type="seq" width="75" />

        <vxe-table-column
          title="名字"
          field="equipment.name"
          :width="listWidth > 0 ? listWidth + 25 : listWidth"
        />

        <vxe-table-column
          title="价格"
          field="equipment.money"
          :width="listWidth > 0 ? listWidth + 25 : listWidth"
          sortable
        />

        <vxe-table-column title="英雄">
          <vxe-table-column
            title="数量"
            field="heroNum"
            :width="listWidth"
            sortable
          />
        </vxe-table-column>

        <vxe-table-column title="出场越低,波动越大 (%)">
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

    <div class="ranking-c654dca3c049bcd2c955393eeb98ee68">
      <van-action-sheet
        v-model="showInfo.equipmentMenu"
        :title="
          tableDataRow.equipment.name +
          ' (' +
          tableDataRow.equipment.id +
          ') 如何操作'
        "
        :actions="actions"
        :close-on-click-action="true"
        @select="onActionSheetSelect"
        safe-area-inset-bottom
      />
    </div>

    <div class="ranking-84226baebc9c90dd5bba99237b39725a">
      <van-action-sheet
        v-model="showInfo.skillMenu"
        :title="tableDataRow.equipment.name + ' 的其他数据 (近期)'"
        safe-area-inset-bottom
      >
        <HeroEquipmentListOne
          v-if="showInfo.skillMenu"
          :equipmentId="tableDataRow.equipment.id"
          :equipmentType="2"
        />
      </van-action-sheet>
    </div>
  </div>
</template>

<script>
export default {
  name: "RankingZhuangBei",
  components: {
    HeroEquipmentListOne: () =>
      import("@/components/Hero/EquipmentList_One.vue"),
  },
  props: {
    isSmallMobile: {
      type: Number,
      default: 0,
    },
    refresh: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    listenChange() {
      const { isSmallMobile, refresh } = this;
      return { isSmallMobile, refresh };
    },
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
        equipment: {
          id: 0,
          name: "加载中...",
        },
      },
      actions: [
        { name: "复制链接", value: 0 },
        { name: "装备详情", value: 1 },
        { name: "更新记录", subname: "NGA @破笼之鸟", value: 2 },
      ],
      clientHeight: 0,
      listWidth: 0,
      filterValue: [],
      showInfo: {
        skillMenu: false,
        equipmentMenu: false,
      },
      skillInfo: {
        model: 0,
      },
      tipsInfo: [0, 0, 0],
    };
  },
  created() {
    this.clientHeight = this.$appInitTableHeight(10);
    this.listWidth = this.$appInitTableWidth(750);
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage: function () {
      let q = this.$route.query,
        equipmentId = parseInt(q.equipmentId) || 0,
        equipmentName = q.equipmentName || "加载中...";

      if (equipmentId) {
        this.tableDataRow.equipment.id = equipmentId;
        this.tableDataRow.equipment.name = equipmentName;

        this.showInfo.skillMenu = true;
      }

      this.getRanking(3, 0, 0, 0);

      this.$appPush({
        query: {
          type: 3,
          bid: 0,
          cid: 0,
          did: 0,
          refresh: 1,
        },
      });
    },
    getRanking: function (aid = 3, bid = 0, cid = 0, did = 0) {
      let appConfigInfo = this.$appConfigInfo,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did
        );

      if (
        ls &&
        this.$appTs - appConfigInfo.appInfo.updateTime <
          appConfigInfo.updateInfo.timeout
      ) {
        return (this.tableData = ls);
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
            did
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;

            this.$appSetLocalStorage(
              "ranking-" + aid + "-" + bid + "-" + cid + "-" + did,
              this.tableData
            );

            this.$message.success(this.$appMsg.success[1005]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    filterMethod: function ({ option, row, column }) {
      if (column.property == "equipment.id") {
        return row.equipment.type == option.data;
      }
    },
    onZhuangBeiCopy: function (row) {
      let longUrl =
        location.origin +
        location.pathname +
        "?type=3&equipmentId=" +
        row.equipment.id +
        "&equipmentName=" +
        encodeURIComponent(row.equipment.name);

      this.$axios
        .post(this.$appApi.s.url, {
          url: longUrl,
        })
        .then((res) => {
          let shortUrl = res.data.data.url;

          this.copyData = row.equipment.name + " 的其他信息 ↓\r" + shortUrl;

          this.$appCopyData(this.copyData);
        });
    },
    onCellClick: function ({ row }) {
      this.tableDataRow = row;

      this.showInfo.equipmentMenu = true;
    },
    onActionSheetSelect: function (item) {
      let equipmentInfo = this.tableDataRow;

      if (item.value == 0) {
        this.onZhuangBeiCopy(equipmentInfo);
      }

      if (item.value == 1) {
        this.showInfo.skillMenu = true;
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