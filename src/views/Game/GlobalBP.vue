<template>
  <div class="game-bp-portrait" v-if="isPortrait">
    <div class="game-a76e75b5854094183e66c274e1d276e9">
      <img width="100" height="100" src="/img/app-icons/landscape.png" />
      <div class="game-b3d70a861f68652bf97d7a26bf421d4f">请把设备横过来 ;D</div>
    </div>
  </div>
  <div class="game-bp" v-else-if="isPortrait == false">
    <span class="game-f4842dcb685d490e2a43212b8072a6fe">
      <span
        class="game-d4f94e5b8f23a1755b438ff70ed16fc6"
      >{{ tabsModel % 2 == 0 ? campInfo.camp_1.name : campInfo.camp_2.name }}</span>
      <span class="game-80653328482d7cba8da3f0fa033b0c12">vs</span>
      <span
        class="game-1426b22460332d802aedd4d54d35f3ee"
      >{{ tabsModel % 2 == 0 ? campInfo.camp_2.name : campInfo.camp_1.name }}</span>
    </span>

    <div class="game-716fcd585a785195878b2683fca82e6f">
      <div class="ban-8c9cb4a232c7e88403dddc3a0e589162 ban-bf2c7b7ad9bcf75cd72e0b4ce30500e3">
        <ul>
          <li
            v-for="(data, index) in gameInfo.list[tabsModel].bpOrder"
            :key="'ban-2a47f410fffc64666ba4673bdc597f72a-' + index"
            @click="onGameBanPickClick(1, 1, index)"
          >
            <span
              v-show="index == 0 || index == 2 || index == 11 || index == 13"
              class="ban-4978748050a936d2f77fe718f1d81524"
            >
              <img
                width="30"
                height="30"
                v-lazy="data ? '//game.gtimg.cn/images/yxzj/img201606/heroimg/' + data + '/' + data + '.jpg' : '/img/app-icons/hero.png'"
                :class="mode =='edit' && gameInfo.list[tabsModel].stepsNow == index  ? blueStepsClass : ''"
                class="ban-eee32796c3fdfc147115c9f6e875c090"
              />
              <AppLock width="25" height="25" class="ban-dce7c4174ce9323904a934a486c41288" />
            </span>
          </li>
        </ul>
      </div>

      <div class="ban-c6a2f8b3941d7f91bc4e51839e5371e0 ban-ba9bced6af8121cf6413000a4274ac2b">
        <ul>
          <li
            v-for="(data, index) in gameInfo.list[tabsModel].bpOrder"
            :key="'ban-64621b00510adc52b301306824c89659-' + index"
            @click="onGameBanPickClick(2, 1, index)"
          >
            <span
              v-show="index == 1 || index == 3 || index == 10 || index == 12"
              class="ban-6e9c0050fe873888fbf53ec6f7b21816"
            >
              <img
                width="30"
                height="30"
                v-lazy="data ? '//game.gtimg.cn/images/yxzj/img201606/heroimg/' + data + '/' + data + '.jpg' : '/img/app-icons/hero.png'"
                :class="mode =='edit' && gameInfo.list[tabsModel].stepsNow == index  ? redStepsClass : ''"
                class="ban-aa95efe1c5d39e5e9389ca5833e63fbe"
              />
              <AppLock width="25" height="25" class="ban-dce7c4174ce9323904a934a486c41288" />
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div class="game-bd40579650e3f651e222aef268d5c8ae">
      <van-row>
        <van-col span="3">
          <div class="pick-8c9cb4a232c7e88403dddc3a0e589162">
            <ul>
              <li
                v-for="(data, index) in gameInfo.list[tabsModel].bpOrder"
                :key="'pick-0da8f0c7ef089161786e997dfcd5474e-' + index"
                @click="onGameBanPickClick(1, 2, index)"
              >
                <span
                  v-show="index == 4 || index == 7 || index == 8 || index == 15 || index == 16"
                  class="pick-4978748050a936d2f77fe718f1d81524"
                >
                  <img
                    width="40"
                    height="40"
                    v-lazy="data ? '//game.gtimg.cn/images/yxzj/img201606/heroimg/' + data + '/' + data + '.jpg' : '/img/app-icons/hero.png'"
                    :class="mode =='edit' && gameInfo.list[tabsModel].stepsNow == index  ? blueStepsClass : ''"
                    class="pick-eee32796c3fdfc147115c9f6e875c090"
                  />
                </span>
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div v-show="show.hero" class="hero-99938282f04071859941e18f16efcf42">
            <van-tabs
              v-model="tableData.active"
              :border="false"
              class="hero-f3cc17bc0d768ca60b8bb496a10b1990"
            >
              <van-tab title="对抗 (战士)" />
              <van-tab title="中路" />
              <van-tab title="对抗 (坦克)" />
              <van-tab title="打野" />
              <van-tab title="发育" />
              <van-tab title="辅助" />

              <div class="hero-87740aa9337e54dbad53ec95089dca77">
                <van-cell-group
                  :border="false"
                  title="热度上升"
                  class="hero-27369b3bf4483e8dcfd85ba9a39a947f"
                >
                  <van-grid
                    :border="false"
                    :column-num="8"
                    class="hero-89ca797bdbd58d7a03cf37f2d2fd9ac5"
                  >
                    <van-grid-item
                      v-for="(data, index) in tableData.heroList"
                      v-show="data.trend == 2 && data.type == tableData.active + 1"
                      :key="'hero-f6bf37efedbc0a2dfffc1caf5088d86e-' + index"
                      :icon="data.img"
                      :class="gameInfo.used.includes(data.id) ? banPickClass : ''"
                      @click="onGamePickHeroClick(data)"
                    />
                    <!-- gameInfo.list[tabsModel].blueBan.includes(data.id) || gameInfo.list[tabsModel].redBan.includes(data.id) || -->
                  </van-grid>
                </van-cell-group>

                <van-cell-group
                  :border="false"
                  title="其它"
                  class="hero-795f3202b17cb6bc3d4b771d8c6c9eaf"
                >
                  <van-grid
                    :border="false"
                    :column-num="8"
                    class="hero-89ca797bdbd58d7a03cf37f2d2fd9ac5"
                  >
                    <van-grid-item
                      v-for="(data, index) in tableData.heroList"
                      v-show="data.trend != 2 && data.type == tableData.active + 1"
                      :key="'hero-35368a19f307e4af02d0df055846840d-' + index"
                      :icon="data.img"
                      :class="gameInfo.used.includes(data.id) ? banPickClass : ''"
                      @click="onGamePickHeroClick(data)"
                    />
                  </van-grid>
                </van-cell-group>
              </div>
            </van-tabs>
          </div>
        </van-col>
        <van-col span="3">
          <div class="pick-c6a2f8b3941d7f91bc4e51839e5371e0">
            <ul>
              <li
                v-for="(data, index) in gameInfo.list[tabsModel].bpOrder"
                :key="'pick-64621b00510adc52b301306824c89659-' + index"
                @click="onGameBanPickClick(2, 2, index)"
              >
                <span
                  v-show="index == 5 || index == 6 || index == 9 || index == 14 || index == 17"
                  class="pick-6e9c0050fe873888fbf53ec6f7b21816"
                >
                  <img
                    width="40"
                    height="40"
                    v-lazy="data ? '//game.gtimg.cn/images/yxzj/img201606/heroimg/' + data + '/' + data + '.jpg' : '/img/app-icons/hero.png'"
                    :class="mode =='edit' && gameInfo.list[tabsModel].stepsNow == index  ? redStepsClass : ''"
                    class="pick-aa95efe1c5d39e5e9389ca5833e63fbe"
                  />
                </span>
              </li>
            </ul>
          </div>
        </van-col>
      </van-row>
    </div>

    <div class="game-beedfb16b1c81d2901c32b6dcc2939d0 game-e4e6288c92630a6c237c15442fdb0917">
      <ul>
        <li v-if="authorInfo.name">
          <a-dropdown placement="bottomCenter" :trigger="['click']">
            <van-button round :icon="authorInfo.img" size="small">{{ authorInfo.name }}</van-button>
            <a-menu slot="overlay">
              <a-menu-item
                v-for="(data, index) in authorInfo.actions"
                :key="index"
                @click="data.url ? appOpenUrl('是否打开外部链接？', null, data.url) : null"
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
            :icon="perspective == 1 ? campInfo.camp_1.img : campInfo.camp_2.img"
            size="small"
            color="linear-gradient(to right, #43CBFF, #6874E8)"
            @click="onGamePerspectiveClick(1)"
          >以 {{ perspective == 1 ? campInfo.camp_1.name : campInfo.camp_2.name }} 的视角</van-button>
        </li>
        <li>
          <van-button
            round
            :icon="eye"
            size="small"
            color="linear-gradient(to right, #6874E8, #9708CC)"
            @click="onSeeHeroClick"
          >查看 {{ perspective == 1 ? campInfo.camp_2.name : campInfo.camp_1.name }} 剩余英雄</van-button>
        </li>
      </ul>
    </div>
    <!-- 右上角 -->

    <div class="game-173f312c43fe32a4f01c84d1cf0520b1 game-e4e6288c92630a6c237c15442fdb0917">
      <ul>
        <li v-show="show.apps">
          <a-dropdown placement="topCenter" :trigger="['click']">
            <van-button round icon="apps-o" size="small" />
            <a-menu slot="overlay">
              <a-menu-item @click="onToolsMenuClick(0)">
                <a-icon type="setting" />设置
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item
                v-if="mode == 'edit' && gameInfo.list.length > 1 && gameInfo.list.length - 1 == tabsModel"
                @click="onToolsMenuClick(1)"
              >
                <a-icon type="minus" />删除本局
              </a-menu-item>
              <a-menu-item @click="onToolsMenuClick(2)">
                <a-icon type="plus" />再来一局
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
            @click="appOpenUrl('是否查看常见问题?', null, '//doc.91m.top')"
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
          v-for="(data, index) in gameInfo.list"
          :key="'game-00b19058a88981bf8bab664835da4ecf-' + index"
        >
          <template #title>
            <van-icon
              :name="gameInfo.list[index].winCamp == 1 ? campInfo.camp_1.img : campInfo.camp_2.img"
            />
            第 {{ index + 1 }} 局
          </template>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<style>
div.van-tabs__wrap {
  z-index: 2;
}

div.hero-99938282f04071859941e18f16efcf42
  div.van-tabs__wrap.van-tabs__wrap--scrollable {
  width: 40%;
  max-width: 600px;
  margin: 0 auto;
  position: fixed;
  left: 0;
  right: 0;
  top: 20px;
}

div.hero-99938282f04071859941e18f16efcf42 span.van-tab__text {
  font-size: 12px;
}

div.hero-99938282f04071859941e18f16efcf42
  div.van-grid-item__content.van-grid-item__content--center {
  padding: 8px 4px;
}

div.hero-99938282f04071859941e18f16efcf42 div.van-tab.van-ellipsis {
  line-height: 30px;
}

div.hero-f3cc17bc0d768ca60b8bb496a10b1990
  div.van-tabs__wrap.van-tabs__wrap--scrollable {
  border-radius: 100px;
  height: 30px;
}

div.hero-89ca797bdbd58d7a03cf37f2d2fd9ac5
  i.van-icon.van-grid-item__icon
  img.van-icon__image {
  width: 40px;
  height: 40px;
}

.hero-99938282f04071859941e18f16efcf42 {
  border-radius: 10px;
  overflow: hidden;
}
</style>

<style scoped>
.game-bp-portrait {
  margin-top: 60%;
}

.game-b3d70a861f68652bf97d7a26bf421d4f {
  font-size: 12px;
  margin-top: 15px;
}

.game-f4842dcb685d490e2a43212b8072a6fe {
  font-size: 10px;
}

.game-80653328482d7cba8da3f0fa033b0c12 {
  margin: 0 5px;
}

.game-bd40579650e3f651e222aef268d5c8ae {
  margin-top: 10px;
}

.hero-f3cc17bc0d768ca60b8bb496a10b1990 {
  text-align: left;
}

.steps-1cf3b0809c3dde16d56153690bc902a2 {
  border: 2px solid rgb(0, 0, 255, 0.5) !important;
  animation: blueTwinkle 800ms ease-out infinite alternate;
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

.steps-99b844b6785d8d7378bbc2b1401af365 {
  border: 2px solid rgb(255, 0, 0, 0.5) !important;
  animation: redTwinkle 800ms ease-out infinite alternate;
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

.hero-551270e8a38a84d3f0b214e6854357e3 {
  filter: grayscale(1);
}

.hero-87740aa9337e54dbad53ec95089dca77 {
  background-color: white;
}

.game-beedfb16b1c81d2901c32b6dcc2939d0,
.game-173f312c43fe32a4f01c84d1cf0520b1 {
  position: fixed;
  margin: 3px;
}

.game-beedfb16b1c81d2901c32b6dcc2939d0,
.game-173f312c43fe32a4f01c84d1cf0520b1 {
  right: 95px;
}

.game-beedfb16b1c81d2901c32b6dcc2939d0 {
  top: 67px;
}

.game-173f312c43fe32a4f01c84d1cf0520b1 {
  bottom: 45px;
}

.game-e4e6288c92630a6c237c15442fdb0917 li {
  margin: 3px 5px;
  float: left;
}

.ban-dce7c4174ce9323904a934a486c41288 {
  position: absolute;
  margin-left: -20px;
  margin-top: 17px;
}

.ban-8c9cb4a232c7e88403dddc3a0e589162,
.ban-c6a2f8b3941d7f91bc4e51839e5371e0,
.pick-8c9cb4a232c7e88403dddc3a0e589162,
.pick-c6a2f8b3941d7f91bc4e51839e5371e0 {
  position: absolute;
}

.ban-bf2c7b7ad9bcf75cd72e0b4ce30500e3 li {
  float: left;
}

.ban-ba9bced6af8121cf6413000a4274ac2b li {
  float: right;
}

.ban-8c9cb4a232c7e88403dddc3a0e589162,
.ban-c6a2f8b3941d7f91bc4e51839e5371e0 {
  width: 165px;
  top: 15px;
}

.ban-8c9cb4a232c7e88403dddc3a0e589162 {
  left: 25px;
}

.ban-c6a2f8b3941d7f91bc4e51839e5371e0 {
  right: 25px;
}

.ban-eee32796c3fdfc147115c9f6e875c090,
.ban-aa95efe1c5d39e5e9389ca5833e63fbe {
  border-radius: 100%;
  margin: 5px;
}

.pick-8c9cb4a232c7e88403dddc3a0e589162,
.pick-c6a2f8b3941d7f91bc4e51839e5371e0 {
  margin-top: 53px;
}

.pick-8c9cb4a232c7e88403dddc3a0e589162 {
  left: 35px;
}

.pick-c6a2f8b3941d7f91bc4e51839e5371e0 {
  right: 35px;
}

.pick-eee32796c3fdfc147115c9f6e875c090,
.pick-aa95efe1c5d39e5e9389ca5833e63fbe {
  border-radius: 10px;
  margin: 5px 3px;
}

.hero-99938282f04071859941e18f16efcf42 {
  height: 240px;
  margin: 0 auto;
  overflow-y: auto;
  margin-top: 50px;
}

.game-4863c43e8743ebf1be3f48c5c4519627 {
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>

<script>
export default {
  name: "GlobalBP",
  components: {
    AppLock: resolve => require(["@/assets/Icons/AppLock.vue"], resolve)
  },
  data() {
    return {
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
          1 // 16 -17
        ]
      },
      blueStepsClass: "steps-1cf3b0809c3dde16d56153690bc902a2",
      redStepsClass: "steps-99b844b6785d8d7378bbc2b1401af365",
      banPickClass: "hero-551270e8a38a84d3f0b214e6854357e3",
      copyData: "",
      mode: "view",
      self: "",
      opponent: "",
      perspective: 1,
      gameTime: null,
      gameLabel: "new",
      tabsModel: 0,
      authorInfo: {
        name: null,
        img: null,
        actions: []
      },
      campInfo: {
        camp_1: {
          id: 1,
          name: "队伍_1",
          img: "/img/app-icons/camp_blue.png"
        },
        camp_2: {
          id: 2,
          name: "队伍_2",
          img: "/img/app-icons/camp_red.png"
        }
      },
      gameInfo: {
        list: [
          {
            type: 1,
            time: null,
            stepsNow: 0,
            bpOrder: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ],
        used: []
      },
      tableData: {
        active: 0,
        heroList: []
      },
      show: {
        apps: false,
        hero: true
      },
      eye: "eye-o",
      isPortrait: true
    };
  },
  created() {
    window.addEventListener("beforeunload", e => this.beforeunload(e), false);
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
      if (gameLabel == "new") {
        this.initNewGame();
        this.show.apps = true;
      } else {
        this.getGameBP(gameLabel);
      }
      this.getHeroList();
    } else {
      this.$router.push({
        query: {
          path: "/game",
          from: "c083a9362c48884b161429aa0ccddc11"
        }
      });
      return;
    }
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.beforeunload, false);
    if (this.appDevice) {
      window.removeEventListener("resize", this.renderResize, false);
    }
  },
  methods: {
    beforeunload: function(e) {
      e = e || window.event;

      if (this.mode == "edit") {
        if (e) {
          e.returnValue = "关闭提示";
        }
        return "关闭提示";
      }
    },
    renderResize: function() {
      let width = document.documentElement.clientWidth;
      let height = document.documentElement.clientHeight;
      if (width < height) {
        this.isPortrait = true;
      } else {
        this.isPortrait = false;

        if (width < 700 || height < 375) {
          this.$message.warning("警告:1000,分辨率过小,可能会挡住英雄");
        }
      }
    },
    bpOrderInit: function(perspective, type) {
      if (perspective == 1) {
        this.self = this.campInfo.camp_1;
        this.opponent = this.campInfo.camp_2;
      } else {
        this.self = this.campInfo.camp_2;
        this.opponent = this.campInfo.camp_1;
      }

      let used = [];
      for (let i = 0; i < type; i++) {
        let orderList = this.gameInfo.list[i];

        this.gameInfo.list[i].blueBan = [
          orderList.bpOrder[0],
          orderList.bpOrder[2],
          orderList.bpOrder[11],
          orderList.bpOrder[13]
        ];

        this.gameInfo.list[i].bluePick = [
          orderList.bpOrder[4],
          orderList.bpOrder[7],
          orderList.bpOrder[8],
          orderList.bpOrder[15],
          orderList.bpOrder[16]
        ];

        this.gameInfo.list[i].redBan = [
          orderList.bpOrder[1],
          orderList.bpOrder[3],
          orderList.bpOrder[10],
          orderList.bpOrder[12]
        ];

        this.gameInfo.list[i].redPick = [
          orderList.bpOrder[5],
          orderList.bpOrder[6],
          orderList.bpOrder[9],
          orderList.bpOrder[14],
          orderList.bpOrder[17]
        ];

        if (perspective == 1) {
          if (i % 2 == 0) {
            used.push.apply(used, this.gameInfo.list[i].redPick);
          } else {
            used.push.apply(used, this.gameInfo.list[i].bluePick);
          }
        }

        if (perspective == 2) {
          if (i % 2 == 0) {
            used.push.apply(used, this.gameInfo.list[i].bluePick);
          } else {
            used.push.apply(used, this.gameInfo.list[i].redPick);
          }
        }
        //队伍视角,会交换位置
      }
      this.gameInfo.used = Array.from(new Set(used));
      //console.log(perspective, this.gameInfo.used);
    },
    getHeroList: function() {
      this.axios
        .get(this.apiList.pvp.getHeroRanking + "&gameTime=" + this.gameTime)
        .then(ret => {
          this.tableData.heroList = ret.data.data.result;
        });
    },
    getGameBP: function(gameLabel) {
      let tabsModel = this.tabsModel;

      this.axios
        .get(this.apiList.game.getGameBP + "&gameLabel=" + gameLabel)
        .then(ret => {
          let data = ret.data.data;

          if (data.result.length == 0) {
            this.$message.error("错误:1000,对局不存在");
            return;
          }

          data.result[tabsModel].type > 0
            ? (this.show.apps = true)
            : (this.show.apps = false);

          this.gameTime = data.result[tabsModel].gameTime;
          this.authorInfo = data.authorInfo;
          this.campInfo = data.campInfo;
          this.gameInfo.list = data.result;

          this.bpOrderInit(this.perspective, tabsModel + 1);
        });
    },
    initNewGame: function() {
      this.bpOrderInit(this.perspective, this.tabsModel + 1);
    },
    onCreateNewGameClick: function() {
      let newGame = {
        type: 1,
        time: null,
        stepsNow: 0,
        bpOrder: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      };

      if (this.gameInfo.list.length > 5) {
        this.$message.error("错误:1001,最多创建 6 局");
      } else {
        this.gameInfo.list.push(newGame);
        this.$message.success("创建成功");
      }
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
    onSeeHeroClick: function() {
      if (this.eye == "eye-o") {
        this.eye = "closed-eye";
        this.show.hero = false;
      } else {
        this.eye = "eye-o";
        this.show.hero = true;
      }
    },
    onGamePerspectiveClick: function(mode) {
      this.perspective == 1 ? (this.perspective = 2) : (this.perspective = 1);

      this.bpOrderInit(this.perspective, this.tabsModel + 1);

      mode == 1
        ? this.$message.success("初始化 " + this.self.name + " 的视角")
        : "";
    },
    onGameTabsChange: function(e) {
      this.bpOrderInit(this.perspective, e + 1);

      if (this.mode == "edit") {
        this.$message.warning("警告:1001,编辑模式下切换对局记得保存");
      }
    },
    onGameBanPickClick: function(camp, type, newIndex) {
      if (this.mode == "view") return;

      let tabsModel = this.tabsModel;

      if (this.gameInfo.list[tabsModel].bpOrder[newIndex - 1] == 0) {
        this.$message.error("错误:1002,请按顺序BP");
        return;
      }

      let oldIndex = this.gameInfo.list[tabsModel].stepsNow;

      if (this.mode == "edit") {
        if (
          this.gameCampColor(1, oldIndex) != this.gameCampColor(1, newIndex)
        ) {
          this.onGamePerspectiveClick(0);
        }
        //切换阵容时初始化

        this.gameInfo.list[tabsModel].stepsNow = newIndex;
      }
    },
    onGamePickHeroClick: function(hero) {
      let tabsModel = this.tabsModel;

      if (
        this.gameInfo.list[tabsModel].blueBan.includes(hero.id) ||
        this.gameInfo.list[tabsModel].redBan.includes(hero.id)
      ) {
        this.$message.warning("警告:1003," + hero.name + " 已被禁用");
        return;
      } else if (this.gameInfo.used.includes(hero.id)) {
        this.$message.warning(
          "警告:1004," + hero.name + " 已被 " + this.opponent.name + " 用过"
        );
        return;
      }

      if (this.mode == "view") return;

      let oldIndex = this.gameInfo.list[tabsModel].stepsNow;
      let newIndex = 0;
      if (oldIndex > 17) {
        newIndex = 0;
      } else {
        newIndex = oldIndex + 1;

        this.gameInfo.list[tabsModel].bpOrder.splice(oldIndex, 1, hero.id);
      }

      if (this.index.perspective[oldIndex] == 1) {
        this.onGamePerspectiveClick(0);
      }

      this.gameInfo.list[tabsModel].stepsNow = newIndex;

      this.bpOrderInit(this.perspective, tabsModel + 1);
    },
    onGameShareClick: function() {
      let vs = this.campInfo.camp_1.name + " vs " + this.campInfo.camp_2.name;
      this.copyData =
        "正在复盘【" +
        vs +
        "】的第 " +
        (this.tabsModel + 1) +
        " 局比赛 ↓\r" +
        location.href;
      this.appCopyData(this.copyData);
    },
    onToolsMenuClick: function(type) {
      let tabsModel = this.tabsModel;

      if (type == 0) {
        //
      }

      if (type == 1) {
        this.$dialog
          .confirm({
            title: "是否删除第 " + (tabsModel + 1) + " 局？",
            message: "此操作不可逆"
          })
          .then(() => {
            // on confirm
            this.gameInfo.list.splice(tabsModel, 1);
            this.tabsModel = tabsModel - 1;
          })
          .catch(() => {
            // on cancel
          });
      }

      if (type == 2) {
        this.onCreateNewGameClick();
      }

      if (type == 3) {
        if (this.mode == "view") {
          this.mode = "edit";
          this.$message.info("已进入编辑模式");

          this.index.ban.includes(this.gameInfo.list[tabsModel].stepsNow) &&
          tabsModel % 2 == 0
            ? (this.perspective = 2)
            : (this.perspective = 1);
          this.onGamePerspectiveClick(0);
          //tabsModel % 2 == 0
        } else {
          this.mode = "view";
          this.$message.success("已保存第 " + (tabsModel + 1) + " 局 ;D");
        }
      }
    }
  }
};
</script>