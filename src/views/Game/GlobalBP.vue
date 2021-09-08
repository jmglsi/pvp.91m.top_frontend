<template>
  <div v-if="isPortrait" @click="isPortrait = false" class="game-bp-portrait">
    <div slot-scope class="game-a76e75b5854094183e66c274e1d276e9">
      <img
        v-lazy="'//ae03.alicdn.com/kf/H18227e8033284a6885ae800ce5f4af71O.png'"
        width="100"
        height="100"
      />
      <div class="game-b3d70a861f68652bf97d7a26bf421d4f">
        请将设备横过来 或 点击这里切换横屏 ;D
      </div>
    </div>
  </div>
  <div v-else class="app-9fc0eb5a934dba03cc266a49b8ec51fb">
    <span
      class="app-f4842dcb685d490e2a43212b8072a6fe"
      @click="
        showInfo.isUsed ? (showInfo.isUsed = false) : (showInfo.isUsed = true)
      "
    >
      <span
        class="game-d4f94e5b8f23a1755b438ff70ed16fc6"
        :style="{ color: 'blue' }"
        >{{ gameInfo.result.rows[tabsInfo.model].team.team_1.name }}</span
      >
      <span class="game-80653328482d7cba8da3f0fa033b0c12">Vs</span>
      <span
        class="game-1426b22460332d802aedd4d54d35f3ee"
        :style="{ color: 'red' }"
        >{{ gameInfo.result.rows[tabsInfo.model].team.team_2.name }}</span
      >
    </span>

    <div class="game-716fcd585a785195878b2683fca82e6f">
      <div
        class="
          game-8c9cb4a232c7e88403dddc3a0e589162
          game-bf2c7b7ad9bcf75cd72e0b4ce30500e3
        "
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
                  '//ae05.alicdn.com/kf/H177817b6310e4b99ac74142515052ca9k.png'
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
        class="
          game-c6a2f8b3941d7f91bc4e51839e5371e0
          game-ba9bced6af8121cf6413000a4274ac2b
        "
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
                  '//ae05.alicdn.com/kf/H177817b6310e4b99ac74142515052ca9k.png'
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
            v-if="showInfo.heroList"
            :style="
              $appIsMobile
                ? { height: '240px' }
                : { height: $appHeight - 150 + 'px' }
            "
            class="game-99938282f04071859941e18f16efcf42"
          >
            <van-tabs
              v-model="tableData.model"
              v-if="tableData.model > -1"
              :border="false"
              :ellipsis="false"
              :swipe-threshold="$appIsMobile ? 4 : 7"
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
                          (showInfo.isBan == true ||
                            (showInfo.isBan == false && data.isBan == false)) &&
                          (showInfo.isUsed == true ||
                            (showInfo.isUsed == false &&
                              data.isUsed == false)) &&
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
                            v-if="data.isBan"
                            round
                            color="red"
                            class="game-9965db4bfcd480ab6c0b1a6a3de68bab"
                            >已禁</van-tag
                          >
                          <van-tag
                            round
                            v-if="data.isUsed"
                            color="orange"
                            class="game-9965db4bfcd480ab6c0b1a6a3de68bab"
                            >已用</van-tag
                          >
                        </span>
                        <img
                          v-lazy="data.img"
                          :style="
                            tabsInfo.model < 6 && (data.isBan || data.isUsed)
                              ? { filter: 'grayscale(1)' }
                              : {}
                          "
                          width="40"
                          height="40"
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
                          (showInfo.isBan == true ||
                            (showInfo.isBan == false && data.isBan == false)) &&
                          (showInfo.isUsed == true ||
                            (showInfo.isUsed == false &&
                              data.isUsed == false)) &&
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
                            v-if="data.isBan"
                            round
                            color="red"
                            class="game-9965db4bfcd480ab6c0b1a6a3de68bab"
                            >已禁</van-tag
                          >
                          <van-tag
                            round
                            v-if="data.isUsed"
                            color="orange"
                            class="game-9965db4bfcd480ab6c0b1a6a3de68bab"
                            >已用</van-tag
                          >
                        </span>
                        <img
                          v-lazy="data.img"
                          :style="
                            tabsInfo.model < 6 && (data.isBan || data.isUsed)
                              ? { filter: 'grayscale(1)' }
                              : {}
                          "
                          width="40"
                          height="40"
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
      class="
        game-beedfb16b1c81d2901c32b6dcc2939d0
        game-e4e6288c92630a6c237c15442fdb0917
      "
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
        <li
          v-if="bpMode == 'view'"
          class="app-52b0e5c90604d59d1814f184d58e2033"
        >
          <a-dropdown placement="bottomCenter" :trigger="['click']">
            <van-button
              round
              :icon="authorInfo.logo"
              size="small"
              class="game-8e4f204791d1b591b6a6f93b572f9b2d"
              >{{ authorInfo.name }}</van-button
            >
            <a-menu slot="overlay">
              <a-menu-item
                v-for="(data, index) in authorInfo.actions"
                :key="'game-c0698b41400686c1c43b9ff3061c6802-' + index"
                :disabled="data.title == '-' && (!data.to || !data.url)"
                @click="onActionClick(data)"
                >{{ data.title }}</a-menu-item
              >
            </a-menu>
          </a-dropdown>
        </li>
        <li class="app-52b0e5c90604d59d1814f184d58e2033">
          <van-button
            round
            :icon="
              bpPerspective == 1 ? teamInfo.team_1.logo : teamInfo.team_2.logo
            "
            size="small"
            color="linear-gradient(to right, #43CBFF, #6874E8)"
            class="game-8e4f204791d1b591b6a6f93b572f9b2d"
            @click="onGamePerspectiveClick(1)"
          >
            以&nbsp;{{
              bpPerspective == 1 ? teamInfo.team_1.name : teamInfo.team_2.name
            }}&nbsp;的视角查看
          </van-button>
        </li>
        <li class="app-52b0e5c90604d59d1814f184d58e2033">
          <van-button
            round
            :icon="eye"
            size="small"
            color="linear-gradient(to right, #6874E8, #9708CC)"
            class="game-8e4f204791d1b591b6a6f93b572f9b2d"
            @click="onSeeHeroClick"
            >{{
              bpPerspective == 1 ? teamInfo.team_2.name : teamInfo.team_1.name
            }}&nbsp;的剩余英雄</van-button
          >
        </li>
      </ul>
    </div>
    <!-- 右上角 -->

    <div
      class="
        game-173f312c43fe32a4f01c84d1cf0520b1
        game-e4e6288c92630a6c237c15442fdb0917
      "
    >
      <ul>
        <li>
          <span>
            <span
              class="game-59b9fd83bc5ce802ee9ace7db0e22522"
              :style="{ color: 'red' }"
            >
              已禁
            </span>
            <span>
              <van-switch
                v-model="showInfo.isBan"
                active-color="red"
                size="13px"
              />
            </span>
          </span>
          &nbsp; &nbsp;
          <span>
            <span
              class="game-59b9fd83bc5ce802ee9ace7db0e22522"
              :style="{ color: 'orange' }"
            >
              已用
            </span>
            <span>
              <van-switch
                v-model="showInfo.isUsed"
                active-color="orange"
                size="13px"
              />
            </span>
          </span>
          &nbsp; &nbsp;
          <a-popover
            :visible="
              recommendHeroId != 0 && showInfo.recommend && showInfo.popover
            "
          >
            <span>
              <span
                class="game-59b9fd83bc5ce802ee9ace7db0e22522"
                :style="{ color: '#1989fa' }"
              >
                推荐
              </span>
              <span>
                <van-switch
                  v-model="showInfo.recommend"
                  active-color="#1989fa"
                  size="13px"
                />
              </span>
            </span>
            <template slot="title">
              <img
                v-lazy="
                  '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                  recommendHeroId +
                  '/' +
                  recommendHeroId +
                  '.jpg'
                "
                width="25"
                height="25"
                class="game-1ab74bf7276acc5985f078fee7e63109"
              />
              <span class="game-07b120eca6da2e9c7115d4ccae824cca">
                智能推荐
              </span>
              <span class="game-45949fe72cfc70cc6a7bd3870cabc397">
                仅供参考
              </span>
            </template>
            <template slot="content">
              <GameRecommend :heroId="recommendHeroId" />
            </template>
          </a-popover>
          <span class="game-99e127c3f9d57b5d03327ebe8b1e4982">|</span>
        </li>
        <li>
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
                >删除本局</a-menu-item
              >
              <a-menu-item
                v-if="
                  bpMode == 'view' &&
                  gameInfo.result.rows.length - 1 == tabsInfo.model &&
                  gameInfo.result.rows.length < 7
                "
                @click="onToolsMenuClick(1)"
                >再来一局</a-menu-item
              >
              <a-menu-item
                v-if="
                  bpMode == 'edit' &&
                  gameInfo.result.rows.length - 1 == tabsInfo.model
                "
                @click="onToolsMenuClick(2)"
                >重置本局</a-menu-item
              >
              <a-menu-item @click="onToolsMenuClick(3)"
                >{{ bpMode == "view" ? "编辑" : "保存" }}本局</a-menu-item
              >
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
        <li>
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
              $appOpenUrl('是否查看常见问题?', null, { path: url.question }, 0)
            "
          />
        </li>
      </ul>
    </div>
    <!-- 右下角 -->

    <van-popup
      v-model="showInfo.setting"
      v-if="showInfo.setting"
      class="app-69df17da0044a6e876b2afd3217d2564"
    >
      <div class="game-d26ecf27da6e3263cf318adbb8b5f00a">
        <div class="game-99e140155dfa90b24460c11576063c08">
          <van-button
            round
            :type="bpMode == 'sort' ? 'primary' : 'info'"
            size="small"
            @click="onNewSortClick"
            >{{ bpMode == "sort" ? "保存" : "修改" }}排序</van-button
          >
          &nbsp;
          <van-button
            v-if="bpMode == 'edit'"
            round
            type="info"
            size="small"
            @click="onSwapPositionClick"
          >
            交换位置
          </van-button>
        </div>
        <van-divider :style="{ color: 'red', borderColor: 'red' }">
          以下功能慎用
        </van-divider>
        <div class="game-b517e39eb99fd590ac1df412b5c84007">
          <van-button
            round
            type="danger"
            size="small"
            @click="onResetSortClick"
          >
            重置排序
          </van-button>
        </div>
      </div>
    </van-popup>

    <van-popup
      v-model="showInfo.trend"
      v-if="showInfo.trend"
      class="app-69df17da0044a6e876b2afd3217d2564"
    >
      <GameLine
        :arrData="
          gameInfo.result.rows[tabsInfo.model].blue.pick +
          '|' +
          gameInfo.result.rows[tabsInfo.model].red.pick
        "
        :trendType="0"
      />
    </van-popup>

    <div class="game-22b9550116c87c4fffd94a4271127d9c">
      <van-tabs
        v-model="tabsInfo.model"
        v-if="tabsInfo.model > -1"
        :ellipsis="false"
        @change="onGameTabsChange"
        class="game-4863c43e8743ebf1be3f48c5c4519627"
      >
        <van-tab
          v-for="(data, index) in gameInfo.result.rows"
          :key="'game-00b19058a88981bf8bab664835da4ecf-' + index"
          :disabled="tabsInfo.model != index && bpMode != 'view' ? true : false"
        >
          <template #title>
            <van-icon
              :name="gameInfo.result.rows[index].win.logo"
              class-prefix="game-8d74837b1dc10576d7757cfd35b4661d"
            />&nbsp;
            <span
              class="game-f88456e481c26446fec30dd5685e46f4"
              :style="{ color: gameInfo.result.rows[index].win.color }"
              >{{ index == 6 ? "巅峰对决" : "第 " + (index + 1) + " 局" }}</span
            >
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
    GameRecommend: () => import("@/components/Game/Recommend.vue"),
  },
  data() {
    return {
      copyData: "",
      gameLabel: this.$route.params.id || "",
      heroType: [
        "全部分路",
        "对抗路 (战士)",
        "中路",
        "对抗路 (坦克)",
        "打野",
        "发育路",
        "游走",
      ],
      bpCountdown: 45,
      bpOpponent: {},
      bpSelf: {},
      bpIndex: {
        ban: [0, 1, 2, 3, 10, 11, 12, 13],
        blue: [0, 2, 4, 7, 8, 11, 13, 15, 16],
        red: [1, 3, 5, 6, 9, 10, 12, 14, 17],
        bpPerspective: [
          1, //0 - 1
          1, //1 - 2
          1, //2 - 3
          2, //3 - 4
          1, //4 - 5
          2, //5 - 6
          1, //6 - 7
          2, //7 - 8
          1, //8 - 9
          1, //9 - 10
          1, //10 - 11
          1, //11 - 12
          1, //12 - 13
          2, //13 - 14
          1, //14 - 15
          2, //15 - 16
          1, //16 -17
        ],
      },
      eye: "eye-o",
      bpMode: "view",
      bpPerspective: 1,
      blueStepsClass: "game-1cf3b0809c3dde16d56153690bc902a2",
      redStepsClass: "game-99b844b6785d8d7378bbc2b1401af365",
      tableData: {
        model: 0,
        result: {
          rows: [],
        },
      },
      url: {
        question: "//www.yuque.com/jmglsi/pvp/gbpl91",
      },
      isPortrait: true,
      recommendHeroId: 0,
      newGameInfo: {},
      gameInfo: {
        game: {
          type: 1,
          time: null,
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
                camp: null,
                teamId: null,
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
              stepsNow: 0,
              BPOrder: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
          ],
        },
        ban: [],
        used: [],
      },
      authorInfo: {
        name: "本地",
        logo: "/img/game-icons/kpl.png",
        actions: [
          {
            title: "注册登录后",
            to: "/my",
            url: null,
          },
          {
            title: "可同步数据",
            to: "/my",
            url: null,
          },
          {
            title: "-",
            to: null,
            url: null,
          },
          {
            title: "联系站长 💗",
            to: "/friends?openId=dc96aebe41f1427bbb9e9fe4b0ab9517",
            url: null,
          },
        ],
      },
      teamInfo: {
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
      tabsInfo: {
        model: 0,
      },
      showInfo: {
        apps: true,
        heroList: true,
        setting: false,
        trend: false,
        popover: true,
        recommend: false,
        isBan: true,
        isUsed: true,
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
    let gameLabel = this.gameLabel;

    if (gameLabel) {
      this.getGameBP(gameLabel);

      this.getRanking();
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
    initBPOrder: function (bpPerspective, bpIndex) {
      let tabsModel = this.tabsInfo.model,
        gameInfo = this.gameInfo;

      if (bpPerspective == 1) {
        this.bpSelf = gameInfo.team.team_1;
        this.bpOpponent = gameInfo.team.team_2;
      } else {
        this.bpSelf = gameInfo.team.team_2;
        this.bpOpponent = gameInfo.team.team_1;
      }

      let ban = [],
        used = [];

      for (let i = 0; i < bpIndex + 1; i++) {
        let orderList = gameInfo.result.rows[i];

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

        used.push.apply(
          used,
          this.isBlueCamp(
            bpPerspective == 1 ? orderList.team.team_1 : orderList.team.team_2
          )
            ? this.gameInfo.result.rows[i].red.pick
            : this.gameInfo.result.rows[i].blue.pick
        );
        //队伍视角,会交换位置
      }

      ban.push.apply(ban, this.gameInfo.result.rows[tabsModel].blue.ban);
      ban.push.apply(ban, this.gameInfo.result.rows[tabsModel].red.ban);

      this.gameInfo.ban = Array.from(new Set(ban));
      this.gameInfo.used = Array.from(new Set(used));

      this.tableData.result.rows.map((hero) => {
        ban.indexOf(hero.id) > -1 ? (hero.isBan = true) : (hero.isBan = false);
        used.indexOf(hero.id) > -1
          ? (hero.isUsed = true)
          : (hero.isUsed = false);
      });
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
    getRanking: function (gameTime = null, aid = 0, bid = 4, cid = 0, did = 1) {
      let ls = this.$appGetLocalStorage("gameBP");

      if (ls) {
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
            did,
          this.$qs.stringify({
            gameTime: gameTime,
          })
        )
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            data.result.rows.map((x) => {
              x.isBan = false;
              x.isUsed = false;
            });

            this.tableData.result = data.result;

            this.initBPOrder(this.bpPerspective, 0);

            this.$appSetLocalStorage("gameBP", this.tableData);

            this.$message.success(this.$appMsg.success[1005]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    isBlueCamp: function (nowTeamInfo) {
      let ret = false;

      this.teamInfo.team_1.id == nowTeamInfo.id ? (ret = true) : (ret = false);

      //进入编辑模式的时候判断是不是蓝色方
      return ret;
    },
    getGameBP: function (gameLabel) {
      if (this.gameLabel == "new") {
        this.$message.warning(this.$appMsg.warning[750]);
        //本地
      } else {
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

              this.gameInfo = data;
              this.teamInfo = data.team;
              this.authorInfo = data.author;

              this.initBPOrder(this.bpPerspective, 0);
            } else {
              this.$message.error(status.msg);
            }
          });
      }
    },
    onGameShareCopy: function () {
      let tabsModel = this.tabsInfo.model,
        teamInfo = this.teamInfo,
        vs = teamInfo.team_1.name + " Vs " + teamInfo.team_2.name,
        longUrl = location.href;

      this.$axios
        .post(this.$appApi.pvp.getShortUrl, {
          url: longUrl,
        })
        .then((res) => {
          let shortUrl = res.data.data.url;

          this.copyData =
            "正在复盘【" +
            vs +
            "】的第 " +
            (tabsModel + 1) +
            " 局比赛 ↓\r" +
            shortUrl;

          this.$appCopyData(this.copyData);
        });
    },
    onActionClick: function (data) {
      if (data.to) {
        this.$appOpenUrl("是否打开内部链接?", null, { path: data.to }, 1);
      }

      if (data.url) {
        this.$appOpenUrl("是否打开外部链接?", null, { path: data.url }, 0);
      }
    },
    onCreateGameBPClick: function () {
      let teamInfo = this.teamInfo,
        gameIndex = this.gameInfo.result.rows.length;

      this.newGameInfo = {
        game: {
          type: 1,
          time: null,
        },
        team:
          gameIndex % 2 == 0
            ? { team_1: teamInfo.team_1, team_2: teamInfo.team_2 }
            : { team_1: teamInfo.team_2, team_2: teamInfo.team_1 },
        blue: {
          ban: [0, 0, 0, 0],
          pick: [0, 0, 0, 0, 0],
        },
        red: {
          ban: [0, 0, 0, 0],
          pick: [0, 0, 0, 0, 0],
        },
        win: {
          camp: null,
          color: null,
          id: null,
          name: null,
          logo: null,
        },
        stepsNow: 0,
        BPOrder: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      };
      //创建 BP 的时候切换红蓝阵营

      if (this.gameLabel == "new") {
        this.gameInfo.result.rows.push(this.newGameInfo);

        return;
      }

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
            this.gameInfo.result.rows.push(this.newGameInfo);

            this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onUpdateGameBPClick: function (nowIndex) {
      let gameInfo = this.gameInfo.result.rows[nowIndex];

      if (!gameInfo.win.camp) {
        this.$message.error(this.$appMsg.error[1002]);

        gameInfo.win.camp = 1;
        gameInfo.win.color = "blue";
        gameInfo.win.logo = gameInfo.team.team_1.logo;
        gameInfo.win.teamId = gameInfo.team.team_1.id;
      }

      if (this.gameLabel == "new") return;

      this.$axios
        .post(
          this.$appApi.pvp.updateGameBP,
          this.$qs.stringify({
            gameLabel: this.gameLabel,
            gameIndex: nowIndex,
            teamId_1: gameInfo.team.team_1.id,
            teamId_2: gameInfo.team.team_2.id,
            gameWinCamp: gameInfo.win.camp,
            arrData: String(gameInfo.BPOrder),
          })
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            this.$message.success("已保存第 " + (nowIndex + 1) + " 局 ;D");
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onDeleteGameBPClick: function (nowIndex) {
      let tabsModel = 0;

      if (this.gameLabel == "new") {
        if (nowIndex == 0) {
          tabsModel = 0;

          this.$message.error(this.$appMsg.error[1011]);

          setTimeout(() => {
            this.$router.go(0);
          }, 2500);
        } else {
          this.gameInfo.result.rows.splice(nowIndex, 1);
          tabsModel = nowIndex - 1;

          this.$message.success(this.$appMsg.success[1000]);
        }

        this.tabsInfo.model = tabsModel;

        return;
      }

      this.$axios
        .post(
          this.$appApi.pvp.deleteGameBP,
          this.$qs.stringify({
            gameLabel: this.gameLabel,
            gameIndex: nowIndex,
          })
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            if (nowIndex == 0) {
              tabsModel = 0;

              this.$appPush({ path: "/game/engage" });
            } else {
              this.gameInfo.result.rows.splice(nowIndex, 1);
              tabsModel = nowIndex - 1;

              this.$message.success(this.$appMsg.success[1000]);
            }

            this.tabsInfo.model = tabsModel;
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    gameCampColor: function (nowIndex) {
      let ret = this.bpIndex.blue.includes(nowIndex);

      return ret;
    },
    onSeeHeroClick: function () {
      if (this.eye == "eye-o") {
        this.eye = "closed-eye";

        this.showInfo.heroList = false;
      } else {
        this.eye = "eye-o";

        this.showInfo.heroList = true;
      }
    },
    onGamePerspectiveClick: function (bpMode = 0) {
      let tabsModel = this.tabsInfo.model;

      this.bpPerspective == 1
        ? (this.bpPerspective = 2)
        : (this.bpPerspective = 1);

      this.initBPOrder(this.bpPerspective, tabsModel);

      if (bpMode == 1)
        this.$message.success("初始化 " + this.bpSelf.name + " 的视角");
    },
    onGameTabsChange: function (e) {
      this.initBPOrder(this.bpPerspective, e);

      this.newGameInfo = {};
    },
    onGameBanPickClick: function (nowIndex) {
      if (this.bpMode == "view") return;

      let tabsModel = this.tabsInfo.model;

      if (this.gameInfo.result.rows[tabsModel].BPOrder[nowIndex - 1] == 0) {
        return this.$message.error(this.$appMsg.error[1003]);
      }

      let oldIndex = this.gameInfo.result.rows[tabsModel].stepsNow;

      if (this.bpMode == "edit") {
        if (this.bpIndex.bpPerspective[oldIndex] == 1) {
          this.onGamePerspectiveClick();

          this.initCountdown();
        }
        //对照 bpIndex 视角表格,如果是 1 则初始化

        this.gameInfo.result.rows[tabsModel].stepsNow = nowIndex;
      }
    },
    onGamePickHeroClick: function (hero, nowIndex) {
      let tabsModel = this.tabsInfo.model,
        bpMode = this.bpMode;

      if (bpMode == "sort") {
        let sortText,
          newTrend = -1;

        this.recommendHeroId = 0;

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
            //on confirm
            this.tableData.result.rows[nowIndex].trend = newTrend;

            this.$appSetLocalStorage("gameBP", this.tableData);
          })
          .catch(() => {
            //on cancel
          });

        return;
      } else {
        this.recommendHeroId = hero.id;

        if (tabsModel < 6) {
          if (
            this.gameInfo.result.rows[tabsModel].blue.ban.includes(hero.id) ||
            this.gameInfo.result.rows[tabsModel].red.ban.includes(hero.id)
          ) {
            return this.$message.error("本局 " + hero.name + " 已被禁用");
          } else if (this.gameInfo.used.includes(hero.id)) {
            return this.$message.warning(
              hero.name + " 已被 " + this.bpOpponent.name + " 使用"
            );
          }
        } else {
          //巅峰对局
        }
      }

      if (bpMode == "edit") {
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
          this.onGamePerspectiveClick();

          this.initCountdown();
        }
        //对照 bpIndex 视角表格,如果是 1 则初始化

        this.gameInfo.result.rows[tabsModel].stepsNow = oldIndex + 1;

        this.initBPOrder(this.bpPerspective, tabsModel);
      }
    },
    onNewSortClick: function () {
      if (this.bpMode == "sort") {
        this.tableData.model = 0;

        this.bpMode = "view";

        this.showInfo.setting = false;

        this.$message.success(this.$appMsg.success[1000]);
      } else {
        this.bpMode = "sort";

        this.showInfo.setting = false;

        this.$message.info(this.$appMsg.info[1017]);
      }
    },
    onResetSortClick: function () {
      this.$dialog
        .confirm({
          title: "是否重置排序?此操作不可逆!",
          message: "保存在本地的排序将被清除\r有新英雄的时候可能需要 ;D",
        })
        .then(() => {
          //on confirm
          this.$appDelectLocalStorage("gameBP");

          this.getRanking();
        })
        .catch(() => {
          //on cancel
        });
    },
    onSwapPositionClick() {
      let tabsModel = this.tabsInfo.model,
        teamInfo = this.gameInfo.result.rows[tabsModel].team,
        tempTeamInfo;

      tempTeamInfo = teamInfo.team_1;

      this.gameInfo.result.rows[tabsModel].team.team_1 = teamInfo.team_2;
      this.gameInfo.result.rows[tabsModel].team.team_2 = tempTeamInfo;

      this.onGamePerspectiveClick();

      this.$message.warning(this.$appMsg.warning[1004]);
    },
    onToolsMenuClick: function (toolType) {
      let tabsModel = this.tabsInfo.model,
        gameInfo = this.gameInfo.result.rows,
        teamInfo = gameInfo[tabsModel].team;

      if (toolType == 0) {
        this.$dialog
          .confirm({
            title: "是否删除第 " + (tabsModel + 1) + " 局?",
            message: "此操作不可逆",
          })
          .then(() => {
            //on confirm
            this.onDeleteGameBPClick(tabsModel);
          })
          .catch(() => {
            //on cancel
          });
      }

      if (toolType == 1) {
        this.onCreateGameBPClick();
      }

      if (toolType == 2) {
        let newGameInfo = {
          game: {
            type: 1,
            time: null,
          },
          team: {
            team_1: teamInfo.team_1,
            team_2: teamInfo.team_2,
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
            camp: null,
            color: null,
            id: null,
            name: null,
            logo: null,
          },
          stepsNow: 0,
          BPOrder: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        };

        this.$dialog
          .confirm({
            title: "是否重置第 " + (tabsModel + 1) + " 局?",
            message: "此操作不可逆",
          })
          .then(() => {
            //on confirm
            this.gameInfo.result.rows[tabsModel] = newGameInfo;

            this.$message.success(this.$appMsg.success[1000]);
          })
          .catch(() => {
            //on cancel
          });
      }

      if (toolType == 3) {
        if (this.bpMode == "view") {
          this.bpMode = "edit";

          this.isBlueCamp(teamInfo.team_1)
            ? (this.bpPerspective = 2)
            : (this.bpPerspective = 1);

          this.onGamePerspectiveClick();

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
    onWinCampClick: function (winCamp) {
      let nowWinTeam,
        nowWinCamp,
        nowWinColor,
        tabsModel = this.tabsInfo.model,
        teamInfo = this.gameInfo.result.rows[tabsModel].team;

      if (winCamp == 1) {
        nowWinColor = "blue";
        nowWinTeam = teamInfo.team_1;
      } else {
        nowWinColor = "red";
        nowWinTeam = teamInfo.team_2;
      }

      this.$dialog
        .confirm({
          title: "是否将本局胜方标记为【" + nowWinTeam.name + "】?",
        })
        .then(() => {
          //on confirm
          nowWinCamp = winCamp;

          this.gameInfo.result.rows[tabsModel].win = {
            camp: nowWinCamp,
            color: nowWinColor,
            id: nowWinTeam.id,
            logo: nowWinTeam.logo,
            name: nowWinTeam.name,
          };

          this.$message.success(this.$appMsg.success[1000]);
        })
        .catch(() => {
          //on cancel
        });
    },
  },
};
</script>

<style scoped lang="less">
img.game-eee32796c3fdfc147115c9f6e875c090,
img.game-aa95efe1c5d39e5e9389ca5833e63fbe {
  border-radius: 10px;
  margin: 5px;
}

img.game-5de9dd2a5714dd606db0e0fa1611c227,
img.game-221cf04d9a9e32c6af24502f96e3ecfe {
  border-radius: @app-border-radius;
  margin: 5px;
}

img.game-dce7c4174ce9323904a934a486c41288 {
  margin-left: -20px;
  margin-top: 20px;
  position: absolute;
}

span.game-99e127c3f9d57b5d03327ebe8b1e4982 {
  margin-left: 20px;
  margin-right: 10px;
}

span.game-59b9fd83bc5ce802ee9ace7db0e22522 {
  bottom: -4px;
  position: absolute;
}

span.game-80653328482d7cba8da3f0fa033b0c12 {
  margin: 0 5px;
}

span.game-0db3e75efe3faa0cee4451fb55bc4c53 {
  font-size: @app-font-size + 10px;
}

span.game-9965db4bfcd480ab6c0b1a6a3de68bab {
  margin-left: -15px;
  position: absolute;
  top: 1px;
  z-index: @app-z-index;
}

span.game-45949fe72cfc70cc6a7bd3870cabc397 {
  font-size: 10px;
  color: red;
}

button.game-8e4f204791d1b591b6a6f93b572f9b2d {
  img.van-icon__image {
    border-radius: @app-border-radius;
    height: 40px;
    margin-left: -8px;
    margin-top: -2px;
    width: 40px;
  }
}

div.van-tabs__wrap {
  z-index: 2;
}

div.game-bp-portrait {
  margin-top: 60%;
}

div.game-d26ecf27da6e3263cf318adbb8b5f00a {
  text-align: @app-text-align;
}

div.game-2c9118a482fe35d5ab2b6cb01c1985be {
  display: contents;
}

div.game-d75e14b5c8f13e894fe9bf9d5426c198,
div.game-251504ba219ea8c3175f47b73bdde6e6 {
  position: absolute;
  top: 80px;
  width: @app-width;
}

div.game-d75e14b5c8f13e894fe9bf9d5426c198 {
  left: 0;
}

div.game-251504ba219ea8c3175f47b73bdde6e6 {
  right: 0;
}

div.game-b3d70a861f68652bf97d7a26bf421d4f {
  color: red;
  font-size: @app-font-size + 2px;
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

i.game-8d74837b1dc10576d7757cfd35b4661d {
  img.van-icon__image {
    margin-top: -3px;
  }
}

div.game-87740aa9337e54dbad53ec95089dca77 {
  background-color: white !important;
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
  z-index: @app-z-index;
}

div.game-173f312c43fe32a4f01c84d1cf0520b1 {
  bottom: 42px;
  height: 35px;
  z-index: @app-z-index;
}

div.game-e4e6288c92630a6c237c15442fdb0917 {
  li {
    float: left;
    margin: 3px 5px;
  }
}

div.game-8c9cb4a232c7e88403dddc3a0e589162,
div.game-c6a2f8b3941d7f91bc4e51839e5371e0,
div.game-8c9cb4a232c7e88403dddc3a0e589162,
div.game-c6a2f8b3941d7f91bc4e51839e5371e0 {
  position: absolute;
}

div.game-bf2c7b7ad9bcf75cd72e0b4ce30500e3 {
  li {
    float: left;
  }
}

div.game-ba9bced6af8121cf6413000a4274ac2b {
  li {
    float: right;
  }
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
  z-index: @app-z-index;
}

div.game-5b51012ae7490ea129b5d75ad9b1016c,
div.game-2d121e51de7a817bff612f1e16fadb8e {
  font-size: @app-font-size + 2px;
}
</style>