<template>
  <div class="ranking-zbk app-zbk">
    <div class="ranking-3ede7e85e7bd91a85bce2a134d18fb18">
      <vxe-table
        ref="refJccZhuangBeiKu"
        id="refJccZhuangBeiKu"
        :custom-config="{ storage: true }"
        :data="tableData.result.rows"
        :height="clientHeight"
        :loading="tableData.loading"
        @cell-click="onTableCellClick"
      >
        <vxe-table-column
          field="id"
          title="装备"
          :filters="[
            { value: 0, label: '其他' },
            { value: 1, label: '成型装备' },
            { value: 2, label: '光明武器' },
            { value: 3, label: '辅助装备' },
            { value: 4, label: '神器装备' },
            { value: 5, label: '转职纹章' },
            { value: 6, label: '特殊装备' },
          ]"
          :filter-method="onTableColumnFilterMethod"
          width="75"
        >
          <template #default="{ row, rowIndex }">
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
                  src: row.img,
                }"
                width="50"
                height="50"
                class="app-border-radius ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
              />
              <div
                class="app-5f19eaf71f40d74d66be84db52b3ad87 app-0e1a8b3f7f6162bf4b88d3d001b88374"
              >
                {{ rowIndex + 1 }}
              </div>
            </div>
          </template>
        </vxe-table-column>

        <vxe-table-column
          field="name"
          title="名字"
          :filters="[{ value: '' }]"
          :filter-method="onTableColumnFilterMethod"
          :width="listWidth > 0 ? listWidth + 25 : listWidth"
          show-overflow="ellipsis"
          sortable
        >
          <template #filter="{ $panel, column }">
            <input
              v-model="option.value"
              v-for="(option, index) in column.filters"
              :key="'hero-687a3138e43e7447a967a510bf02ac98-' + index"
              type="type"
              placeholder="装备名"
              @input="$panel.changeOption($event, !!option.value, option)"
              class="app-fa42596ed8c1eff3ed8b93bba913bde3"
              :style="{ width: '125px !important' }"
            />
          </template>
        </vxe-table-column>

        <vxe-table-column
          field="allPickRate[1]"
          title="出场"
          :filters="[{ value: 0.01, checked: true }]"
          :filter-method="onTableColumnFilterMethod"
          :width="listWidth"
          sortable
        >
          <template #filter="{ $panel, column }">
            ≥
            <input
              v-model="option.value"
              v-for="(option, index) in column.filters"
              :key="'hero-92423e1b31d3e7fdac76d2ac26c45699-' + index"
              type="type"
              placeholder="0"
              @input="$panel.changeOption($event, !!option.value, option)"
              class="app-fa42596ed8c1eff3ed8b93bba913bde3"
            />
            %
          </template>
          <template #default="{ row }">
            <div
              :style="{
                position: 'relative',
              }"
            >
              <span class="app-9ec86c2c7ff0fcaa177028a0b2d091b8">
                {{ row.allPickRate[1] }}/8
              </span>
              <!--
                <div
                  v-if="row.change.updateValue != 0"
                  :style="
                    row.change.updateType == 2
                      ? { color: 'red !important' }
                      : { color: '#1680d1 !important' }
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
                -->
            </div>
          </template>
        </vxe-table-column>

        <vxe-table-column
          field="allAvg"
          title="排名"
          :filters="[{ value: 0 }]"
          :filter-method="onTableColumnFilterMethod"
          :width="listWidth"
          sortable
        >
          <template #filter="{ $panel, column }">
            ≥
            <input
              v-model="option.value"
              v-for="(option, index) in column.filters"
              :key="'hero-92423e1b31d3e7fdac76d2ac26c45699-' + index"
              type="type"
              placeholder="0"
              @input="$panel.changeOption($event, !!option.value, option)"
              class="app-fa42596ed8c1eff3ed8b93bba913bde3"
            />
            %
          </template>
        </vxe-table-column>

        <vxe-table-colgroup :title="$appMsg.tips[1004] + '(%)'">
          <vxe-table-column
            field="pickRate_4"
            title="吃分"
            :filters="[{ value: 0 }]"
            :filter-method="onTableColumnFilterMethod"
            :width="listWidth"
            sortable
          >
            <template #filter="{ $panel, column }">
              ≥
              <input
                v-model="option.value"
                v-for="(option, index) in column.filters"
                :key="'hero-92423e1b31d3e7fdac76d2ac26c45699-' + index"
                type="type"
                placeholder="0"
                @input="$panel.changeOption($event, !!option.value, option)"
                class="app-fa42596ed8c1eff3ed8b93bba913bde3"
              />
              %
            </template>
          </vxe-table-column>

          <vxe-table-column
            field="pickRate_1"
            title="吃鸡"
            :filters="[{ value: 0 }]"
            :filter-method="onTableColumnFilterMethod"
            :width="listWidth"
            sortable
          >
            <template #filter="{ $panel, column }">
              ≥
              <input
                v-model="option.value"
                v-for="(option, index) in column.filters"
                :key="'hero-92423e1b31d3e7fdac76d2ac26c45699-' + index"
                type="type"
                placeholder="0"
                @input="$panel.changeOption($event, !!option.value, option)"
                class="app-fa42596ed8c1eff3ed8b93bba913bde3"
              />
              %
            </template>
          </vxe-table-column>
        </vxe-table-colgroup>

        <!--
        <vxe-table-column title="#" type="seq" width="75" />
        -->
      </vxe-table>
    </div>

    <div class="ranking-c654dca3c049bcd2c955393eeb98ee68">
      <van-action-sheet
        v-model="showInfo.equipmentActionSheet"
        :description="
          tableDataRow.name +
          ' (' +
          tableDataRow.id +
          ') ' +
          $t('how-to-operate')
        "
        :actions="actionSheetActions"
        :close-on-click-action="true"
        @select="onActionSheetSelect"
      />
    </div>

    <div class="ranking-84226baebc9c90dd5bba99237b39725a">
      <van-action-sheet
        v-model="showInfo.skillActionSheet"
        :description="
          tableDataRow.name +
          ' 的备战 (' +
          $appConfigInfo.appInfo.updateInfo.weekly +
          ' 更新，可能有老数据)'
        "
      >
        <template #default>
          <GameWzryHeroEquipmentListOne
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
  name: "rankingZhuangBeiKu",
  components: {
    GameWzryHeroEquipmentListOne: () =>
      import("@/components/Game/Wzry/Hero/EquipmentList_One.vue"),
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
        //{ name: "更新记录", subname: "NGA @破笼之鸟", value: 2 },
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
        this.getRanking(53, 0, 0, 0);
      }
    },
    getRanking: function (aid = 53, bid = 0, cid = 0, did = 0) {
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
        return row.type == option.label;
      }

      if (column.property == "name") {
        return row.name.indexOf(option.value) > -1;
      }

      if (column.property == "allPickRate[1]") {
        return row.allPickRate[1] >= option.value;
      }

      if (column.property == "allAvg") {
        return row.allAvg >= option.value;
      }

      if (column.property == "pickRate_1") {
        return row.pickRate_1 >= option.value;
      }

      if (column.property == "pickRate_4") {
        return row.pickRate_4 >= option.value;
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
          "?type=3&bid=2&equipmentId=" +
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