<template>
  <div class="hero-equipmentListOne app-equipmentListOne">
    <van-button
      :style="{
        position: 'absolute',
        left: '5px',
        top: '65px',
        zIndex: 9999999,
      }"
      round
      color="orange"
      size="small"
      @click="show == 'mind' ? (show = 'list') : (show = 'mind')"
    >
      切换
    </van-button>

    <HeroMindMap
      v-if="show == 'mind'"
      :extraId="extraInfo.id"
      :extraType="extraInfo.type"
      :extraList="tableData.result.rows"
    />

    <div v-else-if="show == 'list'">
      <vxe-table
        ref="refHeroEquipmentListOne"
        id="refHeroEquipmentListOne"
        :custom-config="{ storage: true }"
        :data="tableData.result.rows"
        :loading="tableData.loading"
        @cell-click="onTableCellClick"
        height="443"
      >
        <vxe-table-column title="英雄" field="heroId" fixed="left" width="50">
          <template #default="{ row }">
            <div
              :style="{
                position: 'relative',
              }"
            >
              <img
                v-lazy="{
                  //error: '//game.gtimg.cn/images/yxzj/img201606/heroimg/' + row.heroId + '/' + row.heroId + '.jpg',
                  src:
                    '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                    row.heroId +
                    '/' +
                    row.heroId +
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
          :title-prefix="{ content: $appMsg.tips[1001] }"
          title="装备"
          field="equipmentId"
          fixed="left"
          width="50"
        >
          <template #default="{ row }">
            <div
              :style="{
                position: 'relative',
              }"
            >
              <img
                v-lazy="{
                  //error: '//game.gtimg.cn/images/yxzj/img201606/itemimg/' + row.equipmentId + '.jpg',
                  src:
                    '//game.gtimg.cn/images/yxzj/img201606/itemimg/' +
                    row.equipmentId +
                    '.jpg',
                }"
                width="25"
                height="25"
                class="app-border-radius"
              />
            </div>
          </template>
        </vxe-table-column>

        <vxe-table-column title="#" type="seq" width="50" />

        <vxe-table-column
          title="顺位"
          field="maxIndex"
          :width="listWidth"
          :title-prefix="{ content: $appMsg.tips[1012] }"
          sortable
        />

        <vxe-table-colgroup
          title="全部 (%)"
          :title-prefix="{ content: $appMsg.tips[1002] }"
        >
          <vxe-table-column
            title="出场"
            field="allPickRate"
            :filters="[{ value: 1, checked: true }]"
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
                :key="'hero-92089e17c1e005ddc0336c65dfa6b63b-' + index"
                type="type"
                placeholder="0"
                @input="$panel.changeOption($event, !!option.value, option)"
                class="app-fa42596ed8c1eff3ed8b93bba913bde3"
              />
              %
            </template>
          </vxe-table-column>
        </vxe-table-colgroup>

        <vxe-table-colgroup
          v-for="(data, index) in 6"
          :key="'hero-5306afd97611c2ddc21400d0fcd9139c-' + index"
          :title="'格子_' + (index + 1).toString() + ' (%)'"
        >
          <vxe-table-column
            title="占比"
            :field="'pickRate_' + index"
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
                :key="'hero-ec3049b6fc592a98856d838ecfbfc3de-' + index"
                type="type"
                placeholder="0"
                @input="$panel.changeOption($event, !!option.value, option)"
                class="app-fa42596ed8c1eff3ed8b93bba913bde3"
              />
              %
            </template>
          </vxe-table-column>

          <vxe-table-column
            title="胜率"
            :field="'winRate_' + index"
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
                :key="'hero-92089e17c1e005ddc0336c65dfa6b63b-' + index"
                type="type"
                placeholder="0"
                @input="$panel.changeOption($event, !!option.value, option)"
                class="app-fa42596ed8c1eff3ed8b93bba913bde3"
              />
              %
            </template>
          </vxe-table-column>
        </vxe-table-colgroup>
      </vxe-table>
    </div>

    <van-action-sheet
      v-model="showInfo.actionSheet"
      title=" "
      :style="{
        maxHeight: '450px',
      }"
    >
      <template #default>
        <div class="app-044a82dc9b34eebf2c54fe2c3c904368">
          <img
            v-lazy="{
              //error: '//game.gtimg.cn/images/yxzj/img201606/heroimg/' + lineData.heroId + '/' + lineData.heroId + '.jpg',
              src:
                '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                lineData.heroId +
                '/' +
                lineData.heroId +
                '.jpg',
            }"
            width="25"
            height="25"
            class="app-border-radius"
          />
          &nbsp;和&nbsp;
          <img
            v-lazy="{
              //error: '//game.gtimg.cn/images/yxzj/img201606/itemimg/' + lineData.equipmentId + '.jpg',
              src:
                '//game.gtimg.cn/images/yxzj/img201606/itemimg/' +
                lineData.equipmentId +
                '.jpg',
            }"
            width="25"
            height="25"
            class="app-border-radius"
          />
          &nbsp;的契合度
        </div>

        <div class="app-2acf2be2c6fdd22f4a6282a72817bdb1">
          <ChartsEquipmentLine :extraList="lineDataRow" />
        </div>

        <div
          :style="{
            marginTop: '-10px !important',
          }"
          class="app-61046f2f5eefe3dc179e52af32241062 hero-386260160edfd75a6b62facc140fd3a4"
        >
          <span class="app-e4c9479b11955648dad558fe717a4eb2">
            <p>
              1.格子出场不高但是胜率接近 100%
              可能是因为样本较少、针对出、还没出完就结束的
            </p>
            <p>2.全部出场 > 100% 是因为买了多件，例如：双无尽蒙犽</p>
            <p>3.核心装在前面可能是因为先买的小件后面合的</p>
            <p>4.保命装在前面可能是因为最后卖了前几件换的</p>
            <p>5.少数傻逼最后会卖掉，甚至买其他职业的装备</p>
            <p>6.请结合 顺位、占比、胜率、自身体感 来看</p>
          </span>
        </div>
      </template>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  name: "HeroEquipmentList_One",
  props: {
    extraId: {
      type: Number,
      default: 0,
    },
    extraType: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    listenChange() {
      const { extraId, extraType } = this;
      return { extraId, extraType };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (!newValue.extraId) return;

        if (this.$appConfigInfo.appInfo.isReadme == 1) {
          this.show = "list";

          this.getRanking(6, newValue.extraType, 0, 0, newValue.extraId);
        }
      },
    },
  },
  components: {
    HeroMindMap: () => import("@/components/Hero/MindMap.vue"),
    ChartsEquipmentLine: () => import("@/components/Charts/EquipmentLine.vue"),
  },
  data() {
    return {
      show: "mind",
      listWidth: 0,
      tableData: {
        loading: false,
        result: {
          rows: [],
        },
      },
      lineData: {
        heroId: null,
        equipmentId: null,
      },
      lineDataRow: {},
      extraInfo: {
        id: this.extraId,
        type: 1,
      },
      showInfo: {
        actionSheet: false,
      },
    };
  },
  created() {
    this.listWidth = this.$appInitTableWidth(1450);
  },
  methods: {
    getRanking: function (aid = 6, bid = 1, cid = 0, did = 0, id = 111) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + id
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
            this.tableData.updateTime = ts;

            this.$appSetLocalStorage(
              "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + id,
              this.tableData
            );

            bid == 1
              ? (tipsText = this.$appMsg.success[1001])
              : (tipsText = this.$appMsg.success[1002]);

            this.$message.success(tipsText);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onTableColumnFilterMethod: function ({ option, row, column }) {
      if (column.property == "allPickRate") {
        return row.allPickRate >= option.value;
      }

      if (column.property == "allWinRate") {
        return row.allWinRate >= option.value;
      }

      if (column.property == "pickRate_0") {
        return row.pickRate_0 >= option.value;
      }

      if (column.property == "winRate_0") {
        return row.winRate_0 >= option.value;
      }

      if (column.property == "pickRate_1") {
        return row.pickRate_1 >= option.value;
      }

      if (column.property == "winRate_1") {
        return row.winRate_1 >= option.value;
      }

      if (column.property == "pickRate_2") {
        return row.pickRate_2 >= option.value;
      }

      if (column.property == "winRate_2") {
        return row.winRate_2 >= option.value;
      }

      if (column.property == "pickRate_3") {
        return row.pickRate_3 >= option.value;
      }

      if (column.property == "winRate_3") {
        return row.winRate_3 >= option.value;
      }

      if (column.property == "pickRate_4") {
        return row.pickRate_4 >= option.value;
      }

      if (column.property == "winRate_4") {
        return row.winRate_4 >= option.value;
      }

      if (column.property == "pickRate_5") {
        return row.pickRate_5 >= option.value;
      }

      if (column.property == "winRate_5") {
        return row.winRate_5 >= option.value;
      }
    },
    onTableCellClick: function ({ row, column }) {
      if (column.property == "heroId") {
        this.extraInfo.id = row.heroId;
        this.extraInfo.type = 1;

        return this.getRanking(6, this.extraInfo.type, 0, 0, row.heroId);
      }

      if (column.property == "equipmentId") {
        this.extraInfo.id = row.equipmentId;
        this.extraInfo.type = 2;

        return this.getRanking(6, this.extraInfo.type, 0, 0, row.equipmentId);
      }

      this.lineData.heroId = row.heroId;
      this.lineData.equipmentId = row.equipmentId;

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

      this.showInfo.actionSheet = true;
    },
  },
};
</script>