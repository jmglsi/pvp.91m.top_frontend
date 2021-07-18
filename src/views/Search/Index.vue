<template>
  <div class="search-home">
    <div class="search-9420e49425fc3d6dcfe7b9f8d62b1b6b">
      <van-sticky
        :offset-top="$appIsApple && $appConfigInfo.appInfo.pwa == 1 ? 50 : 0"
      >
        <van-search
          v-model="search.value"
          show-action
          :placeholder="search.placeholder"
          @input="onClearInputData"
          @clear="onClearInputData"
          @search="
            search.value
              ? getSearch(search.value)
              : getSearch(search.placeholder)
          "
          shape="round"
        >
          <template #action>
            <div
              :style="
                $appIsApple && $appConfigInfo.appInfo.pwa == 1
                  ? { color: '#fff' }
                  : {}
              "
              @click="
                search.value ? (search.value = null) : $appPush({ path: '/' })
              "
            >
              取消
            </div>
          </template>
        </van-search>
      </van-sticky>
    </div>

    <div
      :style="
        $appIsApple && $appConfigInfo.appInfo.pwa == 1
          ? { marginTop: '10px' }
          : {}
      "
      class="search-881fe153c6b26bc75a8f0ab057501629"
    >
      <div v-if="!search.value" class="search-843c48c53bd40c7f476497c030fb0e92">
        <div class="search-4b9ca1bc335daf2e137b6c468a2c39b4">
          <div class="search-3c00205f941124762c6c5e000e7e2bde">
            <ul class="app-d865b50ce307751bdeb9a6ab16e7baf9">
              <li
                class="
                  app-1951b6e7c82938dd7446a41e829b247b
                  search-9eca81635365b5dcc7960ad26bb0b714
                "
              >
                <van-cell-group
                  :border="false"
                  title="热门搜索 🔍"
                  class="search-dea6590081d28a153cc325fdaeb10c43"
                >
                  <van-grid :border="false" :column-num="1">
                    <van-grid-item
                      v-for="(data, index) in tableData.search.hotKeywords[0]
                        .rows"
                      :key="'search-fb90ed45d99ca42494069dff99f2d9d0-' + index"
                      @click="getSearch(data.value)"
                    >
                      <span class="search-8fd6a51f93ef7b5379535e63a5e071cd">
                        <span
                          v-if="data.isTop"
                          :style="{ color: 'orange' }"
                          class="search-f43418d85f50da28b3a9c1e780237105"
                        >
                          <van-icon name="back-top" />
                        </span>
                        <span
                          v-else
                          :style="
                            index < 3 + tableData.search.hotKeywords[0].topNum
                              ? { color: 'red' }
                              : {}
                          "
                          class="search-f43418d85f50da28b3a9c1e780237105"
                        >
                          {{
                            index + 1 - tableData.search.hotKeywords[0].topNum
                          }} </span
                        >&nbsp;
                        <span class="search-4eb6182d96f5f9cf7e7e0282ddca8e80">
                          {{ data.value }}
                        </span>
                      </span>
                    </van-grid-item>
                  </van-grid>
                </van-cell-group>
              </li>
              <li
                class="
                  app-1951b6e7c82938dd7446a41e829b247b
                  search-9eca81635365b5dcc7960ad26bb0b714
                "
              >
                <van-cell-group
                  :border="false"
                  title="暂未调整 🆕"
                  class="search-dea6590081d28a153cc325fdaeb10c43"
                >
                  <van-grid :border="false" :column-num="1">
                    <van-grid-item
                      v-for="(data, index) in tableData.search.hotKeywords[1]
                        .rows"
                      :key="'search-fb90ed45d99ca42494069dff99f2d9d0-' + index"
                      @click="getSearch(data.value)"
                    >
                      <span class="search-8fd6a51f93ef7b5379535e63a5e071cd">
                        <span
                          v-if="data.isTop"
                          :style="{ color: 'orange' }"
                          class="search-f43418d85f50da28b3a9c1e780237105"
                        >
                          <van-icon name="back-top" />
                        </span>
                        <span
                          v-else
                          :style="
                            index < 3 + tableData.search.hotKeywords[1].topNum
                              ? { color: 'red' }
                              : {}
                          "
                          class="search-f43418d85f50da28b3a9c1e780237105"
                        >
                          {{
                            index + 1 - tableData.search.hotKeywords[1].topNum
                          }} </span
                        >&nbsp;
                        <span class="search-4eb6182d96f5f9cf7e7e0282ddca8e80">
                          {{ data.value }}
                        </span>
                      </span>
                    </van-grid-item>
                  </van-grid>
                </van-cell-group>
              </li>
              <li
                class="
                  app-1951b6e7c82938dd7446a41e829b247b
                  search-9eca81635365b5dcc7960ad26bb0b714
                "
              >
                <van-cell-group
                  :border="false"
                  title="衣柜空空 👔"
                  class="search-dea6590081d28a153cc325fdaeb10c43"
                >
                  <van-grid :border="false" :column-num="1">
                    <van-grid-item
                      v-for="(data, index) in tableData.search.hotKeywords[2]
                        .rows"
                      :key="'search-fb90ed45d99ca42494069dff99f2d9d0-' + index"
                      @click="getSearch(data.value)"
                    >
                      <span class="search-8fd6a51f93ef7b5379535e63a5e071cd">
                        <span
                          v-if="data.isTop"
                          :style="{ color: 'orange' }"
                          class="search-f43418d85f50da28b3a9c1e780237105"
                        >
                          <van-icon name="back-top" />
                        </span>
                        <span
                          v-else
                          :style="
                            index < 3 + tableData.search.hotKeywords[2].topNum
                              ? { color: 'red' }
                              : {}
                          "
                          class="search-f43418d85f50da28b3a9c1e780237105"
                        >
                          {{
                            index + 1 - tableData.search.hotKeywords[2].topNum
                          }} </span
                        >&nbsp;
                        <span class="search-4eb6182d96f5f9cf7e7e0282ddca8e80">
                          {{ data.value }}
                        </span>
                      </span>
                    </van-grid-item>
                  </van-grid>
                </van-cell-group>
              </li>
            </ul>
          </div>

          <div
            v-if="showInfo.searchHistory"
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
          title
          class="search-5d555cae6745619e13c5488c119d2a14"
        >
          <van-cell
            :icon="tableData.heroInfo.img"
            :title="
              tableData.heroInfo.name + ' (' + tableData.heroInfo.id + ')'
            "
            :label="tableData.heroInfo.label"
            :to="'/hero/' + tableData.heroInfo.id + '/info'"
            is-link
            value="趋势"
            icon-prefix="search-a0edf16f0e677f3e28dfd77595f437be"
            class="search-a64976150427434c778228d76650f6fb"
          />
          <van-cell
            v-for="(data, index) in tableData.heroInfo.more"
            :key="'search-2c05f043426380f092ad26111c3a490d-' + index"
            :icon="data.icon"
            :title="data.title"
            :label="data.label"
            :value="data.value"
            is-link
            @click="$appOpenUrl('是否打开外部链接?', NULL, { path: data.url })"
            icon-prefix="search-a64976150427434c778228d76650f6fb"
            class="search-869ab9bf85478a49725209693c5760e5"
          />

          <van-tabs
            v-model="dataInfo.model"
            v-if="dataInfo.model > -1"
            :ellipsis="false"
            :before-change="onDataTabsBeforeChange"
            @click="onDataTabsClick"
          >
            <van-tab title="综合">
              <template #title>
                <span class="search-a1dc4f2906acdca0db3dc793f879a8ff"
                  >综合</span
                >
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
              </template>
            </van-tab>
            <van-tab
              :disabled="tableData.heroInfo.id == 999"
              title="战力"
            />
            <van-tab :disabled="tableData.heroInfo.id == 999" title="赛事" />
            <van-tab
              :disabled="tableData.heroInfo.id == 999"
              title="技能和出装"
            />
            <van-tab title="更新调整" />
            <van-tab
              :disabled="tableData.heroInfo.id == 999"
              title="关系和克制"
            />
            <van-tab
              :disabled="tableData.heroInfo.id == 999"
              title="对局回顾"
            />
          </van-tabs>

          <van-grid :border="false" :column-num="3">
            <van-grid-item>
              <div
                :class="
                  tableData.heroInfo.banRate[2] >= 20 &&
                  tableData.heroInfo.winRate[2] >= 50
                    ? 'ranking-bda9643ac6601722a28f238714274da4'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.heroInfo.banRate[2] }}</span>
                <span class="search-d427af48bbd4a36972ce659cd329dd38">%</span>
              </div>
              <div>禁用</div>
            </van-grid-item>
            <van-grid-item>
              <div
                :class="
                  tableData.heroInfo.pickRate[2] >= 30
                    ? 'ranking-48d6215903dff56238e52e8891380c8f'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.heroInfo.pickRate[2] }}</span>
                <span class="search-d427af48bbd4a36972ce659cd329dd38">%</span>
              </div>
              <div>出场</div>
            </van-grid-item>
            <van-grid-item>
              <div
                :class="
                  (tableData.heroInfo.banRate[2] >= 20 ||
                    tableData.heroInfo.pickRate[2] >= 30) &&
                  tableData.heroInfo.winRate[2] >= 50
                    ? 'ranking-9f27410725ab8cc8854a2769c7a516b8'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.heroInfo.winRate[2] }}</span>
                <span class="search-d427af48bbd4a36972ce659cd329dd38">%</span>
              </div>
              <div>胜率</div>
            </van-grid-item>
          </van-grid>
          <div class="search-399841f840f75044108804ec30d37405">
            <van-icon name="underway-o" />
            <span class="search-c27c140f08b0252f3027cf077cee2358">11:30</span
            >&nbsp;更新&nbsp;&nbsp; <van-icon name="todo-list-o" />基于 巅峰赛
            (顶端局) 统计
          </div>
        </van-cell-group>

        <div class="search-cbf8ce69d638243d800b392c8d298b16">
          <HeroSameHobby :heroId="tableData.heroInfo.id" />
        </div>
      </div>

      <div
        v-if="showInfo.searchData"
        class="search-db4665e1908869c6354106ce00ff95ba"
      >
        <van-cell-group
          :border="false"
          :title="tableData.heroInfo.id ? ' ' : ''"
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
    </div>

    <div class="search-52c594123f7e3908fcfbf69d69c94dff">
      <van-action-sheet
        v-model="showInfo.skillMenu"
        :title="tableData.heroInfo.name + ' 的其他数据 (近期)'"
        safe-area-inset-bottom
      >
        <van-tabs
          v-model="skillInfo.model"
          v-if="skillInfo.model > -1"
          :ellipsis="false"
          @change="onSkillTabsChange"
        >
          <van-tab title="技能">
            <HeroSkillList
              v-if="skillInfo.model == 0"
              :heroId="tableData.heroInfo.id"
            />
          </van-tab>
          <van-tab title="装备 (推荐)">
            <HeroEquipmentListALL
              v-if="skillInfo.model == 1"
              :heroId="tableData.heroInfo.id"
            />
          </van-tab>
          <van-tab title="装备 (单件)">
            <HeroEquipmentListOne
              v-if="skillInfo.model == 2"
              :equipmentId="tableData.heroInfo.id"
              :equipmentType="1"
            />
          </van-tab>
        </van-tabs>
      </van-action-sheet>
    </div>

    <div class="search-914f478e623fb19a2937274e72d82551">
      <van-action-sheet
        v-model="showInfo.fightPowerMenu"
        :title="tableData.heroInfo.name + ' 如何操作'"
        safe-area-inset-bottom
      >
        <HeroFightPower
          v-if="showInfo.fightPowerMenu"
          :heroId="tableData.heroInfo.id"
          :fightPowerType="2"
        />
      </van-action-sheet>
    </div>

    <AppHello height="100px" />
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
    HeroSameHobby: () => import("@/components/Hero/SameHobby.vue"),
    HeroFightPower: () => import("@/components/Hero/FightPower.vue"),
    AppHello: () => import("@/components/App/Hello.vue"),
  },
  watch: {
    $route: function (to) {
      if (to.query.q) {
        if (parseInt(to.query.refresh) == 1) {
          this.getSearch(to.query.q);
        }
      } else {
        this.search.value = "";
        this.showInfo.searchData = false;

        this.initSearchHistory();
      }
    },
  },
  metaInfo() {
    return {
      meta: [
        {
          vmid: "keyWords",
          name: "keyWords",
          content: (this.search.value || "英雄") + ",搜索,社区,舆论,NGA,虎扑",
        },
        {
          vmid: "description",
          name: "description",
          content: (this.search.value || "英雄") + " 相关的信息",
        },
      ],
    };
  },
  data() {
    return {
      search: {
        data: localStorage.getItem("searchData") || "",
        value: this.$route.query.q || "",
        placeholder: "搜索",
      },
      tableData: {
        search: {
          history: [],
          hotKeywords: [
            {
              topNum: 0,
              rows: [],
            },
            {
              topNum: 0,
              rows: [],
            },
            {
              topNum: 0,
              rows: [],
            },
          ],
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
        fightPowerMenu: false,
      },
      tipsInfo: [0, 0, 0],
    };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage: function () {
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
    getSearch: function (value) {
      if (value == "搜索") return;

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

          if (status.code == 200) {
            this.tableData = data;

            this.addSearchData(value);

            if (data.result.rows.length > 0) {
              this.showInfo.searchData = true;
            }
          } else {
            this.search.value = "";
            this.showInfo.searchData = false;

            this.$message.error(status.msg);
          }

          this.initSearchHistory();
        });
    },
    initSearchHistory: function () {
      let searchData = localStorage.getItem("searchData");

      if (searchData) {
        this.tableData.search.history = searchData.split(",").reverse();

        this.showInfo.searchHistory = true;
      } else {
        this.tableData.search.history = [];

        this.showInfo.searchHistory = false;
      }
    },
    addSearchData: function (value) {
      let searchData = localStorage.getItem("searchData"),
        setValue = searchData;

      if (!searchData) {
        setValue = value;
      } else if (searchData.indexOf(value) == -1) {
        setValue = searchData + "," + value;
      }

      localStorage.setItem("searchData", setValue);
    },
    onClearSearchData: function () {
      localStorage.removeItem("searchData");

      this.search.data = null;
      this.tableData.search.history = [];

      this.showInfo.searchData = false;
      this.showInfo.searchHistory = false;

      this.$message.success(this.$appMsg.success[1000]);
    },
    onClearInputData: function () {
      if (this.search.value.length == 0) {
        this.tableData.heroInfo.id = 0;

        this.initSearchHistory();

        this.$appPush({ path: "/search" });

        this.showInfo.searchData = false;
      }
    },
    onCellClick: function (isLink, to, url) {
      if (isLink) {
        if (to) this.$appPush({ path: to });
        if (url) this.$appOpenUrl("是否打开外部链接?", null, { path: url });
      }
    },
    onDataTabsClick: function (e) {
      let heroInfo = this.tableData.heroInfo;

      if (e == 1) {
        this.showInfo.fightPowerMenu = true;
      } else if (e == 2) {
        this.$appOpenUrl("是否打开外部链接?", "玩加电竞", {
          path:
            "http://www.wanplus.com/static/app/community/share.html?header_type=5&id=" +
            heroInfo.id +
            "&tab_type=5&gm=kog&gametype=6&tag_id=0",
        });
      } else if (e == 3) {
        this.showInfo.skillMenu = true;
      } else if (e == 4) {
        this.$appPush({
          path: "/hero/" + heroInfo.id + "/info?show=heroUpdate",
        });
      } else if (e == 5) {
        this.$appPush({
          path: "/ranking",
          query: { type: 1, heroName: heroInfo.name, refresh: 1 },
        });
      } else if (e == 6) {
        this.$appPush({
          path:
            "/hero/" +
            heroInfo.id +
            "/replay?title=" +
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
        this.tipsInfo[e] = 1;

        this.$message.info(tipsText);
      }
    },
  },
};
</script>

<style scoped lang="less">
img.search-05a36d9069f1023c8432de89b15a83af {
  margin-top: -2px;
}

i.search-a0edf16f0e677f3e28dfd77595f437be {
  img.van-icon__image {
    border-radius: @app-border-radius;
    height: @app-height;
    margin-right: 10px;
    width: @app-width;
  }
}

li.search-9eca81635365b5dcc7960ad26bb0b714 {
  width: 150px;
}

span.search-d427af48bbd4a36972ce659cd329dd38 {
  margin-left: 3px;
  font-size: @app-font-size + 5px;
}

span.search-c27c140f08b0252f3027cf077cee2358 {
  color: orange;
}

span.search-34690b06683636425980897b6bcd33d4 {
  margin-right: 10px;
  margin-top: 10px;
}

span.search-8fd6a51f93ef7b5379535e63a5e071cd {
  left: 20px;
  position: absolute;
}

div.search-399841f840f75044108804ec30d37405 {
  color: #969799;
  font-size: @app-font-size;
  position: absolute;
  text-align: right;
  width: 100%;
  height: @app-height;
  background: #fff;
  padding-right: 15px;
}

span.search-b0958af6a9b2591433e50ff9eb7f3420 {
  margin-left: 6px;
  margin-right: 4px;
}

span.search-f43418d85f50da28b3a9c1e780237105 {
  display: inline-block;
  text-align: center;
  width: 15px;
}

div.search-843c48c53bd40c7f476497c030fb0e92,
div.search-f63b407c95e4f2db4c44e27b3a8d136b,
div.search-db4665e1908869c6354106ce00ff95ba {
  text-align: @app-text-align;
}

div.search-cbf8ce69d638243d800b392c8d298b16 {
  margin-top: 40px;
  background-color: white;
}

div.search-88cf8ac86e2afc51906e60c7025f522b {
  margin: 5px 15px;
}

div.search-93aea4a321bd36aefe85b2b0526e52e8 {
  text-align: center;
  margin-top: 25px;
}

div.search-0c27228425c2ec1dd01a785b6e9a0437 {
  font-size: @app-font-size + 10px;
}
</style>