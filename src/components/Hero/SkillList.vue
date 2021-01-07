<template>
  <div class="hero-skill app-skill">
    <vxe-grid
      ref="heroSkill"
      :loading="tableData.loading"
      :data="tableData.result.rows"
      height="547"
    >
      <vxe-table-column title="技能" field="score" fixed="left" width="50">
        <template v-slot="{ row }">
          <img
            v-lazy="row.img"
            width="25"
            height="25"
            class="hero-skill-4dba5f40eab9da71ab3d5db2d3883093"
          />
        </template>
      </vxe-table-column>

      <vxe-table-column title="#" type="seq" width="50" />

      <vxe-table-column title="比率 (%)">
        <vxe-table-column
          title="出场"
          field="pickRate"
          :width="listWidth"
          sortable
        />
        <vxe-table-column
          title="胜率"
          field="winRate"
          :width="listWidth"
          sortable
        />
      </vxe-table-column>

      <vxe-table-column title="MVP (%)">
        <vxe-table-column
          title="净胜"
          field="mvpRate"
          :width="listWidth"
          sortable
        />
      </vxe-table-column>
    </vxe-grid>
  </div>
</template>

<script>
export default {
  name: "HeroSkill",
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
        if (newValue.heroId == 0) return;

        this.getHeroSkill(newValue.heroId);
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
    this.listWidth = this.$appInitTableWidth(350);
  },
  methods: {
    getHeroSkill: function (heroId = 111) {
      this.$axios
        .post(this.$appApi.pvp.getHeroSkill + "&heroId=" + heroId)
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.tableData = data;

            this.tableData.loading = false;
          } else {
            this.$appOpenUrl(status.msg, null, { path: "/my" }, 1);
          }
        });
    },
  },
};
</script>
