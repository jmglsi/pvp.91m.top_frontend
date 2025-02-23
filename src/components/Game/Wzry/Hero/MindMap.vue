<template>
  <div class="hero-mindmap">
    <div id="mindMapContainer"></div>
  </div>
</template>

<script>
import MindMap from "simple-mind-map";
import HandDrawnLikeStyle from "@/assets/js/handDrawnLikeStyle.cjs.min.js";

MindMap.usePlugin(HandDrawnLikeStyle);

export default {
  name: "heroBPIndex",
  props: {
    extraId: {
      type: Number,
      default: 0,
    },
    extraType: {
      type: Number,
      default: 1,
    },
    extraList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {
    listenChange() {
      const { extraId, extraType, extraList } = this;
      return { extraId, extraType, extraList };
    },
  },
  watch: {
    listenChange: {
      immediate: true,
      handler(newValue) {
        if (!newValue.extraId) return;

        if (this.$appConfigInfo.appInfo.isReadme == 1) {
          this.initPage(this.extraList);
        }
      },
    },
  },
  data() {
    return {
      mindMap: null,
      img: "",
      item: [[], [], [], [], [], []],
    };
  },
  created() {
    this.extraType == 1
      ? (this.img =
          "//game.gtimg.cn/images/yxzj/img201606/heroimg/" +
          this.extraId +
          "/" +
          this.extraId +
          ".jpg")
      : (this.img =
          "//game.gtimg.cn/images/yxzj/img201606/itemimg/" +
          this.extraId +
          ".jpg");
  },
  mounted() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    this.mindMap = new MindMap({
      el: document.querySelector("#mindMapContainer"),
      fit: true,
      fitPadding: 15,
      maxTag: 2,
      readonly: true,
      themeConfig: {
        lineStyle: "curve",
        second: {
          marginX: 25,
          marginY: 25,
        },
      },
      data: {
        data: {
          text:
            '<img style="border-radius: 100%;" src="' +
            this.img +
            '" width="50" height="50">',
          richText: true,
          shape: "circle",
          fillColor: "transparent",
          lineColor: "#000000",
          lineWidth: 3,
        },
        children: [
          {
            data: {
              text: '<p><span style="color: #000000; font-size: 18px;">格子_1</span>&nbsp;</p>',
              richText: true,
              tag: this.item[0],
              fillColor: "transparent",
              borderColor: "#000000",
              borderWidth: 3,
            },
          },
          {
            data: {
              text: '<p><span style="color: #000000; font-size: 18px;">格子_2</span>&nbsp;</p>',
              richText: true,
              tag: this.item[1],
              fillColor: "transparent",
              borderColor: "#000000",
              borderWidth: 3,
            },
          },
          {
            data: {
              text: '<p><span style="color: #000000; font-size: 18px;">格子_3</span>&nbsp;</p>',
              richText: true,
              tag: this.item[2],
              fillColor: "transparent",
              borderColor: "#000000",
              borderWidth: 3,
            },
          },
          {
            data: {
              text: '<p><span style="color: #000000; font-size: 18px;">格子_4</span>&nbsp;</p>',
              richText: true,
              tag: this.item[3],
              fillColor: "transparent",
              borderColor: "#000000",
              borderWidth: 3,
            },
          },
          {
            data: {
              text: '<p><span style="color: #000000; font-size: 18px;">格子_5</span>&nbsp;</p>',
              richText: true,
              tag: this.item[4],
              fillColor: "transparent",
              borderColor: "#000000",
              borderWidth: 3,
            },
          },
          {
            data: {
              text: '<p><span style="color: #000000; font-size: 18px;">格子_6</span>&nbsp;</p>',
              richText: true,
              tag: this.item[5],
              fillColor: "transparent",
              borderColor: "#000000",
              borderWidth: 3,
            },
          },
        ],
      },
    });
  },
  methods: {
    initPage: function (extraList) {
      let temp = [[], [], [], [], [], []];

      extraList.map((y) => {
        if (y.allPickRate < 1) {
          //
        } else {
          temp[y.maxIndex - 1].push([
            this.extraType == 1 ? y.equipmentName : y.heroName,
            y.allPickRate,
          ]);
        }
      });

      temp.forEach((z) => {
        z.sort((a, b) => {
          return b[1] - a[1];
        });
      });

      this.item = temp;
    },
  },
};
</script>
