<template>
  <div class="game-info">
    <span class="game-f4842dcb685d490e2a43212b8072a6fe">
      <span
        class="game-d4f94e5b8f23a1755b438ff70ed16fc6"
      >{{ gameInfo.active % 2 == 0 ? gameInfo.camp_1.name : gameInfo.camp_2.name }}</span>
      <span class="game-80653328482d7cba8da3f0fa033b0c12">vs</span>
      <span
        class="game-1426b22460332d802aedd4d54d35f3ee"
      >{{ gameInfo.active % 2 == 0 ? gameInfo.camp_2.name : gameInfo.camp_1.name }}</span>
    </span>

    <div class="game-716fcd585a785195878b2683fca82e6f">
      <div class="ban-8c9cb4a232c7e88403dddc3a0e589162">
        <ul class="ban-bebaefe0582b00649bc558529bba9df5">
          <li
            v-for="(data, index) in gameInfo.list[gameInfo.active].bpOrder"
            :key="'ban-camp1-1-data-' + index"
            @click="onBanPickClick(1, 1, index)"
            class="ban-bf2c7b7ad9bcf75cd72e0b4ce30500e3"
          >
            <span
              v-show="index == 0 || index == 2 || index == 11 || index == 13"
              class="ban-4978748050a936d2f77fe718f1d81524"
            >
              <img
                width="30"
                height="30"
                v-lazy="data ? 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/' + data + '/' + data + '.jpg' : '/img/app-icons/hero.png'"
                :class="stepsShow && gameInfo.list[gameInfo.active].stepsNow == index  ? blueStepsClass : ''"
                class="ban-eee32796c3fdfc147115c9f6e875c090"
              />
              <AppLock width="25" height="25" class="ban-dce7c4174ce9323904a934a486c41288" />
            </span>
          </li>
        </ul>
      </div>

      <div class="ban-c6a2f8b3941d7f91bc4e51839e5371e0">
        <ul class="ban-3f2e7ec281ad2d884845f35f17756624">
          <li
            v-for="(data, index) in gameInfo.list[gameInfo.active].bpOrder"
            :key="'ban-camp2-1-data-' + index"
            class="ban-ba9bced6af8121cf6413000a4274ac2b"
            @click="onBanPickClick(2, 1, index)"
          >
            <span
              v-show="index == 1 || index == 3 || index == 10 || index == 12"
              class="ban-6e9c0050fe873888fbf53ec6f7b21816"
            >
              <img
                width="30"
                height="30"
                v-lazy="data ? 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/' + data + '/' + data + '.jpg' : '/img/app-icons/hero.png'"
                :class="stepsShow && gameInfo.list[gameInfo.active].stepsNow == index  ? redStepsClass : ''"
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
            <ul class="pick-bebaefe0582b00649bc558529bba9df5">
              <li
                v-for="(data, index) in gameInfo.list[gameInfo.active].bpOrder"
                :key="'pick-camp1-1-data-' + index"
                @click="onBanPickClick(1, 2, index)"
                class="pick-4d5eb62584759be250091d21c745edd4"
              >
                <span
                  v-show="index == 4 || index == 7 || index == 8 || index == 15 || index == 16"
                  class="pick-4978748050a936d2f77fe718f1d81524"
                >
                  <img
                    width="40"
                    height="40"
                    v-lazy="data ? 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/' + data + '/' + data + '.jpg' : '/img/app-icons/hero.png'"
                    :class="stepsShow && gameInfo.list[gameInfo.active].stepsNow == index  ? blueStepsClass : ''"
                    class="pick-eee32796c3fdfc147115c9f6e875c090"
                  />
                </span>
              </li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div v-show="heroSelectShow" class="hero-99938282f04071859941e18f16efcf42">
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
                      :key="'hero-select-' + index"
                      :icon="data.img"
                      :class="gameInfo.list[gameInfo.active].blueBan.includes(data.id) || gameInfo.list[gameInfo.active].redBan.includes(data.id) || gameInfo.used.includes(data.id) ? banPickClass : ''"
                      @click="onHeroUseClick(data)"
                    />
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
                      :key="'hero-select-' + index"
                      :icon="data.img"
                      :class="gameInfo.list[gameInfo.active].blueBan.includes(data.id) || gameInfo.list[gameInfo.active].redBan.includes(data.id) || gameInfo.used.includes(data.id) ? banPickClass : ''"
                      @click="onHeroUseClick(data)"
                    />
                  </van-grid>
                </van-cell-group>
              </div>
            </van-tabs>
          </div>
        </van-col>
        <van-col span="3">
          <div class="pick-c6a2f8b3941d7f91bc4e51839e5371e0">
            <ul class="pick-3f2e7ec281ad2d884845f35f17756624">
              <li
                v-for="(data, index) in gameInfo.list[gameInfo.active].bpOrder"
                :key="'pick-camp2-1-data-' + index"
                @click="onBanPickClick(2, 2, index)"
                class="pick-9907d81a5157ef27607fd257364f3f43"
              >
                <span
                  v-show="index == 5 || index == 6 || index == 9 || index == 14 || index == 17"
                  class="pick-6e9c0050fe873888fbf53ec6f7b21816"
                >
                  <img
                    width="40"
                    height="40"
                    v-lazy="data ? 'https://game.gtimg.cn/images/yxzj/img201606/heroimg/' + data + '/' + data + '.jpg' : '/img/app-icons/hero.png'"
                    :class="stepsShow && gameInfo.list[gameInfo.active].stepsNow == index  ? redStepsClass : ''"
                    class="pick-aa95efe1c5d39e5e9389ca5833e63fbe"
                  />
                </span>
              </li>
            </ul>
          </div>
        </van-col>
      </van-row>
    </div>

    <div class="game-b5a9628110ebc1c03f58e06a553622e5">
      <ul class="game-4a931512ce65bdc9ca6808adf92d8783">
        <li class="game-39ab32c5aeb56c9f5ae17f073ce31023">
          <van-button
            round
            icon="apps-o"
            size="small"
            color="linear-gradient(to right, #6874E8, #9708CC)"
            @click="moreActionSheetShow = true"
          >更多</van-button>
        </li>
        <li class="game-39ab32c5aeb56c9f5ae17f073ce31023">
          <van-button
            round
            :icon="eye"
            size="small"
            color="linear-gradient(to right, #43CBFF, #6874E8)"
            @click="onHeroSelectClick"
          >查看 {{ gameInfo.perspective == 1 ? gameInfo.camp_2.name : gameInfo.camp_1.name }} 英雄池</van-button>
        </li>
        <li class="game-39ab32c5aeb56c9f5ae17f073ce31023 game-03382ae6a22ec34a72bdf96acd07232b">
          <van-button
            round
            :icon="gameInfo.perspective == 1 ? gameInfo.camp_1.img : gameInfo.camp_2.img"
            size="small"
            @click="onPerspectiveClick(1)"
          >{{gameInfo.perspective == 1 ? gameInfo.camp_1.name : gameInfo.camp_2.name }} 视角</van-button>
        </li>
      </ul>
    </div>

    <div class="game-fca3ffea6534176432f58b5a22ed22e1">
      <van-steps
        v-show="stepsShow"
        :active="gameInfo.list[gameInfo.active].stepsActive"
        @click-step="onStepsClick"
      >
        <van-step
          v-for="(data, index) in gameInfo.list[gameInfo.active].bpOrder"
          :key="'hero-steps-data-' + index"
        >{{ index + 1 }}</van-step>
      </van-steps>
    </div>

    <div class="game-22b9550116c87c4fffd94a4271127d9c">
      <van-tabs
        v-model="gameInfo.active"
        @change="onGameTabsChange"
        color="orange"
        class="game-4863c43e8743ebf1be3f48c5c4519627"
      >
        <van-tab v-for="index in gameInfo.list.length" :key="'game-tab-' + index">
          <template #title>
            <van-icon
              :name="gameInfo.list[index - 1].winCamp == 1 ? gameInfo.camp_1.img : gameInfo.camp_2.img"
            />
            第 {{ index }} 场
          </template>
        </van-tab>
      </van-tabs>
    </div>

    <van-action-sheet
      v-model="moreActionSheetShow"
      :actions="actions"
      :close-on-click-action="true"
      @select="onActionSheetSelect"
    />
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

div.van-steps {
  overflow: auto;
  width: 100%;
}

div.van-steps--horizontal {
  padding: unset;
}
</style>

<style scoped>
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

.game-4a931512ce65bdc9ca6808adf92d8783 {
  position: fixed;
  text-align: right;
  right: 15%;
  bottom: 45px;
}

.game-fca3ffea6534176432f58b5a22ed22e1 {
  z-index: 1;
  position: fixed;
  width: 100%;
  bottom: -10px;
}

.game-39ab32c5aeb56c9f5ae17f073ce31023 {
  margin: 3px 5px;
  float: right;
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

.ban-bf2c7b7ad9bcf75cd72e0b4ce30500e3,
.ban-ba9bced6af8121cf6413000a4274ac2b {
  float: left;
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

.pick-bebaefe0582b00649bc558529bba9df5,
.pick-3f2e7ec281ad2d884845f35f17756624 {
  width: 50px;
}

.pick-bebaefe0582b00649bc558529bba9df5 {
  text-align: left;
}

.pick-3f2e7ec281ad2d884845f35f17756624 {
  text-align: right;
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
  name: "MatchInfo",
  components: {
    AppLock: resolve => require(["@/assets/Icons/AppLock.vue"], resolve)
  },
  data() {
    return {
      index: {
        blue: [0, 2, 4, 7, 8, 11, 13, 15, 16],
        red: [1, 3, 5, 6, 9, 10, 12, 14, 17]
      },
      blueStepsClass: "steps-1cf3b0809c3dde16d56153690bc902a2",
      redStepsClass: "steps-99b844b6785d8d7378bbc2b1401af365",
      banPickClass: "hero-551270e8a38a84d3f0b214e6854357e3",
      copyData: "",
      gameInfo: {
        mode: "view",
        active: 0,
        self: "",
        opponent: "",
        perspective: 1,
        camp_1: {
          img:
            "https://game.gtimg.cn/images/datamore/kingwatch/private/KPLALL/GuildALL/44.png",
          name: "TS",
          score: 3
        },
        camp_2: {
          img:
            "https://game.gtimg.cn/images/datamore/kingwatch/private/KPLALL/GuildALL/26.png",
          name: "EDG.M",
          score: 2
        },
        list: [
          {
            /*
            blueBan: [509, 118, 152, 523],
            bluePick: [518, 171, 140, 107, 192],
            redBan: [153, 525, 157, 502],
            redPick: [191, 120, 199, 529, 142],
            */
            stepsNow: 0,
            stepsActive: 0,
            bpOrder: [
              509,
              153,
              118,
              525,
              518,
              191,
              120,
              171,
              140,
              199,
              157,
              152,
              502,
              523,
              529,
              107,
              192,
              142
            ],
            winCamp: 2
          },
          {
            /*
            blueBan: [509, 199, 156, 312],
            bluePick: [132, 107, 140, 136, 194],
            redBan: [118, 525, 197, 523],
            redPick: [524, 149, 153, 148, 114],
            */
            stepsNow: 0,
            stepsActive: 0,
            bpOrder: [
              509,
              118,
              199,
              525,
              132,
              524,
              149,
              107,
              140,
              153,
              197,
              156,
              523,
              312,
              148,
              136,
              194,
              114
            ],
            winCamp: 1
          },
          {
            /*
            blueBan: [153, 111, 133, 508],
            bluePick: [511, 170, 156, 175, 169],
            redBan: [191, 120, 139, 132],
            redPick: [525, 518, 148, 105, 167],
            */
            stepsNow: 0,
            stepsActive: 0,
            bpOrder: [
              153,
              191,
              111,
              120,
              511,
              525,
              518,
              170,
              156,
              148,
              139,
              133,
              132,
              508,
              105,
              175,
              169,
              167
            ],
            winCamp: 1
          },
          {
            /*
            blueBan: [191, 120, 152, 312],
            bluePick: [118, 502, 123, 157, 192],
            redBan: [153, 511, 156, 523],
            redPick: [509, 199, 144, 163, 132],
            */
            stepsNow: 0,
            stepsActive: 0,
            bpOrder: [
              191,
              153,
              120,
              511,
              118,
              509,
              199,
              502,
              123,
              144,
              156,
              152,
              523,
              312,
              163,
              157,
              192,
              132
            ],
            winCamp: 2
          },
          {
            /*
            blueBan: [509, 511, 515, 149],
            bluePick: [503, 196, 312, 178, 108],
            redBan: [191, 120, 162, 131],
            redPick: [186, 111, 153, 126, 119],
            */
            stepsNow: 0,
            stepsActive: 0,
            bpOrder: [
              509,
              191,
              511,
              120,
              503,
              186,
              111,
              196,
              312,
              153,
              162,
              515,
              131,
              149,
              126,
              178,
              108,
              119
            ],
            winCamp: 1
          }
        ],
        used: []
      },
      tableData: {
        active: 0,
        heroList: []
      },
      heroSelectShow: true,
      eye: "eye-o",
      stepsShow: false,
      moreActionSheetShow: false,
      actions: [
        { name: "查看顺序", subname: "显示当前的 BP 顺序", value: 0 },
        { name: "保存本局", subname: "只能保存自己创建的", value: 1 },
        { name: "视频回放", value: 2 },
        { name: "分享本局", value: 3 },
        { name: "常见问题", value: 4 }
      ]
    };
  },
  mounted() {
    this.getHeroList();

    let type = parseInt(this.$route.query.type);
    !type ? (this.gameInfo.active = 0) : (this.gameInfo.active = type);

    this.init(this.gameInfo.perspective, type + 1);
  },
  methods: {
    init: function(perspective, type) {
      if (perspective == 1) {
        this.gameInfo.self = this.gameInfo.camp_1;
        this.gameInfo.opponent = this.gameInfo.camp_2;
      } else {
        this.gameInfo.self = this.gameInfo.camp_2;
        this.gameInfo.opponent = this.gameInfo.camp_1;
      }

      let used = [];
      for (let i = 0; i < type; i++) {
        let orderList = this.gameInfo.list[i];

        let stepsActive = orderList.bpOrder.indexOf(0);

        stepsActive == -1
          ? (this.gameInfo.list[i].stepsActive = orderList.bpOrder.length - 1)
          : (this.gameInfo.list[i].stepsActive = stepsActive - 1);

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
    onHeroSelectClick: function() {
      if (this.eye == "eye-o") {
        this.eye = "closed-eye";
        this.heroSelectShow = false;
      } else {
        this.eye = "eye-o";
        this.heroSelectShow = true;
      }
    },
    onPerspectiveClick: function(mode) {
      this.gameInfo.perspective == 1
        ? (this.gameInfo.perspective = 2)
        : (this.gameInfo.perspective = 1);

      this.init(this.gameInfo.perspective, this.gameInfo.active + 1);

      mode == 1
        ? this.$message.success("初始化 " + this.gameInfo.self.name + " 视角")
        : "";
    },
    onGameTabsChange: function(e) {
      this.init(this.gameInfo.perspective, e + 1);

      this.$router.push({
        query: {
          type: e,
          from: "39298652302aab3fb0c303d72f32ac4e"
        }
      });
    },
    getHeroList: function() {
      this.axios.get(this.appApi.list.getHeroRanking).then(ret => {
        this.tableData.heroList = ret.data.data.result;
      });
    },
    onBanPickClick: function(camp, type, newIndex) {
      if (
        this.gameInfo.list[this.tableData.active].bpOrder[newIndex - 1] == 0
      ) {
        this.$message.error("请按顺序BP ;D");
        return;
      }

      let gameInfoActive = this.gameInfo.active;

      let oldIndex = this.gameInfo.list[gameInfoActive].stepsNow;

      if (this.gameInfo.mode == "edit") {
        if (this.campColor(1, oldIndex) != this.campColor(1, newIndex)) {
          this.onPerspectiveClick(1);
        }
        //切换阵容时初始化

        this.gameInfo.list[gameInfoActive].stepsNow = newIndex;
      }
    },
    onHeroUseClick: function(hero) {
      let gameInfoActive = this.gameInfo.active;
      if (
        this.gameInfo.list[gameInfoActive].blueBan.includes(hero.id) ||
        this.gameInfo.list[gameInfoActive].redBan.includes(hero.id)
      ) {
        this.$message.error(hero.name + " 已被禁用");
        return;
      } else if (this.gameInfo.used.includes(hero.id)) {
        this.$message.error(
          hero.name + " 已被 " + this.gameInfo.opponent.name + " 用过"
        );
        return;
      }

      let stepsNow = this.gameInfo.list[gameInfoActive].stepsNow;

      this.gameInfo.list[gameInfoActive].bpOrder.splice(stepsNow, 1, hero.id);

      this.init(this.gameInfo.perspective, gameInfoActive + 1);

      stepsNow > this.gameInfo.list[gameInfoActive].bpOrder.length
        ? (stepsNow = 0)
        : (stepsNow = stepsNow + 1);
      this.gameInfo.list[gameInfoActive].stepsNow = stepsNow;
    },
    onGameShareClick: function() {
      let vs = this.gameInfo.camp_1.name + " vs " + this.gameInfo.camp_2.name;
      let type = this.gameInfo.active + 1;
      this.copyData =
        "正在复盘【" + vs + "】第【" + type + "】场比赛 ↓\r" + location.href;
      this.$copyText(this.copyData);
      this.$message.success("已复制");
    },
    campColor(color, index) {
      let ret = false;

      if (color == 1) {
        ret = this.index.blue.includes(index);
      }

      if (color == 2) {
        ret = this.index.red.includes(index);
      }

      return ret;
    },
    onActionSheetSelect: function(e) {
      if (e.value == 0) {
        if (this.stepsShow == false) {
          this.stepsShow = true;
          this.gameInfo.mode = "edit";

          if (this.gameInfo.active % 2 == 0) {
            this.gameInfo.perspective = 1;
            this.onPerspectiveClick(0);
          }

          this.$message.warning("已进入 编辑模式");
        } else {
          this.stepsShow = false;
          this.gameInfo.mode = "view";

          this.gameInfo.perspective = 2;
          this.onPerspectiveClick(0);
          //退出的时候 强制初始化为 队伍1 视角

          this.$message.warning("已退出 编辑模式");
        }
      }

      if (e.value == 3) {
        this.onGameShareClick();
      }
    },
    onStepsClick: function(e) {
      this.gameInfo.list[this.gameInfo.active].stepsNow = e;

      this.$message.info("正在查看第【" + (e + 1) + "】个禁选");
    }
  }
};
</script>