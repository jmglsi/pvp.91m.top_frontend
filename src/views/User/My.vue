<template>
  <div class="login-home">
    <div class="my-8e35828097179076a177cfd25e3713db">
      <van-nav-bar
        v-if="isLogin"
        :right-text="!showInfo.editType ? '编辑' : '编辑中'"
        :border="false"
        :fixed="true"
        :placeholder="true"
        @click-right="onUpdateInfoClick"
        z-index="99999999"
      >
        <template #title>
          <div v-if="isLogin" class="my-f9c7cabc13f359223ebc3ccf9cc104b8">
            <span
              class="my-25930e3036f13852cb0b29694bbab611 my-b068931cc450442b63f5b3d276ea4297"
              >&lt;{{ $appColumnsInfo.area[loginInfo.areaType] }}&gt;</span
            >
            <span
              class="my-25930e3036f13852cb0b29694bbab611 my-b068931cc450442b63f5b3d276ea4297"
              >{{ loginInfo.name }}</span
            >
            <span
              class="my-25930e3036f13852cb0b29694bbab611 my-293a35164a20c927b0fd61942fbc1cf2"
            >
              <van-tag
                round
                :color="loginInfo.certification.color"
                class="my-7eaa86d23ffacfb49464ee78252aa43a"
                @click="$message.info($appMsg.info[1003])"
                >{{ loginInfo.certification.text }}</van-tag
              >
            </span>
          </div>
        </template>
      </van-nav-bar>
    </div>

    <div v-if="!isLogin" class="my-3d1d6b29e66d9b4f061e24a2551e2b67">
      <van-cell-group
        :border="false"
        title=" "
        class="my-058928a73f2a944d621b028eb9addd36"
      >
        <van-cell>
          <template #title>
            <van-button
              round
              size="small"
              color="linear-gradient(to right, #4bb0ff, #6149f6)"
              @click="$appPush({ path: '/login' })"
              class="app-0162f4b7b2dbdf6aff3a25de02e49a8b"
              >注册/登录</van-button
            >
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <div v-if="isLogin" class="app-d9833a1bc29f11d9ca39543dc46fcc58">
      <img
        v-lazy="loginInfo.img"
        width="100"
        height="100"
        class="my-d5ca322453f2986b752e58b11af83d96"
        @click="
          $appPush({
            path: '/friends',
            query: { openId: loginInfo.openId },
          })
        "
      />
      <div class="app-88bf7a95736562190270d51dc2cb3f42">
        {{ loginInfo.description || "这个人很懒,什么都没有留下" }}
      </div>
    </div>

    <div v-if="isLogin" class="my-7dc22b2c6a992f0232345df41303f5ea">
      <van-cell-group
        :border="false"
        title=""
        class="my-71c2fb64c38e4ee108607ca840607e48"
      >
        <van-cell
          icon="/img/app-icons/game.png"
          title="全局BP模拟器"
          value="使用说明"
          is-link
          @click="
            $appOpenUrl('是否打开外部链接?', null, { path: url.globalBP })
          "
          icon-prefix="app-6de102c0bc4dc7f72ce287d6b0828052"
        />
        <van-grid
          :border="false"
          :column-num="2"
          class="my-c3d90961c9bf155d11cbef9c57725aea"
        >
          <van-grid-item
            icon="//img06.mifile.cn/v1/MI_542ED8B1722DC/9c36dd7e015e0cbff074365092baee11.png"
            to="/game/team"
            icon-prefix="my-c1d8fd0f00bccc16b2cf5d07bfc3c96f"
            class="my-7409cbd9b549064c9b5ea3ab21ee3ac6"
          >
            <template #text>
              <div class="my-6e8737d4ac83f11c858de8bde0a6c52a">
                <span class="my-4646fa4296a7f5dea261e60e00ecd24b">{{
                  loginInfo.statistics.team
                }}</span>
                <span class="my-7a33dbf09bb2e3ed21ecb1adf0cb37b4">支</span>
              </div>
            </template>
          </van-grid-item>
          <van-grid-item
            icon="//img08.mifile.cn/v1/MI_542ED8B1722DC/42b83c2748743e42808d847e9953f1cc.png"
            to="/game/engage"
            icon-prefix="my-c1d8fd0f00bccc16b2cf5d07bfc3c96f"
            class="my-308ffde0dc5bd5718dcf0396fcc2a596"
          >
            <template #text>
              <div class="my-6e8737d4ac83f11c858de8bde0a6c52a">
                <span class="my-4646fa4296a7f5dea261e60e00ecd24b">{{
                  loginInfo.statistics.label
                }}</span>
                <span class="my-7a33dbf09bb2e3ed21ecb1adf0cb37b4">局</span>
              </div>
            </template>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
    </div>

    <div v-if="isLogin" class="my-7dc22b2c6a992f0232345df41303f5ea">
      <van-cell-group
        :border="false"
        title=" "
        class="my-abf7b3191e2a24c6fc3c008124bcf0d4"
      >
        <van-cell
          title="王者荣耀"
          icon="/img/game-icons/king.png"
          icon-prefix="app-6de102c0bc4dc7f72ce287d6b0828052"
        >
          <template #right-icon>
            <span class="my-af99c9298d1eb69981a035d0a15afa20"
              ><img
                v-lazy="loginInfo.rank.starIcon"
                width="50"
                height="50"
              /><span class="app-dac41b9450b77c3eb0ab7d8428d004f5">|</span>
              <span class="my-7121ba1bc1276c3bb6df96b333a16760">{{
                loginInfo.rank.score
              }}</span></span
            >
          </template>
        </van-cell>
        <van-cell
          icon="/img/app-icons/hero_black.png"
          icon-prefix="app-6de102c0bc4dc7f72ce287d6b0828052"
        >
          <template #title>
            <span
              class="my-1098203f6e0a3a981da7c9a8cd6bc85b"
              @click="$message.info($appMsg.info[1015])"
              >喜欢列表</span
            >
          </template>
          <template #right-icon>
            <ul
              class="app-d865b50ce307751bdeb9a6ab16e7baf9 app-9e60d3ee1e1574cae90960f940c0a821"
              :style="loginInfo.heroList.length <= 3 ? {} : { width: '180px' }"
            >
              <li
                v-for="(data, index) in loginInfo.heroList"
                :key="'app-56bc526c61d7296b48276b2203da4c49-' + index"
                class="app-1951b6e7c82938dd7446a41e829b247b"
              >
                <img
                  v-lazy="
                    '//game.gtimg.cn/images/yxzj/img201606/heroimg/' +
                    data.id +
                    '/' +
                    data.id +
                    '.jpg'
                  "
                  width="35"
                  height="35"
                  class="app-4ab161130e76571ab0c31aa23a6238c7"
                  @click="$appPush({ path: '/hero/' + data.id + '/info' })"
                />
                <img
                  v-if="data.fightPowerIcon"
                  v-lazy="data.fightPowerIcon"
                  width="25"
                  height="25"
                  class="app-d31cb1c15b091f41248935d88a8d0a45"
                />
              </li>
            </ul>
            <span
              v-if="loginInfo.heroList.length == 0"
              class="my-65d7dd3f74769ce2ba0009e9eb25c675"
              @click="$message.info($appMsg.info[1015])"
              >未设置</span
            >
          </template>
        </van-cell>
        <van-cell icon="friends" title="扩列交友" label="打开别人就能找到您啦~">
          <template #right-icon>
            <span class="my-b60541e817018d568a58a70d5db7fb65">
              <van-switch v-model="showInfo.friendsType" disabled />
            </span>
          </template>
        </van-cell>
        <van-cell
          icon="manager"
          title="扩列链接"
          value="点击复制"
          is-link
          @click="onMyLinkCopy"
        />
      </van-cell-group>
    </div>

    <div v-if="isLogin" class="my-7dc22b2c6a992f0232345df41303f5ea">
      <van-cell-group
        :border="false"
        title=" "
        class="my-66e3a8a1303fb1fc8ce3249b23dbd268"
      >
        <van-cell
          title="适配小屏"
          label="屏幕小的话可以手动开启"
          icon="graphic"
        >
          <template #right-icon>
            <span class="my-087fed58eae1e19dec1f2efffe80d047">
              <van-switch
                v-model="mobileInfo.isSmallMobile"
                @change="onMobileInfoChange"
              />
            </span>
          </template>
        </van-cell>
        <van-cell
          title="修改密码"
          icon="/img/app-icons/password_edit.png"
          is-link
          @click="$appPush({ path: '/login' })"
          icon-prefix="app-6de102c0bc4dc7f72ce287d6b0828052"
        />
      </van-cell-group>
    </div>

    <div class="my-7dc22b2c6a992f0232345df41303f5ea">
      <van-cell-group
        :border="false"
        title=" "
        class="my-058928a73f2a944d621b028eb9addd36"
      >
        <van-cell
          icon="comment-o"
          title="意见建议反馈"
          is-link
          @click="$appOpenUrl('是否打开外部链接?', null, { path: url.support })"
        />
        <van-cell
          icon="friends-o"
          title="感谢各位伙伴"
          is-link
          @click="$appOpenUrl('是否打开外部链接?', null, { path: url.friends })"
        />
      </van-cell-group>
    </div>

    <div v-if="isLogin" class="my-4cf71de630f99f4bf37ea1218fdab416">
      <van-cell-group
        :border="false"
        title=" "
        class="my-058928a73f2a944d621b028eb9addd36"
      >
        <van-cell>
          <template #title>
            <van-button
              round
              size="small"
              color="rgb(245,245,245)"
              @click="onLogoutClick"
              class="app-4236a440a662cc8253d7536e5aa17942"
              >退出登录</van-button
            >
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <div class="my-111fb4d92036323891a140cd49383f86">
      <van-cell-group
        :border="false"
        title=" "
        class="my-b990d992f06c8db21d6b58c25f843529"
      >
        <van-cell
          title="沪ICP备16031287号-2"
          @click="$appOpenUrl('是否打开外部链接?', null, { path: url.beian })"
          class="my-c0bdff9ec0fe8c0a83371c4573d7ecf4"
        />
      </van-cell-group>
    </div>

    <div class="my-56fe8eb767404084edadf3ca37055338">
      <van-popup v-model="showInfo.pickerMenu" round position="bottom">
        <van-picker
          show-toolbar
          :columns="$appColumnsInfo.now"
          :default-index="$appColumnsInfo.index"
          @confirm="onPickerConfirm"
          @cancel="onPickerCancel"
        />
      </van-popup>
    </div>

    <div class="my-0b8eeb7297d7691797414caa1ec92c8e">
      <van-action-sheet
        v-model="showInfo.editMenu"
        @close="showInfo.editType = false"
        safe-area-inset-bottom
        title="我的信息"
      >
        <div class="my-e28b0ad4c2c20a8df957d67806ea9b85">
          <van-cell-group
            :border="false"
            title=""
            class="my-3c5bcb72d710faf0c301750abeb5704f"
          >
            <van-field
              v-model="$appColumnsInfo.area[newInfo.areaType]"
              readonly
              input-align="right"
              label="大区"
            >
              <template #button>
                <van-button
                  round
                  size="small"
                  type="info"
                  class="my-e06af146fff27b9e4b20bda71a291f9f"
                  @click="onUpdateColumnsInfoClick(0)"
                  >修改大区</van-button
                >
              </template>
            </van-field>
            <van-field
              v-model="$appColumnsInfo.province[newInfo.provinceType]"
              readonly
              input-align="right"
              label="省份"
            >
              <template #button>
                <van-button
                  round
                  size="small"
                  type="info"
                  class="my-e06af146fff27b9e4b20bda71a291f9f"
                  @click="onUpdateColumnsInfoClick(1)"
                  >修改省份</van-button
                >
              </template>
            </van-field>
            <van-field readonly label="段位">
              <template #button>
                <span class="my-35494217d6a01388d07eccf816b6ea39"
                  ><img v-lazy="newInfo.rank.starIcon" width="50" height="50"
                /></span>
                <van-button
                  round
                  size="small"
                  type="info"
                  class="my-e06af146fff27b9e4b20bda71a291f9f"
                  @click="onUpdateColumnsInfoClick(2)"
                  >修改段位</van-button
                >
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
            class="my-3c5bcb72d710faf0c301750abeb5704f"
          >
            <van-field readonly label="扩列">
              <template #button>
                <span class="my-35494217d6a01388d07eccf816b6ea39"
                  ><van-switch v-model="showInfo.friendsType"
                /></span>
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
              @click="$message.warning($appMsg.warning[1002])"
              show-word-limit
            />
          </van-cell-group>

          <van-button
            round
            size="small"
            type="primary"
            class="app-a066f238070a70cb531c9bd722c65b36"
            @click="updateWebAccountInfo"
            >保存信息</van-button
          >
        </div>
      </van-action-sheet>
    </div>

    <AppBottomTabbar height="100px" />
  </div>
</template>

<script>
export default {
  name: "MyHome",
  components: {
    AppBottomTabbar: () => import("@/components/App/BottomTabbar.vue"),
  },
  data() {
    return {
      copyData: "",
      isLogin: false,
      url: {
        globalBP: "//doc.91m.top/jmglsi/pvp",
        friends: "//doc.91m.top/jmglsi/pvp",
        support: "//support.qq.com/products/305514",
        beian: "//beian.miit.gov.cn/#/Integrated/index",
      },
      loginInfo: {
        certification: {
          color: "",
          text: "",
        },
        description: null,
        heroList: [],
        areaType: 1,
        provinceType: 1,
        friendsType: 1,
        rank: {
          starType: 1,
          starIcon: "//camp.qq.com/battle/profile/roleJob/1.png",
          score: 1200,
        },
      },
      newInfo: {
        certification: {
          color: "",
          text: "",
        },
        description: null,
        heroList: [],
        areaType: 1,
        provinceType: 1,
        friendsType: 1,
        rank: {
          starType: 1,
          starIcon: "//camp.qq.com/battle/profile/roleJob/1.png",
          score: 1200,
        },
      },
      showInfo: {
        friendsType: true,
        editType: false,
        editMenu: false,
        pickerMenu: false,
      },
      mobileInfo: {
        isSmallMobile: false,
      },
    };
  },
  mounted() {
    this.mobileInfo.isSmallMobile =
      Boolean(parseInt(this.$cookie.get("isSmallMobile"))) || false;

    this.getWebAccountInfo();
  },
  methods: {
    getWebAccountInfo: function (aid = 0) {
      this.$axios
        .post(this.$appApi.pvp.getWebAccountInfo + "&aid=" + aid)
        .then((res) => {
          let data = res.data.data,
            status = res.data.status;

          if (status.code == 200) {
            this.loginInfo = data;
            this.newInfo = data;

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
          this.$appApi.pvp.updateWebAccountInfo,
          this.$qs.stringify(postData)
        )
        .then((res) => {
          let status = res.data.status;

          if (status.code == 200) {
            this.loginInfo = this.newInfo;

            this.$message.success(this.$appMsg.success[1000]);
          } else {
            this.$message.error(status.msg);
          }
        });
    },
    onMyLinkCopy: function () {
      let longUrl =
        location.origin + "/friends?openId=" + this.loginInfo.openId;

      this.copyData = longUrl;

      setTimeout(
        (copyData) => {
          this.$appCopyData(copyData);
        },
        750,
        this.copyData
      );
    },
    onMobileInfoChange: function (e) {
      let isSmallMobileInt = 0,
        isSmallMobileBool = false;

      if (e == false) {
        isSmallMobileInt = 0;
        isSmallMobileBool = false;
      } else {
        isSmallMobileInt = 1;
        isSmallMobileBool = true;
      }

      this.mobileInfo.isSmallMobile = isSmallMobileBool;
      this.$cookie.set("isSmallMobile", isSmallMobileInt, { expires: "1Y" });

      this.$message.success(this.$appMsg.success[1004]);
    },
    onUpdateColumnsInfoClick: function (e) {
      let columns = [],
        newInfo = this.newInfo;

      if (e == 0) {
        columns = this.$appColumnsInfo.area;
        this.$appColumnsInfo.index = newInfo.areaType;
      } else if (e == 1) {
        columns = this.$appColumnsInfo.province;
        this.$appColumnsInfo.index = newInfo.provinceType;
      } else if (e == 2) {
        columns = this.$appColumnsInfo.rank.text;
        this.$appColumnsInfo.index = newInfo.rankType;
      }

      this.$appColumnsInfo.now = columns;
      this.$appColumnsInfo.type = e;

      this.showInfo.pickerMenu = true;
    },
    onUpdateInfoClick: function () {
      this.showInfo.editType = true;
      this.showInfo.editMenu = true;
    },
    onPickerConfirm: function (value, index) {
      let columnsInfo = this.$appColumnsInfo,
        starIndex = 0;

      if (columnsInfo.type == 0) {
        this.newInfo.areaType = index;
      } else if (columnsInfo.type == 1) {
        this.newInfo.provinceType = index;
      } else if (columnsInfo.type == 2) {
        starIndex = this.$appColumnsInfo.rank.type[index];

        this.newInfo.rank.starType = index;
        this.newInfo.rank.starIcon =
          "//camp.qq.com/battle/profile/roleJob/" + starIndex + ".png";
      }

      this.showInfo.pickerMenu = false;
    },
    onPickerCancel: function () {
      this.showInfo.pickerMenu = false;
    },
    onLogoutClick: function () {
      this.$dialog
        .confirm({
          title: "是否退出登录?",
        })
        .then(() => {
          // on confirm
          this.isLogin = false;

          this.$cookie.delete("openId");
          this.$cookie.delete("accessToken");
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style scoped>
img.my-d5ca322453f2986b752e58b11af83d96 {
  border-radius: 100%;
}

span.my-25930e3036f13852cb0b29694bbab611 {
  margin: 0 3px;
}

span.my-b068931cc450442b63f5b3d276ea4297 {
  font-size: 13px;
}

span.my-7a33dbf09bb2e3ed21ecb1adf0cb37b4 {
  margin-left: 5px;
}

span.my-af99c9298d1eb69981a035d0a15afa20 {
  position: absolute;
  right: 30px;
  top: -5px;
}

span.my-b60541e817018d568a58a70d5db7fb65 {
  margin-top: 5px;
}

span.my-35494217d6a01388d07eccf816b6ea39 {
  margin-right: 10px;
}

div.my-7dc22b2c6a992f0232345df41303f5ea
  div.van-grid
  div.van-grid-item
  div.van-grid-item__content
  span.van-grid-item__text,
span.my-4646fa4296a7f5dea261e60e00ecd24b {
  font-size: 20px;
}

div.my-7dc22b2c6a992f0232345df41303f5ea {
  text-align: left;
}

div.my-c0bdff9ec0fe8c0a83371c4573d7ecf4 {
  font-size: 10px;
}
</style>