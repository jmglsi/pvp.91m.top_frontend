<template>
  <div class="ranking-pz app-pz">
    <div class="ranking-3ede7e85e7bd91a85bce2a134d18fb18">
      <vxe-table
        ref="refPaiZi"
        :loading="tableData.loading"
        :data="tableData.result.rows"
        :height="clientHeight"
        empty-text="点击上方筛选"
        @cell-click="onCellClick"
      >
        <vxe-table-column
          title="英雄"
          field="name"
          fixed="left"
          width="75"
          sortable
        >
          <template #default="{ row }">
            <div
              :class="
                isSmallMobile ? 'app-1de7efdd403ec02d55f5c1d9557a2fc4' : null
              "
            >
              <img
                v-lazy="row.img"
                width="50"
                height="50"
                class="ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
              />
            </div>
          </template>
        </vxe-table-column>

        <vxe-table-column title="#" type="seq" width="75" />

        <vxe-table-column
          title="战力"
          field="fightPowerValue"
          width="75"
          sortable
        />

        <vxe-table-column
          title="更新时间"
          field="updateTime"
          :width="listWidth"
          sortable
        />
      </vxe-table>
    </div>

    <div class="ranking-84226baebc9c90dd5bba99237b39725a">
      <van-action-sheet
        v-model="showInfo.fightPowerMenu"
        :title="tableDataRow.name + ' 如何操作'"
        safe-area-inset-bottom
      >
        <HeroFightPower
          v-if="showInfo.fightPowerMenu"
          :heroId="tableDataRow.id"
          :fightPowerType="did"
        />
      </van-action-sheet>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaiZi",
  components: {
    HeroFightPower: () => import("@/components/Hero/FightPower.vue"),
  },
  data() {
    return {
      tableData: {
        color: {},
        column: [],
        columns: [],
        loading: false,
        result: {
          rows: [],
        },
      },
      tableDataRow: {
        id: 0,
        name: "加载中...",
      },
      listWidth: 0,
      clientHeight: 0,
      showInfo: {
        fightPowerMenu: false,
      },
    };
  },
  props: {
    isSmallMobile: {
      type: Boolean,
      default: false,
    },
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
  },
  computed: {
    listenChange() {
      const { isSmallMobile, bid, cid, did, refresh } = this;
      return { isSmallMobile, bid, cid, did, refresh };
    },
  },
  watch: {
    listenChange: {
      immediate: false,
      handler(newValue) {
        this.getRanking(4, newValue.bid, newValue.cid, newValue.did);
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

            this.$message.info(this.$appMsg.info[1019]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onCellClick: function ({ row }) {
      this.tableDataRow = row;

      this.showInfo.fightPowerMenu = true;
    },
  },
};
</script>