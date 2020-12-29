<template>
  <div class="hero-skill">
    <vxe-grid
      ref="heroSkill"
      :data="tableData.result.rows"
      :sort-config="{ trigger: 'cell' }"
      height="547"
      auto-resize
    >
      <vxe-table-column
        title="技能"
        field="score"
        fixed="left"
        width="50"
        sortable
      >
        <template v-slot="{ row }">
          <img
            v-lazy="row.img"
            width="25"
            height="25"
            class="ranking-b798abe6e1b1318ee36b0dcb3fb9e4d3"
          />
        </template>
      </vxe-table-column>

      <vxe-table-column title="#" type="seq" width="50" />

      <vxe-table-column title="比率 (%)">
        <vxe-table-column title="出场" field="pickRate" sortable />
        <vxe-table-column title="胜率" field="winRate" sortable />
      </vxe-table-column>

      <vxe-table-column title="MVP (%)">
        <vxe-table-column title="净胜" field="mvpRate" sortable />
      </vxe-table-column>
    </vxe-grid>
  </div>
</template>

<script>
export default {
  name: "HeroList",
  props: {
    heroSkill: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    listenChange() {
      const { heroSkill } = this;
      return { heroSkill };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (newValue.heroSkill == []) return;

        this.tableData.result.rows = newValue.heroSkill;
      },
    },
  },
  data() {
    return {
      tableData: {
        result: {
          rows: [],
        },
      },
    };
  },
};
</script>
