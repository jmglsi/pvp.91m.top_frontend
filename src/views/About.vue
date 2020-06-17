<template>
  <div class="about">
    <van-tabs
      v-model="aboutTabsActive"
      :border="false"
      :ellipsis="false"
      swipeable
      color="rgb(222,177,81)"
    >
      <van-tab title="巅峰赛 · 趋势">
        <van-cell title="版本弱势" label="低出场(<平均) & 低胜率。" />
        <van-cell title="版本强势" label="高出场(>平均) & 高胜率。" />
        <van-cell title="针对选择" label="低出场(<平均) & 高胜率。" />
        <van-cell title="非禁必选" label="低出场 + 高禁用接近100% & 高胜率。" />
      </van-tab>

      <van-tab title="排行 · 巅峰赛">
        <van-cell title="Q: 技能哪来的?" label="A: 自动生成主/副两个技能。" />
        <van-cell title="Q: 数据哪来的?" label="A: 来自营地,部分玩家隐藏了战绩,仅供参考。" />
        <van-cell title="Q: 数据是全分段的吗?" label="A: 否,是巅峰赛前2.5%的部分玩家,日均 7000 - 10000+ 场次。" />
        <van-cell title="Q: 上分用哪些英雄容易?" label="A: 首页默认热度(禁用/出场/胜率计算得出)排序,看看有没有喜欢的。" />
        <van-cell title="Q: 经济是怎么算出来的?" label="A: 营地无法抓取金币,只能根据出装反算出保底经济,六神装后会溢出,仅供参考。" />
        <van-cell title="Q: 0 的英雄是真的没用吗?" label="A: 否,因为样本数量,只能说明该英雄禁用出场胜率接近 0。" />
      </van-tab>

      <van-tab title="排行 · 关系">
        <van-cell title="Q: 关系是实时的吗?" label="A: 每隔一定时间(比如30分钟)会自动更新数据。" />
        <van-cell title="Q: 找不到我想要的关系,如何添加?" label="A: 请以小写的逗号【,】分开,然后搜索 例如:瑶,马克。" />
        <van-cell
          title="Q: 队友和对手有什么差别?"
          label="A: 队友是两个英雄都在同一方,对手则是一边一个。对手还可以看出克制关系,部分同时出场太少,仅供参考。"
        />
      </van-tab>

      <van-tab title="标签 · 定义">
        <van-cell title="关爱协会" label="场均击杀前几。" />
        <van-cell title="闷声发财" label="低出场 & 低禁用 & 高胜率。" />
        <van-cell title="炸鱼首选" label="低出场 & 排位胜率 > 巅峰赛胜率。" />
        <van-cell title="高地保安" label="场均经济前几 / 同职业输出前几 & 时长(>15) & 中等出场。" />
        <van-cell title="其它" label="根据英雄近期特点生成的标签(ヽ（≧□≦）ノ)。" />
      </van-tab>

      <van-tab title="全局BP模拟器">
        <vue-markdown :source="statementBp" style="padding: 25px;" />
      </van-tab>
    </van-tabs>
    <AppBottomTabbar />
  </div>
</template>

<style scoped>
.about {
  text-align: left;
}
</style>

<script>
export default {
  name: "About",
  components: {
    VueMarkdown: resolve => require(["vue-markdown"], resolve),
    AppBottomTabbar: resolve =>
      require(["@/components/App/BottomTabbar.vue"], resolve)
  },
  data() {
    return {
      aboutTabsActive: 0,
      statementBp: ""
    };
  },
  activated() {
    this.aboutTabsActive = parseInt(this.$route.query.type);
  },
  mounted() {
    this.getStatementBp();
  },
  methods: {
    getStatementBp: function() {
      this.axios.get("/md/statement_bp.md?ts=" + this.appTs).then(ret => {
        this.statementBp = ret.data;
      });
    }
  }
};
</script>