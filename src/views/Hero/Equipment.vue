<template>
  <div class="hero-equipment">
    <div class="hero-equipment-46682fd67ae12a15c6433c2dbe69effd">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        @click-left="$appPushBack()"
        :left-text="$t('nav-bar.left-text')"
        z-index="99999999"
        title="未命名的方案"
      >
        <template #title>
          <span class="hero-d5d3db1765287eef77d7927cc956f50a">
            未命名的方案
          </span>
        </template>
        <template #right>
          <a-popover
            :style="{ marginRight: '-10px', marginTop: '10px' }"
            placement="bottomRight"
            trigger="click"
          >
            <van-icon v-show="false" name="ellipsis" size="18" />

            <template slot="content">
              <div class="hero-equipment-7d5a4bb93ee168ac07930ac48716e41f">
                <van-cell-group :border="false" title="技能、分路">
                  <van-grid :border="false" :column-num="2">
                    <van-grid-item>
                      <template #icon>
                        <img
                          width="28"
                          height="28"
                          v-lazy="
                            '//game.gtimg.cn/images/yxzj/img201606/summoner/' +
                            (chooseInfo.skillId || 80104) +
                            '.jpg'
                          "
                          class="
                            hero-equipment-78bb2ecaecea15a67ff2ca0fa9ef3f7a
                          "
                        />
                      </template>
                    </van-grid-item>
                    <van-grid-item
                      :text="positionInfo[chooseInfo.positionId - 1].name"
                    />
                  </van-grid>
                </van-cell-group>
                <van-cell-group :border="false">
                  <template #title>
                    <span
                      @click="
                        showInfo.isBig
                          ? (showInfo.isBig = false)
                          : (showInfo.isBig = true)
                      "
                      class="hero-equipment-22822552a6f5c0cf14c945f4f6fea081"
                    >
                      <img
                        width="15"
                        height="15"
                        v-lazy="
                          showInfo.isBig
                            ? '//pic.rmb.bdstatic.com/bjh/e7f2225412920b26a606ea4422b716b8.jpeg'
                            : '//pic.rmb.bdstatic.com/bjh/1eda7acbe1911284b79f2720b55c6ea9.jpeg'
                        "
                        class="hero-equipment-046bda3addab352133049c67c32859c2"
                      />
                      &nbsp;-&nbsp;
                    </span>
                    <img
                      width="15"
                      height="15"
                      v-lazy="
                        '//pic.rmb.bdstatic.com/bjh/9e9d94db9e19f60f9eff310ded227d65.png'
                      "
                      class="hero-equipment-046bda3addab352133049c67c32859c2"
                    />
                    <span
                      class="hero-equipment-22822552a6f5c0cf14c945f4f6fea081"
                    >
                      {{ chooseInfo.price || 0 }}
                    </span>
                    &nbsp;-&nbsp;
                    <img
                      width="15"
                      height="15"
                      v-lazy="
                        '//pic.rmb.bdstatic.com/bjh/d110862ec23fb8ba4ec5ac9d393f1e12.png'
                      "
                      class="hero-equipment-046bda3addab352133049c67c32859c2"
                    />
                    <span
                      class="hero-equipment-22822552a6f5c0cf14c945f4f6fea081"
                    >
                      {{ chooseInfo.time || "00:00" }}
                    </span>
                  </template>
                  <div class="hero-equipment-a7bd1412fc3d4fb5968cbe78aa51e41a">
                    <draggable
                      :list="chooseList"
                      class="hero-equipment-9d68288c30614ee39e8260cdb81dc630"
                    >
                      <div
                        v-for="(data, index) in chooseList"
                        :key="
                          'hero-equipment-b1c2779b9bc8205364266507480d4ee9-' +
                          index
                        "
                        v-show="onItemShow(data)"
                        @click="onItemDelete(data, index)"
                        class="hero-equipment-2b17aa16463c3aeca8da93a07962df5a"
                      >
                        <img
                          width="28"
                          height="28"
                          v-lazy="
                            '//image.ttwz.qq.com/h5/images/bangbang/mobile/wzry/equip/' +
                            data.item_id +
                            '.png'
                          "
                        />
                      </div>
                    </draggable>
                  </div>
                </van-cell-group>
              </div>
            </template>
          </a-popover>
        </template>
      </van-nav-bar>
    </div>

    <div
      :style="
        $appIsApple && $appConfigInfo.appInfo.pwa == 1
          ? { marginTop: '-50px' }
          : {}
      "
      class="hero-equipment-84422605a132f74a6c772d788a76e968"
    >
      <van-row>
        <van-col :span="$appIsMobile ? 6 : 2">
          <van-sidebar v-model="sidebarInfo.model">
            <van-sidebar-item v-show="false" title="技能" />
            <van-sidebar-item v-show="false" title="分路" />
            <van-sidebar-item v-show="false" title="出装" />
            <van-sidebar-item v-show="false" title="铭文" />
            <van-sidebar-item title="发布" />
            <van-divider
              :style="{
                color: 'orange !important',
                borderColor: 'orange !important',
                padding: '0 16px',
              }"
            />
            <van-sidebar-item title="推荐" />
            <van-sidebar-item>
              <template #title>
                <div class="hero-equipment-39ac5a75c3d64a3b45733fbc8ad4275b">
                  <ChooseHero @select="getHeroId">
                    <img
                      width="50"
                      height="50"
                      v-lazy="
                        chooseInfo.heroId && chooseInfo.heroId < 900
                          ? '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                            chooseInfo.heroId +
                            '/' +
                            chooseInfo.heroId +
                            '.jpg'
                          : '/img/app-icons/hero_white.png'
                      "
                    />
                    <img
                      width="17"
                      height="17"
                      v-lazy="
                        '//pic.rmb.bdstatic.com/bjh/ca9f38c9f423fc9b63998761bc77080f.png'
                      "
                      class="hero-equipment-464e0def3c0912855013b4af9a3c312e"
                    />
                  </ChooseHero>
                </div>
              </template>
            </van-sidebar-item>
          </van-sidebar>
        </van-col>
        <van-col :span="$appIsMobile ? 18 : 22">
          <div class="hero-equipment-9305946983d796f54630b29f8241fdf9">
            <div v-show="sidebarInfo.model == 0">
              <van-cell-group :border="false">
                <template #title>
                  <a-popover
                    placement="bottomLeft"
                    trigger="click"
                    content="不同的召唤师技能有不同的打法"
                  >
                    技能选择 <van-icon name="question-o" />
                  </a-popover>
                </template>
                <van-grid :border="false" :column-num="2">
                  <van-grid-item
                    v-for="(data, index) in skillInfo"
                    :key="
                      'hero-equipment-bbc65924097b4aa22d23bd88f6d1e107-' + index
                    "
                    :icon="data.icon"
                    :text="data.name"
                    @click="onSkillClick(data)"
                    icon-prefix="hero-equipment-8b812bcd24d7f0b29c950eebfa4876f6"
                  />
                </van-grid>
              </van-cell-group>
            </div>
            <div v-show="sidebarInfo.model == 1">
              <van-cell-group :border="false">
                <template #title>
                  <a-popover
                    placement="bottomLeft"
                    trigger="click"
                    content="不同的分路有不同的打法"
                  >
                    分路选择 <van-icon name="question-o" />
                  </a-popover>
                </template>
                <van-grid :border="false" :column-num="2">
                  <van-grid-item
                    v-for="(data, index) in positionInfo"
                    :key="
                      'hero-equipment-b1c2779b9bc8205364266507480d4ee9-' + index
                    "
                    :icon="data.icon"
                    :text="data.name"
                    @click="onPositionClick(data)"
                  />
                </van-grid>
              </van-cell-group>
            </div>
            <div v-show="sidebarInfo.model == 2">
              <van-cell-group :border="false">
                <template #title>
                  <a-popover placement="top" trigger="click">
                    出装选择 <van-icon name="question-o" />

                    <template slot="content">
                      <div
                        class="hero-equipment-d86e26348c6bcf5542c3a8fae2e2d1b0"
                      >
                        不同的出装有不同的打法
                      </div>
                      <van-divider
                        :style="{
                          color: 'orange !important',
                          borderColor: 'orange !important',
                          padding: '0 8px',
                        }"
                      />
                      <div
                        class="hero-equipment-e9326e4d97ca90bdc8f972e25e6967ff"
                      >
                        <a-checkbox
                          :indeterminate="indeterminate"
                          :checked="checkAll"
                          @change="onCheckAllChange"
                        >
                          全选 （{{ plainOptions.length }})
                        </a-checkbox>
                      </div>
                      <a-checkbox-group
                        v-model="checkedList"
                        :options="plainOptions"
                        @change="onCheckChange"
                      />
                    </template>
                  </a-popover>
                </template>
                <van-tabs v-model="tabsInfo.model" sticky>
                  <van-tab
                    v-for="(data, index) in tabsInfo.tabs"
                    :key="
                      'hero-equipment-70c44009157f4d55186513004ddd9926-' + index
                    "
                    :title="data"
                  ></van-tab>
                </van-tabs>
                <van-grid :border="false" :column-num="3">
                  <van-grid-item
                    v-for="(data, index) in listInfo.equipment"
                    :key="
                      'hero-equipment-b22320a558966d2b8acc4d2ba5c16f34-' + index
                    "
                    v-show="onTabsShow(data)"
                    icon-prefix="hero-equipment-8b812bcd24d7f0b29c950eebfa4876f6"
                  >
                    <template #icon>
                      <img
                        width="28"
                        height="28"
                        v-lazy="
                          '//image.ttwz.qq.com/h5/images/bangbang/mobile/wzry/equip/' +
                          data.item_id +
                          '.png'
                        "
                        @click="onItemChoose(data)"
                        class="hero-equipment-78bb2ecaecea15a67ff2ca0fa9ef3f7a"
                      />
                    </template>
                    <template #text>
                      <div
                        :style="{ position: 'relative' }"
                        @click="onItemClick"
                      >
                        <span
                          class="
                            hero-equipment-bfdb7aa2ebfcd02113b228f44f73d2a7
                          "
                        >
                          {{ data.item_name }}
                        </span>
                        <a-popover :placement="placement" trigger="click">
                          <img
                            width="12"
                            height="12"
                            v-lazy="
                              '//pic.rmb.bdstatic.com/bjh/c4ac3ff83221540a2244d920bf475f5f.png'
                            "
                          />
                          <template slot="title">
                            <div
                              class="
                                hero-equipment-3b09ddd4e6e3d406a35c2319e712aff7
                              "
                            >
                              <span
                                class="
                                  hero-equipment-853bf9d3be5a89003b5f5b481a7f1a56
                                "
                              >
                                {{ data.item_name }}
                              </span>
                              <span
                                class="
                                  hero-equipment-8723cf2d0377e86f7f75c09ae7a76a55
                                "
                              >
                                <span
                                  class="
                                    hero-equipment-261370eb2630e93715dfb2d0845949fb
                                  "
                                >
                                  损失
                                </span>
                                <img
                                  width="15"
                                  height="15"
                                  v-lazy="
                                    '//pic.rmb.bdstatic.com/bjh/9e9d94db9e19f60f9eff310ded227d65.png'
                                  "
                                  class="
                                    hero-equipment-99cb324cd7e789db254f951a8babc0a8
                                  "
                                />
                                <del>{{ data.loss_price }}</del>
                              </span>
                            </div>
                          </template>
                          <template slot="content">
                            <div
                              class="
                                hero-equipment-f5f7f495ed00512c9ee88c432bd988e8
                              "
                            >
                              <div
                                class="
                                  hero-equipment-0e65087ef714d330232ef74987513fbb
                                "
                              >
                                <van-tag
                                  v-for="(item, index) in data.tags"
                                  :key="
                                    'hero-equipment-ccea3902e0a790c97b64aae26de79e9c-' +
                                    index
                                  "
                                  v-show="item.hidden == false"
                                  :color="item.color"
                                  plain
                                  class="
                                    hero-equipment-8a0ef47dc7fb94fd86ca714928f64401
                                  "
                                >
                                  {{ item.name }}
                                </van-tag>
                              </div>
                              <div v-html="data.des1"></div>
                              <br v-if="data.des2" />
                              <div v-html="data.des2"></div>
                            </div>
                          </template>
                        </a-popover>
                      </div>

                      <div
                        class="hero-equipment-c97389bccf8dd107758c9be4f12a6ab8"
                      >
                        <img
                          width="12"
                          height="12"
                          v-lazy="
                            '//pic.rmb.bdstatic.com/bjh/9e9d94db9e19f60f9eff310ded227d65.png'
                          "
                        />
                        <span
                          class="
                            hero-equipment-a6fd35511053bd90735e98ca6f02a4c9
                          "
                        >
                          {{ data.total_price }}
                        </span>
                        <span
                          class="
                            hero-equipment-32e99218b3e9a25c3ca08b8ff83c7620
                          "
                        >
                          <del>{{ data.price }}</del>
                        </span>
                      </div>
                    </template>
                  </van-grid-item>
                </van-grid>
              </van-cell-group>
            </div>
            <div v-show="sidebarInfo.model == 3">
              <van-cell-group :border="false">
                <template #title>
                  <a-popover
                    placement="bottomLeft"
                    trigger="click"
                    content="对线不同的人可能需要不同的铭文"
                  >
                    铭文选择 <van-icon name="question-o" />
                  </a-popover>
                </template>
              </van-cell-group>
            </div>
            <div v-show="sidebarInfo.model == 4">
              <van-cell-group :border="false">
                <template #title>
                  <a-popover
                    placement="bottomLeft"
                    trigger="click"
                    content="备战 - 分享 直接复制即可"
                  >
                    口令 <van-icon name="question-o" />
                  </a-popover>
                </template>
                <van-field
                  v-model="chooseInfo.originalUrl"
                  rows="3"
                  autosize
                  type="textarea"
                  maxlength="255"
                  placeholder="请复制口令"
                  show-word-limit
                />
              </van-cell-group>

              <van-cell-group :border="false">
                <template #title>
                  <a-popover
                    placement="bottomLeft"
                    trigger="click"
                    content="如果是别人的，请填写下原文地址哦~"
                  >
                    出处 <van-icon name="question-o" />
                  </a-popover>
                </template>
                <van-field
                  v-model="chooseInfo.originalUrl"
                  rows="1"
                  autosize
                  type="textarea"
                  maxlength="255"
                  placeholder="请输入出处，如果没有可不写"
                  show-word-limit
                />
              </van-cell-group>

              <van-cell-group :border="false">
                <template #title>
                  <a-popover
                    placement="bottomLeft"
                    trigger="click"
                    content="每个标签按英文逗号【,】分割"
                  >
                    标签 <van-icon name="question-o" />
                  </a-popover>
                </template>
                <van-field
                  v-model="chooseInfo.tags"
                  rows="2"
                  autosize
                  type="textarea"
                  maxlength="255"
                  placeholder="建议打标签，每个标签按英文逗号【,】分割"
                  show-word-limit
                />
              </van-cell-group>

              <van-cell-group :border="false">
                <template #title>
                  <a-popover
                    placement="bottomLeft"
                    trigger="click"
                    content="介绍一下这个打法"
                  >
                    描述
                    <span
                      class="hero-equipment-d1ce62e9288a1640df00006f274c0910"
                    >
                      (发布需登录)
                    </span>
                    <van-icon name="question-o" />
                  </a-popover>
                </template>
                <van-field
                  v-model="chooseInfo.description"
                  rows="5"
                  autosize
                  type="textarea"
                  maxlength="255"
                  placeholder="请输入思路"
                  show-word-limit
                />
              </van-cell-group>
            </div>
            <div v-show="sidebarInfo.model == 5">
              <van-cell-group :border="false">
                <template #title>
                  <a-popover
                    placement="bottomLeft"
                    trigger="click"
                    content="其他人的备战分享"
                  >
                    备战推荐 <van-icon name="question-o" />
                  </a-popover>
                </template>
              </van-cell-group>
            </div>
          </div>

          <AppHello height="100px" />
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { allTag, equipment } from "../../assets/js/list.config";
const plainOptions = allTag;
const defaultCheckedList = allTag;

export default {
  name: "HeroEquipment",
  components: {
    draggable,
    AppHello: () => import("@/components/App/Hello.vue"),
    ChooseHero: () => import("@/components/Choose/Hero.vue"),
  },
  watch: {
    $route: function (to) {
      let id = to.params.id;

      if (id) {
        this.initPage();
      }
    },
  },
  data() {
    return {
      placement: "top",
      checkedList: defaultCheckedList,
      indeterminate: false,
      checkAll: true,
      plainOptions,
      chooseList: [],
      chooseInfo: {
        heroId: null,
        skillId: null,
        positionId: 1,
        avg: 750,
        price: 0,
        time: "00:00",
        originalUrl: "",
        tags: "",
        description: "",
      },
      sidebarInfo: {
        model: 6,
      },
      showInfo: {
        isBig: false,
      },
      tabsInfo: {
        model: 0,
        tabs: [
          "全部",
          "攻击",
          "法术",
          "防御",
          "移动",
          "打野",
          "游走", //不知道为什么跳了
          "专精",
        ],
      },
      listInfo: {
        equipment: [],
      },
      skillInfo: [
        {
          id: 80104,
          icon: "//game.gtimg.cn/images/yxzj/img201606/summoner/80104.jpg",
          name: "惩击",
        },
        {
          id: 80108,
          icon: "//game.gtimg.cn/images/yxzj/img201606/summoner/80108.jpg",
          name: "终结",
        },
        {
          id: 80110,
          icon: "//game.gtimg.cn/images/yxzj/img201606/summoner/80110.jpg",
          name: "狂暴",
        },
        {
          id: 80109,
          icon: "//game.gtimg.cn/images/yxzj/img201606/summoner/80109.jpg",
          name: "疾跑",
        },
        {
          id: 80102,
          icon: "//game.gtimg.cn/images/yxzj/img201606/summoner/80102.jpg",
          name: "治疗",
        },
        {
          id: 80105,
          icon: "//game.gtimg.cn/images/yxzj/img201606/summoner/80105.jpg",
          name: "干扰",
        },
        {
          id: 80103,
          icon: "//game.gtimg.cn/images/yxzj/img201606/summoner/80103.jpg",
          name: "眩晕",
        },
        {
          id: 80107,
          icon: "//game.gtimg.cn/images/yxzj/img201606/summoner/80107.jpg",
          name: "净化",
        },
        {
          id: 80121,
          icon: "//game.gtimg.cn/images/yxzj/img201606/summoner/80121.jpg",
          name: "弱化",
        },
        {
          id: 80115,
          icon: "//game.gtimg.cn/images/yxzj/img201606/summoner/80115.jpg",
          name: "闪现",
        },
      ],
      positionInfo: [
        {
          id: 1,
          icon: "photo-o",
          name: "对抗路 (战)",
        },
        {
          id: 2,
          icon: "photo-o",
          name: "中路",
        },
        {
          id: 3,
          icon: "photo-o",
          name: "对抗路 (坦)",
        },
        {
          id: 4,
          icon: "photo-o",
          name: "打野",
        },
        {
          id: 5,
          icon: "photo-o",
          name: "发育路",
        },
        {
          id: 6,
          icon: "photo-o",
          name: "游走",
        },
      ],
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    initPage: function () {
      let q = this.$route.query;

      this.chooseInfo.heroId = this.$route.params.id;
      this.sidebarInfo.model = 6;
      this.listInfo.equipment = equipment;
      this.chooseInfo.avg = q.avg || 750;
    },
    subSet: function (a, b) {
      let ret = false;

      for (let i = 0; i < b.length; i++) {
        if (a.indexOf(b[i]) > -1) {
          ret = true;

          break;
        } else {
          ret = false;
        }
      }

      return ret;
    },
    onCheckChange(e) {
      this.indeterminate = !!e.length && e.length < plainOptions.length;
      this.checkAll = e.length === plainOptions.length;
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
    },
    onTabsShow: function (e) {
      let tabsModel = this.tabsInfo.model,
        nowType = 0,
        nowArr = new Array();

      if (tabsModel == 6) {
        nowType = e.item_type - 1;
      } else if (tabsModel == 7) {
        nowType = -1;
      } else {
        nowType = e.item_type;
      }

      e.tags.map((x) => {
        nowArr.push(x.name);
      });

      let subSet = this.subSet(this.checkedList, nowArr);

      return (tabsModel == 0 ? true : tabsModel == nowType) && subSet;
    },
    onItemShow: function (e) {
      let isBig = this.showInfo.isBig,
        nowBig = false;

      if (isBig) {
        e.isBig ? (nowBig = true) : (nowBig = false);
      } else {
        nowBig = true;
      }

      return nowBig;
    },
    onSkillClick: function (e) {
      this.sidebarInfo.model = 1;
      this.chooseInfo.skillId = e.id;

      this.$message.success("已选择 " + e.name);
    },
    onPositionClick: function (e) {
      this.sidebarInfo.model = 2;
      this.chooseInfo.positionId = e.id;

      this.$message.success("已选择 " + e.name);
    },
    onItemChoose: function (e) {
      let avg = this.chooseInfo.avg,
        chooseLen = this.chooseList.length;

      if (chooseLen >= 12) {
        this.$message.error("最多 12 件装备，拖拽可排序，点击可删除~");
      } else {
        this.chooseList.push(e);

        let nowPrice = this.chooseInfo.price + e.total_price;

        if (e.isBig) {
          this.chooseInfo.price = nowPrice;
          this.chooseInfo.time = this.$appFloatToTime(nowPrice / avg);
        }

        this.$message.success("已添加 " + e.item_name);
      }
    },
    onItemDelete: function (e, i) {
      let avg = this.chooseInfo.avg;

      this.chooseList.splice(i, 1);

      if (e.isBig) {
        this.chooseInfo.price = this.chooseInfo.price - e.total_price;
        this.chooseInfo.time = this.$appFloatToTime(
          this.chooseInfo.price / avg
        );
      }

      this.$message.warning("已删除 " + e.item_name);
    },
    onItemClick: function (e) {
      let nowPlacement = "top";

      if (e.screenY <= 400) {
        nowPlacement = "bottomRight";
      } else if (e.screenX >= 500) {
        nowPlacement = "topRight";
      } else {
        nowPlacement = "top";
      }

      this.placement = nowPlacement;
    },
    getHeroId: function (e) {
      this.chooseInfo.heroId = e;

      this.$appPush({ path: "/hero/" + e + "/equipment" });
    },
  },
};
</script>

<style scoped lang="less">
a.hero-equipment-61b5514f16614481c1eb3b3219cfd112 {
  margin-top: 25px;
}

img.hero-equipment-464e0def3c0912855013b4af9a3c312e {
  background-color: white !important;
  bottom: -3px;
  margin-left: -13px;
  position: absolute;
}

img.hero-equipment-78bb2ecaecea15a67ff2ca0fa9ef3f7a {
  border-radius: @app-border-radius;
}

img.hero-equipment-99cb324cd7e789db254f951a8babc0a8 {
  margin-right: 4px;
  margin-top: -3px;
}

img.hero-equipment-046bda3addab352133049c67c32859c2 {
  margin-top: -3px;
}

span.hero-equipment-d1ce62e9288a1640df00006f274c0910 {
  color: red !important;
}

span.hero-equipment-32e99218b3e9a25c3ca08b8ff83c7620 {
  color: gray !important;
  font-size: @app-font-size;
}

span.hero-equipment-8a0ef47dc7fb94fd86ca714928f64401 {
  margin-right: 5px;
}

span.hero-equipment-8723cf2d0377e86f7f75c09ae7a76a55 {
  color: gray !important;
  position: absolute;
  right: 10px;
}

div.hero-equipment-84422605a132f74a6c772d788a76e968,
div.hero-equipment,
div.van-row,
div.van-col,
div.van-sidebar {
  height: 100%;
}

div.van-sidebar {
  background-color: #f7f8fa !important;
  position: fixed;
}

div.hero-equipment-a7bd1412fc3d4fb5968cbe78aa51e41a {
  margin-top: 10px;
}

div.hero-equipment-9d68288c30614ee39e8260cdb81dc630 {
  display: contents;
}

div.hero-equipment-7d5a4bb93ee168ac07930ac48716e41f {
  height: 400px;
  width: 237px;
}

div.hero-equipment-7d5a4bb93ee168ac07930ac48716e41f {
  div.van-cell-group__title {
    margin-top: -13px;
  }
}

div.hero-equipment-96870cdb3f6b9ce1bb1de37cc7caf04d {
  font-size: @app-font-size;
}

div.hero-equipment-2b17aa16463c3aeca8da93a07962df5a {
  float: left;
  margin: 3px 5px;
}

div.hero-equipment-9305946983d796f54630b29f8241fdf9 {
  font-size: 12px;
  text-align: @app-text-align;
}

div.hero-equipment-e9326e4d97ca90bdc8f972e25e6967ff {
  margin-bottom: 15px;
}

div.hero-equipment-3b09ddd4e6e3d406a35c2319e712aff7 {
  text-align: @app-text-align;
}

div.hero-equipment-0e65087ef714d330232ef74987513fbb {
  margin-bottom: 8px;
}

div.hero-equipment-f5f7f495ed00512c9ee88c432bd988e8 {
  max-height: 285px;
  overflow: auto;
  width: 200px;
}
</style>