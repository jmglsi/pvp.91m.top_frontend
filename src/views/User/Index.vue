<template>
  <div class="login-index">
    <div class="login-8e35828097179076a177cfd25e3713db">
      <van-nav-bar
        :border="false"
        :fixed="true"
        :placeholder="true"
        :safe-area-inset-top="true"
        z-index="99999999"
      >
        <template #left>
          <div
            v-if="isLogin"
            @click="onUpdateInfoClick"
            class="login-112e74e8fe4754534fce3393d07ddbdc"
          >
            <van-icon name="edit" size="18" />
          </div>
        </template>
        <template #title>
          <div v-if="isLogin" class="login-f9c7cabc13f359223ebc3ccf9cc104b8">
            <span
              class="login-25930e3036f13852cb0b29694bbab611 login-b068931cc450442b63f5b3d276ea4297"
            >
              {{ loginInfo.name }}
            </span>
            <span
              class="login-25930e3036f13852cb0b29694bbab611 login-293a35164a20c927b0fd61942fbc1cf2"
            >
              <van-tag
                round
                :color="loginInfo.certification.color"
                class="login-7eaa86d23ffacfb49464ee78252aa43a"
                @click="$message.info($appMsg.info[1003])"
              >
                {{ loginInfo.certification.text }}
              </van-tag>
            </span>
          </div>
        </template>
        <template #right>
          <div
            @click="showInfo.languageMenu = true"
            class="login-35b118640aa1bb334cacc58d3215f130"
          >
            <van-icon name="/img/icons-app/translate.png" size="18" />
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div
            @click="
              $appPush({
                path: '/setting',
              })
            "
            class="login-4e83469ea7b60361bbce2572e5c0bf66"
          >
            <van-icon name="setting-o" size="18" />
          </div>
        </template>
      </van-nav-bar>
    </div>

    <div v-if="!isLogin" class="login-3d1d6b29e66d9b4f061e24a2551e2b67">
      <van-cell-group
        :border="false"
        class="login-058928a73f2a944d621b028eb9addd36"
      >
        <van-cell>
          <template #title>
            <div
              :style="
                $appIsApple && $appConfigInfo.appInfo.pwa == 1
                  ? { marginBottom: '25px' }
                  : {}
              "
              class="login-b687f354f3b497e3ba1db4b7c3938b77"
            >
              <van-button
                round
                :disabled="login.status"
                size="small"
                color="linear-gradient(to right, #4bb0ff, #6149f6)"
                @click="$appPush({ path: '/login' })"
                class="app-0162f4b7b2dbdf6aff3a25de02e49a8b"
              >
                {{ login.text }}
              </van-button>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <div
      v-if="isLogin"
      :style="
        $appIsApple && $appConfigInfo.appInfo.pwa == 1
          ? { marginTop: '-10px' }
          : { marginTop: '40px' }
      "
    >
      <img
        v-lazy="loginInfo.img"
        @click="
          $appPush({
            path: '/friends',
            query: {
              openId: loginInfo.openId,
            },
          })
        "
        width="100"
        height="100"
        class="app-border-radius"
      />
      <img
        v-lazy="'/img/icons-app/my_home_page.png'"
        width="25"
        height="25"
        class="app-border-radius login-ef65f15f01e7d076cc4ef40d753e4d65"
      />
      <div class="app-88bf7a95736562190270d51dc2cb3f42">
        {{ loginInfo.description || "这个人很懒，什么都没有留下" }}
      </div>
    </div>

    <div v-if="isLogin" class="login-7dc22b2c6a992f0232345df41303f5ea">
      <van-cell-group
        :border="false"
        class="login-71c2fb64c38e4ee108607ca840607e48"
      >
        <van-cell
          icon="/img/icons-app/game.png"
          title="全局BP模拟器"
          label="第一次使用务必看一下"
          value="视频教程"
          is-link
          @click="
            $appOpenUrl($t('open-url.title'), null, { path: url.question }, 0)
          "
          icon-prefix="app-6de102c0bc4dc7f72ce287d6b0828052"
        />
        <van-grid
          :border="false"
          :column-num="2"
          class="login-c3d90961c9bf155d11cbef9c57725aea"
        >
          <van-grid-item
            icon="/img/icons-game/team.png"
            to="/game/team"
            icon-prefix="login-c1d8fd0f00bccc16b2cf5d07bfc3c96f"
            class="login-7409cbd9b549064c9b5ea3ab21ee3ac6"
          >
            <template #text>
              <div class="login-6e8737d4ac83f11c858de8bde0a6c52a">
                <span class="login-4646fa4296a7f5dea261e60e00ecd24b">
                  {{ loginInfo.statistics.team }}
                </span>
                <span class="login-7a33dbf09bb2e3ed21ecb1adf0cb37b4">支</span>
              </div>
            </template>
          </van-grid-item>
          <van-grid-item
            icon="/img/icons-game/engage.png"
            to="/game/engage"
            icon-prefix="login-c1d8fd0f00bccc16b2cf5d07bfc3c96f"
            class="login-308ffde0dc5bd5718dcf0396fcc2a596"
          >
            <template #text>
              <div class="login-6e8737d4ac83f11c858de8bde0a6c52a">
                <span class="login-4646fa4296a7f5dea261e60e00ecd24b">
                  {{ loginInfo.statistics.label }}
                </span>
                <span class="login-7a33dbf09bb2e3ed21ecb1adf0cb37b4">场</span>
              </div>
            </template>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
    </div>

    <div v-if="isLogin" class="login-7dc22b2c6a992f0232345df41303f5ea">
      <van-cell-group
        :border="false"
        title=" "
        class="login-abf7b3191e2a24c6fc3c008124bcf0d4"
      >
        <van-cell
          title="王者荣耀"
          icon="/img/icons-game/king.png"
          icon-prefix="app-6de102c0bc4dc7f72ce287d6b0828052"
        >
          <template #right-icon>
            <span class="login-af99c9298d1eb69981a035d0a15afa20">
              <img v-lazy="loginInfo.rank.starIcon" width="50" height="50" />
              <span class="app-dac41b9450b77c3eb0ab7d8428d004f5">|</span>
              <span class="login-7121ba1bc1276c3bb6df96b333a16760">
                {{ loginInfo.rank.score }}
              </span>
            </span>
          </template>
        </van-cell>
        <van-collapse v-model="collapseInfo.model" :border="false">
          <van-collapse-item
            icon="/img/icons-app/hero_black.png"
            title="关注列表"
            value="快速访问"
            icon-prefix="app-6de102c0bc4dc7f72ce287d6b0828052"
            name="1"
          >
            <div
              v-if="loginInfo.heroList.length > 0"
              class="app-c1351782c9c93025d72864180d0cf28c"
            >
              <ul
                class="app-d865b50ce307751bdeb9a6ab16e7baf9 app-9e60d3ee1e1574cae90960f940c0a821"
              >
                <li
                  v-for="(data, index) in loginInfo.heroList"
                  :key="'app-56bc526c61d7296b48276b2203da4c49-' + index"
                  class="app-1951b6e7c82938dd7446a41e829b247b"
                  @click="$appPush({ path: '/hero/' + data.id + '/info' })"
                >
                  <div :style="{ position: 'relative' }">
                    <img
                      v-lazy="{
                        src: '/img/icons-hero/' + data.id + '.jpg',
                        error:
                          '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                          data.id +
                          '/' +
                          data.id +
                          '.jpg',
                      }"
                      width="35"
                      height="35"
                      class="app-border-radius app-4ab161130e76571ab0c31aa23a6238c7"
                    />
                    <img
                      v-lazy="data.fightPowerIcon"
                      width="50"
                      height="40"
                      class="app-d31cb1c15b091f41248935d88a8d0a45"
                    />
                  </div>
                </li>
              </ul>
            </div>
            <div
              v-else
              @click="$message.info($appMsg.info[1015])"
              class="app-5ddd8715c99cbf00677a622145b3c163"
            >
              <van-button
                round
                icon="question-o"
                color="red"
                size="mini"
                class="hero-same-hobby-14c32e76fd7b6f33de94027b74bbc3fb"
                @click="
                  $appPush({
                    path: '/search',
                    query: {
                      q: '国服认证',
                      refresh: 1,
                    },
                  })
                "
              >
                {{ $t("authenticate") }}
              </van-button>
            </div>
          </van-collapse-item>
        </van-collapse>
        <van-cell
          icon="manager"
          title="扩列链接"
          value="复制"
          is-link
          @click="onCopy"
        >
          <template #label>
            <span style="color: red">复制到公众号可以续时</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <div class="login-7dc22b2c6a992f0232345df41303f5ea">
      <van-cell-group
        :border="false"
        title=" "
        class="login-35382d1952f0fb4d86744b11faf01d07"
      >
        <van-cell
          v-if="isLogin"
          icon="exchange"
          :title="$t('oauth.third-party-authorization')"
          :label="$t('oauth.label')"
          :value="$t('oauth.value')"
          is-link
          @click="$appPush({ path: '/login' })"
        />
      </van-cell-group>
    </div>

    <div class="login-7dc22b2c6a992f0232345df41303f5ea">
      <van-cell-group
        :border="false"
        title=" "
        class="login-058928a73f2a944d621b028eb9addd36"
      >
        <van-cell
          icon="good-job-o"
          :title="$t('open-source.title')"
          :label="$t('open-source.label')"
          :value="$t('open-source.value')"
          is-link
          @click="
            $appOpenUrl(
              $t('open-url.title'),
              null,
              { path: url.openSource[0] },
              0
            )
          "
        />
        <!--
          <van-cell
            icon="description"
            title="项目开放接口"
            value="Coding"
            is-link
            @click="
              $appOpenUrl(
                $t('open-url.title'),
                null,
                { path: url.openSource[1] },
                0
              )
            "
          />
          <van-cell
            icon="/img/icons-app/coffee.png"
            title="请我喝杯咖啡"
            label="制作不易，支持一下"
            value="爱发电"
            icon-prefix="app-6de102c0bc4dc7f72ce287d6b0828052"
            is-link
            @click="
              $appOpenUrl($t('open-url.title'), null, { path: url.afdian }, 0)
            "
          />
        -->
        <van-cell
          icon="comment-o"
          :title="$t('feedback.title')"
          :label="$t('feedback.label')"
          :value="$t('feedback.value')"
          is-link
          @click="
            $appOpenUrl($t('open-url.title'), null, { path: url.support }, 0)
          "
        />
        <van-cell
          icon="friends-o"
          :title="$t('thank.title')"
          :value="$t('thank.value')"
          is-link
          @click="
            $appOpenUrl($t('open-url.title'), null, { path: url.friends }, 0)
          "
        />
      </van-cell-group>
    </div>

    <div v-if="isLogin" class="login-4cf71de630f99f4bf37ea1218fdab416">
      <van-cell-group
        :border="false"
        title=" "
        class="login-058928a73f2a944d621b028eb9addd36"
      >
        <van-cell>
          <template #title>
            <div class="login-11149d3aa483aacea271a78c0ea65d85">
              <van-button
                round
                size="small"
                color="rgb(250, 250, 250)"
                @click="onLogoutClick"
                class="app-4236a440a662cc8253d7536e5aa17942"
              >
                {{ $t("my.login-out") }}
              </van-button>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <div class="login-111fb4d92036323891a140cd49383f86">
      <van-cell-group
        :border="false"
        title=" "
        class="login-b990d992f06c8db21d6b58c25f843529"
      >
        <van-cell
          title="沪ICP备16031287号-2"
          @click="
            $appOpenUrl($t('open-url.title'), null, { path: url.beian }, 0)
          "
          class="login-c0bdff9ec0fe8c0a83371c4573d7ecf4"
        />
      </van-cell-group>
    </div>

    <div class="login-af6006055b54757559df70268b785c6d">
      <van-popup v-model="showInfo.languageMenu" round position="bottom">
        <van-picker
          show-toolbar
          :default-index="$cookie.get('lang-index') || 0"
          :confirm-button-text="$t('confirm')"
          :cancel-button-text="$t('cancel')"
          :columns="
            $appLanguageInfo.map((x) => {
              return x.title;
            })
          "
          @confirm="onLanguagePickerConfirm"
          @cancel="showInfo.languageMenu = false"
        />
      </van-popup>
    </div>

    <div class="login-56fe8eb767404084edadf3ca37055338">
      <van-popup v-model="showInfo.popup" round position="bottom">
        <van-picker
          show-toolbar
          :default-index="$appColumnsInfo.index"
          :columns="$appColumnsInfo.now"
          @confirm="onDataPickerConfirm"
          @cancel="onDataPickerCancel"
        />
      </van-popup>
    </div>

    <div class="login-0b8eeb7297d7691797414caa1ec92c8e">
      <van-action-sheet
        v-model="showInfo.actionSheet"
        title="我的信息"
        @close="showInfo.editType = false"
      >
        <template #default>
          <div class="login-e28b0ad4c2c20a8df957d67806ea9b85">
            <van-cell-group
              :border="false"
              class="login-3c5bcb72d710faf0c301750abeb5704f"
            >
              <van-field
                v-model="$appColumnsInfo.areaType[newInfo.areaType]"
                readonly
                input-align="right"
                label="大区"
              >
                <template #button>
                  <div class="login-1f4910bc86a6970eb3401b1dde5a1177">
                    <van-button
                      round
                      size="small"
                      type="info"
                      class="login-e06af146fff27b9e4b20bda71a291f9f"
                      @click="onUpdateColumnsInfoClick(0)"
                    >
                      修改大区
                    </van-button>
                  </div>
                </template>
              </van-field>
              <!--
              <van-field
                v-model="$appColumnsInfo.provinceType[newInfo.provinceType]"
                readonly
                input-align="right"
                label="省份"
              >
                <template #button>
                  <div class="login-d00aad59acfadc27e8f50ccc61533a30">
                    <van-button
                      round
                      size="small"
                      type="info"
                      class="login-e06af146fff27b9e4b20bda71a291f9f"
                      @click="onUpdateColumnsInfoClick(1)"
                    >
                      修改省份
                    </van-button>
                  </div>
                </template>
              </van-field>
              -->
              <van-field readonly label="段位">
                <template #button>
                  <div class="login-6a138d8f7faefbcc60caf19afc89f0a2">
                    <span class="login-35494217d6a01388d07eccf816b6ea39">
                      <img
                        v-lazy="newInfo.rank.starIcon"
                        width="50"
                        height="50"
                      />
                    </span>

                    <van-button
                      round
                      size="small"
                      type="info"
                      class="login-e06af146fff27b9e4b20bda71a291f9f"
                      @click="onUpdateColumnsInfoClick(2)"
                    >
                      修改段位
                    </van-button>
                  </div>
                </template>
              </van-field>
              <van-field
                v-model="newInfo.rank.score"
                type="number"
                input-align="right"
                label="巅峰分"
              />
            </van-cell-group>

            <van-cell-group
              :border="false"
              title=" "
              class="login-3c5bcb72d710faf0c301750abeb5704f"
            >
              <van-field
                readonly
                label="扩列"
                @click="$message.warning($appMsg.warning[1002])"
              >
                <template #button>
                  <span class="login-35494217d6a01388d07eccf816b6ea39">
                    <van-switch v-model="showInfo.friendsType" />
                  </span>
                </template>
              </van-field>

              <van-field
                v-model="newInfo.description"
                autosize
                label="签名"
                rows="2"
                maxlength="255"
                type="textarea"
                input-align="right"
                placeholder="请输入签名"
                @click="$message.warning($appMsg.warning[1003])"
                show-word-limit
              />
            </van-cell-group>

            <div class="login-47260541d2fb8caec524833d2a4eac4e">
              <van-button
                round
                size="small"
                type="primary"
                class="app-a066f238070a70cb531c9bd722c65b36"
                @click="updateWebAccountInfo"
              >
                保存信息
              </van-button>
            </div>
          </div>
        </template>
      </van-action-sheet>
    </div>

    <AppHello height="100px" />
  </div>
</template>

<script>
export default {
  name: "userIndex",
  components: {
    AppHello: () => import("@/components/App/Hello.vue"),
  },
  data() {
    return {
      copyData: null,
      login: {
        status: false,
        text: this.$t("my.login-i"),
      },
      isLogin: false,
      url: {
        question: "//www.yuque.com/jmglsi/pvp/gbpl91",
        friends: "//www.yuque.com/jmglsi/pvp/yyxgbh#NPkLH",
        support: "//support.qq.com/products/305514",
        openSource: [
          "//ngabbs.com/read.php?tid=26200132",
          "//e9c29a200307a5bb-jmglsi.doc.coding.io/",
        ],
        afdian: "//afdian.net/@jmglsi",
        beian: "//beian.miit.gov.cn/#/Integrated/index",
      },
      loginInfo: {
        certification: {
          color: null,
          text: null,
        },
        description: null,
        heroList: [],
        areaType: 1,
        provinceType: 1,
        friendsType: 1,
        rank: {
          starType: 1,
          starIcon: "//camp.qq.com/battle/profile/roleJobV2/1.png",
          score: 1200,
        },
      },
      newInfo: {
        certification: {
          color: null,
          text: null,
        },
        description: null,
        heroList: [],
        areaType: 1,
        provinceType: 1,
        friendsType: 1,
        rank: {
          starType: 1,
          starIcon: "//camp.qq.com/battle/profile/roleJobV2/1.png",
          score: 1200,
        },
      },
      showInfo: {
        actionSheet: false,
        popup: false,
        friendsType: true,
        editType: false,
        languageMenu: false,
      },
      collapseInfo: {
        model: ["1"],
      },
    };
  },
  watch: {
    $route: function (to) {
      let q = to.query,
        refresh = q.refresh;

      if (refresh == 1) {
        this.getWebAccountInfo();
      }
    },
  },
  created() {
    let q = this.$route.query;

    if (q.oauthType) {
      this.login = {
        status: true,
        text: this.$t("loading"),
      };

      setTimeout(() => {
        this.$appPush({
          refresh: 1,
        });

        this.$router.go(0);
      }, 2500);
    } else {
      this.login = {
        status: false,
        text: this.$t("my.login-i"),
      };
    }
  },
  mounted() {
    this.getWebAccountInfo();
  },
  methods: {
    getWebAccountInfo: function (aid = 0) {
      this.$axios
        .post(this.$appApi.app.getWebAccountInfo + "&aid=" + aid)
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.loginInfo = data;
            this.newInfo = data;

            this.$cookie.set("name", data.name, { expires: "1M" });

            data.friendsType == 1
              ? (this.showInfo.friendsType = true)
              : (this.showInfo.friendsType = false);

            this.isLogin = true;
          } else {
            this.isLogin = false;
          }
        });
    },
    updateWebAccountInfo: function () {
      let postData = {
        areaType: this.newInfo.areaType,
        provinceType: this.newInfo.provinceType,
        starType: this.newInfo.rank.starType,
        nowRankScore: this.newInfo.rank.score,
        friendsType: Number(this.showInfo.friendsType),
        description: this.newInfo.description,
      };

      this.$axios
        .post(
          this.$appApi.app.updateWebAccountInfo,
          this.$qs.stringify(postData)
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            this.loginInfo = this.newInfo;

            this.showInfo.actionSheet = false;

            this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onDataPickerConfirm: function (value, index) {
      let columnsInfo = this.$appColumnsInfo,
        starIndex = 0;

      if (columnsInfo.type == 0) {
        this.newInfo.areaType = index;
      } else if (columnsInfo.type == 1) {
        this.newInfo.provinceType = index;
      } else if (columnsInfo.type == 2) {
        starIndex = this.$appColumnsInfo.starType.value[index];

        this.newInfo.rank.starType = index;
        this.newInfo.rank.starIcon =
          "//camp.qq.com/battle/profile/roleJobV2/" + starIndex + ".png";
      }

      this.showInfo.popup = false;
    },
    onDataPickerCancel: function () {
      this.showInfo.popup = false;
    },
    onLanguagePickerConfirm: function (e, i) {
      let lang = this.$appLanguageInfo[i].lang || "zh-CN";

      this.$cookie.set("lang", lang, {
        expires: "1Y",
      });
      this.$cookie.set("lang-index", i, {
        expires: "1Y",
      });
      this.$i18n.locale = lang;

      this.$message.success(e + " ok");

      this.login.text = this.$t("my.login-i");

      this.showInfo.languageMenu = false;
    },
    onUpdateColumnsInfoClick: function (e) {
      let columns = [],
        newInfo = this.newInfo;

      if (e == 0) {
        columns = this.$appColumnsInfo.areaType;
        this.$appColumnsInfo.index = newInfo.areaType;
      } else if (e == 1) {
        columns = this.$appColumnsInfo.provinceType;
        this.$appColumnsInfo.index = newInfo.provinceType;
      } else if (e == 2) {
        columns = this.$appColumnsInfo.starType.text;
        this.$appColumnsInfo.index = newInfo.rank.starType;
      }

      this.$appColumnsInfo.now = columns;
      this.$appColumnsInfo.type = e;

      this.showInfo.popup = true;
    },
    onUpdateInfoClick: function () {
      this.showInfo.editType = true;
      this.showInfo.actionSheet = true;
    },
    onLogoutClick: function () {
      this.$dialog
        .confirm({
          title: "是否退出登录?",
        })
        .then(() => {
          //on confirm
          this.isLogin = false;

          this.$cookie.delete("agree");
          this.$cookie.delete("openId");
          this.$cookie.delete("accessToken");
          this.$cookie.delete("tempOpenId");
          this.$cookie.delete("tempAccessToken");

          this.$appDelectAllLocalStorage();
        })
        .catch(() => {
          //on cancel
        });
    },
    onCopy: function () {
      let url = location,
        longUrl = url.origin + "/friends?openId=" + this.loginInfo.openId;

      this.copyData = longUrl;

      this.$appCopyData(this.copyData);
    },
  },
};
</script>

<style scoped lang="less">
img.login-ef65f15f01e7d076cc4ef40d753e4d65 {
  background-color: white !important;
  margin-left: -26px;
  margin-top: 71px;
  padding: 1px;
  position: absolute;
}

span.login-25930e3036f13852cb0b29694bbab611 {
  margin: 0 3px;
}

span.login-b068931cc450442b63f5b3d276ea4297 {
  font-size: 12px;
}

span.login-7a33dbf09bb2e3ed21ecb1adf0cb37b4 {
  margin-left: 5px;
}

span.login-af99c9298d1eb69981a035d0a15afa20 {
  position: absolute;
  right: 30px;
  top: -5px;
}

span.login-35494217d6a01388d07eccf816b6ea39 {
  margin-right: 10px;
}

div.login-7dc22b2c6a992f0232345df41303f5ea {
  text-align: @app-text-align;

  span.login-4646fa4296a7f5dea261e60e00ecd24b {
    font-size: 20px;
  }
}

div.login-c0bdff9ec0fe8c0a83371c4573d7ecf4 {
  font-size: @app-font-size;
}
</style>