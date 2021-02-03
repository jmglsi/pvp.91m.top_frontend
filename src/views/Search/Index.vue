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
          @search="search.value ? getSearch(search.value) : null"
        />
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
                v-for="(data, index) in tableData.search.hotKeywords"
                :key="'search-fb90ed45d99ca42494069dff99f2d9d0-' + index"
                @click="getSearch(data)"
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
          v-show="showInfo.searchHistory"
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
                @click="getSearch(data)"
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
      v-if="showInfo.searchData && tableData.heroInfo.id"
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
          icon-prefix="search-a0edf16f0e677f3e28dfd77595f437be"
          class="search-a64976150427434c778228d76650f6fb"
        />
        <van-cell
          :icon="tableData.heroInfo.jixia.icon"
          :title="tableData.heroInfo.jixia.title"
          :label="tableData.heroInfo.jixia.label"
          :value="tableData.heroInfo.jixia.value"
          is-link
          @click="onJiXiaClick(tableData.heroInfo.wikiId)"
          icon-prefix="search-a64976150427434c778228d76650f6fb"
          class="search-869ab9bf85478a49725209693c5760e5"
        />

        <van-tabs
          v-model="dataInfo.model"
          v-if="dataInfo.model > -1"
          :ellipsis="false"
          :before-change="onDataTabsBeforeChange"
          @click="onDataTabsClick"
          color="orange"
          title-active-color="orange"
        >
          <van-tab title="综合">
            <template #title>
              <span class="search-a1dc4f2906acdca0db3dc793f879a8ff">综合</span>
              <img
                v-if="tableData.heroInfo.trend > 0"
                v-lazy="
                  '/img/app-icons/hot_' + tableData.heroInfo.trend + '.png'
                "
                width="15"
                height="15"
                class="search-05a36d9069f1023c8432de89b15a83af"
              />
              <span v-else class="search-b0958af6a9b2591433e50ff9eb7f3420"
                >-</span
              >
            </template></van-tab
          >
          <van-tab title="赛事" />
          <van-tab title="技能和出装" />
          <van-tab title="更新调整" />
          <van-tab title="关系和克制" />
          <van-tab title="对局回顾" />
        </van-tabs>

        <van-grid :border="false" :column-num="3">
          <van-grid-item>
            <div
              :class="
                tableData.heroInfo.allBanRate >= 20 &&
                tableData.heroInfo.allWinRate >= 50
                  ? 'ranking-bda9643ac6601722a28f238714274da4'
                  : null
              "
              class="search-0c27228425c2ec1dd01a785b6e9a0437"
            >
              {{ tableData.heroInfo.allBanRate }}%
            </div>
            <div>禁用</div>
          </van-grid-item>
          <van-grid-item>
            <div
              :class="
                tableData.heroInfo.allPickRate >= 30
                  ? 'ranking-48d6215903dff56238e52e8891380c8f'
                  : null
              "
              class="search-0c27228425c2ec1dd01a785b6e9a0437"
            >
              {{ tableData.heroInfo.allPickRate }}%
            </div>
            <div>出场</div>
          </van-grid-item>
          <van-grid-item>
            <div
              :class="
                (tableData.heroInfo.allBanRate >= 20 ||
                  tableData.heroInfo.allPickRate >= 30) &&
                tableData.heroInfo.allWinRate >= 50
                  ? 'ranking-9f27410725ab8cc8854a2769c7a516b8'
                  : null
              "
              class="search-0c27228425c2ec1dd01a785b6e9a0437"
            >
              {{ tableData.heroInfo.allWinRate }}%
            </div>
            <div>胜率</div>
          </van-grid-item>
        </van-grid>
        <span class="search-399841f840f75044108804ec30d37405"
          ><van-icon name="underway-o" />&nbsp;每天 11:30&nbsp;<van-icon
            name="todo-list-o"
          />&nbsp;基于 巅峰赛 (顶端局) 统计</span
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
          :label="data.label"
          :value="data.value"
          :is-link="data.isLink"
          @click="onCellClick(data.isLink, data.to, data.url)"
          icon-prefix="search-a64976150427434c778228d76650f6fb"
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

<script>
export default {
  name: "SearchHome",
  components: {
    HeroSkillList: () => import("@/components/Hero/SkillList.vue"),
    HeroEquipmentListALL: () =>
      import("@/components/Hero/EquipmentList_All.vue"),
    HeroEquipmentListOne: () =>
      import("@/components/Hero/EquipmentList_One.vue"),
    AppBottomTabbar: () => import("@/components/App/BottomTabbar.vue"),
  },
  watch: {
    $route: function (to) {
      if (to.query.q && parseInt(to.query.refresh) == 1) {
        this.getSearch(to.query.q);

        if (this.tableData.heroInfo.id > 0) {
          this.showInfo.searchData = true;
          this.showInfo.searchHistory = false;
        }
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
          hotKeywords: [],
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
    setInterval(() => {
      let text = this.tableData.search.placeholder;

      this.search.placeholder = text[Math.floor(Math.random() * text.length)];
    }, 5000);

    let searchValue = this.search.value;
    if (searchValue) {
      this.showInfo.searchData = true;
      this.showInfo.searchHistory = false;
    }

    this.getSearch(searchValue);
  },
  methods: {
    getSearch: function (value) {
      this.search.value = value;

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
            this.showInfo.searchData = true;
            this.showInfo.searchHistory = false;

            this.addSearchData(value);

            this.$appPush({ query: { q: value } });

            this.initSearchHistory();
          } else {
            this.showInfo.searchData = false;
            this.showInfo.searchHistory = true;

            this.$message.error(status.msg);
          }
        });
    },
    onJiXiaClick: function (wikiId) {
      let url = "";

      wikiId > 0
        ? (url = "https://bbs.nga.cn/read.php?tid=" + wikiId)
        : (url = "https://bbs.nga.cn/thread.php?fid=648");

      this.$appOpenUrl("是否打开外部链接?", "NGA @稷下图书馆", {
        path: url,
      });
    },
    onDataTabsClick: function (e) {
      let heroInfo = this.tableData.heroInfo;

      if (e == 1) {
        this.$appOpenUrl("是否打开外部链接?", "玩加电竞", {
          path:
            "http://www.wanplus.com/static/app/community/share.html?header_type=5&id=" +
            heroInfo.id +
            "&tab_type=5&gm=kog&gametype=6&tag_id=0",
        });
      } else if (e == 2) {
        this.showInfo.skillMenu = true;
      } else if (e == 3) {
        this.$appPush({
          path: "/hero/" + heroInfo.id + "/info?show=heroUpdate",
        });
      } else if (e == 4) {
        this.$appPush({
          path: "/ranking?type=1&heroName=" + heroInfo.name + "&refresh=1",
        });
      } else if (e == 5) {
        this.$appPush({
          path:
            "/hero/" +
            heroInfo.id +
            "/replay?replayTitle=" +
            heroInfo.name +
            "&teammate=0",
        });
      }
    },
    onDataTabsBeforeChange: function (e) {
      let change = false;

      e == 0 || e == 2 ? (change = true) : (change = false);

      return change;
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

<style>
img.search-05a36d9069f1023c8432de89b15a83af {
  margin-top: -2px;
}

i.search-a0edf16f0e677f3e28dfd77595f437be img.van-icon__image {
  border-radius: 100%;
  height: 50px;
  margin-right: 10px;
  width: 50px;
}

span.search-34690b06683636425980897b6bcd33d4 {
  margin-right: 10px;
  margin-top: 10px;
}

span.search-8fd6a51f93ef7b5379535e63a5e071cd {
  left: 20px;
  position: absolute;
}

span.search-399841f840f75044108804ec30d37405 {
  color: #969799;
  font-size: 10px;
  position: absolute;
  right: 15px;
  text-align: right;
  width: 100%;
}

span.search-b0958af6a9b2591433e50ff9eb7f3420 {
  margin-left: 6px;
  margin-right: 4px;
}

div.search-843c48c53bd40c7f476497c030fb0e92,
div.search-f63b407c95e4f2db4c44e27b3a8d136b,
div.search-db4665e1908869c6354106ce00ff95ba {
  text-align: left;
}

div.search-db4665e1908869c6354106ce00ff95ba {
  margin-top: 25px;
}

div.search-88cf8ac86e2afc51906e60c7025f522b {
  margin: 5px 15px;
}

div.search-93aea4a321bd36aefe85b2b0526e52e8 {
  text-align: center;
  margin-top: 25px;
}

div.search-0c27228425c2ec1dd01a785b6e9a0437 {
  font-size: 20px;
}

div.search-a5adc7030676fcdc76c583f1b2684822.van-cell {
  height: 75px;
}
</style>