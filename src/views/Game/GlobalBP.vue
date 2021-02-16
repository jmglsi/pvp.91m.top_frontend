<template>
  <div v-if="isPortrait" @click="isPortrait = false" class="game-bp-portrait">
    <div slot-scope="" class="game-a76e75b5854094183e66c274e1d276e9">
      <img
        v-lazy="
          '//img06.mifile.cn/v1/MI_542ED8B1722DC/a04acc27d66ac47618f6c48652c2c25f.png'
        "
        width="100"
        height="100"
      />
      <div class="game-b3d70a861f68652bf97d7a26bf421d4f">
        请将设备横过来 或 点击这里切换横屏 ;D
      </div>
    </div>
  </div>
  <div v-else-if="!isPortrait" class="app-9fc0eb5a934dba03cc266a49b8ec51fb">
    <span
      v-if="tabsInfo.model < 6"
      class="app-f4842dcb685d490e2a43212b8072a6fe"
    >
      <span class="game-d4f94e5b8f23a1755b438ff70ed16fc6">
        {{ tabsInfo.model % 2 == 0 ? team.team_1.name : team.team_2.name }}
      </span>
      <span class="game-80653328482d7cba8da3f0fa033b0c12">Vs</span>
      <span class="game-1426b22460332d802aedd4d54d35f3ee">
        {{ tabsInfo.model % 2 == 0 ? team.team_2.name : team.team_1.name }}
      </span>
    </span>

    <span v-else class="app-f4842dcb685d490e2a43212b8072a6fe">
      <span class="game-d4f94e5b8f23a1755b438ff70ed16fc6">
        {{ team.team_1.name }}
      </span>
      <span class="game-80653328482d7cba8da3f0fa033b0c12">Vs</span>
      <span class="game-1426b22460332d802aedd4d54d35f3ee">
        {{ team.team_2.name }}
      </span>
    </span>

    <div class="game-716fcd585a785195878b2683fca82e6f">
      <div
        class="game-8c9cb4a232c7e88403dddc3a0e589162 game-bf2c7b7ad9bcf75cd72e0b4ce30500e3"
      >
        <ul>
          <li
            v-for="(heroId, index) in gameInfo.result.rows[tabsInfo.model]
              .BPOrder"
            :key="'game-2a47f410fffc64666ba4673bdc597f72a-' + index"
            @click="onGameBanPickClick(index)"
          >
            <span
              v-if="index == 0 || index == 2 || index == 11 || index == 13"
              class="game-4978748050a936d2f77fe718f1d81524"
            >
              <img
                v-lazy="
                  heroId
                    ? '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                      heroId +
                      '/' +
                      heroId +
                      '.jpg'
                    : '/img/app-icons/hero_white.png'
                "
                :class="
                  bpMode == 'edit' &&
                  gameInfo.result.rows[tabsInfo.model].stepsNow == index
                    ? blueStepsClass
                    : null
                "
                width="30"
                height="30"
                class="game-5de9dd2a5714dd606db0e0fa1611c227"
              />
              <img
                v-lazy="
                  '//img07.mifile.cn/v1/MI_542ED8B1722DC/2141e6eeea75f51e749297dafa6716b4.png'
                "
                width="20"
                height="20"
                class="game-dce7c4174ce9323904a934a486c41288"
              />
            </span>
          </li>
        </ul>
      </div>

      <div
        class="game-c6a2f8b3941d7f91bc4e51839e5371e0 game-ba9bced6af8121cf6413000a4274ac2b"
      >
        <ul>
          <li
            v-for="(heroId, index) in gameInfo.result.rows[tabsInfo.model]
              .BPOrder"
            :key="'game-38dfd87b435ce58ee12baf01d6f23c73-' + index"
            @click="onGameBanPickClick(index)"
          >
            <span
              v-if="index == 1 || index == 3 || index == 10 || index == 12"
              class="game-6e9c0050fe873888fbf53ec6f7b21816"
            >
              <img
                v-lazy="
                  heroId
                    ? '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                      heroId +
                      '/' +
                      heroId +
                      '.jpg'
                    : '/img/app-icons/hero_white.png'
                "
                :class="
                  bpMode == 'edit' &&
                  gameInfo.result.rows[tabsInfo.model].stepsNow == index
                    ? redStepsClass
                    : null
                "
                width="30"
                height="30"
                class="game-221cf04d9a9e32c6af24502f96e3ecfe"
              />
              <img
                v-lazy="
                  '//img07.mifile.cn/v1/MI_542ED8B1722DC/2141e6eeea75f51e749297dafa6716b4.png'
                "
                width="20"
                height="20"
                class="game-dce7c4174ce9323904a934a486c41288"
              />
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div class="game-bd40579650e3f651e222aef268d5c8ae">
      <van-row>
        <van-col span="3">
          <div
            :style="
              $appIsMobile ? { marginTop: '50px' } : { marginTop: '100px' }
            "
            class="game-be50d19d79d06b239c799bc2608239c6"
          >
            <ul>
              <li
                v-for="(heroId, index) in gameInfo.result.rows[tabsInfo.model]
                  .BPOrder"
                :key="'game-0da8f0c7ef089161786e997dfcd5474e-' + index"
                :style="$appIsMobile ? {} : { marginTop: '50px' }"
                @click="onGameBanPickClick(index)"
              >
                <span
                  v-if="
                    index == 4 ||
                    index == 7 ||
                    index == 8 ||
                    index == 15 ||
                    index == 16
                  "
                  class="game-4978748050a936d2f77fe718f1d81524"
                >
                  <img
                    v-lazy="
                      heroId
                        ? '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                          heroId +
                          '/' +
                          heroId +
                          '.jpg'
                        : '/img/app-icons/hero_white.png'
                    "
                    :class="
                      bpMode == 'edit' &&
                      gameInfo.result.rows[tabsInfo.model].stepsNow == index
                        ? blueStepsClass
                        : null
                    "
                    :width="$appIsMobile ? 40 : 55"
                    :height="$appIsMobile ? 40 : 55"
                    class="game-eee32796c3fdfc147115c9f6e875c090"
                  />
                </span>
              </li>
            </ul>
          </div>
          <div
            v-if="bpMode == 'edit'"
            :style="
              $appIsMobile
                ? { height: '275px' }
                : { height: $appHeight - 175 + 'px' }
            "
            @click="onWinCampClick(1)"
            class="game-d75e14b5c8f13e894fe9bf9d5426c198"
          />
        </van-col>
        <van-col span="18">
          <div
            v-if="showInfo.hero"
            :style="
              $appIsMobile
                ? { height: '240px' }
                : { height: $appHeight - 150 + 'px' }
            "
            class="app-99938282f04071859941e18f16efcf42"
          >
            <van-tabs
              v-model="tableData.model"
              v-if="tableData.model > -1"
              :border="false"
              :ellipsis="false"
              :swipe-threshold="$appIsMobile ? 4 : 7"
              color="orange"
              title-active-color="orange"
              class="app-f3cc17bc0d768ca60b8bb496a10b1990"
            >
              <van-tab
                v-for="(data, index) in heroType"
                :key="'game-687df0d960fe6dade3153dc0ba925e79-' + index"
                :title="data"
              />

              <div class="game-87740aa9337e54dbad53ec95089dca77">
                <van-cell-group
                  :border="false"
                  title="置顶"
                  class="game-27369b3bf4483e8dcfd85ba9a39a947f"
                >
                  <van-grid
                    :border="false"
                    :column-num="8"
                    class="game-89ca797bdbd58d7a03cf37f2d2fd9ac5"
                  >
                    <draggable
                      :list="tableData.result.rows"
                      :disabled="bpMode == 'sort' ? false : true"
                      class="game-2c9118a482fe35d5ab2b6cb01c1985be"
                    >
                      <van-grid-item
                        v-for="(data, index) in tableData.result.rows"
                        v-show="
                          data.trend == 2 &&
                          (data.type.includes(tableData.model) ||
                            tableData.model == 0)
                        "
                        :key="'game-f6bf37efedbc0a2dfffc1caf5088d86e-' + index"
                        text=" "
                        @click="onGamePickHeroClick(data, index)"
                      >
                        <span
                          v-if="tabsInfo.model < 6"
                          class="game-f3ebcda14817d8dbbc6e7c33e7ee3969"
                        >
                          <van-tag
                            v-if="
                              gameInfo.result.rows[
                                tabsInfo.model
                              ].blue.ban.includes(data.id) ||
                              gameInfo.result.rows[
                                tabsInfo.model
                              ].red.ban.includes(data.id)
                            "
                            round
                            color="red"
                            class="game-9965db4bfcd480ab6c0b1a6a3de68bab"
                            >已禁</van-tag
                          >
                          <van-tag
                            round
                            v-else-if="gameInfo.used.includes(data.id)"
                            color="orange"
                            class="game-9965db4bfcd480ab6c0b1a6a3de68bab"
                            >已用</van-tag
                          ></span
                        >
                        <img
                          width="40"
                          height="40"
                          v-lazy="data.img"
                          :style="
                            tabsInfo.model < 6 &&
                            (gameInfo.result.rows[
                              tabsInfo.model
                            ].blue.ban.includes(data.id) ||
                              gameInfo.result.rows[
                                tabsInfo.model
                              ].red.ban.includes(data.id) ||
                              gameInfo.used.includes(data.id))
                              ? { filter: 'grayscale(1)' }
                              : {}
                          "
                          class="game-ae47f38706d42938ff1dbd5960a08056"
                        />
                      </van-grid-item>
                    </draggable>
                  </van-grid>
                </van-cell-group>

                <van-cell-group
                  :border="false"
                  title="其他"
                  class="game-795f3202b17cb6bc3d4b771d8c6c9eaf"
                >
                  <van-grid
                    :border="false"
                    :column-num="8"
                    class="game-89ca797bdbd58d7a03cf37f2d2fd9ac5"
                  >
                    <draggable
                      :list="tableData.result.rows"
                      :disabled="bpMode == 'sort' ? false : true"
                      class="game-2c9118a482fe35d5ab2b6cb01c1985be"
                    >
                      <van-grid-item
                        v-for="(data, index) in tableData.result.rows"
                        v-show="
                          data.trend != 2 &&
                          (data.type.includes(tableData.model) ||
                            tableData.model == 0)
                        "
                        :key="'game-35368a19f307e4af02d0df055846840d-' + index"
                        text=" "
                        @click="onGamePickHeroClick(data, index)"
                      >
                        <span
                          v-if="tabsInfo.model < 6"
                          class="game-f3ebcda14817d8dbbc6e7c33e7ee3969"
                        >
                          <van-tag
                            v-if="
                              gameInfo.result.rows[
                                tabsInfo.model
                              ].blue.ban.includes(data.id) ||
                              gameInfo.result.rows[
                                tabsInfo.model
                              ].red.ban.includes(data.id)
                            "
                            round
                            color="red"
                            class="game-9965db4bfcd480ab6c0b1a6a3de68bab"
                            >已禁</van-tag
                          >
                          <van-tag
                            round
                            v-else-if="gameInfo.used.includes(data.id)"
                            color="orange"
                            class="game-9965db4bfcd480ab6c0b1a6a3de68bab"
                            >已用</van-tag
                          >
                        </span>
                        <img
                          width="40"
                          height="40"
                          v-lazy="data.img"
                          :style="
                            tabsInfo.model < 6 &&
                            (gameInfo.result.rows[
                              tabsInfo.model
                            ].blue.ban.includes(data.id) ||
                              gameInfo.result.rows[
                                tabsInfo.model
                              ].red.ban.includes(data.id) ||
                              gameInfo.used.includes(data.id))
                              ? { filter: 'grayscale(1)' }
                              : {}
                          "
                          class="game-ae47f38706d42938ff1dbd5960a08056"
                        />
                      </van-grid-item>
                    </draggable>
                  </van-grid>
                </van-cell-group>
              </div>
            </van-tabs>
          </div>
        </van-col>
        <van-col span="3">
          <div
            :style="
              $appIsMobile ? { marginTop: '50px' } : { marginTop: '100px' }
            "
            class="game-f382dd1c4a10b864c29d26d47249b570"
          >
            <ul>
              <li
                v-for="(heroId, index) in gameInfo.result.rows[tabsInfo.model]
                  .BPOrder"
                :key="'game-efc78a7d5ce15f3dbe5ec48eabdba117-' + index"
                :style="$appIsMobile ? {} : { marginTop: '50px' }"
                @click="onGameBanPickClick(index)"
              >
                <span
                  v-if="
                    index == 5 ||
                    index == 6 ||
                    index == 9 ||
                    index == 14 ||
                    index == 17
                  "
                  class="game-6e9c0050fe873888fbf53ec6f7b21816"
                >
                  <img
                    v-lazy="
                      heroId
                        ? '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                          heroId +
                          '/' +
                          heroId +
                          '.jpg'
                        : '/img/app-icons/hero_white.png'
                    "
                    :class="
                      bpMode == 'edit' &&
                      gameInfo.result.rows[tabsInfo.model].stepsNow == index
                        ? redStepsClass
                        : null
                    "
                    :width="$appIsMobile ? 40 : 55"
                    :height="$appIsMobile ? 40 : 55"
                    class="game-aa95efe1c5d39e5e9389ca5833e63fbe"
                  />
                </span>
              </li>
            </ul>
          </div>
          <div
            v-if="bpMode == 'edit'"
            :style="
              $appIsMobile
                ? { height: '275px' }
                : { height: $appHeight - 175 + 'px' }
            "
            @click="onWinCampClick(2)"
            class="game-251504ba219ea8c3175f47b73bdde6e6"
          />
        </van-col>
      </van-row>
    </div>

    <div
      v-if="tabsInfo.model < 6"
      class="game-beedfb16b1c81d2901c32b6dcc2939d0 game-e4e6288c92630a6c237c15442fdb0917"
    >
      <ul>
        <li v-if="bpMode == 'edit'">
          <div class="game-2d121e51de7a817bff612f1e16fadb8e">
            倒计时:
            <span
              class="game-0db3e75efe3faa0cee4451fb55bc4c53"
              :style="bpCountdown < 10 ? { color: 'red' } : { color: 'blue' }"
              >{{ bpCountdown }}</span
            >
            秒
          </div>
        </li>
        <li v-if="bpMode == 'view'">
          <a-dropdown placement="bottomCenter" :trigger="['click']">
            <van-button
              round
              :icon="author.logo"
              size="small"
              class="game-8e4f204791d1b591b6a6f93b572f9b2d"
              >{{ author.name }}</van-button
            >
            <a-menu slot="overlay">
              <a-menu-item
                v-for="(data, index) in author.actions"
                :key="'game-c0698b41400686c1c43b9ff3061c6802-' + index"
                @click="
                  data.url
                    ? $appOpenUrl('是否打开外部链接?', null, {
                        path: data.url,
                      })
                    : null
                "
              >
                {{ data.title }}
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </li>
        <li>
          <van-button
            round
            :icon="bpPerspective == 1 ? team.team_1.logo : team.team_2.logo"
            size="small"
            color="linear-gradient(to right, #43CBFF, #6874E8)"
            class="game-8e4f204791d1b591b6a6f93b572f9b2d"
            @click="onGamePerspectiveClick(1)"
            >以
            {{ bpPerspective == 1 ? team.team_1.name : team.team_2.name }}
            的视角查看</van-button
          >
        </li>
        <li>
          <van-button
            round
            :icon="eye"
            size="small"
            color="linear-gradient(to right, #6874E8, #9708CC)"
            class="game-8e4f204791d1b591b6a6f93b572f9b2d"
            @click="onSeeHeroClick"
          >
            {{ bpPerspective == 1 ? team.team_2.name : team.team_1.name }}
            剩余英雄</van-button
          >
        </li>
      </ul>
    </div>
    <!-- 右上角 -->

    <div
      class="game-173f312c43fe32a4f01c84d1cf0520b1 game-e4e6288c92630a6c237c15442fdb0917"
    >
      <ul>
        <li v-if="showInfo.apps && (bpMode == 'view' || bpMode == 'edit')">
          <a-dropdown placement="topCenter" :trigger="['click']">
            <van-button round icon="apps-o" size="small" color="black" />
            <a-menu
              slot="overlay"
              class="game-c22cea301eff6baea51a9da08c0a680a"
            >
              <a-menu-item
                v-if="
                  bpMode == 'view' &&
                  gameInfo.result.rows.length - 1 == tabsInfo.model
                "
                @click="onToolsMenuClick(0)"
              >
                删除本局
              </a-menu-item>
              <a-menu-item
                v-if="bpMode == 'view' && gameInfo.result.rows.length < 7"
                @click="onToolsMenuClick(1)"
              >
                再来一局
              </a-menu-item>
              <a-menu-item
                v-if="
                  bpMode == 'edit' &&
                  gameInfo.result.rows.length - 1 == tabsInfo.model
                "
                @click="onToolsMenuClick(2)"
              >
                重置本局
              </a-menu-item>
              <a-menu-item @click="onToolsMenuClick(3)">
                {{ bpMode == "view" ? "编辑" : "保存" }}本局
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </li>
        <li v-if="bpMode == 'view'">
          <div class="game-5b51012ae7490ea129b5d75ad9b1016c">
            <van-button
              round
              :border="false"
              icon="bar-chart-o"
              size="small"
              color="black"
              @click="showInfo.trend = true"
            />
          </div>
        </li>
        <li v-if="gameInfo.game.type == 1 && bpMode != 'edit'">
          <van-button
            round
            icon="setting-o"
            size="small"
            color="black"
            @click="showInfo.setting = true"
          />
        </li>
        <li v-if="bpMode == 'view'">
          <van-button
            round
            icon="share-o"
            size="small"
            color="black"
            @click="onGameShareCopy"
          />
        </li>
        <li>
          <van-button
            round
            :border="false"
            icon="question-o"
            size="small"
            color="black"
            @click="
              $appOpenUrl('是否查看常见问题?', null, { path: url.question })
            "
          />
        </li>
      </ul>
    </div>
    <!-- 右下角 -->

    <van-popup
      v-model="showInfo.setting"
      v-if="showInfo.setting"
      class="game-d50ac6153978bdf3870b68c8d66e8d53"
    >
      <div class="game-d26ecf27da6e3263cf318adbb8b5f00a">
        <van-button
          round
          :type="bpMode == 'sort' ? 'primary' : 'info'"
          size="small"
          @click="onSortClick"
        >
          {{ bpMode == "sort" ? "保存" : "修改" }}排序
        </van-button>
        &nbsp;
        <van-button
          v-if="tabsInfo.model == 6"
          round
          type="info"
          size="small"
          @click="onSwapPositionClick"
        >
          交换巅峰对决位置
        </van-button>
      </div>
    </van-popup>

    <van-popup
      v-model="showInfo.trend"
      v-if="showInfo.trend"
      class="game-d50ac6153978bdf3870b68c8d66e8d53"
    >
      <GameLine
        :arrData="
          gameInfo.result.rows[tabsInfo.model].blue.pick +
          '|' +
          gameInfo.result.rows[tabsInfo.model].red.pick
        "
        :trendType="0"
    /></van-popup>

    <div class="game-22b9550116c87c4fffd94a4271127d9c">
      <van-tabs
        v-model="tabsInfo.model"
        v-if="tabsInfo.model > -1"
        :ellipsis="false"
        @change="onGameTabsChange"
        color="orange"
        class="game-4863c43e8743ebf1be3f48c5c4519627"
      >
        <van-tab
          v-for="(data, index) in gameInfo.result.rows"
          :key="'game-00b19058a88981bf8bab664835da4ecf-' + index"
          :disabled="tabsInfo.model != index && bpMode == 'sort' ? true : false"
        >
          <template #title>
            <van-icon
              :name="gameInfo.result.rows[index].win.logo"
              class-prefix="game-8d74837b1dc10576d7757cfd35b4661d"
            />
            &nbsp;
            <span
              class="game-f88456e481c26446fec30dd5685e46f4"
              :style="{ color: gameInfo.result.rows[index].win.color }"
            >
              {{ index == 6 ? "巅峰对决" : "第 " + (index + 1) + " 局" }}
            </span>
          </template>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "GameGlobalBP",
  components: {
    draggable,
    GameLine: () => import("@/components/Game/Line.vue"),
  },
  data() {
    return {
      copyData: "",
      heroType: [
        "全部分路",
        "对抗路 (战士)",
        "中路",
        "对抗路 (坦克)",
        "打野",
        "发育路",
        "辅助",
      ],
      bpCountdown: 45,
      bpOpponent: {},
      bpSelf: {},
      bpIndex: {
        ban: [0, 1, 2, 3, 10, 11, 12, 13],
        blue: [0, 2, 4, 7, 8, 11, 13, 15, 16],
        red: [1, 3, 5, 6, 9, 10, 12, 14, 17],
        bpPerspective: [
          1, // 0 - 1
          1, // 1 - 2
          1, // 2 - 3
          2, // 3 - 4
          1, // 4 - 5
          2, // 5 - 6
          1, // 6 - 7
          2, // 7 - 8
          1, // 8 - 9
          1, // 9 - 10
          1, // 10 - 11
          1, // 11 - 12
          1, // 12 - 13
          2, // 13 - 14
          1, // 14 - 15
          2, // 15 - 16
          1, // 16 -17
        ],
      },
      bpMode: "view",
      bpPerspective: 1,
      blueStepsClass: "game-1cf3b0809c3dde16d56153690bc902a2",
      redStepsClass: "game-99b844b6785d8d7378bbc2b1401af365",
      author: {
        name: "加载中",
        logo:
          "//img08.mifile.cn/v1/MI_542ED8B1722DC/caddd6f41678b4c2f56e3f4ef75944d0.png",
        actions: [],
      },
      team: {
        team_1: {
          id: 1,
          name: "队伍_1",
          logo: null,
        },
        team_2: {
          id: 2,
          name: "队伍_2",
          logo: null,
        },
      },
      tableData: {
        model: 0,
        result: {
          rows: [],
        },
      },
      eye: "eye-o",
      url: {
        question: "//doc.91m.top/jmglsi/pvp",
      },
      isPortrait: true,
      gameInfo: {
        game: {
          type: 0,
          time: null,
        },
        result: {
          rows: [
            {
              game: {
                type: 1,
                time: null,
              },
              blue: {
                ban: [0, 0, 0, 0],
                pick: [0, 0, 0, 0, 0],
              },
              red: {
                ban: [0, 0, 0, 0],
                pick: [0, 0, 0, 0, 0],
              },
              win: {
                camp: 1,
                teamId: null,
              },
              stepsNow: 0,
              stepsActive: 0,
              BPOrder: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
          ],
        },
        used: [],
      },
      tabsInfo: {
        model: 0,
      },
      showInfo: {
        apps: false,
        hero: true,
        setting: false,
        trend: false,
      },
    };
  },
  created() {
    window.addEventListener("beforeunload", (e) => this.beforeunload(e), false);

    if (this.$appIsMobile) {
      window.addEventListener("resize", this.renderResize, false);
    } else {
      this.isPortrait = false;
    }
  },
  mounted() {
    let gameLabel = this.$route.params.id || "";

    if (gameLabel) {
      this.gameLabel = gameLabel;

      this.getGameBP(gameLabel);
    } else {
      return this.$appPush({ path: "/game" });
    }
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.beforeunload, false);

    if (this.$appIsMobile) {
      window.removeEventListener("resize", this.renderResize, false);
    }
  },
  methods: {
    beforeunload: function (e) {
      e = e || window.event;

      if (this.bpMode != "view") {
        if (e) {
          e.returnValue = "关闭提示";
        }
        return "关闭提示";
      }
    },
    renderResize: function () {
      let width = document.documentElement.clientWidth,
        height = document.documentElement.clientHeight;

      if (width < height) {
        this.isPortrait = true;
      } else {
        this.isPortrait = false;

        if (width < 700 || height < 375) {
          this.$message.warning(this.$appMsg.warning[1000]);
        }
      }
    },
    initBPOrder: function (bpPerspective, index) {
      if (bpPerspective == 1) {
        this.bpSelf = this.team.team_1;
        this.bpOpponent = this.team.team_2;
      } else {
        this.bpSelf = this.team.team_2;
        this.bpOpponent = this.team.team_1;
      }

      let used = [];

      for (let i = 0; i < index; i++) {
        let orderList = this.gameInfo.result.rows[i];

        this.gameInfo.result.rows[i].blue.ban = [
          orderList.BPOrder[0],
          orderList.BPOrder[2],
          orderList.BPOrder[11],
          orderList.BPOrder[13],
        ];

        this.gameInfo.result.rows[i].blue.pick = [
          orderList.BPOrder[4],
          orderList.BPOrder[7],
          orderList.BPOrder[8],
          orderList.BPOrder[15],
          orderList.BPOrder[16],
        ];

        this.gameInfo.result.rows[i].red.ban = [
          orderList.BPOrder[1],
          orderList.BPOrder[3],
          orderList.BPOrder[10],
          orderList.BPOrder[12],
        ];

        this.gameInfo.result.rows[i].red.pick = [
          orderList.BPOrder[5],
          orderList.BPOrder[6],
          orderList.BPOrder[9],
          orderList.BPOrder[14],
          orderList.BPOrder[17],
        ];

        if (bpPerspective == 1) {
          if (i % 2 == 0) {
            used.push.apply(used, this.gameInfo.result.rows[i].red.pick);
          } else {
            used.push.apply(used, this.gameInfo.result.rows[i].blue.pick);
          }
        }

        if (bpPerspective == 2) {
          if (i % 2 == 0) {
            used.push.apply(used, this.gameInfo.result.rows[i].blue.pick);
          } else {
            used.push.apply(used, this.gameInfo.result.rows[i].red.pick);
          }
        }
        //队伍视角,会交换位置
      }

      this.gameInfo.used = Array.from(new Set(used));
    },
    initCountdown: function () {
      this.bpCountdown = 45;

      clearInterval(this.bpCountdownInterval);
      this.bpCountdownInterval = setInterval(() => {
        this.bpCountdown--;
        if (this.bpCountdown == 0) {
          clearInterval(this.bpCountdownInterval);

          this.$message.error(this.$appMsg.error[1000]);
        }
      }, 1000);
    },
    getRanking: function (gameTime = null, aid = 0, bid = 4, cid = 0) {
      let ranking = this.$appGetLocalStorage("gameBP");

      if (ranking) {
        this.tableData = ranking;

        return;
      }

      this.$axios
        .post(
          this.$appApi.pvp.getRanking +
            "&aid=" +
            aid +
            "&bid=" +
            bid +
            "&cid=" +
            cid,
          this.$qs.stringify({
            gameTime: gameTime,
          })
        )
        .then((res) => {
          let data = res.data.data;

          this.tableData.result = data.result;

          this.$appSetLocalStorage("gameBP", this.tableData);

          this.$message.success(this.$appMsg.success[1005]);
        });
    },
    getGameBP: function (gameLabel) {
      this.$axios
        .post(
          this.$appApi.game.getGameBP,
          this.$qs.stringify({
            gameLabel: gameLabel,
          })
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            let data = res.data.data;

            this.author = data.author;
            this.team = data.team;
            this.gameInfo = data;

            this.initBPOrder(this.bpPerspective, 0 + 1);
            this.getRanking(data.game.time);

            this.gameInfo.game.type == 1 &&
            this.author.openId &&
            this.author.openId == this.$cookie.get("openId")
              ? (this.showInfo.apps = true)
              : (this.showInfo.apps = false);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onGameShareCopy: function () {
      let vs = this.team.team_1.name + " Vs " + this.team.team_2.name,
        longUrl = location.href;

      this.$axios
        .post(this.$appApi.s.url, {
          url: longUrl,
        })
        .then((res) => {
          let shortUrl = res.data.data.url;

          this.copyData =
            "正在复盘【" +
            vs +
            "】的第 " +
            (this.tabsInfo.model + 1) +
            " 局比赛 ↓\r" +
            shortUrl;

          setTimeout(
            (copyData) => {
              this.$appCopyData(copyData);
            },
            750,
            this.copyData
          );
        });
    },
    onCreateGameBPClick: function () {
      let newGame = {
        game: {
          type: 1,
          time: null,
        },
        blue: {
          ban: [0, 0, 0, 0],
          pick: [0, 0, 0, 0, 0],
        },
        red: {
          ban: [0, 0, 0, 0],
          pick: [0, 0, 0, 0, 0],
        },
        win: {
          camp: 1,
          color: "blue",
          id: null,
          name: null,
          logo: null,
        },
        stepsNow: 0,
        stepsActive: 0,
        BPOrder: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      };

      let teamInfo = this.team,
        gameIndex = this.gameInfo.result.rows.length;

      this.$axios
        .post(
          this.$appApi.pvp.updateGameBP,
          this.$qs.stringify({
            gameLabel: this.gameLabel,
            gameIndex: gameIndex,
            teamId_1: teamInfo.team_1.id,
            teamId_2: teamInfo.team_2.id,
          })
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            this.gameInfo.result.rows.push(newGame);

            this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onUpdateGameBPClick: function (index) {
      let teamInfo = this.team,
        gameInfo = this.gameInfo.result.rows[index];

      if (gameInfo.win.camp == null) {
        this.$message.error(this.$appMsg.error[1002]);
        return;
      }

      this.$axios
        .post(
          this.$appApi.pvp.updateGameBP,
          this.$qs.stringify({
            gameLabel: this.gameLabel,
            gameIndex: index,
            teamId_1: teamInfo.team_1.id,
            teamId_2: teamInfo.team_2.id,
            gameWinCamp: gameInfo.win.camp,
            arrData: String(gameInfo.BPOrder),
          })
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            this.$message.success("已保存第 " + (index + 1) + " 局 ;D");
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onDeleteGameBPClick: function (index) {
      this.$axios
        .post(
          this.$appApi.pvp.deleteGameBP,
          this.$qs.stringify({
            gameLabel: this.gameLabel,
            gameIndex: index,
          })
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            this.gameInfo.result.rows.splice(index, 1);
            this.tabsInfo.model = index - 1;

            this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    gameCampColor: function (color, index) {
      let ret = false;

      if (color == 1) {
        ret = this.bpIndex.blue.includes(index);
      } else if (color == 2) {
        ret = this.bpIndex.red.includes(index);
      }

      return ret;
    },
    onSeeHeroClick: function () {
      if (this.eye == "eye-o") {
        this.eye = "closed-eye";

        this.showInfo.hero = false;
      } else {
        this.eye = "eye-o";

        this.showInfo.hero = true;
      }
    },
    onGamePerspectiveClick: function (bpMode) {
      let tabsModel = this.tabsInfo.model;

      this.bpPerspective == 1
        ? (this.bpPerspective = 2)
        : (this.bpPerspective = 1);

      this.initBPOrder(this.bpPerspective, tabsModel + 1);

      if (bpMode == 1)
        this.$message.success("初始化 " + this.bpSelf.name + " 的视角");
    },
    onGameTabsChange: function (e) {
      this.initBPOrder(this.bpPerspective, e + 1);
    },
    onGameBanPickClick: function (index) {
      if (this.bpMode == "view") return;

      let tabsModel = this.tabsInfo.model;

      if (this.gameInfo.result.rows[tabsModel].BPOrder[index - 1] == 0) {
        this.$message.error(this.$appMsg.error[1003]);
        return;
      }

      let oldIndex = this.gameInfo.result.rows[tabsModel].stepsNow;

      if (this.bpMode == "edit") {
        if (this.gameCampColor(1, oldIndex) != this.gameCampColor(1, index)) {
          this.onGamePerspectiveClick(0);

          this.initCountdown();
        }
        //点击触发:切换阵容时初始化

        this.gameInfo.result.rows[tabsModel].stepsNow = index;
      }
    },
    onGamePickHeroClick: function (hero, index) {
      let tabsModel = this.tabsInfo.model,
        bpMode = this.bpMode;

      if (bpMode == "sort") {
        let sortText = null,
          newTrend = -1;

        if (hero.trend == 2) {
          sortText = "其他";
          newTrend = 0;
        } else {
          sortText = "置顶";
          newTrend = 2;
        }

        this.$dialog
          .confirm({
            title: "是否将【" + hero.name + "】标记为【" + sortText + "】?",
          })
          .then(() => {
            // on confirm
            this.tableData.result.rows[index].trend = newTrend;

            this.$appSetLocalStorage("gameBP", this.tableData.result);
          })
          .catch(() => {
            // on cancel
          });

        return;
      }

      if (bpMode != "edit") return;

      if (tabsModel < 6) {
        if (
          this.gameInfo.result.rows[tabsModel].blue.ban.includes(hero.id) ||
          this.gameInfo.result.rows[tabsModel].red.ban.includes(hero.id)
        ) {
          this.$message.error("本局 " + hero.name + " 已被禁用");

          return;
        } else if (this.gameInfo.used.includes(hero.id)) {
          this.$message.warning(
            hero.name + " 已被 " + this.bpOpponent.name + " 使用"
          );

          return;
        }
      } else {
        //巅峰对局
      }

      let oldIndex = this.gameInfo.result.rows[tabsModel].stepsNow;

      if (oldIndex == 16) {
        this.$message.warning(this.$appMsg.warning[1001]);
      }

      if (oldIndex >= 18) {
        oldIndex = 0;
      } else {
        this.gameInfo.result.rows[tabsModel].BPOrder.splice(
          oldIndex,
          1,
          hero.id
        );
      }

      if (this.bpIndex.bpPerspective[oldIndex] == 1) {
        this.onGamePerspectiveClick(0);
      }
      //对照 bpIndex 视角表格,如果是 1 则初始化时间

      if (
        this.gameCampColor(1, oldIndex) != this.gameCampColor(1, oldIndex + 1)
      ) {
        this.initCountdown();
      }
      //自动触发:切换阵容时初始化

      this.gameInfo.result.rows[tabsModel].stepsNow = oldIndex + 1;

      this.initBPOrder(this.bpPerspective, tabsModel + 1);
    },
    onSortClick: function () {
      if (this.bpMode == "sort") {
        this.$appSetLocalStorage("gameBP", this.tableData);

        this.bpMode = "view";

        this.showInfo.setting = false;

        this.$message.success(this.$appMsg.success[1000]);
      } else {
        this.bpMode = "sort";

        this.showInfo.setting = false;

        this.$message.info(this.$appMsg.info[1017]);
      }
    },
    onSwapPositionClick() {
      let teamInfo = this.team,
        tempTeamInfo = null;

      tempTeamInfo = teamInfo.team_1;

      this.team.team_1 = teamInfo.team_2;
      this.team.team_2 = tempTeamInfo;

      this.$message.success(this.$appMsg.success[1000]);
    },
    onToolsMenuClick: function (type) {
      let tabsModel = this.tabsInfo.model;

      if (type == 0) {
        this.$dialog
          .confirm({
            title: "是否删除第 " + (tabsModel + 1) + " 局?",
            message: "此操作不可逆",
          })
          .then(() => {
            // on confirm
            this.onDeleteGameBPClick(tabsModel);

            if (tabsModel == 0) {
              this.$appPush({ path: "/game/engage" });
            }
          })
          .catch(() => {
            // on cancel
          });
      }

      if (type == 1) {
        this.onCreateGameBPClick();
      }

      if (type == 2) {
        let newGame = {
          game: {
            type: 1,
            time: null,
          },
          blue: {
            ban: [0, 0, 0, 0],
            pick: [0, 0, 0, 0, 0],
          },
          red: {
            ban: [0, 0, 0, 0],
            pick: [0, 0, 0, 0, 0],
          },
          win: {
            camp: 1,
            teamId: null,
          },
          stepsNow: 0,
          stepsActive: 0,
          BPOrder: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        };

        this.$dialog
          .confirm({
            title: "是否重置第 " + (tabsModel + 1) + " 局?",
            message: "此操作不可逆",
          })
          .then(() => {
            // on confirm
            this.gameInfo.result.rows[tabsModel] = newGame;

            this.$message.success(this.$appMsg.success[1000]);
          })
          .catch(() => {
            // on cancel
          });
      }

      if (type == 3) {
        if (this.bpMode == "view") {
          this.bpMode = "edit";

          this.bpIndex.ban.includes(
            this.gameInfo.result.rows[tabsModel].stepsNow
          ) && tabsModel % 2 == 0
            ? (this.bpPerspective = 2)
            : (this.bpPerspective = 1);
          this.onGamePerspectiveClick(0);
          //tabsModel % 2 == 0

          this.initCountdown();

          this.$message.info(this.$appMsg.info[1001]);
        } else {
          this.bpMode = "view";

          this.onUpdateGameBPClick(tabsModel);

          this.bpCountdown = 45;
          clearInterval(this.bpCountdownInterval);
        }
      }
    },
    onWinCampClick: function (camp) {
      let nowWinTeam = null,
        tabsModel = this.tabsInfo.model,
        teamInfo = this.team;

      if (camp == 1) {
        tabsModel % 2 == 0
          ? (nowWinTeam = teamInfo.team_1)
          : (nowWinTeam = teamInfo.team_2);
      } else {
        tabsModel % 2 == 0
          ? (nowWinTeam = teamInfo.team_2)
          : (nowWinTeam = teamInfo.team_1);
      }

      this.$dialog
        .confirm({
          title: "是否将本局胜方标记为【" + nowWinTeam.name + "】?",
        })
        .then(() => {
          // on confirm
          nowWinTeam.camp = camp;
          camp == 1 ? (nowWinTeam.color = "blue") : (nowWinTeam.color = "red");
          this.gameInfo.result.rows[tabsModel].win = nowWinTeam;

          this.$message.success(this.$appMsg.success[1000]);
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style scoped>
img.game-eee32796c3fdfc147115c9f6e875c090,
img.game-aa95efe1c5d39e5e9389ca5833e63fbe {
  border-radius: 10px;
  margin: 5px;
}

img.game-5de9dd2a5714dd606db0e0fa1611c227,
img.game-221cf04d9a9e32c6af24502f96e3ecfe {
  border-radius: 100%;
  margin: 5px;
}

img.game-dce7c4174ce9323904a934a486c41288 {
  margin-left: -15px;
  margin-top: 20px;
  position: absolute;
}

span.game-80653328482d7cba8da3f0fa033b0c12 {
  margin: 0 5px;
}

span.game-0db3e75efe3faa0cee4451fb55bc4c53 {
  font-size: 20px;
}

span.game-9965db4bfcd480ab6c0b1a6a3de68bab {
  margin-left: -15px;
  position: absolute;
  top: -1px;
  z-index: 1;
}

button.game-8e4f204791d1b591b6a6f93b572f9b2d img.van-icon__image {
  border-radius: 100%;
  height: 40px;
  margin-left: -12px;
  margin-top: -2px;
  width: 40px;
}

div.van-tabs__wrap {
  z-index: 2;
}

div.game-bp-portrait {
  margin-top: 60%;
}

div.game-d26ecf27da6e3263cf318adbb8b5f00a {
  text-align: left;
}

div.game-2c9118a482fe35d5ab2b6cb01c1985be {
  display: contents;
}

div.game-d75e14b5c8f13e894fe9bf9d5426c198,
div.game-251504ba219ea8c3175f47b73bdde6e6 {
  position: absolute;
  top: 80px;
  width: 50px;
}

div.game-d75e14b5c8f13e894fe9bf9d5426c198 {
  left: 0;
}

div.game-251504ba219ea8c3175f47b73bdde6e6 {
  right: 0;
}

div.game-b3d70a861f68652bf97d7a26bf421d4f {
  color: red;
  font-size: 12px;
  margin-top: 15px;
}

div.game-bd40579650e3f651e222aef268d5c8ae {
  margin-top: 10px;
}

img.game-1cf3b0809c3dde16d56153690bc902a2 {
  animation: blueTwinkle 800ms ease-out infinite alternate;
  border: 2px solid rgb(0, 0, 255, 0.5) !important;
}

@keyframes blueTwinkle {
  0% {
    box-shadow: 0 0 5px rgba(0, 0, 255, 0.2), inset 0 0 5px rgba(0, 0, 255, 0.1);
  }
  100% {
    box-shadow: 0 0 20px rgba(0, 0, 255, 0.6),
      inset 0 0 10px rgba(0, 0, 255, 0.4);
  }
}

img.game-99b844b6785d8d7378bbc2b1401af365 {
  animation: redTwinkle 800ms ease-out infinite alternate;
  border: 2px solid rgb(255, 0, 0, 0.5) !important;
}

@keyframes redTwinkle {
  0% {
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.2), inset 0 0 5px rgba(255, 0, 0, 0.1);
  }
  100% {
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.6),
      inset 0 0 10px rgba(255, 0, 0, 0.4);
  }
}

i.game-8d74837b1dc10576d7757cfd35b4661d img.van-icon__image {
  margin-top: -3px;
}

div.game-87740aa9337e54dbad53ec95089dca77 {
  background-color: white;
}

div.game-beedfb16b1c81d2901c32b6dcc2939d0,
div.game-173f312c43fe32a4f01c84d1cf0520b1 {
  margin: 3px;
  position: fixed;
}

div.game-beedfb16b1c81d2901c32b6dcc2939d0,
div.game-173f312c43fe32a4f01c84d1cf0520b1 {
  right: 95px;
}

div.game-beedfb16b1c81d2901c32b6dcc2939d0 {
  top: 65px;
  z-index: 1;
}

div.game-173f312c43fe32a4f01c84d1cf0520b1 {
  bottom: 42px;
  height: 35px;
  z-index: 1;
}

div.game-e4e6288c92630a6c237c15442fdb0917 li {
  float: left;
  margin: 3px 5px;
}

div.game-8c9cb4a232c7e88403dddc3a0e589162,
div.game-c6a2f8b3941d7f91bc4e51839e5371e0,
div.game-8c9cb4a232c7e88403dddc3a0e589162,
div.game-c6a2f8b3941d7f91bc4e51839e5371e0 {
  position: absolute;
}

div.game-bf2c7b7ad9bcf75cd72e0b4ce30500e3 li {
  float: left;
}

div.game-ba9bced6af8121cf6413000a4274ac2b li {
  float: right;
}

div.game-8c9cb4a232c7e88403dddc3a0e589162,
div.game-c6a2f8b3941d7f91bc4e51839e5371e0 {
  top: 15px;
  width: 165px;
}

div.game-8c9cb4a232c7e88403dddc3a0e589162 {
  left: 25px;
}

div.game-c6a2f8b3941d7f91bc4e51839e5371e0 {
  right: 25px;
}

div.game-4863c43e8743ebf1be3f48c5c4519627 {
  bottom: 0;
  position: fixed;
  width: 100%;
  z-index: 1;
}

div.game-5b51012ae7490ea129b5d75ad9b1016c,
div.game-2d121e51de7a817bff612f1e16fadb8e {
  font-size: 12px;
}

div.game-d50ac6153978bdf3870b68c8d66e8d53 {
  border-radius: 5px;
  padding: 10px;
  width: 500px;
}
</style>