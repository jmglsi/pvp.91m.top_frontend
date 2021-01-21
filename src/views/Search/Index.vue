<template>
  <div class="search-home">
    <div class="search-9420e49425fc3d6dcfe7b9f8d62b1b6b">
      <van-sticky>
        <van-search
          v-model="search.value"
          :placeholder="search.placeholder"
          shape="round"
          @input="onClearInputData"
          @clear="onClearInputData"
          @cancel="$router.go(-1)"
          show-action
        >
          <template #action>
            <span
              @click="search.value ? onSearch(search.value) : null"
              class="search-2a142bf567826652e30779a4be011b04"
              >搜索</span
            >
          </template>
        </van-search>
      </van-sticky>
    </div>

    <div v-show="!search.value" class="search-843c48c53bd40c7f476497c030fb0e92">
      <div class="search-4b9ca1bc335daf2e137b6c468a2c39b4">
        <div class="search-3c00205f941124762c6c5e000e7e2bde">
          <van-cell-group
            :border="false"
            title="热门推荐"
            class="search-dea6590081d28a153cc325fdaeb10c43"
          >
            <van-grid :border="false" :column-num="2">
              <van-grid-item
                v-for="(data, index) in tableData.search.hotRecommend"
                :key="'search-fb90ed45d99ca42494069dff99f2d9d0-' + index"
                @click="onSearch(data)"
              >
                <span class="search-8fd6a51f93ef7b5379535e63a5e071cd"
                  ><span
                    class="search-f43418d85f50da28b3a9c1e780237105"
                    :style="index < 4 ? { color: 'red' } : {}"
                    >{{ index + 1 }}</span
                  >&nbsp;
                  <span class="search-4eb6182d96f5f9cf7e7e0282ddca8e80">{{
                    data
                  }}</span></span
                >
              </van-grid-item>
            </van-grid>
          </van-cell-group>
        </div>

        <div
          v-show="showInfo.searchHistory == true"
          class="search-a79b6044b2b3a5a9bce4cb65bd80e774"
        >
          <van-cell-group
            :border="false"
            title="历史搜索"
            class="search-827ba321df0f99b511a783406dd7e82f"
          >
            <div class="search-88cf8ac86e2afc51906e60c7025f522b">
              <van-tag
                v-for="(data, index) in tableData.search.history"
                :key="'search-167cdfdc117a16ef2b47014355f7daad-' + index"
                size="medium"
                color="#ffe1e1"
                text-color="#ad0000"
                @click="onSearch(data)"
                class="search-34690b06683636425980897b6bcd33d4"
                >{{ data }}</van-tag
              >
            </div>
            <div class="search-93aea4a321bd36aefe85b2b0526e52e8">
              <van-button
                round
                @click="onClearSearchData"
                icon="clear"
                size="small"
                type="danger"
                >清除历史搜索</van-button
              >
            </div>
          </van-cell-group>
        </div>
      </div>
    </div>

    <div
      v-if="showInfo.searchData == true && tableData.heroInfo.id != null"
      class="search-f63b407c95e4f2db4c44e27b3a8d136b"
    >
      <van-cell-group
        :border="false"
        title=""
        class="search-5d555cae6745619e13c5488c119d2a14"
      >
        <van-cell
          :icon="tableData.heroInfo.img"
          :title="tableData.heroInfo.name + ' (' + tableData.heroInfo.id + ')'"
          :label="tableData.heroInfo.label"
          :to="'/hero/' + tableData.heroInfo.id + '/info'"
          is-link
          value="趋势"
          class="search-a5adc7030676fcdc76c583f1b2684822"
        />

        <van-tabs
          v-model="dataInfo.model"
          v-if="dataInfo.model > -1"
          :ellipsis="false"
          @click="onDataTabsClick"
          color="orange"
          title-active-color="orange"
        >
          <van-tab title="综合" />
          <van-tab
            :to="'/hero/' + tableData.heroInfo.id + '/info?show=heroUpdate'"
            title="更新调整"
          />
          <van-tab title="技能和出装" />
          <van-tab v-if="tableData.heroInfo.wikiId > 0" title="稷下图书馆" />
          <van-tab
            :to="'/ranking?type=1&heroName=' + tableData.heroInfo.name"
            title="关系和克制"
          />
          <van-tab
            :to="
              '/hero/' +
              tableData.heroInfo.id +
              '/replay?replayTitle=' +
              tableData.heroInfo.name +
              '&teammate=0'
            "
            title="对局回顾"
          />
        </van-tabs>

        <van-grid :border="false">
          <van-grid-item>
            <div
              :class="
                tableData.heroInfo.allBanRate >= 20 &&
                tableData.heroInfo.allWinRate >= 50
                  ? 'ranking-bda9643ac6601722a28f238714274da4'
                  : ''
              "
              class="search-0c27228425c2ec1dd01a785b6e9a0437"
            >
              {{ tableData.heroInfo.allBanRate }}%
            </div>
            <div>禁用率</div>
          </van-grid-item>
          <van-grid-item>
            <div
              :class="
                tableData.heroInfo.allPickRate >= 30
                  ? 'ranking-48d6215903dff56238e52e8891380c8f'
                  : ''
              "
              class="search-0c27228425c2ec1dd01a785b6e9a0437"
            >
              {{ tableData.heroInfo.allPickRate }}%
            </div>
            <div>出场率</div>
          </van-grid-item>
          <van-grid-item>
            <div
              :class="
                (tableData.heroInfo.allBanRate >= 20 ||
                  tableData.heroInfo.allPickRate >= 30) &&
                tableData.heroInfo.allWinRate >= 50
                  ? 'ranking-9f27410725ab8cc8854a2769c7a516b8'
                  : ''
              "
              class="search-0c27228425c2ec1dd01a785b6e9a0437"
            >
              {{ tableData.heroInfo.allWinRate }}%
            </div>
            <div>胜率</div>
          </van-grid-item>
          <van-grid-item>
            <div
              :class="
                tableData.heroInfo.allBanRate +
                  tableData.heroInfo.allPickRate >=
                95
                  ? 'ranking-ee3e4aec9bcaaaf72cd0c59e8a0f477d'
                  : ''
              "
              class="search-0c27228425c2ec1dd01a785b6e9a0437"
            >
              {{ tableData.heroInfo.allScore }}
            </div>
            <div>
              <span class="search-4add4f40b6d738b8822053b5c51f4723">热度</span>
              <span v-if="tableData.heroInfo.trend > 0"
                >&nbsp;<img
                  v-lazy="
                    '/img/app-icons/hot_' + tableData.heroInfo.trend + '.png'
                  "
                  width="15"
                  height="15"
                  class="search-05a36d9069f1023c8432de89b15a83af"
              /></span>
            </div>
          </van-grid-item>
        </van-grid>
        <span class="search-399841f840f75044108804ec30d37405"
          ><van-icon name="underway-o" />&nbsp;每天中午和晚上的
          11:30&nbsp;<van-icon name="todo-list-o" />&nbsp;基于巅峰赛
          (顶端局)</span
        >
      </van-cell-group>
    </div>

    <div
      v-show="showInfo.searchData"
      class="search-db4665e1908869c6354106ce00ff95ba"
    >
      <van-cell-group
        :border="false"
        title=" "
        class="search-7eb8c85291f87604bb87a151d0dc5d88"
      >
        <van-cell
          v-for="(data, index) in tableData.result.rows"
          :key="'search-4047b92d726d15c081d00f3520c76b5b-' + index"
          :icon="data.icon"
          :title="data.title"
          :value="data.value"
          :is-link="data.isLink"
          @click="onCellClick(data.isLink, data.to, data.url)"
        />
      </van-cell-group>
    </div>

    <div class="search-52c594123f7e3908fcfbf69d69c94dff">
      <van-action-sheet
        v-model="showInfo.skillMenu"
        :title="tableData.heroInfo.name + ' 的其他数据 (上周)'"
        safe-area-inset-bottom
      >
        <van-tabs
          v-model="skillInfo.model"
          v-if="skillInfo.model > -1"
          :ellipsis="false"
          @change="onSkillTabsChange"
          color="orange"
          title-active-color="orange"
        >
          <van-tab title="技能">
            <HeroSkillList
              v-if="skillInfo.model == 0"
              :heroId="tableData.heroInfo.id"
          /></van-tab>
          <van-tab title="装备 (推荐)"
            ><HeroEquipmentListALL
              v-if="skillInfo.model == 1"
              :heroId="tableData.heroInfo.id"
          /></van-tab>
          <van-tab title="装备 (单件)"
            ><HeroEquipmentListOne
              v-if="skillInfo.model == 2"
              :equipmentId="tableData.heroInfo.id"
              :equipmentType="1"
          /></van-tab>
        </van-tabs>
      </van-action-sheet>
    </div>

    <AppBottomTabbar height="100px" />
  </div>
</template>

<style>
@import url("/css/app-style/search.css");
</style>

<script>
export default {
  name: "SearchHome",
  components: {
    HeroSkillList: (resolve) =>
      require(["@/components/Hero/SkillList.vue"], resolve),
    HeroEquipmentListALL: (resolve) =>
      require(["@/components/Hero/EquipmentList_All.vue"], resolve),
    HeroEquipmentListOne: (resolve) =>
      require(["@/components/Hero/EquipmentList_One.vue"], resolve),
    AppBottomTabbar: (resolve) =>
      require(["@/components/App/BottomTabbar.vue"], resolve),
  },
  watch: {
    $route: function () {
      if (this.tableData.heroInfo.id > 0) {
        this.showInfo.searchData = true;
        this.showInfo.searchHistory = false;
      }
    },
  },
  data() {
    return {
      search: {
        data: this.$cookie.get("searchData") || "",
        value: this.$route.query.q || "",
        placeholder: "搜索",
      },
      tableData: {
        search: {
          history: [],
          hotRecommend: [],
          placeholder: [],
        },
        result: {
          rows: [],
        },
        heroInfo: {
          id: null,
        },
      },
      dataInfo: {
        model: 0,
      },
      skillInfo: {
        model: 0,
      },
      showInfo: {
        searchData: false,
        searchHistory: false,
        skillMenu: false,
      },
      tipsInfo: [0, 0, 0],
    };
  },
  mounted() {
    this.onSearch(this.search.value);

    setInterval(() => {
      let text = this.tableData.search.placeholder;

      this.search.placeholder = text[Math.floor(Math.random() * text.length)];
    }, 5000);
  },
  methods: {
    onSearch: function (value) {
      this.search.value = value.toString();

      this.getSearch(value);

      if (value) {
        this.showInfo.searchData = true;
        this.showInfo.searchHistory = false;

        this.addSearchData(value);

        this.$appPush({ query: { q: value } });
      } else {
        this.showInfo.searchData = false;
        this.showInfo.searchHistory = true;
      }
    },
    getSearch: function (value) {
      this.$axios
        .post(
          this.$appApi.pvp.getSearch,
          this.$qs.stringify({
            q: value,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          this.tableData = data;

          if (status.code == 200) {
            this.initSearchHistory();
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onDataTabsClick: function (e) {
      let wikiId = this.tableData.heroInfo.wikiId;

      if (e == 2) {
        this.showInfo.skillMenu = true;
      } else if (e == 3 && wikiId > 0) {
        this.$appOpenUrl("是否打开外部链接?", null, {
          path: "https://bbs.nga.cn/read.php?tid=" + wikiId,
        });
      }
    },
    onSkillTabsChange: function (e) {
      let tipsText;

      if (e == 0) {
        tipsText = this.$appMsg.info[1007];
      } else if (e == 1) {
        tipsText = this.$appMsg.info[1008];
      } else if (e == 2) {
        tipsText = this.$appMsg.info[1009];
      }

      if (this.tipsInfo[e] == 0) {
        this.$message.info(tipsText);
        this.tipsInfo[e] = 1;
      }
    },
    onCellClick: function (isLink, to, url) {
      if (isLink) {
        if (to) this.$appPush({ path: to });
        if (url) this.$appOpenUrl("是否打开外部链接?", null, { path: url });
      }
    },
    initSearchHistory: function () {
      let searchData = this.$cookie.get("searchData");

      if (searchData) {
        this.tableData.search.history = searchData.split(",").reverse();
        this.showInfo.searchHistory = true;
      } else {
        this.tableData.search.history = [];
        this.showInfo.searchHistory = false;
      }
    },
    addSearchData: function (value) {
      let searchData = this.$cookie.get("searchData"),
        setValue = searchData;

      if (!searchData) {
        setValue = value;
      } else if (searchData.indexOf(value) == -1) {
        setValue = searchData + "," + value;
      }

      this.$cookie.set("searchData", setValue, { expires: "1Y" });
    },
    onClearSearchData: function () {
      this.$cookie.delete("searchData");

      this.search.data = "";
      this.showInfo.searchData = false;
      this.tableData.search.history = [];
      this.showInfo.searchHistory = false;

      this.$message.success(this.$appMsg.success[1000]);
    },
    onClearInputData: function () {
      if (this.search.value.length == 0) {
        this.showInfo.searchData = false;
        this.showInfo.searchHistory = true;

        this.tableData.heroInfo.id = 0;

        this.initSearchHistory();

        this.$appPush({ path: "/search" });
      }
    },
  },
};
</script>