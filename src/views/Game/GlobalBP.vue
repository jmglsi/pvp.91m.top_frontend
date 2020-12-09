<template>
  <div @click="isPortrait = false" v-if="isPortrait" class="game-bp-portrait">
    <div slot-scope="" class="game-a76e75b5854094183e66c274e1d276e9">
      <img v-lazy="'/img/app-icons/landscape.png'" width="100" height="100" />
      <div class="game-b3d70a861f68652bf97d7a26bf421d4f">
        请把设备横过来 或 点击这里切换横屏 ;D
      </div>
    </div>
  </div>
  <div v-else-if="isPortrait == false" class="app-9fc0eb5a934dba03cc266a49b8ec51fb">
    <span class="app-f4842dcb685d490e2a43212b8072a6fe">
      <span class="game-d4f94e5b8f23a1755b438ff70ed16fc6">{{
        tabsModel % 2 == 0 ? team.team_1.name : team.team_2.name
      }}</span>
      <span class="game-80653328482d7cba8da3f0fa033b0c12">Vs</span>
      <span class="game-1426b22460332d802aedd4d54d35f3ee">{{
        tabsModel % 2 == 0 ? team.team_2.name : team.team_1.name
      }}</span>
    </span>

    <div class="game-716fcd585a785195878b2683fca82e6f">
      <div
        class="game-8c9cb4a232c7e88403dddc3a0e589162 game-bf2c7b7ad9bcf75cd72e0b4ce30500e3"
      >
        <ul>
          <li
            v-for="(heroId, index) in gameInfo.result.rows[tabsModel].BPOrder"
            :key="'game-2a47f410fffc64666ba4673bdc597f72a-' + index"
            @click="onGameBanPickClick(index)"
          >
            <span
              v-show="index == 0 || index == 2 || index == 11 || index == 13"
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
                  mode == 'edit' && gameInfo.result.rows[tabsModel].stepsNow == index
                    ? blueStepsClass
                    : ''
                "
                width="30"
                height="30"
                class="game-5de9dd2a5714dd606db0e0fa1611c227"
              />
              <AppLock
                width="25"
                height="25"
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
            v-for="(heroId, index) in gameInfo.result.rows[tabsModel].BPOrder"
            :key="'game-38dfd87b435ce58ee12baf01d6f23c73-' + index"
            @click="onGameBanPickClick(index)"
          >
            <span
              v-show="index == 1 || index == 3 || index == 10 || index == 12"
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
                  mode == 'edit' && gameInfo.result.rows[tabsModel].stepsNow == index
                    ? redStepsClass
                    : ''
                "
                width="30"
                height="30"
                class="game-221cf04d9a9e32c6af24502f96e3ecfe"
              />
              <AppLock
                width="25"
                height="25"
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
            :style="appDevice ? { marginTop: '50px' } : { marginTop: '100px' }"
            class="game-be50d19d79d06b239c799bc2608239c6"
          >
            <ul>
              <li
                v-for="(heroId, index) in gameInfo.result.rows[tabsModel].BPOrder"
                :key="'game-0da8f0c7ef089161786e997dfcd5474e-' + index"
                :style="appDevice ? {} : { marginTop: '50px' }"
                @click="onGameBanPickClick(index)"
              >
                <span
                  v-show="
                    index == 4 || index == 7 || index == 8 || index == 15 || index == 16
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
                      mode == 'edit' && gameInfo.result.rows[tabsModel].stepsNow == index
                        ? blueStepsClass
                        : ''
                    "
                    :width="appDevice ? 40 : 55"
                    :height="appDevice ? 40 : 55"
                    class="game-eee32796c3fdfc147115c9f6e875c090"
                  />
                </span>
              </li>
            </ul>
          </div>
          <div
            v-show="mode == 'edit'"
            @click="onWinCampClick(1)"
            :style="appDevice ? { height: '275px' } : { height: appHeight - 175 + 'px' }"
            class="game-d75e14b5c8f13e894fe9bf9d5426c198"
          ></div>
        </van-col>
        <van-col span="18">
          <div
            v-show="showInfo.hero"
            :style="appDevice ? { height: '240px' } : { height: appHeight - 150 + 'px' }"
            class="app-99938282f04071859941e18f16efcf42"
          >
            <van-tabs
              v-model="tableData.active"
              :border="false"
              :swipe-threshold="appDevice ? 4 : 7"
              color="orange"
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
                  title="热门"
                  class="game-27369b3bf4483e8dcfd85ba9a39a947f"
                >
                  <van-grid
                    :border="false"
                    :column-num="8"
                    class="game-89ca797bdbd58d7a03cf37f2d2fd9ac5"
                  >
                    <van-grid-item
                      v-for="(data, index) in tableData.result.rows"
                      v-show="
                        data.trend == 2 &&
                        (tableData.active == data.type || tableData.active == 0)
                      "
                      :key="'game-f6bf37efedbc0a2dfffc1caf5088d86e-' + index"
                      text=" "
                      @click="onGamePickHeroClick(data)"
                    >
                      <van-tag
                        round
                        v-if="
                          gameInfo.result.rows[tabsModel].blue.ban.includes(data.id) ||
                          gameInfo.result.rows[tabsModel].red.ban.includes(data.id)
                        "
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
                      <img
                        width="40"
                        height="40"
                        v-lazy="data.img"
                        :style="
                          gameInfo.result.rows[tabsModel].blue.ban.includes(data.id) ||
                          gameInfo.result.rows[tabsModel].red.ban.includes(data.id) ||
                          gameInfo.used.includes(data.id)
                            ? { filter: 'grayscale(1)' }
                            : {}
                        "
                        class="game-ae47f38706d42938ff1dbd5960a08056"
                      />
                    </van-grid-item>
                  </van-grid>
                </van-cell-group>

                <van-cell-group
                  :border="false"
                  title="其它"
                  class="game-795f3202b17cb6bc3d4b771d8c6c9eaf"
                >
                  <van-grid
                    :border="false"
                    :column-num="8"
                    class="game-89ca797bdbd58d7a03cf37f2d2fd9ac5"
                  >
                    <van-grid-item
                      v-for="(data, index) in tableData.result.rows"
                      v-show="
                        data.trend != 2 &&
                        (tableData.active == data.type || tableData.active == 0)
                      "
                      :key="'game-35368a19f307e4af02d0df055846840d-' + index"
                      text=" "
                      @click="onGamePickHeroClick(data)"
                    >
                      <van-tag
                        round
                        v-if="
                          gameInfo.result.rows[tabsModel].blue.ban.includes(data.id) ||
                          gameInfo.result.rows[tabsModel].red.ban.includes(data.id)
                        "
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
                      <img
                        width="40"
                        height="40"
                        v-lazy="data.img"
                        :style="
                          gameInfo.result.rows[tabsModel].blue.ban.includes(data.id) ||
                          gameInfo.result.rows[tabsModel].red.ban.includes(data.id) ||
                          gameInfo.used.includes(data.id)
                            ? { filter: 'grayscale(1)' }
                            : {}
                        "
                        class="game-ae47f38706d42938ff1dbd5960a08056"
                      />
                    </van-grid-item>
                  </van-grid>
                </van-cell-group>
              </div>
            </van-tabs>
          </div>
        </van-col>
        <van-col span="3">
          <div
            :style="appDevice ? { marginTop: '50px' } : { marginTop: '100px' }"
            class="game-f382dd1c4a10b864c29d26d47249b570"
          >
            <ul>
              <li
                v-for="(heroId, index) in gameInfo.result.rows[tabsModel].BPOrder"
                :key="'game-efc78a7d5ce15f3dbe5ec48eabdba117-' + index"
                :style="appDevice ? {} : { marginTop: '50px' }"
                @click="onGameBanPickClick(index)"
              >
                <span
                  v-show="
                    index == 5 || index == 6 || index == 9 || index == 14 || index == 17
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
                      mode == 'edit' && gameInfo.result.rows[tabsModel].stepsNow == index
                        ? redStepsClass
                        : ''
                    "
                    :width="appDevice ? 40 : 55"
                    :height="appDevice ? 40 : 55"
                    class="game-aa95efe1c5d39e5e9389ca5833e63fbe"
                  />
                </span>
              </li>
            </ul>
          </div>
          <div
            v-show="mode == 'edit'"
            @click="onWinCampClick(2)"
            :style="appDevice ? { height: '275px' } : { height: appHeight - 175 + 'px' }"
            class="game-251504ba219ea8c3175f47b73bdde6e6"
          ></div>
        </van-col>
      </van-row>
    </div>

    <div
      class="game-beedfb16b1c81d2901c32b6dcc2939d0 game-e4e6288c92630a6c237c15442fdb0917"
    >
      <ul>
        <li>
          <a-dropdown placement="bottomCenter" :trigger="['click']">
            <van-button round :icon="author.logo" size="small">{{
              author.name
            }}</van-button>
            <a-menu slot="overlay">
              <a-menu-item
                v-for="(data, index) in author.actions"
                :key="index"
                @click="
                  data.url ? appOpenUrl('是否打开外部链接？', null, data.url) : null
                "
              >
                <a-icon :type="data.icon" />
                {{ data.title }}
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </li>
        <li>
          <van-button
            round
            :icon="perspective == 1 ? team.team_1.logo : team.team_2.logo"
            size="small"
            color="linear-gradient(to right, #43CBFF, #6874E8)"
            @click="onGamePerspectiveClick(1)"
            >以
            {{ perspective == 1 ? team.team_1.name : team.team_2.name }}
            的视角查看</van-button
          >
        </li>
        <li>
          <van-button
            round
            :icon="eye"
            size="small"
            color="linear-gradient(to right, #6874E8, #9708CC)"
            @click="onSeeHeroClick"
          >
            {{ perspective == 1 ? team.team_2.name : team.team_1.name }}
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
        <li v-show="mode == 'edit'">
          <div class="game-2d121e51de7a817bff612f1e16fadb8e">
            倒计时:
            <span
              class="game-0db3e75efe3faa0cee4451fb55bc4c53"
              :style="countdown < 10 ? { color: 'red' } : { color: 'blue' }"
              >{{ countdown }}</span
            >
            秒
          </div>
        </li>
        <li v-show="showInfo.apps">
          <a-dropdown placement="topCenter" :trigger="['click']">
            <van-button round icon="apps-o" size="small" />
            <a-menu slot="overlay">
              <a-menu-item
                v-show="
                  mode == 'view' &&
                  gameInfo.result.rows.length > 1 &&
                  gameInfo.result.rows.length - 1 == tabsModel
                "
                @click="onToolsMenuClick(0)"
              >
                <a-icon type="minus" />删除本局
              </a-menu-item>
              <a-menu-item
                v-show="mode == 'view' && gameInfo.result.rows.length < 6"
                @click="onToolsMenuClick(1)"
              >
                <a-icon type="plus" />再来一局
              </a-menu-item>
              <a-menu-item
                v-show="mode == 'edit' && gameInfo.result.rows.length - 1 == tabsModel"
                @click="onToolsMenuClick(2)"
              >
                <a-icon type="retweet" />重置
              </a-menu-item>
              <a-menu-item @click="onToolsMenuClick(3)">
                <a-icon :type="mode == 'view' ? 'edit' : 'cloud-upload'" />编辑
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </li>
        <li>
          <van-button
            round
            :border="false"
            icon="question-o"
            size="small"
            @click="appOpenUrl('是否查看常见问题?', null, url.question)"
          />
        </li>
        <li>
          <van-button round icon="share" size="small" @click="onGameShareClick" />
        </li>
      </ul>
    </div>
    <!-- 右下角 -->

    <div class="game-22b9550116c87c4fffd94a4271127d9c">
      <van-tabs
        v-model="tabsModel"
        @change="onGameTabsChange"
        color="orange"
        class="game-4863c43e8743ebf1be3f48c5c4519627"
      >
        <van-tab
          v-for="(data, index) in gameInfo.result.rows"
          :key="'game-00b19058a88981bf8bab664835da4ecf-' + index"
          :disabled="mode == 'edit' && tabsModel != index ? true : false"
        >
          <template #title>
            <van-icon
              v-if="index % 2 == 0"
              :name="
                gameInfo.result.rows[index].win.camp == 1
                  ? team.team_1.logo
                  : team.team_2.logo
              "
            />
            <van-icon
              v-else-if="index % 2 == 1"
              :name="
                gameInfo.result.rows[index].win.camp == 1
                  ? team.team_2.logo
                  : team.team_1.logo
              "
            />&nbsp;
            <span
              class="game-f88456e481c26446fec30dd5685e46f4"
              :style="{
                color: gameInfo.result.rows[index].win.camp == 1 ? 'blue' : 'red',
              }"
              >第 {{ index + 1 }} 局</span
            >
          </template>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<style>
@import url("/css/app-style/game-globalBP.css");
</style>

<script>
export default {
  name: "GlobalBP",
  components: {
    AppLock: (resolve) => require(["@/assets/Icons/AppLock.vue"], resolve),
  },
  data() {
    return {
      loginInfo: {
        openId: null,
        accessToken: null,
      },
      heroType: ["全部", "对抗 (战士)", "中路", "对抗 (坦克)", "打野", "发育", "游走"],
      index: {
        ban: [0, 1, 2, 3, 10, 11, 12, 13],
        blue: [0, 2, 4, 7, 8, 11, 13, 15, 16],
        red: [1, 3, 5, 6, 9, 10, 12, 14, 17],
        perspective: [
          1, // 0 - 1
          1, // 1 - 2
          1, // 2 - 3
          0, // 3 - 4
          1, // 4 - 5
          0, // 5 - 6
          1, // 6 - 7
          0, // 7 - 8
          1, // 8 - 9
          1, // 9 - 10
          1, // 10 - 11
          1, // 11 - 12
          1, // 12 - 13
          0, // 13 - 14
          1, // 14 - 15
          0, // 15 - 16
          1, // 16 -17
        ],
      },
      blueStepsClass: "game-1cf3b0809c3dde16d56153690bc902a2",
      redStepsClass: "game-99b844b6785d8d7378bbc2b1401af365",
      copyData: "",
      mode: "view",
      self: "",
      opponent: "",
      countdown: 45,
      countdownHandle: "",
      perspective: 1,
      tabsModel: 0,
      author: {
        name: "加载中",
        logo: "/img/app-icons/kpl.png",
        actions: [],
      },
      team: {
        team_1: {
          id: 1,
          name: "队伍_1",
          logo: "/img/app-icons/camp_blue.png",
        },
        team_2: {
          id: 2,
          name: "队伍_2",
          logo: "/img/app-icons/camp_red.png",
        },
      },
      gameInfo: {
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
      tableData: {
        active: 0,
        result: [],
      },
      showInfo: {
        apps: false,
        hero: true,
      },
      eye: "eye-o",
      url: {
        question: "//doc.91m.top/jmglsi/pvp",
      },
      isPortrait: true,
    };
  },
  created() {
    window.addEventListener("beforeunload", (e) => this.beforeunload(e), false);

    if (this.appDevice) {
      window.addEventListener("resize", this.renderResize, false);
    } else {
      this.isPortrait = false;
    }
  },
  mounted() {
    let gameLabel = this.$route.params.id;

    if (gameLabel) {
      this.gameLabel = gameLabel;

      this.getGameBP(gameLabel);
    } else {
      this.appPush("/game");
      return;
    }

    this.loginInfo.openId = this.$cookie.get("openId");
    this.loginInfo.accessToken = this.$cookie.get("accessToken");
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.beforeunload, false);

    if (this.appDevice) {
      window.removeEventListener("resize", this.renderResize, false);
    }
  },
  methods: {
    beforeunload: function (e) {
      e = e || window.event;

      if (this.mode == "edit") {
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
          this.$message.warning("警告:1000,分辨率过小,可能会挡住英雄");
        }
      }
    },
    initBPOrder: function (perspective, index) {
      if (perspective == 1) {
        this.self = this.team.team_1;
        this.opponent = this.team.team_2;
      } else {
        this.self = this.team.team_2;
        this.opponent = this.team.team_1;
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

        if (perspective == 1) {
          if (i % 2 == 0) {
            used.push.apply(used, this.gameInfo.result.rows[i].red.pick);
          } else {
            used.push.apply(used, this.gameInfo.result.rows[i].blue.pick);
          }
        }

        if (perspective == 2) {
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
      this.countdown = 45;
      clearInterval(this.countdownHandle);

      this.countdownHandle = setInterval(() => {
        this.countdown--;
        if (this.countdown == 0) {
          this.$message.error("错误:1007,已超时");

          clearInterval(this.countdownHandle);
        }
      }, 1000);
    },
    getHeroList: function (gameTime) {
      this.axios
        .post(
          this.apiList.pvp.getHeroRanking + "&aid=4&bid=0",
          this.$qs.stringify({
            gameTime: gameTime,
          })
        )
        .then((res) => {
          this.tableData.result = res.data.data.result;
        });
    },
    getGameBP: function (gameLabel) {
      let tabsModel = this.tabsModel;

      this.axios
        .post(
          this.apiList.game.getGameBP,
          this.$qs.stringify({
            gameLabel: gameLabel,
          })
        )
        .then((res) => {
          let data = res.data.data,
            result = data.result;

          if (result.length == 0) {
            this.$message.error("错误:1000,对局不存在");
            return;
          }

          this.author = data.author;
          this.team = data.team;
          this.gameInfo.result = result;

          this.initBPOrder(this.perspective, tabsModel + 1);

          this.getHeroList(result.rows[0].game.time);

          this.author.openId && this.author.openId == this.$cookie.get("openId")
            ? (this.showInfo.apps = true)
            : (this.showInfo.apps = false);
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
          teamId: null,
        },
        stepsNow: 0,
        stepsActive: 0,
        BPOrder: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      };

      let loginInfo = this.loginInfo;
      let teamInfo = this.team;
      let gameIndex = this.gameInfo.result.rows.length;

      this.axios
        .post(
          this.apiList.pvp.updateGameBP,
          this.$qs.stringify({
            openId: loginInfo.openId,
            accessToken: loginInfo.accessToken,
            gameLabel: this.gameLabel,
            gameIndex: gameIndex,
            teamId_1: teamInfo.team_1.id,
            teamId_2: teamInfo.team_2.id,
          })
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            this.$message.success("创建成功");

            this.gameInfo.result.rows.push(newGame);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onUpdateGameBPClick: function (index) {
      let loginInfo = this.loginInfo;
      let teamInfo = this.team;
      let gameInfo = this.gameInfo.result.rows[index];

      if (gameInfo.win.camp == null) {
        this.$message.error("错误:1001,请点击左侧/右侧边缘设置胜利方");
        return;
      }

      this.axios
        .post(
          this.apiList.pvp.updateGameBP,
          this.$qs.stringify({
            openId: loginInfo.openId,
            accessToken: loginInfo.accessToken,
            gameLabel: this.gameLabel,
            gameIndex: index,
            teamId_1: teamInfo.team_1.id,
            teamId_2: teamInfo.team_2.id,
            gameWinCamp: gameInfo.win.camp,
            gameBPData: String(gameInfo.BPOrder),
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
      let loginInfo = this.loginInfo;

      this.axios
        .post(
          this.apiList.pvp.deleteGameBP,
          this.$qs.stringify({
            openId: loginInfo.openId,
            accessToken: loginInfo.accessToken,
            gameLabel: this.gameLabel,
            gameIndex: index,
          })
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            this.$message.success("删除成功");

            this.gameInfo.result.rows.splice(index, 1);
            this.tabsModel = index - 1;
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    gameCampColor(color, index) {
      let ret = false;

      if (color == 1) {
        ret = this.index.blue.includes(index);
      }

      if (color == 2) {
        ret = this.index.red.includes(index);
      }

      return ret;
    },
    onSeeHeroClick: function () {
      this.showInfo.hero = false;

      if (this.eye == "eye-o") {
        this.eye = "closed-eye";
      } else {
        this.showInfo.hero = true;

        this.eye = "eye-o";
      }
    },
    onGamePerspectiveClick: function (mode) {
      if (mode == 1) this.$message.success("初始化 " + this.self.name + " 的视角");

      this.perspective == 1 ? (this.perspective = 2) : (this.perspective = 1);

      this.initBPOrder(this.perspective, this.tabsModel + 1);
    },
    onGameTabsChange: function (e) {
      this.initBPOrder(this.perspective, e + 1);
    },
    onGameBanPickClick: function (index) {
      if (this.mode == "view") return;

      let tabsModel = this.tabsModel;

      if (this.gameInfo.result.rows[tabsModel].BPOrder[index - 1] == 0) {
        this.$message.error("错误:1002,请按顺序BP");
        return;
      }

      let oldIndex = this.gameInfo.result.rows[tabsModel].stepsNow;

      if (this.mode == "edit") {
        if (this.gameCampColor(1, oldIndex) != this.gameCampColor(1, index)) {
          this.onGamePerspectiveClick(0);

          this.initCountdown();
        }
        //点击触发:切换阵容时初始化

        this.gameInfo.result.rows[tabsModel].stepsNow = index;
      }
    },
    onGamePickHeroClick: function (hero) {
      let tabsModel = this.tabsModel;

      if (this.mode == "view") return;
      if (
        this.gameInfo.result.rows[tabsModel].blue.ban.includes(hero.id) ||
        this.gameInfo.result.rows[tabsModel].red.ban.includes(hero.id)
      ) {
        this.$message.error("警告:1005,本局 " + hero.name + " 已被禁用");
        return;
      } else if (this.gameInfo.used.includes(hero.id)) {
        this.$message.warning(
          "警告:1002," + hero.name + " 已被 " + this.opponent.name + " 使用"
        );
        return;
      }

      let oldIndex = this.gameInfo.result.rows[tabsModel].stepsNow,
        newIndex = 0;

      if (oldIndex > 17) {
        newIndex = 0;
      } else {
        newIndex = oldIndex + 1;

        this.gameInfo.result.rows[tabsModel].BPOrder.splice(oldIndex, 1, hero.id);
      }

      if (this.index.perspective[oldIndex] == 1) {
        this.onGamePerspectiveClick(0);
      }
      //对照 index 视角表格,如果是 1 则初始化时间

      if (this.gameCampColor(1, oldIndex) != this.gameCampColor(1, newIndex)) {
        this.initCountdown();
      }
      //自动触发:切换阵容时初始化

      this.gameInfo.result.rows[tabsModel].stepsNow = newIndex;

      this.initBPOrder(this.perspective, tabsModel + 1);

      if (newIndex >= 18) {
        this.$message.warning("BP结束,注意保存");
      }
    },
    onGameShareClick: function () {
      let vs = this.team.team_1.name + " Vs " + this.team.team_2.name;

      this.copyData =
        "正在复盘【" +
        vs +
        "】的第 " +
        (this.tabsModel + 1) +
        " 局比赛 ↓\r" +
        location.href;
      this.appCopyData(this.copyData);
    },
    onToolsMenuClick: function (type) {
      let tabsModel = this.tabsModel;

      if (type == 0) {
        this.$dialog
          .confirm({
            title: "是否删除第 " + (tabsModel + 1) + " 局？",
            message: "此操作不可逆",
          })
          .then(() => {
            // on confirm
            this.onDeleteGameBPClick(tabsModel);
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
            title: "是否重置第 " + (tabsModel + 1) + " 局？",
            message: "此操作不可逆",
          })
          .then(() => {
            // on confirm
            this.$message.success("重置成功");

            this.gameInfo.result.rows[tabsModel] = newGame;
          })
          .catch(() => {
            // on cancel
          });
      }

      if (type == 3) {
        if (this.mode == "view") {
          this.$message.info("提示:1001,已进入编辑模式");

          this.mode = "edit";

          this.index.ban.includes(this.gameInfo.result.rows[tabsModel].stepsNow) &&
          tabsModel % 2 == 0
            ? (this.perspective = 2)
            : (this.perspective = 1);
          this.onGamePerspectiveClick(0);
          //tabsModel % 2 == 0

          this.initCountdown();
        } else {
          this.mode = "view";

          this.onUpdateGameBPClick(tabsModel);

          this.countdown = 60;
          clearInterval(this.countdownHandle);
        }
      }
    },
    onWinCampClick: function (camp) {
      let tabsModel = this.tabsModel;
      let teamInfo = this.team;
      let nowWinTeam;

      if (camp == 1) {
        tabsModel % 2 == 0
          ? (nowWinTeam = teamInfo.team_1.name)
          : (nowWinTeam = teamInfo.team_2.name);
      } else {
        tabsModel % 2 == 0
          ? (nowWinTeam = teamInfo.team_2.name)
          : (nowWinTeam = teamInfo.team_1.name);
      }

      this.$dialog
        .confirm({
          title: "是否将本局胜方设置为 " + nowWinTeam + " ？",
        })
        .then(() => {
          // on confirm
          this.$message.success("设置成功");

          this.gameInfo.result.rows[tabsModel].win.camp = camp;
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>
