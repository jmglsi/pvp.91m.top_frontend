<template>
  <div class="hero-inscription app-inscription">
    <vxe-table
      ref="refHeroInscription"
      :loading="tableData.loading"
      :data="tableData.result.rows"
      height="543"
    >
      <vxe-table-column
        title="玩家"
        field="gamePlayerName"
        fixed="left"
        width="125"
      />

      <vxe-table-column title="#" type="seq" width="50" />

      <vxe-table-column
        title="战力"
        field="heroFightPower"
        width="150"
        sortable
      />

      <vxe-table-colgroup title="配置">
        <vxe-table-column
          title="蓝色"
          field="blue"
          :width="listWidth"
          sortable
        />

        <vxe-table-column
          title="绿色"
          field="green"
          :width="listWidth"
          sortable
        />

        <vxe-table-column
          title="红色"
          field="red"
          :width="listWidth"
          sortable
        />
      </vxe-table-colgroup>
    </vxe-table>
  </div>
</template>

<script>
export default {
  name: "HeroInscription",
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
        if (!newValue.heroId) return;

        this.getRanking(newValue.heroId, 7, 0, 0, 0);
      },
    },
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
    };
  },
  created() {
    this.listWidth = this.$appInitTableWidth(750) - 10;
  },
  methods: {
    getRanking: function (heroId = 111, aid = 7, bid = 0, cid = 0, did = 0) {
      let appConfigInfo = this.$appConfigInfo,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + heroId
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
            did +
            "&heroId=" +
            heroId
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;
            this.tableData.loading = false;

            this.$appSetLocalStorage(
              "ranking-" +
                aid +
                "-" +
                bid +
                "-" +
                cid +
                "-" +
                did +
                "-" +
                heroId,
              this.tableData
            );
          } else {
            this.$appOpenUrl("温馨提示", status.msg, { path: "/my" }, 1);
          }
        });
    },
  },
};
</script>