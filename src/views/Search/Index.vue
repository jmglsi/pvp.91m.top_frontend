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
              @click="$appPushBack()"
            >
              返回
            </div>
          </template>
        </van-search>
      </van-sticky>
    </div>

    <div
      v-if="tableData.cardInfo.isNew"
      class="search-062a862a53dafe999914c45b9e5dd103"
    >
      <img
        v-lazy="tableData.cardInfo.new.img"
        :style="
          $appIsApple && $appConfigInfo.appInfo.pwa == 1
            ? { marginTop: '-50px' }
            : {}
        "
        class="search-20a7da8370c02da6e860aaebf3a54c57"
      />
    </div>

    <div
      :style="
        tableData.cardInfo.isNew
          ? { marginTop: '490px' }
          : $appIsApple && $appConfigInfo.appInfo.pwa == 1
          ? { marginTop: '10px' }
          : {}
      "
      :class="
        tableData.cardInfo.isNew
          ? 'search-9fa34518e0f029520c0e38e0cc4d7013'
          : 'search-881fe153c6b26bc75a8f0ab057501629'
      "
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
                          <van-icon :name="data.icon" />
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
                          }}
                        </span>
                        <span class="search-4eb6182d96f5f9cf7e7e0282ddca8e80">
                          {{ data.value }}
                          <img
                            v-if="data.trend > 0"
                            v-lazy="'/img/app-icons/hot_' + data.trend + '.png'"
                            width="18"
                            height="18"
                            class="search-97c89d1a7343e149ab400d0bb141c7de"
                          />
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
                          <van-icon :name="data.icon" />
                        </span>
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
                          <van-icon :name="data.icon" />
                        </span>
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
                >
                  {{ data }}
                </van-tag>
              </div>
              <div
                class="
                  search-93aea4a321bd36aefe85b2b0526e52e8
                  app-52b0e5c90604d59d1814f184d58e2033
                "
              >
                <van-button
                  round
                  @click="onClearSearchData"
                  icon="clear"
                  size="mini"
                  type="danger"
                >
                  清除历史搜索
                </van-button>
              </div>
            </van-cell-group>
          </div>
        </div>
      </div>

      <div
        v-if="showInfo.searchData && tableData.cardInfo.id"
        class="search-f63b407c95e4f2db4c44e27b3a8d136b"
      >
        <van-cell-group
          :border="false"
          class="search-5d555cae6745619e13c5488c119d2a14"
        >
          <van-cell
            :icon="tableData.cardInfo.id != 999 ? tableData.cardInfo.img : null"
            :title="
              tableData.cardInfo.name + ' (' + tableData.cardInfo.id + ')'
            "
            :label="tableData.cardInfo.label"
            :value="tableData.cardInfo.value"
            :is-link="tableData.cardInfo.isLink"
            @click="
              tableData.cardInfo.isLink ? onUrlClick(tableData.cardInfo) : null
            "
            icon-prefix="search-a0edf16f0e677f3e28dfd77595f437be"
            class="search-a64976150427434c778228d76650f6fb"
          />
          <van-cell
            v-for="(data, index) in tableData.cardInfo.more"
            :key="'search-2c05f043426380f092ad26111c3a490d-' + index"
            :icon="data.icon"
            :title="data.title"
            :label="data.label"
            :value="data.value"
            :is-link="data.isLink"
            @click="data.isLink ? onUrlClick(data) : null"
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
            <van-tab>
              <template #title>
                <span class="search-a1dc4f2906acdca0db3dc793f879a8ff">
                  综合
                </span>
                <img
                  v-if="tableData.cardInfo.change.trendType > 0"
                  v-lazy="
                    '/img/app-icons/hot_' +
                    tableData.cardInfo.change.trendType +
                    '.png'
                  "
                  width="13"
                  height="13"
                  class="search-05a36d9069f1023c8432de89b15a83af"
                />
                <span v-else class="search-b0958af6a9b2591433e50ff9eb7f3420">
                  -
                </span>
              </template>
            </van-tab>
            <van-tab :disabled="tableData.cardInfo.isNew">
              <template #title>
                <span class="search-a1dc4f2906acdca0db3dc793f879a8ff">
                  备战推荐
                </span>
                <img v-lazy="'/img/app-icons/hot.png'" width="13" height="13" />
              </template>
            </van-tab>
            <van-tab :disabled="tableData.cardInfo.isNew" title="攻速阈值" />
            <van-tab :disabled="tableData.cardInfo.isNew" title="最低金牌" />
            <van-tab :disabled="tableData.cardInfo.isNew" title="关系克制" />
            <van-tab :disabled="tableData.cardInfo.isNew" title="对局回顾" />
          </van-tabs>

          <van-grid
            v-if="showInfo.heroData == 0"
            :border="false"
            :column-num="4"
          >
            <van-grid-item>
              <div
                :class="
                  tableData.cardInfo.banRate[3] >= 30
                    ? 'app-bda9643ac6601722a28f238714274da4'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.cardInfo.banRate[3] }}</span>
                <span
                  v-if="tableData.cardInfo.banRate[3] > 0"
                  class="search-d427af48bbd4a36972ce659cd329dd38"
                >
                  %
                </span>
              </div>
              <div class="search-8d84ed4977747dd8eab8dbdc9ed3508c">禁用</div>
            </van-grid-item>
            <van-grid-item>
              <div
                :class="
                  tableData.cardInfo.pickRate[3] >= 20 &&
                  tableData.cardInfo.winRate[3] >= 50
                    ? 'app-48d6215903dff56238e52e8891380c8f'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.cardInfo.pickRate[3] }}</span>
                <span
                  v-if="tableData.cardInfo.pickRate[3] > 0"
                  class="search-d427af48bbd4a36972ce659cd329dd38"
                >
                  %
                </span>
              </div>
              <div class="search-8d84ed4977747dd8eab8dbdc9ed3508c">
                <div :style="{ position: 'relative' }">
                  <span class="search-b37184da1d9153fb045173b0a4b03e39">
                    出场
                  </span>
                  <span
                    v-if="tableData.cardInfo.change.updateValue != 0"
                    :style="
                      tableData.cardInfo.change.updateType == 2
                        ? { color: 'red' }
                        : { color: 'blue' }
                    "
                    class="search-cad25b2e05f6e21804b99605ab78a40b"
                  >
                    {{
                      (tableData.cardInfo.change.updateType == 2 ? "+" : "-") +
                      Math.abs(tableData.cardInfo.change.updateValue)
                    }}
                  </span>
                  <img
                    v-if="tableData.cardInfo.change.updateType != 0"
                    v-lazy="
                      '/img/app-icons/hot_' +
                      tableData.cardInfo.change.updateType +
                      '.png'
                    "
                    width="13"
                    height="13"
                    class="search-3cdd9882517a697dfcf15e4bcf9fde7e"
                  />
                </div>
              </div>
            </van-grid-item>
            <van-grid-item @click="$message.info($appMsg.info[1021])">
              <div
                :class="
                  tableData.cardInfo.bpRate[3] >= 70
                    ? 'app-ee3e4aec9bcaaaf72cd0c59e8a0f477d'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.cardInfo.bpRate[3] }}</span>
                <span
                  v-if="tableData.cardInfo.bpRate[3] > 0"
                  class="search-d427af48bbd4a36972ce659cd329dd38"
                >
                  %
                </span>
              </div>
              <div class="search-8d84ed4977747dd8eab8dbdc9ed3508c">禁选</div>
            </van-grid-item>
            <van-grid-item>
              <div
                :class="
                  (tableData.cardInfo.banRate[3] >= 30 ||
                    tableData.cardInfo.pickRate[3] >= 20) &&
                  tableData.cardInfo.winRate[3] >= 50
                    ? 'app-9f27410725ab8cc8854a2769c7a516b8'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.cardInfo.winRate[3] }}</span>
                <span
                  v-if="tableData.cardInfo.winRate[3] > 0"
                  class="search-d427af48bbd4a36972ce659cd329dd38"
                >
                  %
                </span>
              </div>
              <div class="search-8d84ed4977747dd8eab8dbdc9ed3508c">胜率</div>
            </van-grid-item>
          </van-grid>

          <van-grid v-else :border="false" :column-num="5">
            <van-grid-item text="%"></van-grid-item>
            <van-grid-item
              text="全分段"
              @click="$message.info($appMsg.info[1022])"
            >
            </van-grid-item>
            <van-grid-item
              text="1350"
              @click="$message.info($appMsg.info[1022])"
            >
            </van-grid-item>
            <van-grid-item
              text="高星局"
              @click="$message.info($appMsg.info[1022])"
            >
            </van-grid-item>
            <van-grid-item
              text="顶端局"
              @click="$message.info($appMsg.info[1023])"
            ></van-grid-item>
            <van-grid-item text="禁用"></van-grid-item>
            <van-grid-item>
              <div
                :class="
                  tableData.cardInfo.banRate[0] >= 30
                    ? 'app-bda9643ac6601722a28f238714274da4'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.cardInfo.banRate[0] }}</span>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div
                :class="
                  tableData.cardInfo.banRate[1] >= 30
                    ? 'app-bda9643ac6601722a28f238714274da4'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.cardInfo.banRate[1] }}</span>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div
                :class="
                  tableData.cardInfo.banRate[2] >= 30
                    ? 'app-bda9643ac6601722a28f238714274da4'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.cardInfo.banRate[2] }}</span>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div
                :class="
                  tableData.cardInfo.banRate[3] >= 30
                    ? 'app-bda9643ac6601722a28f238714274da4'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.cardInfo.banRate[3] }}</span>
              </div>
            </van-grid-item>
            <van-grid-item text="出场"></van-grid-item>
            <van-grid-item>
              <div
                :class="
                  tableData.cardInfo.pickRate[0] >= 20 &&
                  tableData.cardInfo.winRate[0] >= 50
                    ? 'app-48d6215903dff56238e52e8891380c8f'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.cardInfo.pickRate[0] }}</span>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div
                :class="
                  tableData.cardInfo.pickRate[1] >= 20 &&
                  tableData.cardInfo.winRate[1] >= 50
                    ? 'app-48d6215903dff56238e52e8891380c8f'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.cardInfo.pickRate[1] }}</span>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div
                :class="
                  tableData.cardInfo.pickRate[2] >= 20 &&
                  tableData.cardInfo.winRate[2] >= 50
                    ? 'app-48d6215903dff56238e52e8891380c8f'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.cardInfo.pickRate[2] }}</span>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div
                :class="
                  tableData.cardInfo.pickRate[3] >= 20 &&
                  tableData.cardInfo.winRate[3] >= 50
                    ? 'app-48d6215903dff56238e52e8891380c8f'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.cardInfo.pickRate[3] }}</span>
              </div>
            </van-grid-item>
            <van-grid-item
              text="禁选"
              @click="$message.info($appMsg.info[1021])"
            >
            </van-grid-item>
            <van-grid-item>
              <div
                :class="
                  tableData.cardInfo.bpRate[0] >= 70
                    ? 'app-ee3e4aec9bcaaaf72cd0c59e8a0f477d'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.cardInfo.bpRate[0] }}</span>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div
                :class="
                  tableData.cardInfo.bpRate[1] >= 70
                    ? 'app-ee3e4aec9bcaaaf72cd0c59e8a0f477d'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.cardInfo.bpRate[1] }}</span>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div
                :class="
                  tableData.cardInfo.bpRate[2] >= 70
                    ? 'app-ee3e4aec9bcaaaf72cd0c59e8a0f477d'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.cardInfo.bpRate[2] }}</span>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div
                :class="
                  tableData.cardInfo.bpRate[3] >= 70
                    ? 'app-ee3e4aec9bcaaaf72cd0c59e8a0f477d'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.cardInfo.bpRate[3] }}</span>
              </div>
            </van-grid-item>
            <van-grid-item text="胜率"></van-grid-item>
            <van-grid-item>
              <div
                :class="
                  (tableData.cardInfo.banRate[0] >= 30 ||
                    tableData.cardInfo.pickRate[0] >= 20) &&
                  tableData.cardInfo.winRate[0] >= 50
                    ? 'app-9f27410725ab8cc8854a2769c7a516b8'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.cardInfo.winRate[0] }}</span>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div
                :class="
                  (tableData.cardInfo.banRate[1] >= 30 ||
                    tableData.cardInfo.pickRate[1] >= 20) &&
                  tableData.cardInfo.winRate[1] >= 50
                    ? 'app-9f27410725ab8cc8854a2769c7a516b8'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.cardInfo.winRate[1] }}</span>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div
                :class="
                  (tableData.cardInfo.banRate[2] >= 30 ||
                    tableData.cardInfo.pickRate[2] >= 20) &&
                  tableData.cardInfo.winRate[2] >= 50
                    ? 'app-9f27410725ab8cc8854a2769c7a516b8'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.cardInfo.winRate[2] }}</span>
              </div>
            </van-grid-item>
            <van-grid-item>
              <div
                :class="
                  (tableData.cardInfo.banRate[3] >= 30 ||
                    tableData.cardInfo.pickRate[3] >= 20) &&
                  tableData.cardInfo.winRate[3] >= 50
                    ? 'app-9f27410725ab8cc8854a2769c7a516b8'
                    : null
                "
                class="search-0c27228425c2ec1dd01a785b6e9a0437"
              >
                <span>{{ tableData.cardInfo.winRate[3] }}</span>
              </div>
            </van-grid-item>
          </van-grid>

          <div class="search-399841f840f75044108804ec30d37405">
            <span
              v-if="showInfo.heroData == 0"
              class="search-adba909214f9aea0d6208b9bbc56dee0"
            >
              <van-icon name="underway-o" /> 11:30 更新
            </span>
            <span
              v-if="showInfo.heroData == 0"
              class="search-c27c140f08b0252f3027cf077cee2358"
            >
              &nbsp;
              <van-icon name="todo-list-o" /> 基于 顶端巅峰赛 统计
            </span>
            <span
              @click="
                showInfo.heroData == 0
                  ? (showInfo.heroData = 1)
                  : (showInfo.heroData = 0)
              "
              class="search-ddfb601e1d7aa0d473f1a3ab353ef982"
            >
              &nbsp;
              <van-icon name="exchange" /> 切换视图
            </span>
            <span
              @click="onShareClick"
              class="search-5077dcc14128f743498aaafcbd0ecb5d"
            >
              &nbsp;
              <van-icon name="share-o" /> 分享
            </span>
          </div>
        </van-cell-group>

        <div class="search-cbf8ce69d638243d800b392c8d298b16">
          <HeroSameHobby :heroId="tableData.cardInfo.id" />
        </div>
      </div>

      <div
        v-if="showInfo.searchData"
        class="search-db4665e1908869c6354106ce00ff95ba"
      >
        <van-cell-group
          :border="false"
          :title="tableData.cardInfo.id ? ' ' : ''"
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
            @click="data.isLink ? onUrlClick(data) : null"
            icon-prefix="search-a64976150427434c778228d76650f6fb"
          />
        </van-cell-group>
      </div>
    </div>

    <div class="search-52c594123f7e3908fcfbf69d69c94dff">
      <van-action-sheet
        v-model="showInfo.skillMenu"
        :title="tableData.cardInfo.name + ' 的其他数据 (近期)'"
        safe-area-inset-bottom
      >
        <van-tabs
          v-model="skillInfo.model"
          v-if="skillInfo.model > -1"
          :ellipsis="false"
          @click="onSkillTabsClick"
        >
          <van-tab title="打法 (推荐)">
            <HeroGenreList
              v-if="skillInfo.model == 0"
              :genreId="tableData.cardInfo.id"
            />
          </van-tab>
          <van-tab title="出装 (推荐)">
            <HeroEquipmentListALL
              v-if="skillInfo.model == 1"
              :heroId="tableData.cardInfo.id"
            />
          </van-tab>
          <van-tab title="出装 (单件)">
            <HeroEquipmentListOne
              v-if="skillInfo.model == 2"
              :equipmentId="tableData.cardInfo.id"
              :equipmentType="1"
            />
          </van-tab>
          <van-tab>
            <template #title>
              <span class="search-a1dc4f2906acdca0db3dc793f879a8ff">
                国服 (备战)
              </span>
              <img v-lazy="'/img/app-icons/hot.png'" width="13" height="13" />
            </template>

            <HeroInscriptionList
              v-if="skillInfo.model == 3"
              :heroId="tableData.cardInfo.id"
            />
          </van-tab>
          <van-tab title="更新调整" />
        </van-tabs>
      </van-action-sheet>
    </div>

    <div class="search-914f478e623fb19a2937274e72d82551">
      <van-action-sheet
        v-model="showInfo.fightPowerMenu"
        :title="tableData.cardInfo.name + ' 如何操作'"
        safe-area-inset-bottom
      >
        <HeroFightPower
          v-if="showInfo.fightPowerMenu"
          :heroId="tableData.cardInfo.id"
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
    HeroGenreList: () => import("@/components/Hero/GenreList.vue"),
    HeroEquipmentListALL: () =>
      import("@/components/Hero/EquipmentList_All.vue"),
    HeroEquipmentListOne: () =>
      import("@/components/Hero/EquipmentList_One.vue"),
    HeroInscriptionList: () => import("@/components/Hero/InscriptionList.vue"),
    HeroSameHobby: () => import("@/components/Hero/SameHobby.vue"),
    HeroFightPower: () => import("@/components/Hero/FightPower.vue"),
    AppHello: () => import("@/components/App/Hello.vue"),
  },
  watch: {
    $route: function (to) {
      let q = to.query,
        show = q.show || "";

      if (q.q) {
        if (parseInt(q.refresh) == 1) {
          this.showInfo.fightPowerMenu = false;

          this.getSearch(q.q, show);
        }
      } else {
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
      copyData: "",
      search: {
        data: localStorage.getItem("searchData") || "",
        value: this.$route.query.q || "",
        placeholder: "搜索",
      },
      tableData: {
        result: {
          rows: [],
        },
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
        cardInfo: {
          id: null,
          name: null,
        },
      },
      dataInfo: {
        model: 0,
      },
      skillInfo: {
        model: 0,
      },
      showInfo: {
        heroData: 0,
        searchData: false,
        searchHistory: false,
        skillMenu: false,
        fightPowerMenu: false,
      },
      tipsInfo: [0, 0, 0, 0],
    };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    initPage: function () {
      let q = this.$route.query,
        show = q.show || "";

      setInterval(() => {
        let text = this.tableData.search.placeholder;

        this.search.placeholder = text[Math.floor(Math.random() * text.length)];
      }, 5000);

      let searchValue = this.search.value;
      if (searchValue) {
        this.showInfo.searchData = true;
        this.showInfo.searchHistory = false;
      }

      this.getSearch(searchValue, show);
    },
    getSearch: function (value, show) {
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
            this.search.value = null;
            this.showInfo.searchData = false;

            this.$message.error(status.msg);
          }

          this.initSearchHistory();

          setTimeout(() => {
            if (show == "heroSkill") {
              this.showInfo.skillMenu = true;
            } else {
              this.showInfo.skillMenu = false;
            }
          }, 1000);
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
      this.$appDelectLocalStorage("searchData");

      this.search.data = null;
      this.tableData.search.history = [];

      this.showInfo.searchData = false;
      this.showInfo.searchHistory = false;

      this.$message.success(this.$appMsg.success[1000]);
    },
    onClearInputData: function () {
      if (this.search.value.length > 0) return;

      this.tableData.cardInfo.id = 0;
      this.tableData.cardInfo.isNew = false;

      this.initSearchHistory();

      this.$appPush({ path: "/search" });

      this.showInfo.searchData = false;
    },
    onUrlClick: function (data) {
      this.$appOpenUrl(
        "是否打开" + (data.url ? "外部" : "内部") + "链接?",
        null,
        { path: data.url ? data.url : data.to },
        data.url ? 0 : 1
      );
    },
    onDataTabsClick: function (e) {
      let cardInfo = this.tableData.cardInfo;

      if (e == 1) {
        this.showInfo.skillMenu = true;
      } else if (e == 2) {
        this.$appOpenUrl(
          "是否打开外部链接?",
          "NGA @小熊de大熊",
          {
            path: "//ngabbs.com/read.php?tid=12677614",
          },
          0
        );
      } else if (e == 3) {
        this.showInfo.fightPowerMenu = true;
      } else if (e == 4) {
        this.$appPush({
          path: "/ranking",
          query: {
            type: 1,
            heroName: cardInfo.name,
            refresh: 1,
          },
        });
      } else if (e == 5) {
        this.$appPush({
          path:
            "/hero/" +
            cardInfo.id +
            "/replay?title=" +
            cardInfo.name +
            "&teammate=0",
        });
      }
    },
    onDataTabsBeforeChange: function (e) {
      let change = false;

      e == 0 || e == 2 ? (change = true) : (change = false);

      return change;
    },
    onSkillTabsClick: function (e) {
      let cardInfo = this.tableData.cardInfo,
        tipsText;

      if (e == 0) {
        tipsText = this.$appMsg.info[1007];
      } else if (e == 1) {
        tipsText = this.$appMsg.info[1008];
      } else if (e == 2) {
        tipsText = this.$appMsg.info[1009];
      } else if (e == 3) {
        tipsText = this.$appMsg.info[1010];
      } else if (e == 4) {
        this.$appPush({
          path: "/hero/" + cardInfo.id + "/info?show=heroUpdate#heroSameHobby",
        });
      }

      if (tipsText && this.tipsInfo[e] == 0) {
        this.tipsInfo[e] = 1;

        this.$message.info(tipsText);
      }
    },
    onShareClick: function () {
      let cardInfo = this.tableData.cardInfo,
        ret = "",
        url = location;

      ret =
        "[" +
        cardInfo.name +
        "] " +
        cardInfo.change.scoreIcon +
        " " +
        cardInfo.score[3] +
        " " +
        cardInfo.change.trendIcon +
        "\n";
      ret += "  全分段 | 1350 | 高星局 | 顶端局\n";
      ret += "B:" + cardInfo.banRate.join(" / ") + "\n";
      ret += "P:" + cardInfo.pickRate.join(" / ") + "\n";
      ret += "∑:" + cardInfo.bpRate.join(" / ") + "\n";
      ret += "W:" + cardInfo.winRate.join(" / ") + "\n";
      ret +=
        "> 最后调整 " + (cardInfo.adjustmentTime || "近一年暂无调整") + "\n";
      ret += "> 成就 " + cardInfo.label + "\n";
      ret += "> 综合 " + url.origin + "/s/" + cardInfo.id;

      this.copyData = ret;

      this.$appCopyData(this.copyData);
    },
  },
};
</script>

<style lang="less">
img.search-05a36d9069f1023c8432de89b15a83af {
  margin-top: -2px;
}

img.search-97c89d1a7343e149ab400d0bb141c7de {
  margin-bottom: 2px;
}

img.search-3cdd9882517a697dfcf15e4bcf9fde7e {
  margin-top: -1px;
  margin-left: -3px;
}

img.search-20a7da8370c02da6e860aaebf3a54c57 {
  border-radius: unset;
  width: 100%;
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
}

span.search-adba909214f9aea0d6208b9bbc56dee0 {
  color: red;
}

span.search-c27c140f08b0252f3027cf077cee2358 {
  color: orange;
}

span.search-ddfb601e1d7aa0d473f1a3ab353ef982 {
  color: blue;
}

span.search-5077dcc14128f743498aaafcbd0ecb5d {
  color: purple;
}

span.search-4eb6182d96f5f9cf7e7e0282ddca8e80 {
  margin-left: 3px;
}

span.search-34690b06683636425980897b6bcd33d4 {
  margin-right: 10px;
  margin-top: 10px;
}

span.search-8fd6a51f93ef7b5379535e63a5e071cd {
  left: 15px;
  position: absolute;
}

span.search-d427af48bbd4a36972ce659cd329dd38,
div.search-8d84ed4977747dd8eab8dbdc9ed3508c {
  font-size: @app-font-size;
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

div.search-399841f840f75044108804ec30d37405 {
  color: #969799;
  font-size: @app-font-size;
  position: absolute;
  text-align: right;
  width: 100%;
  height: @app-height;
  padding-right: 15px;
}

div.search-9fa34518e0f029520c0e38e0cc4d7013 {
  background-color: white;
  border-radius: 10px;
}

div.search-062a862a53dafe999914c45b9e5dd103 {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
}

div.search-cbf8ce69d638243d800b392c8d298b16 {
  margin-top: 40px;
}

div.search-88cf8ac86e2afc51906e60c7025f522b {
  margin: 5px 15px;
}

div.search-93aea4a321bd36aefe85b2b0526e52e8 {
  text-align: center;
  margin-top: 25px;
}

div.search-0c27228425c2ec1dd01a785b6e9a0437 {
  font-size: @app-font-size + 8px;
}
</style>