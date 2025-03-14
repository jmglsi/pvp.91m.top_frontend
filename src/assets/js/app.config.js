import Vue from 'vue';
import 'v-charts/lib/style.css';

import XEUtils from 'xe-utils';
Vue.prototype.$appXEUtils = XEUtils;

let ua = navigator.userAgent;

Vue.prototype.$appCookie = XEUtils.cookie;
Vue.prototype.$appGameType = XEUtils.cookie("game-type") || "wzry";
Vue.prototype.$appTs = XEUtils.timestamp(new Date()).toString().slice(0, 10);
Vue.prototype.$appLocat = XEUtils.locat();
//
let nowUrl = Vue.prototype.$appLocat;
Vue.prototype.$appQuery = nowUrl.searchQuery;
Vue.prototype.$appIsRobot = (Number(nowUrl.searchQuery.isRobot) == 1 ? true : false);
Vue.prototype.$appIsMyHost = /(localhost:8080|pvp\.91m\.top|pvp\.r18\.games|pvp\.qialol\.com)/i.test(nowUrl.host);
//只适合首次
Vue.prototype.$appCache = "//cache.91m.top/pvp.91m.top";
Vue.prototype.$appIsApple = /(iPhone|iPad|iPod|Mac)/i.test(ua);
Vue.prototype.$appInDouyin = /Bytedance/i.test(ua);
Vue.prototype.$appInWechat = /MicroMessenger/i.test(ua);
Vue.prototype.$appInWechatMiniapp = /miniProgram/i.test(ua);
Vue.prototype.$appIsMobile = /(Android|iPhone|iPad|iPod|Mobile)/i.test(ua);
Vue.prototype.$appHeight = document.documentElement.clientHeight;
Vue.prototype.$appWidth = document.documentElement.clientWidth;

Vue.prototype.$appConfigInfo = {
  appInfo: {
    isReadme: false,
    isSwingMode: false,
    isSmallMode: false,
    isReductionMode: false,
    openUrl: true,
    newsPush: true,
    wow: true,
    pwa: 0,
    link: [],
    name: "苏苏的荣耀助手",
    script: [],
    updateInfo: {
      version: 0,
      text: "loading...",
      title: "loading...",
      time: 0,
      timeout: 43200,
      //
      avgScore: 0,
      daily: 0,
      weekly: 0,
    },
    miniappInfo: {
      url: null
    },
    todayInfo: {
      title: "loading...",
      text: "loading..."
    },
    search: {
      img: Vue.prototype.$appCache + '/img/icons-app/loading.png',
      placeholder: "loading...",
      to: null,
      url: null,
    },
  },
  oauthInfo: ["qq", "yuque", "afdian", "coding", "github"],
  tipsInfo: {
    gameTips: false,
    extraTips: false,
    playerTips: false
  },
}

Vue.prototype.$appGameInfo = [
  "wzry",
  "jcc",
  //"nsh"
]

Vue.prototype.$appLanguageInfo = [
  {
    title: '中文 (简体)',
    lang: 'zh-CN'
  },
  {
    title: '中文 (繁体)',
    lang: 'zh-HK'
  },
  {
    title: 'English',
    lang: 'en-US'
  },
  {
    title: '日本語',
    lang: 'ja-JP'
  },
]

Vue.prototype.$appWatermarkInfo = {
  content: "",
  font: "12px Microsoft YaHei",
  rotate: 25,
  width: 135,
  height: 100,
  color: "rgb(250, 250, 250)",
};

Vue.prototype.$wzryColumnsInfo = {
  areaType: [
    "请选择大区",
    "安卓QQ",
    "苹果QQ",
    "安卓WX",
    "苹果WX"
  ],
  provinceType: [
    "请选择省份",
    "安徽省",
    "澳门特别行政区",
    "北京市",
    "重庆市",
    "福建省",
    "甘肃省",
    "广东省",
    "广西壮族自治区",
    "贵州省",
    "海南省",
    "河北省",
    "河南省",
    "黑龙江省",
    "湖北省",
    "湖南省",
    "吉林省",
    "江苏省",
    "江西省",
    "辽宁省",
    "内蒙古自治区",
    "宁夏回族自治区",
    "青海省",
    "山东省",
    "山西省",
    "陕西省",
    "上海市",
    "四川省",
    "台湾省",
    "天津市",
    "西藏自治区",
    "香港特别行政区",
    "新疆维吾尔自治区",
    "云南省",
    "浙江省",
  ],
  starType: {
    value: [1, 102, 0, 101, 16, 22, 20, 19, 17, 4, 1],
    text: [
      "请选择段位",
      "传奇王者",
      "荣耀王者",
      "无双王者",
      "最强王者",
      "至尊星耀",
      "永恒钻石",
      "尊贵铂金",
      "荣耀黄金",
      "秩序白银",
      "倔强青铜",
    ],
  },
  fightPowerType: {
    value: [0, 1, 2],
    text: [
      "请选择类型",
      "省1",
      "省100"
    ]
  },
  now: [],
  index: 0,
  type: 0,
}

Vue.prototype.$wzryPositionInfo = [
  ["全部分路", "#000000"],
  ["对抗路", "#ff8c00"],
  ["中路", "#ee0a24"],
  ["发育路", "#1e90ff"],
  ["打野", "#7232dc"],
  ["游走", "#3cb371"]
]

Vue.prototype.$jccPiecePriceInfo = [
  "135, 135, 135",
  "81, 198, 32",
  "33, 99, 192",
  "190, 0, 193",
  "192, 148, 32"
]

Vue.prototype.$nshProfessionInfo = [
  {
    color: [],
    name: "全部",
    icon: "",
    num: [0, 0],
  },
  {
    color: ["190, 125, 75", "234, 152, 92"],
    name: "铁衣",
    icon: "//n.netease.com/data/attachment/common/5e/common_118_icon.jpg",
    num: [0, 0],
  },
  {
    color: ["64, 90, 146", "88, 119, 184"],
    name: "神相",
    icon: "//n.netease.com/data/attachment/common/eb/common_117_icon.jpg",
    num: [0, 0],
  },
  {
    color: ["92, 156, 182", "126, 202, 234"],
    name: "碎梦",
    icon: "//n.netease.com/data/attachment/common/c4/common_116_icon.jpg",
    num: [0, 0],
  },
  {
    color: ["122, 66, 137", "204, 113, 218"],
    name: "九灵",
    icon: "//n.netease.com/data/attachment/common/2b/common_115_icon.jpg",
    num: [0, 0],
  },
  {
    color: ["213, 103, 124", "245, 139, 161"],
    name: "素问",
    icon: "//n.netease.com/data/attachment/common/5f/common_114_icon.jpg",
    num: [0, 0],
  },
  {
    color: ["125, 54, 49", "127, 68, 66"],
    name: "血河",
    icon: "//n.netease.com/data/attachment/common/73/common_113_icon.jpg",
    num: [0, 0],
  }
]

Vue.prototype.$appSetLocalStorage = function (key, value = {}) {
  localStorage.setItem(key, JSON.stringify(value));
}

Vue.prototype.$appGetLocalStorage = function (key) {
  return JSON.parse(localStorage.getItem(key));
}

Vue.prototype.$appDelectLocalStorage = function (key = "ranking") {
  for (let cache in localStorage) {
    if (cache.indexOf(key) > -1) {
      localStorage.removeItem(cache);
    }
  }
}

Vue.prototype.$appDelectAllLocalStorage = function () {
  let cacheList = [
    "appHeroList",
    "appHome",
    "gameHome",
    "heroChartsLog",
    "heroInfo",
    "heroSameHobby",
    "heroUpdate",
    "ranking",
    "search",
    "searchData",
    "tempTeam"
  ];

  cacheList.map((x) => {
    Vue.prototype.$appDelectLocalStorage(x);
  })
}

let ls = Vue.prototype.$appGetLocalStorage("appConfigInfo");
if (!ls) {
  Vue.prototype.$appSetLocalStorage("appConfigInfo", Vue.prototype.$appConfigInfo);
}
Vue.prototype.$appConfigInfo = Vue.prototype.$appGetLocalStorage("appConfigInfo");

Vue.prototype.$appBack = function () {
  let data = {
    path: this.$store.getters.getHistory.fullPath,
  };

  //data.replace = true;

  this.$router.push(data);
}

Vue.prototype.$appPush = function (data = { path: '/' }) {
  //data.replace = true;

  this.$router.push(data);
}

Vue.prototype.$appFloatToTime = function (float) {
  let arr = float.toFixed(2).split("."),
    arr_1 = "0",
    num_1 = "0",
    arr_2 = "0",
    num_2 = "0";

  arr_1 = arr[0];
  arr_2 = arr[1];

  if (parseInt(arr_1) < 10) {
    num_1 = "0" + arr_1;
  } else {
    num_1 = arr_1;
  }

  num_2 = ((arr_2 / 100) * 60).toFixed(0);

  if (parseInt(num_2) < 10) {
    num_2 = "0" + num_2;
  }

  return num_1 + ":" + num_2;
}

Vue.prototype.$appInitMiniapp = function () {
  Vue.prototype.$axios.post(Vue.prototype.$appApi.app.getJsapiTicket).then((res) => {
    let data = res.data.data;

    Vue.prototype.$share = data.extraData;

    if (Vue.prototype.$appInDouyin) {
      Vue.prototype.$douyin = window.tt;

      /**
       * 
       * 小程序通讯
       * 
       */
      Vue.prototype.$douyin.miniProgram.getEnv((res) => {
        if (res.miniprogram) {
          if (data.type == "getAd") {
            Vue.prototype.$douyin.miniProgram.navigateBack({ back: Vue.prototype.$appTs });

            Vue.prototype.$douyin.miniProgram.postMessage({
              data: {
                type: "getAd"
              }
            });
          } else if (data.type == "share") {
            /**
             * 
             * 网页分享
             * 
             */
            Vue.prototype.$douyin.updateAppMessageShareData({
              title: data.extraData.title,
              desc: data.extraData.desc,
              link: data.extraData.link,
              imgUrl: data.extraData.imgUrl,
            });

            Vue.prototype.$douyin.miniProgram.postMessage({
              data: {
                type: "share",
                extra: {
                  url: window.location.href.split("#")[0],
                  share: data.extraData
                }
              }
            });
          }
        }
      });
    }

    if (Vue.prototype.$appInWechat) {
      Vue.prototype.$wechat = window.wx;

      Vue.prototype.$wechat.config(data.ticket);
      Vue.prototype.$wechat.ready(() => {
        /**
         * 
         * 小程序通讯
         * 
         */
        Vue.prototype.$wechat.miniProgram.getEnv((res) => {
          if (res.miniprogram) {
            if (data.type == "getAd") {
              Vue.prototype.$wechat.miniProgram.navigateTo({ url: '/pages/web/web?url=' + encodeURIComponent("https://docs.91m.top?ref=getAd") });
              Vue.prototype.$wechat.miniProgram.navigateBack({ delta: 1 });

              Vue.prototype.$wechat.miniProgram.postMessage({
                data: {
                  type: "getAd"
                }
              });
            } else if (data.type == "share") {
              /**
               * 
               * 网页分享
               * 
               */
              Vue.prototype.$wechat.updateAppMessageShareData({
                title: data.extraData.title,
                desc: data.extraData.desc,
                link: data.extraData.link,
                imgUrl: data.extraData.imgUrl,
              });

              Vue.prototype.$wechat.miniProgram.postMessage({
                data: {
                  type: "share",
                  extra: {
                    url: window.location.href.split("#")[0],
                    share: data.extraData
                  }
                }
              });
            }
          }
        });
      });
    }
  });
}

Vue.prototype.$appOpenUrl = function (title, message = null, data = { path: '/' }, urlType = 0) {
  if (urlType == 0) {
    let ls = Vue.prototype.$appConfigInfo;

    if (ls.appInfo.openUrl) {
      let nowMessage;
      message ? nowMessage = message : nowMessage = "我的 - 设置 (右上角) 中可关闭确认框";

      this.$dialog
        .confirm({
          title: title,
          message: nowMessage
        })
        .then(() => {
          //on confirm
          //window.open(data.path);

          if (Vue.prototype.$appInWechatMiniapp) {
            Vue.prototype.$wechat.ready(() => {
              Vue.prototype.$wechat.miniProgram.getEnv((res) => {
                if (res.miniprogram) {
                  this.$copyText(data.path).then(
                    () => {
                      this.$message.success("复制成功，请用自带浏览器打开");
                    },
                    () => {
                      //this.$message.error("复制失败");
                    }
                  );
                }
              });
            })
          } else {
            window.open(data.path);
          }
        })
        .catch(() => {
          //on cancel
        });
    } else {
      window.open(data.path);
    }
  } else {
    if (message) {
      this.$message.warning(message);
    }

    //data.replace = true;

    this.$router.push(data);
  }
}

Vue.prototype.$appInitTableHeight = function (newHeight = 0) {
  let ret = 0,
    width = this.$appWidth,
    height = this.$appHeight;

  width > height ? (ret = height - 103) : (ret = height - 138);

  return ret + newHeight;
}

Vue.prototype.$appInitTableWidth = function (tableWidth) {
  let ret = 0,
    width = this.$appWidth;

  (!this.$appIsMobile || width > 300) && width > tableWidth ? ret = 0 : ret = 90;

  return ret;
}

Vue.prototype.$appCopyData = function (data, successText = "复制成功", errorText = "复制失败") {
  this.$dialog
    .confirm({
      title: "是否复制?",
      message: "您的分享是我更新的动力"
    })
    .then(() => {
      this.$copyText(data).then(
        () => {
          this.$message.success(successText);
        },
        () => {
          this.$message.error(errorText);
        }
      );
    })
    .catch(() => {
      //on cancel
    });
}