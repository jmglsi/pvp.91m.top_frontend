<template>
  <div class="ranking-zb app-zb">
    <div class="ranking-3ede7e85e7bd91a85bce2a134d18fb18">
      <vxe-table
        ref="refZhuangBei"
        id="refZhuangBei"
        :custom-config="{ storage: true }"
        :data="tableData.result.rows"
        :height="clientHeight"
        :loading="tableData.loading"
        @cell-click="onTableCellClick"
      >
        <vxe-table-column
          title="装备"
          field="id"
          fixed="left"
          :filters="[
            { value: 0, label: '其他' },
            { value: 1, label: '鞋子' },
            { value: 2, label: '打野刀' },
            { value: 3, label: '辅助装' },
            { value: 4, label: '保命装' },
            { value: 5, label: '终极装' },
            { value: 6, label: '专精装' },
          ]"
          :filter-method="onTableColumnFilterMethod"
          width="75"
        >
          <template #default="{ row }">
            <div
              :style="{
                position: 'relative',
              }"
              :class="
                isSmallMode ? 'app-1de7efdd403ec02d55f5c1d9557a2fc4' : null
              "
            >
              <img
                v-lazy="{
                  //error: '//game.gtimg.cn/images/yxzj/img201606/itemimg/' + row.id + '.jpg',
                  src:
                    '//game.gtimg.cn/images/yxzj/img201606/itemimg/' +
                    row.id +
                    '.jpg',
                }"
                width="50"
                height="50"
                class="app-border-radius ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
              />
            </div>
          </template>
        </vxe-table-column>

        <vxe-table-column title="#" type="seq" width="75" />

        <vxe-table-column
          title="名字"
          field="name"
          :width="listWidth > 0 ? listWidth + 25 : listWidth"
          sortable
        />

        <vxe-table-column
          title="价格"
          field="money"
          :width="listWidth > 0 ? listWidth + 25 : listWidth"
          sortable
        />

        <vxe-table-colgroup
          title="英雄"
          :title-prefix="{ content: $appMsg.tips[1008] }"
        >
          <vxe-table-column
            title="数量"
            field="heroNum"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            title="顺位"
            field="maxIndex"
            :width="listWidth"
            sortable
          />
        </vxe-table-colgroup>

        <vxe-table-colgroup :title="$appMsg.tips[1004] + ' (%)'">
          <vxe-table-column
            title="出场"
            field="allPickRate"
            :width="listWidth"
            sortable
          >
            <template #default="{ row }">
              <div
                :style="{
                  position: 'relative',
                }"
              >
                <span class="app-9ec86c2c7ff0fcaa177028a0b2d091b8">
                  {{ row.allPickRate }}
                </span>
                <div
                  v-if="row.change.updateValue != 0"
                  :style="
                    row.change.updateType == 2
                      ? { color: 'red !important' }
                      : { color: 'blue !important' }
                  "
                  class="app-b0704b59dbf144bfeffb53bdb11d7128"
                >
                  <span class="app-b1275ae967fdbd25d1692fa5e2f547e0">
                    {{
                      (row.change.updateType == 2 ? "+" : "-") +
                      Math.abs(row.change.updateValue)
                    }}
                  </span>

                  <img
                    v-if="row.change.updateType != 0"
                    v-lazy="
                      $appCache +
                      '/img/icons-app/hot_' +
                      row.change.updateType +
                      '.png'
                    "
                    width="15"
                    height="15"
                    class="app-db21bca782a535e91eb87f56b8abdc45"
                  />
                </div>
              </div>
            </template>
          </vxe-table-column>

          <vxe-table-column
            title="胜率"
            field="allWinRate"
            :width="listWidth"
            sortable
          />
        </vxe-table-colgroup>
      </vxe-table>
    </div>

    <div class="ranking-c654dca3c049bcd2c955393eeb98ee68">
      <van-action-sheet
        v-model="showInfo.equipmentActionSheet"
        :title="tableDataRow.name + ' (' + tableDataRow.id + ') 如何操作'"
        :actions="actionSheetActions"
        :close-on-click-action="true"
        @select="onActionSheetSelect"
      />
    </div>

    <div class="ranking-84226baebc9c90dd5bba99237b39725a">
      <van-action-sheet
        v-model="showInfo.skillActionSheet"
        :title="tableDataRow.name + ' 的其他数据 (近期)'"
      >
        <template #default>
          <HeroEquipmentListOne
            v-if="showInfo.skillActionSheet"
            :extraId="tableDataRow.id"
            :extraType="2"
          />
        </template>
      </van-action-sheet>
    </div>
  </div>
</template>

<script>
export default {
  name: "rankingZhuangBei",
  components: {
    HeroEquipmentListOne: () =>
      import("@/components/Hero/EquipmentList_One.vue"),
  },
  props: {
    refresh: {
      type: Number,
      default: 0,
    },
    isSmallMode: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    listenChange() {
      const { isSmallMode, refresh } = this;
      return { isSmallMode, refresh };
    },
  },
  data() {
    return {
      copyData: "",
      tableData: {
        loading: false,
        result: {
          rows: [],
        },
      },
      tableDataRow: {
        id: null,
        name: this.$t("loading"),
      },
      actionSheetActions: [
        { name: "复制链接", value: 0 },
        { name: "装备详情", value: 1 },
        { name: "更新记录", subname: "NGA @破笼之鸟", value: 2 },
      ],
      clientHeight: 0,
      listWidth: 0,
      filterValue: [],
      showInfo: {
        skillActionSheet: false,
        equipmentActionSheet: false,
      },
    };
  },
  created() {
    this.clientHeight = this.$appInitTableHeight(10);
    this.listWidth = this.$appInitTableWidth(750);

    this.initPage();
  },
  methods: {
    initPage: function () {
      let q = this.$route.query,
        equipmentId = Number(q.equipmentId) || 0,
        equipmentName = q.equipmentName || this.$t("loading");

      if (equipmentId) {
        this.tableDataRow.id = equipmentId;
        this.tableDataRow.name = equipmentName;

        this.showInfo.skillActionSheet = true;
      }

      if (this.$appConfigInfo.appInfo.isReadme == 1) {
        this.getRanking(3, 0, 0, 0);
      }
    },
    getRanking: function (aid = 3, bid = 0, cid = 0, did = 0) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did
        );

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.updateInfo.timeout) {
        this.tableData = ls;

        return;
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
            did
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;
            this.tableData.updateTime = ts;

            this.$appSetLocalStorage(
              "ranking-" + aid + "-" + bid + "-" + cid + "-" + did,
              this.tableData
            );

            //this.$message.success(this.$appMsg.success[1005]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onTableColumnFilterMethod: function ({ option, row, column }) {
      if (column.property == "id") {
        return row.type == option.value;
      }
    },
    onTableCellClick: function ({ row }) {
      this.tableDataRow = row;

      this.showInfo.equipmentActionSheet = true;
    },
    onActionSheetSelect: function (item) {
      let equipmentInfo = this.tableDataRow;

      if (item.value == 0) {
        this.onCopy(equipmentInfo);
      }

      if (item.value == 1) {
        this.showInfo.skillActionSheet = true;
      }

      if (item.value == 2) {
        this.$appOpenUrl(
          this.$t("open-url.title"),
          "NGA @破笼之鸟",
          {
            path: "https://ngabbs.com/read.php?tid=19902976",
          },
          0
        );
      }
    },
    onCopy: function (row) {
      let url = location,
        longUrl =
          url.origin +
          url.pathname +
          "?type=3&equipmentId=" +
          row.id +
          "&equipmentName=" +
          encodeURIComponent(row.name);

      this.$axios
        .post(this.$appApi.app.getShortUrl, {
          url: longUrl,
        })
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            let shortUrl = data.url;

            this.copyData = row.name + " 的其他信息 ↓\n-\n" + shortUrl;

            this.$appCopyData(this.copyData);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
  },
};
</script>