<template>
  <div class="bp-add">
    <!-- 数据:下拉 -->
    <van-dropdown-menu class="app-top-menu">
      <van-dropdown-item
        v-model="modeType"
        :options="modeOptions"
        @change="onChangeMode"
      />
      <van-dropdown-item
        v-model="boType"
        :options="boOptions"
        @change="onChangeBo"
        :disabled="modeType != 4"
      />
    </van-dropdown-menu>

    <!-- 禁用 -->
    <div class="ban-data">
      <!-- 蓝方 -->
      <div class="ban-left">
        <span
          v-for="(data, index) in bpData.blue.ban"
          :key="index + '-ban-blue'"
        >
          <img
            width="30"
            class="ban-blue"
            v-lazy="data.heroImg"
            @click="clickBanPick(data, 1, 1 ,index)"
          />

          <span
            v-if="modeType == 4 && index == 1"
            class="ban-divider"
          />

          <!-- 禁用:顺序 -->
          <van-tag
            :color="banId.blue[index].color"
            round
            v-if="modeType == 4"
            class="ban-id"
          >
            {{ banId.blue[index].id }}
          </van-tag>
        </span>
      </div>

      <!-- 红方 -->
      <div class="ban-right">
        <span
          v-for="(data, index) in bpData.red.ban"
          :key="index + '-ban-red'"
        >
          <img
            width="30"
            class="ban-red"
            v-lazy="data.heroImg"
            @click="clickBanPick(data, 2, 2, index)"
          />

          <span
            v-if="modeType == 4 && index == 1"
            class="ban-divider"
          />

          <!-- 禁用:顺序 -->
          <van-tag
            :color="banId.red[index].color"
            round
            v-if="modeType == 4"
            class="ban-id"
          >
            {{ banId.red[index].id }}
          </van-tag>
        </span>
      </div>
    </div>

    <!-- 选用 -->
    <div
      class="pick-data"
      v-show="pickShow"
    >
      <div class="pick-left">
        {{ bpData.blue.title }}
        <!-- 蓝方 -->
        <div
          class="hero"
          v-for="(data, index) in bpData.blue.pick"
          :key="index + '-pick-blue'"
        >
          <!-- 英雄:特点 -->
          <van-tag
            round
            type="warning"
            v-if="data.heroFeature"
            class="pick-feature"
          >
            {{ data.heroFeature }}
          </van-tag>

          <img
            width="50"
            class="pick-blue"
            v-lazy="data.heroImg"
            @click="clickBanPick(data, 1, 3, index)"
          />

          <!-- 英雄:buff -->
          <van-tag
            round
            type="primary"
            v-if="data.heroBuff == 1"
            class="pick-buff"
          >&nbsp;&nbsp;</van-tag>
          <van-tag
            round
            type="danger"
            v-if="data.heroBuff == 2"
            class="pick-buff"
          >&nbsp;&nbsp;</van-tag>

          <!-- 选用:顺序 -->
          <van-tag
            :color="pickId.blue[index].color"
            round
            v-if="modeType == 4"
            class="pick-id"
          >
            {{ pickId.blue[index].id }}
          </van-tag>

          <van-divider
            v-if="modeType == 4 && index == 2"
            :style="{ borderColor: '#1989fa', padding: '0 16px' }"
          />
        </div>
      </div>

      <div class="pick-right">
        {{ bpData.red.title }}
        <!-- 红方 -->
        <div
          class="hero"
          v-for="(data, index) in bpData.red.pick"
          :key="index + '-pick-red'"
        >
          <!-- 英雄:特点 -->
          <van-tag
            round
            type="warning"
            v-if="data.heroFeature"
            class="pick-feature"
          >
            {{ data.heroFeature }}
          </van-tag>

          <img
            width="50"
            class="pick-red"
            v-lazy="data.heroImg"
            @click="clickBanPick(data, 2, 4, index)"
          />

          <!-- 英雄:buff -->
          <van-tag
            round
            type="primary"
            v-if="data.heroBuff == 1"
            class="pick-buff"
          >&nbsp;&nbsp;</van-tag>
          <van-tag
            round
            type="danger"
            v-if="data.heroBuff == 2"
            class="pick-buff"
          >&nbsp;&nbsp;</van-tag>

          <!-- 选用:顺序 -->
          <van-tag
            :color="pickId.red[index].color"
            round
            v-if="modeType == 4"
            class="pick-id"
          >
            {{ pickId.red[index].id }}
          </van-tag>

          <van-divider
            v-if="modeType == 4 && index == 2"
            :style="{ borderColor: '#1989fa', padding: '0 16px' }"
          />
        </div>
      </div>
    </div>

    <!-- 声明:BP -->
    <vue-markdown
      :source="statementBp"
      v-show="statementShow"
      class="statement-bp"
    />

    <!-- 阵容:提示 -->
    <van-dialog v-model="dialogShow">
      <vue-markdown :source="statementBpTips" />
      <br />
    </van-dialog>

    <van-popup
      v-model="popupShow"
      :position="popupPosition"
      closeable
      round
      close-icon="close"
      class="bp-choose"
    >
      <div>
        <span
          :style="{ color: campColor }"
          class="bp-tips"
        >
          {{ camp }}
        </span>
        第【
        <span
          class="bp-tips"
          v-if="camp == '红方' && bpChoose == '禁'"
        >
          {{ bpData.red.ban.length - bpIndex }}
        </span>
        <span
          class="bp-tips"
          v-else
        >
          {{ bpIndex + 1 }}
        </span>
        】个【
        <span class="bp-tips">
          {{ bpChoose }}
        </span>
        】位
      </div>

      <img
        v-lazy="old.heroImg"
        class="img-bp"
      />

      <br />

      <span class="hero-name">
        {{ old.heroName }}
      </span>
      <van-cell
        title="注意事项"
        icon="question-o"
        @click="getTips"
        class="hero-list-tips"
        is-link
      />

      <van-tabs
        v-model="activeHeroList"
        :border="false"
      >
        <van-tab title="抗压" />
        <van-tab title="中路" />
        <van-tab title="坦克" />
        <van-tab title="打野" />
        <van-tab title="发育" />
        <van-tab title="辅助" />

        <van-grid
          v-for="(data, index) in tableData.now"
          :key="index + '-hero-' + campColor + '-' + index"
          :border="false"
          class="hero-item"
        >
          <van-grid-item v-show="data.heroType == activeHeroList + 1">
            <img
              width="50"
              v-lazy="data.heroImg"
              @click="heroUse(data, bpType, bpIndex, index)"
              class="app-img"
            />
            <span class="hero-name">
              {{ data.heroName }}
            </span>
          </van-grid-item>
        </van-grid>
      </van-tabs>
    </van-popup>

    <!-- 底部 -->
    <AppBottomTabbar v-show="appDevice" />
  </div>
</template>

<style scoped>
.ban-data {
  margin-top: 25px;
}

.pick-data {
  margin-top: 125px;
}

.pick-feature {
  position: absolute;
  margin-left: -15px;
  margin-top: -7px;
}

.pick-buff {
  position: absolute;
  margin-left: -60px;
  margin-top: 40px;
}

.ban-id {
  position: absolute;
  margin-left: -32px;
  margin-top: -10px;
}

.pick-id {
  position: absolute;
  margin-left: -10px;
  margin-top: 40px;
}

.ban-divider {
  border: 1px solid #1989fa;
}

.pick-left,
.pick-right,
.ban-left,
.ban-right {
  position: absolute;
}

.pick-left,
.pick-right {
  width: 75px;
}

.ban-left,
.ban-right {
  width: 50%;
}

.ban-left,
.pick-left {
  left: 0;
  float: left;
}

.ban-left {
  margin-left: 1.5%;
}

.pick-left {
  margin-left: 5%;
}

.ban-right,
.pick-right {
  right: 0;
  float: right;
}

.ban-right {
  margin-right: 1.5%;
}

.pick-right {
  margin-right: 5%;
}

.ban-blue,
.ban-red {
  margin: 0 2px;
  border-radius: 100%;
}

.pick-blue,
.pick-red {
  border-radius: 10px;
}

.ban-blue,
.ban-red,
.pick-blue,
.pick-red {
  border: 2px solid #ccc;
  margin-bottom: 10px;
}

.ban-blue,
.pick-blue {
  border-color: blue;
}

.ban-red,
.pick-red {
  border-color: red;
}

.statement-bp {
  width: 95%;
  margin: 0 auto;
  text-align: left;
}

.share-bottom {
  margin-top: 25px;
}

.hero-list-tips {
  text-align: left;
}

.bp-choose {
  height: 100%;
  width: 100%;
  margin-top: 50px;
}

.bp-tips {
  font-size: 30px;
}

.img-bp {
  margin-top: 10px;
}

.hero-item {
  float: left;
}

.hero-name {
  font-size: 10px;
}
</style>

<script>
export default {
  name: "BpAdd",
  components: {
    VueMarkdown: resolve => require(["vue-markdown"], resolve),
    AppBottomTabbar: resolve => require(["@/components/AppBottomTabbar.vue"], resolve)
  },
  data () {
    return {
      activeHeroList: 0,
      pickShow: false,
      dialogShow: false,
      popupShow: false,
      statementShow: true,
      popupPosition: "top",
      statementBp: "",
      statementBpTips: "",
      modeType: 0,
      modeOptions: [
        { text: "BP模式", value: 0 },
        { text: "排位 (4禁)", value: 1 },
        { text: "巅峰赛 (6禁)", value: 2 },
        { text: "开房间 (8禁)", value: 3 },
        { text: "全局BP (8禁)", value: 4 }
      ],
      boType: 0,
      boOptions: [
        { text: "Bo1", value: 0 },
        { text: "Bo2", value: 1 },
        { text: "Bo3", value: 2 },
        { text: "Bo4", value: 3 },
        { text: "Bo5", value: 4 },
        { text: "Bo6", value: 5 }
      ],
      banId: {
        blue: [
          {
            id: 1,
            color: "red"
          },
          {
            id: 3,
            color: "#fbe555"
          },
          {
            id: 12,
            color: "#f45905"
          },
          {
            id: 14,
            color: "#0c9463"
          }
        ],
        red: [
          {
            id: 13,
            color: "#fbe555"
          },
          {
            id: 11,
            color: "red"
          },
          {
            id: 4,
            color: "#0c9463"
          },
          {
            id: 2,
            color: "#f45905"
          }
        ]
      },
      pickId: {
        blue: [
          {
            id: 5,
            color: "#48d1cc"
          },
          {
            id: 8,
            color: "#8b2f97"
          },
          {
            id: 9,
            color: "#8b2f97"
          },
          {
            id: 16,
            color: "blue"
          },
          {
            id: 17,
            color: "blue"
          }
        ],
        red: [
          {
            id: 6,
            color: "blue"
          },
          {
            id: 7,
            color: "blue"
          },
          {
            id: 10,
            color: "black"
          },
          {
            id: 15,
            color: "#48d1cc"
          },
          {
            id: 18,
            color: "#8b2f97"
          }
        ]
      },
      banInit: [],
      tableData: {
        now: []
      },
      bpData: {
        blue: {
          title: "队伍-1",
          ban: [],
          pick: [],
          list: []
        },
        red: {
          title: "队伍-2",
          ban: [],
          pick: [],
          list: []
        }
      },
      bpType: 1,
      bpIndex: 1,
      bpChoose: "",
      old: {
        heroId: null,
        heroImg: "/img/app-icons/add.png",
        heroName: null
      },
      blueUsedHero: [],
      redUsedHero: [],
      camp: "",
      campColor: "",
      copyData: ""
    };
  },
  mounted () {
    setTimeout(() => {
      this.getBp();
    }, 100);

    //初始化:声明
    this.getStatementBp();

    //初始化:mode
    this.modeInitData();
  },
  methods: {
    getBp: function () {
      this.axios.get(this.appApi.list.getBp).then(ret => {
        //复制:两份英雄池
        this.bpData.blue.list = ret.data.data.list.blue;
        this.bpData.red.list = ret.data.data.list.red;
      });
    },
    getStatementBp: function () {
      this.axios.get("/md/statement_bp.md?ts=" + this.appTs).then(ret => {
        this.statementBp = ret.data;
      });

      this.axios.get("/md/statement_bp_tips.md?ts=" + this.appTs).then(ret => {
        this.statementBpTips = ret.data;
      });
    },
    exchangeData: function (strA, strB) {
      //交换数据
      let strC;
      strC = strB;
      strB = strA;
      strA = strC;

      this.bpData.blue = strA;
      this.bpData.red = strB;
    },
    modeInitData: function () {
      this.banInit = [
        {
          heroId: null,
          heroImg: "/img/app-icons/add.png",
          heroName: null
        },
        {
          heroId: null,
          heroImg: "/img/app-icons/add.png",
          heroName: null
        },
        {
          heroId: null,
          heroImg: "/img/app-icons/add.png",
          heroName: null
        },
        {
          heroId: null,
          heroImg: "/img/app-icons/add.png",
          heroName: null
        }
      ];

      this.bpData.blue.ban = [];
      this.bpData.blue.pick = [
        {
          heroId: null,
          heroImg: "/img/app-icons/add.png",
          heroName: null,
          heroBuff: 0,
          heroFeature: null
        },
        {
          heroId: null,
          heroImg: "/img/app-icons/add.png",
          heroName: null,
          heroBuff: 0,
          heroFeature: null
        },
        {
          heroId: null,
          heroImg: "/img/app-icons/add.png",
          heroName: null,
          heroBuff: 0,
          heroFeature: null
        },
        {
          heroId: null,
          heroImg: "/img/app-icons/add.png",
          heroName: null,
          heroBuff: 0,
          heroFeature: null
        },
        {
          heroId: null,
          heroImg: "/img/app-icons/add.png",
          heroName: null,
          heroBuff: 0,
          heroFeature: null
        }
      ];

      this.bpData.red.ban = [];
      this.bpData.red.pick = [
        {
          heroId: null,
          heroImg: "/img/app-icons/add.png",
          heroName: null,
          heroBuff: 0,
          heroFeature: null
        },
        {
          heroId: null,
          heroImg: "/img/app-icons/add.png",
          heroName: null,
          heroBuff: 0,
          heroFeature: null
        },
        {
          heroId: null,
          heroImg: "/img/app-icons/add.png",
          heroName: null,
          heroBuff: 0,
          heroFeature: null
        },
        {
          heroId: null,
          heroImg: "/img/app-icons/add.png",
          heroName: null,
          heroBuff: 0,
          heroFeature: null
        },
        {
          heroId: null,
          heroImg: "/img/app-icons/add.png",
          heroName: null,
          heroBuff: 0,
          heroFeature: null
        }
      ];
    },
    modeInitLattice: function (e) {
      if (e > 3) e = 3;
      this.bpData.blue.ban = this.banInit.slice(0, e + 1);
      this.bpData.red.ban = this.banInit.slice(0, e + 1).reverse();

      //刷新:当前使用英雄池(bo界面看到的)
      this.refreshCurrentUsed();
    },
    onChangeMode: function (e) {
      if (e == 0) {
        this.bpData.blue.ban = [];
        this.bpData.blue.pick = [];

        this.bpData.red.ban = [];
        this.bpData.red.pick = [];

        this.pickShow = false;
        this.statementShow = true;

        this.getBp();
        this.$message.success("初始化英雄池");
      } else {
        //mode:初始化:数据
        this.modeInitData();
        //mode:初始化:类型
        this.modeInitLattice(e);

        this.pickShow = true;
        this.statementShow = false;
      }

      if (e != 4) this.boType = 0;
    },
    onChangeBo: function () {
      this.exchangeData(this.bpData.blue, this.bpData.red);

      //bo:初始化:数据
      this.modeInitData();
      //bo:初始化:类型
      this.modeInitLattice(3);
    },
    clickBanPick: function (old, camp, bpType, bpIndex) {
      this.popupShow = true;

      this.old.heroId = old.heroId;
      this.old.heroImg = old.heroImg;
      this.old.heroName = old.heroName;
      this.bpIndex = bpIndex;
      this.bpType = bpType;

      //camp 1蓝 2红
      //bpType 12禁位 34选位

      if (bpType == 1 || bpType == 2) {
        this.bpChoose = "禁";

        //蓝方禁位 = 红方英雄池
        if (camp == 1) {
          this.tableData.now = this.bpData.red.list;
        } else {
          this.tableData.now = this.bpData.blue.list;
        }
      } else {
        this.bpChoose = "选";

        //蓝方选位 = 己方英雄池
        if (camp == 1) {
          this.tableData.now = this.bpData.blue.list;
        } else {
          this.tableData.now = this.bpData.red.list;
        }
      }

      //公共颜色
      if (camp == 1) {
        this.camp = "蓝方";
        this.campColor = "blue";
      } else {
        this.camp = "红方";
        this.campColor = "red";
      }

      //拉起侧边栏
      if (bpType == 1 || camp == 1) {
        this.popupPosition = "left";
      } else {
        this.popupPosition = "right";
      }
    },
    heroUse: function (now, bpType, bpIndex, heroIndex) {
      let newHeroId = Number(now.heroId);
      let newHero = {
        heroId: newHeroId,
        heroImg:
          "https://game.gtimg.cn/images/yxzj/img201606/heroimg/" +
          newHeroId +
          "/" +
          newHeroId +
          ".jpg",
        heroName: now.heroName,
        heroBuff: now.heroBuff,
        heroFeature: now.heroFeature
      };

      let blueIsUsd = false, redIsUsd = false;
      //蓝方:已使用
      this.blueUsedHero.forEach(function (v) {
        if (v.heroId == newHeroId) {
          blueIsUsd = true;
        }
      });

      //红方:已使用
      this.redUsedHero.forEach(function (v) {
        if (v.heroId == newHeroId) {
          redIsUsd = true;
        }
      });

      this.popupShow = false;
      if (blueIsUsd || redIsUsd) {
        this.$message.error(newHero.heroName + " 已被禁选");
        return;
      }

      if (bpType == 1) this.bpData.blue.ban.splice(bpIndex, 1, newHero);
      if (bpType == 3) {
        //替换选用英雄
        this.bpData.blue.pick.splice(bpIndex, 1, newHero);

        //删除已使用的
        this.bpData.blue.list.splice(heroIndex, 1);
      }

      if (bpType == 2) this.bpData.red.ban.splice(bpIndex, 1, newHero);
      if (bpType == 4) {
        //替换选用英雄
        this.bpData.red.pick.splice(bpIndex, 1, newHero);

        //删除已使用的
        this.bpData.red.list.splice(heroIndex, 1);
      }

      this.refreshCurrentUsed();
    },
    refreshCurrentUsed: function () {
      let blueUsedHero = [], redUsedHero = [];

      //蓝方:禁用
      this.bpData.blue.ban.forEach(function (v) {
        blueUsedHero.push(v);
      });

      //蓝方:选用
      this.bpData.blue.pick.forEach(function (v) {
        blueUsedHero.push(v);
      });

      //红方:禁用
      this.bpData.red.ban.forEach(function (v) {
        redUsedHero.push(v);
      });

      //红方:选用
      this.bpData.red.pick.forEach(function (v) {
        redUsedHero.push(v);
      });

      this.blueUsedHero = blueUsedHero;
      this.redUsedHero = redUsedHero;
    },
    getTips: function () {
      this.dialogShow = true;
    },
    onCopy: function () {
      this.$message.success("复制成功");
    },
    onError: function () {
      this.$message.error("复制失败");
    }
  }
};
</script>