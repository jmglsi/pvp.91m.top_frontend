<template>
  <div class="ranking-pz app-pz">
    <div class="ranking-3ede7e85e7bd91a85bce2a134d18fb18">
      <vxe-table
        ref="refWzryPaiZi"
        id="refWzryPaiZi"
        :custom-config="{ storage: true }"
        :data="tableData.result.rows"
        :height="clientHeight"
        :loading="tableData.loading"
        empty-text="点击上方筛选"
        @cell-click="onTableCellClick"
      >
        <vxe-table-column field="name" title="#" width="75" sortable>
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
                  //error: row.img,
                  src: row.img,
                }"
                width="50"
                height="50"
                class="app-border-radius ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
              />
            </div>
          </template>
        </vxe-table-column>

        <vxe-table-column
          field="fightPowerValue"
          title="战力"
          width="75"
          sortable
        />

        <vxe-table-column
          field="updateTime"
          title="更新时间"
          :width="listWidth"
          sortable
        />

        <vxe-table-column title="#" type="seq" width="75" />
      </vxe-table>
    </div>

    <div class="ranking-84226baebc9c90dd5bba99237b39725a">
      <van-action-sheet
        v-model="showInfo.actionSheet"
        :description="tableDataRow.name + ' ' + $t('how-to-operate')"
      >
        <template #default>
          <GameWzryHeroFightPower
            v-if="showInfo.actionSheet"
            :extraId="tableDataRow.id"
            :extraType="did"
          />
        </template>
      </van-action-sheet>
    </div>
  </div>
</template>

<script>
export default {
  name: "rankingPaiZi",
  components: {
    GameWzryHeroFightPower: () =>
      import("@/components/Game/Wzry/Hero/FightPower.vue"),
  },
  data() {
    return {
      tableData: {
        loading: false,
        result: {
          rows: [],
        },
        color: {},
        column: [],
        columns: [],
      },
      tableDataRow: {
        id: null,
        name: this.$t("loading"),
      },
      listWidth: 0,
      clientHeight: 0,
      showInfo: {
        actionSheet: false,
      },
    };
  },
  props: {
    bid: {
      type: Number,
      default: 0,
    },
    cid: {
      type: Number,
      default: 0,
    },
    did: {
      type: Number,
      default: 0,
    },
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
      const { isSmallMode, bid, cid, did, refresh } = this;
      return { isSmallMode, bid, cid, did, refresh };
    },
  },
  watch: {
    listenChange: {
      immediate: false,
      handler(newValue) {
        let agree = this.$appConfigInfo.appInfo.isReadme;

        if (agree == 1 && newValue.refresh == 1) {
          //if (newValue.refresh == 1) {
          this.getRanking(4, newValue.bid, newValue.cid, newValue.did);
        }
      },
    },
  },
  created() {
    this.clientHeight = this.$appInitTableHeight(10);
    this.listWidth = this.$appInitTableWidth(350);
  },
  mounted() {
    this.getRanking(4, this.bid, this.cid, this.did);
  },
  methods: {
    getRanking: function (aid = 4, bid = 0, cid = 0, did = 0) {
      if (bid == 0 || cid == 0 || did == 0) return;

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

            this.$message.info(this.$appMsg.info[1019]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onTableCellClick: function ({ row }) {
      this.tableDataRow = row;

      this.showInfo.actionSheet = true;
    },
  },
};
</script>