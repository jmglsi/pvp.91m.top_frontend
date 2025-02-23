<template>
  <div class="tools-mp">
    <div class="hero-275a09d4d317fe9f926900a6b08f79d6">
      <van-nav-bar
        left-arrow
        :border="false"
        :fixed="true"
        :safe-area-inset-top="true"
        :left-text="$t('nav-bar.left-text')"
        @click-left="$appBack()"
        z-index="2000"
        class="hero-2d2ac64ce19b233b8442fb015951a964"
      >
        <template #right>
          <div class="hero-68adaff1d028a37f27fb33c483329cba">
            <van-popover
              v-model="showInfo.popoverMeau"
              :actions="popoverMeauActions"
              @select="onPopoverMeauSelect"
              trigger="click"
              placement="bottom-end"
            >
              <template #reference>
                <img
                  v-lazy="$appCache + '/img/icons-app/more.png'"
                  width="30"
                  height="30"
                  class="app-border-radius"
                />
              </template>
            </van-popover>
          </div>
        </template>
      </van-nav-bar>
    </div>

    <div class="hero-d172dd0c6361cd74f6194e50bf1ce999">
      <div class="hero-58ee8b9737bf275cfd1b7064cfa899d3">
        <div
          :style="{
            background: 'url(' + skinImg + ') no-repeat top',
          }"
          @click="onChangeBgImg"
          class="hero-5b842885be8780c70f7f67ca11421031"
        ></div>
        <div class="hero-f9f5210b7a4c2f4f4d8f27bafddc6c2f">
          <div
            @click="onChangeBgText"
            class="hero-df8b6f921ca8dbb33de5c3695597208f"
          >
            <van-grid square :border="false" :column-num="2">
              <van-grid-item
                v-for="(data, index) in skinText.slice(0, 4).split('')"
                :key="'hero-9072505a3d7060e407672de6eb811d8c-' + index"
              >
                <span class="hero-06493a7908e06ff347ad2a82da79be27">
                  {{ data }}
                </span>
              </van-grid-item>
            </van-grid>
          </div>
        </div>
      </div>

      <div class="hero-c909bb02fac53c2644b081f3ca4c9a6f">
        <ChooseWzryHero @select="getHeroInfo">
          <van-button round type="info" size="small">选择英雄</van-button>
        </ChooseWzryHero>
        <ChooseWzrySkin
          v-if="heroInfo.id"
          :extraId="heroInfo.id"
          @select="getSkinInfo"
        >
          <van-button round type="primary" size="small">选择皮肤</van-button>
        </ChooseWzrySkin>

        <div class="hero-dce7fccacc4020b87c37d3c5da87af6a">
          <div class="hero-a41a231064649cb30dbeb978cf02eb5e"></div>
          <van-button round @click="saveImg" type="primary" size="small">
            保存封面
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";

export default {
  name: "toolsMp",
  components: {
    ChooseWzryHero: () => import("@/components/Choose/Wzry/Hero.vue"),
    ChooseWzrySkin: () => import("@/components/Choose/Wzry/Skin.vue"),
  },
  data() {
    return {
      popoverMeauActions: [
        { text: "新建封面", value: 0 },
        { text: "新建调整", value: 1 },
      ],
      heroId: 0,
      skinId: 0,
      skinImg: "",
      skinText: "输入文字",
      heroInfo: {
        id: 0,
      },
      skinInfo: {
        skinId: 0,
      },
      showInfo: {
        popoverArea: false,
        popoverMeau: true,
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.showInfo.popoverMeau = false;
    }, 1000 * 5);
  },
  methods: {
    getHeroInfo: function (e) {
      this.heroInfo = e;
    },
    getSkinInfo: function (e) {
      this.skinInfo = e;
      this.heroId = e.skinId.slice(0, 3);
      this.skinId = parseInt(e.skinId.slice(3, 6));

      this.skinImg =
        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/" +
        this.heroId +
        "/" +
        this.heroId +
        "-bigskin-" +
        (this.skinId + 1) +
        ".jpg";
    },
    onChangeBgImg: function () {
      let newImg = prompt("输入新的链接", "https://game.gtimg.cn/...");

      if (newImg) {
        this.skinImg = newImg;
      }
    },
    onChangeBgText: function () {
      let newText = prompt("输入 4 个文字", "版本最强");

      if (newText) {
        this.skinText = newText;
      }
    },
    onPopoverMeauSelect: function (e) {
      this.selectInfo = e;
    },
    saveImg: function () {
      html2canvas(
        document.getElementsByClassName(
          "hero-58ee8b9737bf275cfd1b7064cfa899d3"
        )[0],
        {
          useCORS: true,
          //allowTaint: true,
          scale: 2,
        }
      ).then((canvas) => {
        let shareImg = document.getElementsByClassName(
          "hero-a41a231064649cb30dbeb978cf02eb5e"
        )[0];
        shareImg.innerHTML = null;
        shareImg.appendChild(canvas);

        canvas.toBlob(
          function (blob) {
            const eleLink = document.createElement("a");
            eleLink.download = "1.png";
            eleLink.style.display = "none";
            eleLink.href = URL.createObjectURL(blob);
            //触发点击
            document.body.appendChild(eleLink);
            eleLink.click();
            //然后移除
            document.body.removeChild(eleLink);
          },
          "image/png",
          1
        );

        this.$message.success(this.$appMsg.success[1006]);
      });
    },
  },
};
</script>

<style lang="less" scoped>
span.hero-06493a7908e06ff347ad2a82da79be27 {
  font-size: 100px;
  color: white;
}

div.hero-5b842885be8780c70f7f67ca11421031 {
  width: 1283px;
  height: 383px;
  //border-color: red;
  //border-style: solid;
  //border-width: 1px;
  display: inline-block;
  //background: url(https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/159/159-bigskin-3.jpg) no-repeat top;
  //position: absolute;
  //left: 0;
}

div.hero-f9f5210b7a4c2f4f4d8f27bafddc6c2f {
  width: 383px;
  height: 383px;
  //border-color: red;
  //border-style: solid;
  //border-width: 1px;
  //background: url(https://game.gtimg.cn/images/yxzj/img201606/heroimg/159/159-smallskin-3.jpg);
  background-size: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  background-blend-mode: multiply;
  display: inline-block;
  position: absolute;
  margin-left: -383px;
}

div.hero-df8b6f921ca8dbb33de5c3695597208f {
  width: 383px;
  height: 383px;
}

div.hero-58ee8b9737bf275cfd1b7064cfa899d3 {
  //width: 1283px;
  height: 383px;
  //position: absolute;
  //left: 0;
  //margin-left: -195px;
  display: inline-block;
  width: 100%;
  margin-top: 75px;
  //transform: scale(0.75);
}

div.hero-d172dd0c6361cd74f6194e50bf1ce999 {
  margin-top: 50px;
}

div.hero-c909bb02fac53c2644b081f3ca4c9a6f {
  display: inline-block;
}

div.choose-a951404cf72bbe54a7fbac9cdf0908af {
  display: inline-block;
  margin: 5px;
}
</style>