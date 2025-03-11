<template>
  <div class="ranking-wzry app-wzry">
    <div class="ranking-e20c0bfa2eeda7a13463d390a5bbfc4f">
      <!--
        style="background-color: rgb(250, 250, 250) !important;"
      -->
      <vxe-toolbar
        size="mini"
        style="background-color: transparent"
        ref="refWzryGameToolbar"
        custom
      />
    </div>

    <div class="ranking-e10ca73b79369d2183f81ca10fb587af">
      <vxe-table
        ref="refWzryGame"
        id="refWzryGame"
        :custom-config="{ storage: true }"
        :expand-config="{ accordion: true }"
        :data="tableData.result.rows"
        :height="clientHeight"
        :loading="tableData.loading"
        :cell-class-name="onTableCellClassName"
        @cell-click="onTableCellClick"
        @custom="onTableCustom"
      >
        <vxe-table-column
          fixed="left"
          field="allScore"
          title="#"
          :filters="[{ value: '' }]"
          :filter-method="onTableColumnFilterMethod"
          width="75"
          sortable
        >
          <template #filter="{ $panel, column }">
            <input
              v-model="option.value"
              v-for="(option, index) in column.filters"
              :key="'hero-687a3138e43e7447a967a510bf02ac98-' + index"
              type="type"
              placeholder="试试 英雄名/别名"
              @input="$panel.changeOption($event, !!option.value, option)"
              class="app-fa42596ed8c1eff3ed8b93bba913bde3"
              :style="{ width: '125px !important' }"
            />
          </template>
          <template #default="{ row }">
            <van-tag
              mark
              v-if="row.tag.text && dateInfo.day.length == 0"
              :color="row.tag.color"
              type="primary"
              class="app-e4d23e841d8e8804190027bce3180fa5"
            >
              {{ row.tag.text }}
            </van-tag>

            <div
              :style="{
                position: 'relative',
              }"
              :class="
                isSmallMode
                  ? 'app-1de7efdd403ec02d55f5c1d9557a2fc4 ranking-0b22b207c2b785ceff7a241980f23d14'
                  : null
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
              <div class="ranking-713dd4d0b2e842c08da62ddeec872331">
                <img
                  v-if="dateInfo.day.length == 0"
                  v-lazy="{
                    //error: row.skill[0].img,
                    src: row.skill[0].img,
                  }"
                  width="15"
                  height="15"
                  class="app-border-radius ranking-95a25d46f98b0ec553d892cc45037d57 ranking-35af5e6c0fc290aa4f2e38d4c8296a03"
                />
                <span
                  v-if="dateInfo.day.length == 0"
                  class="app-0fc3cfbc27e91ea60a787de13dae3e3c app-5f19eaf71f40d74d66be84db52b3ad87 ranking-043052eea2d064cab23119e56f4f640e"
                >
                  {{ row.skill[0].pickRate }}%
                </span>
                <img
                  v-if="dateInfo.day.length == 0"
                  v-lazy="{
                    //error: row.skill[1].img,
                    src: row.skill[1].img,
                  }"
                  width="15"
                  height="15"
                  class="app-border-radius ranking-95a25d46f98b0ec553d892cc45037d57 ranking-fbfe7b256ce6b4df1d03d8022163c6d2"
                />
                <span
                  v-if="dateInfo.day.length == 0"
                  class="app-0fc3cfbc27e91ea60a787de13dae3e3c app-5f19eaf71f40d74d66be84db52b3ad87 ranking-dabb6e25dffefe5b4821b7062afbdaef"
                >
                  {{ row.skill[1].pickRate }}%
                </span>
              </div>
            </div>
          </template>
        </vxe-table-column>

        <vxe-table-colgroup
          :title-prefix="{
            content:
              $appMsg.tips[1015] +
              '\n' +
              $appMsg.tips[1010] +
              '\n-\n' +
              $appMsg.tips[1018],
          }"
        >
          <template #header>
            <div class="ranking-f4a47ff1f3e53bfd1dabc667a6bdbc81">
              <span
                @click="
                  $appOpenUrl(
                    $t('open-url.title'),
                    null,
                    { path: url.openSource[0] },
                    0
                  )
                "
                class="ranking-6ad9203f996965a0c641bbf73cc1143f"
              >
                {{ $appMsg.tips[1004] }}(%)
              </span>
              <van-tag
                plain
                round
                type="warning"
                size="medium"
                @click="showInfo.calendar = true"
                class="ranking-f5e0d4e9cee528a53f64ea02550517bf"
              >
                {{ dateInfo.day || $appConfigInfo.appInfo.updateInfo.daily }}
                {{ dateInfo.day.length > 0 ? "📅" : "更新，算法测试中" }}
              </van-tag>
            </div>
          </template>

          <vxe-table-column
            field="trend"
            title="热度"
            :title-prefix="{
              content:
                $appMsg.tips[1016] +
                '\n当前平均分数 ≈ ' +
                ($appConfigInfo.appInfo.updateInfo.avgScore || 0),
            }"
            :visible="dateInfo.day.length == 0"
            width="100"
            sortable
          >
            <template #default="{ row, rowIndex }">
              <div
                :style="{
                  position: 'relative',
                }"
              >
                <span v-if="row.id && row.id < 900">
                  <lazy-component class="hero-2a23eb5062a0258f23f4969c4c60aa2e">
                    <span
                      class="app-5f19eaf71f40d74d66be84db52b3ad87 ranking-8302b5f225fa915b2cf1a42525d4e0d3"
                    >
                      T{{ row.gradient }}
                    </span>
                    <img
                      v-if="row.trend > 0"
                      v-lazy="
                        $appCache + '/img/icons-app/hot_' + row.trend + '.png'
                      "
                      width="15"
                      height="15"
                      class="ranking-3d5f1ffeadf58eb64ef57aef7e53a31e"
                    />
                    <ChartsWzryChartsRankingLine
                      :extraType="row.trend"
                      :charts="{
                        columns: lineData.result.columns,
                        rows: lineData.result.rows[row.id],
                      }"
                    />
                    <div
                      class="app-5f19eaf71f40d74d66be84db52b3ad87 app-0e1a8b3f7f6162bf4b88d3d001b88374"
                    >
                      {{ rowIndex + 1 }}
                    </div>
                  </lazy-component>
                </span>
                <span v-else>-</span>
              </div>
            </template>
          </vxe-table-column>

          <vxe-table-column
            field="allWinRate"
            title="胜率"
            :width="listWidth"
            :sortable="tableData.result.whiteList"
          >
            <template #filter="{ $panel, column }">
              ≥
              <input
                v-model="option.value"
                v-for="(option, index) in column.filters"
                :key="'hero-6b557157ba74177968c0e2cb78fa87b7-' + index"
                type="type"
                placeholder="0"
                @input="$panel.changeOption($event, !!option.value, option)"
                class="app-fa42596ed8c1eff3ed8b93bba913bde3"
              />
              %
            </template>
          </vxe-table-column>
          <vxe-table-column
            :field="'allBanRate[' + banInfo.index + ']'"
            :title="banInfo.title"
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
                :key="'hero-687a3138e43e7447a967a510bf02ac98-' + index"
                type="type"
                placeholder="0"
                @input="$panel.changeOption($event, !!option.value, option)"
                class="app-fa42596ed8c1eff3ed8b93bba913bde3"
              />
              %
            </template>

            <template #default="{ row }">
              <span class="ranking-1af981c4a03f0457557be06e1096edac">
                {{ row.allBanRate[banInfo.index] }}
              </span>
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="allPickRate"
            title="出场"
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
                :key="'hero-f55d5cafb56611ebf0534588e49d4121-' + index"
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
                <lazy-component class="hero-2a23eb5062a0258f23f4969c4c60aa2e">
                  <a-popover trigger="click" placement="right">
                    <template #content>
                      <div
                        v-html="
                          dateInfo.day.length == 0 ? heroProficiency : '-'
                        "
                        class="ranking-7e8b2826e5b06781c19f0ee58f12f230"
                      />
                    </template>

                    <span class="app-9ec86c2c7ff0fcaa177028a0b2d091b8">
                      {{ row.allPickRate }}
                    </span>
                    <div
                      v-if="
                        row.change.updateValue != 0 && dateInfo.day.length == 0
                      "
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

                    <ChartsWzryHeroProgress
                      v-if="
                        row.id &&
                        row.id < 900 &&
                        bid < 4 &&
                        dateInfo.day.length == 0
                      "
                      :extraList="progressData.result.rows[row.id]"
                      :listWidth="heroProficiencyWidth - 10"
                    />
                  </a-popover>
                </lazy-component>
              </div>
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="allBPRate"
            title="禁选"
            :filters="[{ value: 2.5, checked: true }]"
            :filter-method="onTableColumnFilterMethod"
            width="100"
            sortable
          >
            <template #filter="{ $panel, column }">
              ≥
              <input
                v-model="option.value"
                v-for="(option, index) in column.filters"
                :key="'hero-687a3138e43e7447a967a510bf02ac98-' + index"
                type="type"
                placeholder="0"
                @input="$panel.changeOption($event, !!option.value, option)"
                class="app-fa42596ed8c1eff3ed8b93bba913bde3"
              />
              %
            </template>
            <template #default="{ row }">
              <span v-if="!row.updateId">0</span>
              <span v-else>{{ row.allBPRate }}</span>
            </template>
          </vxe-table-column>
        </vxe-table-colgroup>

        <!--
        <vxe-table-colgroup
          title="国百"
          :title-prefix="{
            content: $appMsg.tips[1025],
          }"
        >
          <vxe-table-column
            field="avgQQFightPower"
            title="估算"
            :width="listWidth"
            sortable
          />
        </vxe-table-colgroup>
        -->

        <vxe-table-colgroup
          :title-prefix="{
            content: $appMsg.tips[1022],
          }"
          title="输出"
        >
          <vxe-table-column
            field="totalHeroHurtCnt"
            title="对人"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            field="totalHurtCnt"
            title="全部"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            field="hurtTransRate"
            title="转化"
            :width="listWidth"
            sortable
          />
        </vxe-table-colgroup>

        <vxe-table-colgroup title="承伤">
          <vxe-table-column
            field="behurtPerDeath"
            title="每死"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            field="totalBehurtCnt"
            title="全部"
            :width="listWidth"
            sortable
          />
        </vxe-table-colgroup>

        <vxe-table-colgroup
          title="经济"
          :title-prefix="{
            content: $appMsg.tips[1017],
          }"
        >
          <vxe-table-column
            field="totalPriceMin"
            title="分均"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            field="totalPrice"
            title="全部"
            :width="listWidth"
            sortable
          />
        </vxe-table-colgroup>

        <vxe-table-colgroup title="团队">
          <vxe-table-column
            field="joinGamePercent"
            title="参团"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            field="usedtime"
            title="时长"
            :width="listWidth"
            sortable
          />
        </vxe-table-colgroup>

        <vxe-table-colgroup title="KDA">
          <vxe-table-column
            field="killCnt"
            title="击杀"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            field="deadCnt"
            title="死亡"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            field="assistCnt"
            title="助攻"
            :width="listWidth"
            sortable
          />
        </vxe-table-colgroup>

        <vxe-table-colgroup title="牌子 (%)">
          <vxe-table-column
            field="evaluateSilverRate"
            title="银牌"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            field="evaluateGoldRate"
            title="金牌"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            field="allBrandRate"
            title="全部"
            :width="listWidth"
            sortable
          />
        </vxe-table-colgroup>

        <vxe-table-colgroup title="MVP (%)">
          <vxe-table-column
            field="loseMvpRate"
            title="败方"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            field="winMvpRate"
            title="胜方"
            :width="listWidth"
            sortable
          />
          <vxe-table-column
            field="allMvpRate"
            title="全部"
            :width="listWidth"
            sortable
          />
        </vxe-table-colgroup>

        <vxe-table-column field="more" type="expand" title="更多" width="80">
          <template #content="{ row }">
            <div
              :style="{ width: $appWidth - 20 + 'px' }"
              class="ranking-19c5e5344dbdca6ef8d9ba5d989aea4d"
            >
              <GameWzryHeroMore :extraId="row.id" />
            </div>
          </template>
        </vxe-table-column>

        <!--
        <vxe-table-column title="#" type="seq" width="50" />
        -->

        <template #empty><div v-html="msg || '暂无数据'" /></template>
      </vxe-table>
    </div>

    <div class="ranking-ffab85bb31b6936dee15c689b1581675">
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
          <van-tabs
            v-model="extraInfo.model"
            v-if="extraInfo.model > -1"
            :ellipsis="false"
            @click="onTabsClick"
          >
            <div v-if="$appGameType == 'wzry'">
              <van-tab title="顺位">
                <GameWzryHeroBPIndex
                  v-if="cellInfo.index == 0 && extraInfo.model == 0"
                  :extraId="tableDataRow.id"
                />
              </van-tab>
              <van-tab title="打法">
                <GameWzryHeroGenreList
                  v-if="cellInfo.index == 0 && extraInfo.model == 1"
                  :extraId="tableDataRow.id"
                />
              </van-tab>
              <van-tab title="出装">
                <GameWzryHeroEquipmentListALL
                  v-if="cellInfo.index == 0 && extraInfo.model == 2"
                  :extraId="tableDataRow.id"
                />
              </van-tab>
              <van-tab title="出装 (单件)">
                <GameWzryHeroEquipmentListOne
                  v-if="cellInfo.index == 0 && extraInfo.model == 3"
                  :extraId="tableDataRow.id"
                  :extraType="1"
                />
              </van-tab>
              <van-tab>
                <template #title>
                  <span class="search-a1dc4f2906acdca0db3dc793f879a8ff">
                    国服 (备战)
                  </span>
                  <img
                    v-lazy="$appCache + '/img/icons-app/hot.png'"
                    width="13"
                    height="13"
                  />
                </template>

                <GameWzryHeroInscriptionList
                  v-if="cellInfo.index == 0 && extraInfo.model == 4"
                  :extraId="tableDataRow.id"
                />
              </van-tab>
              <van-tab
                title="更新调整"
                :to="'/hero/' + tableDataRow.id + '/info?show=heroUpdate'"
              >
                <!--
                <div class="app-0cecd2d48b0c852a513d34eec25042b7">
                  <HeroUpdate
                    v-if="cellInfo.index == 0 && extraInfo.model == 5"
                    :extraId="tableDataRow.id"
                    :updateId="tableDataRow.updateId"
                    :aid="1"
                  />
                </div>
              -->
              </van-tab>
            </div>
          </van-tabs>
        </template>
      </van-action-sheet>
    </div>

    <div
      v-if="cellInfo.index > -1 && showInfo.heroSameHobby"
      class="ranking-d742492b2526d57a222af9b54040b3b4"
    >
      <GameWzryHeroSameHobby :extraId="tableDataRow.id" />
    </div>

    <div class="ranking-61643949857abb484bacc753356d6071">
      <van-calendar
        v-model="showInfo.calendar"
        title="命运的齿轮开始转动"
        :formatter="onCalendarFormatter"
        :min-date="dateInfo.min"
        :max-date="dateInfo.max"
        @confirm="onConfirmClick"
      />
    </div>

    <div class="ranking-2a070514f71e4c264a78b600fc9a8e0d">
      <van-action-sheet
        v-model="showInfo.heroActionSheet"
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
        @open="onActionSheetOpen"
        @close="onActionSheetClose"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "rankingGame",
  components: {
    //ChartsWzryHeroLine: () => import("@/components/Charts/Wzry/HeroLine.vue"),
    ChartsWzryHeroProgress: () =>
      import("@/components/Charts/Wzry/HeroProgress.vue"),
    ChartsWzryChartsRankingLine: () =>
      import("@/components/Charts/Wzry/RankingLine.vue"),
    GameWzryHeroMore: () => import("@/components/Game/Wzry/Hero/More.vue"),
    GameWzryHeroBPIndex: () =>
      import("@/components/Game/Wzry/Hero/BPIndex.vue"),
    GameWzryHeroEquipmentListALL: () =>
      import("@/components/Game/Wzry/Hero/EquipmentList_All.vue"),
    GameWzryHeroEquipmentListOne: () =>
      import("@/components/Game/Wzry/Hero/EquipmentList_One.vue"),
    GameWzryHeroGenreList: () =>
      import("@/components/Game/Wzry/Hero/GenreList.vue"),
    GameWzryHeroInscriptionList: () =>
      import("@/components/Game/Wzry/Hero/InscriptionList.vue"),
    GameWzryHeroSameHobby: () =>
      import("@/components/Game/Wzry/Hero/SameHobby.vue"),
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
          this.getRanking(
            0,
            newValue.bid,
            newValue.cid,
            newValue.did,
            this.dateInfo.day
          );
        }
      },
    },
  },
  data() {
    return {
      msg: "",
      heroProficiency: this.$t("loading"),
      url: {
        openSource: ["https://docs.91m.top"],
      },
      tableData: {
        loading: false,
        result: {
          rows: [],
          whiteList: false,
        },
        color: {},
        column: [],
        columns: [],
      },
      tableDataRow: {
        id: null,
        name: this.$t("loading"),
      },
      progressData: {
        result: {
          rows: [],
        },
      },
      lineData: {
        result: {
          columns: ["日期", "热度"],
          rows: [],
        },
      },
      actionSheetActions: [
        { name: "热度趋势", subname: "左下角关注一下", value: 0 },
        { name: "搜索一下", subname: "看看都在聊什么", value: 1 },
        //{ name: "更新记录", subname: "NGA @EndMP", value: 2 },
        //{ name: "攻速阈值", subname: "NGA @小熊de大熊", value: 3 },
      ],
      width: 0,
      listWidth: 0,
      clientHeight: 0,
      heroProficiencyWidth: 0,
      dateInfo: {
        min: new Date(),
        max: new Date(),
        day: "",
      },
      showInfo: {
        calendar: false,
        skillActionSheet: false,
        heroActionSheet: false,
        heroSameHobby: false,
      },
      banInfo: {
        title: "双禁",
        index: 0,
      },
      cellInfo: {
        index: 0,
      },
      tabsInfo: {
        model: 0,
      },
      extraInfo: {
        model: 1,
      },
      tipsInfo: [0, 0, 0, 0, 0, 0],
    };
  },
  created() {
    this.clientHeight = this.$appInitTableHeight(10);
    this.initTableWidth();

    this.initPage();
  },
  mounted() {
    this.$nextTick(() => {
      this.getRanking(0, this.bid, this.cid, this.did, this.dateInfo.day);
      this.getRanking(15, 0, 0, 0, "");
      this.getHeroChartsLog(7);

      this.$refs.refWzryGame.connect(this.$refs.refWzryGameToolbar);
    });
    //手动将表格和工具栏进行关联
  },
  methods: {
    initPage: function () {
      let date = new Date();

      this.dateInfo.min = new Date(date.setMonth(date.getMonth() - 4));
      this.dateInfo.max = new Date(date.setMonth(date.getMonth() + 4));

      this.dateInfo.day = this.$appCookie("lastDataDay") || "";
    },
    initTableWidth: function () {
      this.listWidth = this.$appInitTableWidth(1450);
      this.heroProficiencyWidth = (this.listWidth || 80) - 20;

      if (localStorage.VXE_TABLE_CUSTOM_COLUMN_VISIBLE == undefined) return;

      let tableColumn = JSON.parse(
        localStorage.VXE_TABLE_CUSTOM_COLUMN_VISIBLE
      );

      if (tableColumn["refWzryGame"] == undefined) return;

      let visibleColumn = tableColumn.refWzryGame.split(",");

      !this.$appIsMobile && visibleColumn.length > 6
        ? (this.listWidth = 0)
        : (this.listWidth = 90);
    },
    getHeroProficiency: function (id = 111) {
      this.heroProficiency = this.$t("loading");

      this.$axios
        .post(
          this.$appApi.app.getHeroProficiency + "&id=" + encodeURIComponent(id)
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            let heroProficiency = res.data.data;
            this.heroProficiency = heroProficiency;

            //this.$message.success(this.$appMsg.success[1005]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    getRanking: function (aid = 0, bid = 0, cid = 0, did = 0, time = "") {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + time
        );

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.updateInfo.timeout) {
        if (aid == 15) {
          this.progressData = ls;
        } else {
          this.tableData = ls;
        }

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
            did,
          this.$qs.stringify({
            t: time,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status,
            newData = null;

          if (status.code == 200) {
            if (aid == 15) {
              this.progressData = data;
              this.progressData.loading = false;
              this.progressData.updateTime = ts;

              newData = this.progressData;
            } else {
              this.tableData = data;
              this.tableData.loading = false;
              this.tableData.updateTime = ts;

              this.tableData.result.whiteList = Boolean(data.result.whiteList);

              //this.$refs.refWzryGame.loadData(data.result.rows);

              newData = this.tableData;
            }

            this.$appSetLocalStorage(
              "ranking-" + aid + "-" + bid + "-" + cid + "-" + did + "-" + time,
              newData
            );

            if (aid == 0) {
              //this.$message.success(this.$appMsg.success[1005]);

              if (time) {
                this.$message.info(this.$appMsg.info[1030]);
              }
            }
          } else if ([2006, 2015].indexOf(status.code) > -1) {
            this.tableData.loading = false;
            this.msg = status.msg;
          } else {
            this.$message.error(status.msg);
          }
        });

      if (bid == 3 && cid == 0) {
        this.$message.info(this.$appMsg.info[1011]);
      }
    },
    getHeroChartsLog: function (aid = 6, bid = 0, cid = 0, did = 0) {
      let appConfigInfo = this.$appConfigInfo,
        ts = this.$appTs,
        ls = this.$appGetLocalStorage(
          "heroChartsLog-" + aid + "-" + bid + "-" + cid + "-" + did
        );

      if (ls && ts - ls.updateTime < appConfigInfo.appInfo.updateInfo.timeout) {
        this.lineData = ls;

        return;
      }

      this.$axios
        .post(
          this.$appApi.app.getHeroChartsLog +
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

          this.lineData.status = status;

          if (status.code == 200) {
            this.lineData = data;
            this.lineData.updateTime = ts;

            this.$appSetLocalStorage(
              "heroChartsLog-" + aid + "-" + bid + "-" + cid + "-" + did,
              this.lineData
            );
          } else {
            //this.$message.error(status.msg);
          }
        });
    },
    formatDate: function (date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onCalendarFormatter: function (day) {
      let oldDay = this.$appXEUtils.toDateString(
          this.formatDate(day.date),
          "yyyy-MM-dd"
        ),
        newDay = this.$appXEUtils.toDateString(new Date(), "yyyy-MM-dd");

      if (oldDay == newDay) {
        day.topInfo = "11/23:30";
        day.text = "更新";
        day.bottomInfo = "昨日数据";
      }

      return day;
    },
    onTableCustom: function ({ type }) {
      switch (type) {
        case "confirm":
          //确认
          break;

        case "reset":
          //还原
          break;
      }

      this.initTableWidth();
    },
    onTableColumnFilterMethod: function ({ option, row, column }) {
      if (column.property == "allScore") {
        let cName = row.cName || "占位符|占位符";

        return (
          row.name == option.value ||
          row.name.indexOf(option.value) > -1 ||
          cName.indexOf(option.value) > -1
        );
      }

      if (column.property.indexOf("allBanRate") > -1) {
        return row.allBanRate[this.banInfo.index] >= option.value;
      }

      if (column.property == "allPickRate") {
        return row.allPickRate >= option.value;
      }

      if (column.property == "allBPRate") {
        return row.allBPRate >= option.value;
      }
    },
    onTableCellClassName: function ({ row, column }) {
      let color = this.tableData.result.color,
        allBanRateIndex = this.banInfo.index;

      if (column.property.indexOf("allBanRate") > -1) {
        if (row.allBanRate[allBanRateIndex] >= color.ban) {
          return "app-bda9643ac6601722a28f238714274da4";
        }
      }

      if (column.property == "allPickRate") {
        if (row.allPickRate >= color.pick && row.allWinRate >= color.win) {
          //return "app-48d6215903dff56238e52e8891380c8f";
        }
      }

      if (column.property == "allBPRate") {
        if (row.allBPRate >= color.bp) {
          //return "app-ee3e4aec9bcaaaf72cd0c59e8a0f477d";
        }
      }

      if (column.property == "allWinRate") {
        if (
          (row.allBanRate[allBanRateIndex] >= color.ban ||
            row.allPickRate >= color.pick) &&
          row.allWinRate >= color.win
        ) {
          return "app-9f27410725ab8cc8854a2769c7a516b8";
        }
      }
    },
    onTableCellClick: function ({ row, rowIndex, column }) {
      this.tableDataRow = row;

      if (column.property == "allScore") {
        this.cellInfo.index = 0;

        if (row.id && row.id < 900) {
          this.showInfo.skillActionSheet = true;
          this.showInfo.heroActionSheet = false;
        } else {
          this.showInfo.skillActionSheet = false;
          this.showInfo.heroActionSheet = true;
        }
      } else if (column.property == "trend") {
        this.$refs.refWzryGame.toggleRowExpand(
          this.tableData.result.rows[rowIndex]
        );
      } else if (column.property == "allWinRate") {
        this.$refs.refWzryGame.toggleRowExpand(
          this.tableData.result.rows[rowIndex]
        );
      } else if (column.property == "allPickRate") {
        this.cellInfo.index = -1;

        this.getHeroProficiency(row.id);

        this.showInfo.skillActionSheet = false;
        this.showInfo.heroActionSheet = false;
        this.showInfo.heroSameHobby = false;
      } else if (column.property.indexOf("allBanRate") > -1) {
        if (this.banInfo.index == 0) {
          this.banInfo.title = "禁用";
          this.banInfo.index = 1;
        } else {
          this.banInfo.title = "双禁";
          this.banInfo.index = 0;
        }
      } else if (column.property != "more") {
        this.cellInfo.index = 1;

        this.showInfo.skillActionSheet = false;
        this.showInfo.heroActionSheet = true;
      }
    },
    onConfirmClick: function (date) {
      let newDay = this.$appXEUtils.toDateString(new Date(), "yyyy-MM-dd");

      this.showInfo.calendar = false;

      this.dateInfo.day = this.$appXEUtils.toDateString(
        this.formatDate(date),
        "yyyy-MM-dd"
      );

      if (newDay == this.dateInfo.day) {
        this.dateInfo.day = "";

        this.$appCookie("lastDataDay", null, {
          expires: -1,
        });
      } else {
        this.$appCookie("lastDataDay", this.dateInfo.day, {
          expires: "1d",
        });
      }

      this.getRanking(0, this.bid, this.cid, this.did, this.dateInfo.day);
    },
    onTabsClick: function (e) {
      let tipsText;

      if (e == 0) {
        tipsText = this.$appMsg.info[1014];
      } else if (e == 1) {
        tipsText = this.$appMsg.info[1007];
      } else if (e == 2) {
        tipsText = this.$appMsg.info[1008];
      } else if (e == 3) {
        tipsText = this.$appMsg.info[1009];
      } else if (e == 4) {
        tipsText = this.$appMsg.info[1010];
      } else if (e == 5) {
        tipsText = this.$appMsg.info[1028];
      }

      if (tipsText && this.tipsInfo[e] == 0) {
        this.tipsInfo[e] = 1;

        this.$message.info(tipsText);
      }
    },
    onActionSheetOpen: function () {
      this.showInfo.heroSameHobby = true;
    },
    onActionSheetClose: function () {
      this.showInfo.heroSameHobby = false;
    },
    onActionSheetSelect: function (item) {
      let heroInfo = this.tableDataRow;

      if (item.value == 0) {
        this.$appPush({
          path: "/hero/" + heroInfo.id + "/info",
        });
      }

      if (item.value == 1) {
        this.$appPush({
          path: "/search",
          query: {
            q: heroInfo.name,
            refresh: 1,
          },
        });
      }

      /*
        if (item.value == 1) {
          this.$appPush({ path: "/hero/" + heroInfo.id + "/equipment" });
        }
      */

      if (item.value == 2) {
        this.$appOpenUrl(
          this.$t("open-url.title"),
          "NGA @EndMP",
          {
            path: "https://ngabbs.com/read.php?pid=" + heroInfo.updateId,
          },
          0
        );
      }

      if (item.value == 3) {
        this.$appOpenUrl(
          this.$t("open-url.title"),
          "NGA @小熊de大熊",
          {
            path: "https://ngabbs.com/read.php?tid=12677614",
          },
          0
        );
      }
    },
  },
};
</script>