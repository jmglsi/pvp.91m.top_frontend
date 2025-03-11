import Vue from 'vue';
import router from '../../router';

import qs from 'qs';
Vue.prototype.$qs = qs;

import md5 from "js-md5";
Vue.prototype.$md5 = md5;

import axios from 'axios';
Vue.prototype.$axios = axios;

import DisableDevtool from 'disable-devtool';

let nowCookie = Vue.prototype.$appCookie,
  nowQuery = Vue.prototype.$appQuery,
  nowUrl = window.location,
  baseUrl,
  baseHost = nowQuery.host || null,
  baseRef = nowQuery.ref || null;

if (baseHost) {
  nowCookie("host", baseHost);
}

if (baseRef) {
  nowCookie("ref", baseRef);
}

if (process.env.NODE_ENV === 'production') {
  //生产环境

  DisableDevtool({
    md5: "4a78b654ecc9e66b35528619c2665cba",
    timeOutUrl: "about:blank"
  });
}

baseUrl = process.env.VUE_APP_BASE_URL;

axios.defaults.baseURL = baseUrl;
/**
 * 
 * 请求拦截器
 * 
 */
axios.interceptors.request.use(function (config) {
  let data = qs.parse(config.data),
    ts = Vue.prototype.$appXEUtils.timestamp(new Date()).toString().slice(0, 10),
    url_real = window.location.href.split("#")[0] || "",
    url_last = url_real || "";

  if (Vue.prototype.$appIsApple) {
    url_last = Vue.prototype.$store.getters.getLastUrl || "";

    if (!url_last) {
      Vue.prototype.$store.commit("saveLastUrl", url_real);
    }
  }

  config.url += "&host=" + encodeURIComponent(nowCookie("host") || nowUrl.host) + "&lang=" + encodeURIComponent(nowCookie("lang") || "zh-CN") + "&ref=" + encodeURIComponent(nowCookie("ref") || "") + "&game_type=" + encodeURIComponent(nowCookie("game-type") || "wzry") + "&url=" + encodeURIComponent(url_last) + "&url_real=" + encodeURIComponent(url_real) + "&ts=" + ts;

  if (config.method == "post") {
    const openId = nowCookie("openId");
    const accessToken = nowCookie("accessToken");

    const tempOpenId = nowCookie("tempOpenId");
    const tempAccessToken = nowCookie("tempAccessToken");

    config.data = qs.stringify({
      openId: openId || tempOpenId,
      accessToken: accessToken || tempAccessToken,
      ...data
    });
  }

  let newUrl = "",
    get = config.url.split("?")[1].split("&"),
    post = config.data.split("&");

  newUrl = get.concat(post).join("&");
  newUrl = newUrl.split("&").sort().join("&");

  /**
   * 
   * 移除开头的 &
   * 
   */
  if (newUrl.startsWith('&')) {
    newUrl = newUrl.slice(1);
  }

  let a = "i", b = "n", c = "=", d = "&", e = "g", f = "s";

  config.url += (d + f + a + e + b + c) + Vue.prototype.$md5(newUrl);

  return config;
},
  function (error) {
    return Promise.reject(error);
  })

/**
 * 
 * 返回拦截器
 * 
 */
axios.interceptors.response.use(
  response => {
    let code = response.data.status.code;

    if (code == 988) {
      window.location.href = "https://docs.91m.top?tempCode=1000";
    } else if (code == 2004) {
      let currentRoute = router.currentRoute;

      nowCookie("openId", null, {
        expires: -1,
      });
      nowCookie("accessToken", null, {
        expires: -1,
      });
      //-
      nowCookie("tempOpenId", null, {
        expires: -1,
      });
      nowCookie("tempAccessToken", null, {
        expires: -1,
      });
      nowCookie("game-type", null, {
        expires: -1,
      });
      nowCookie("game-index", null, {
        expires: -1,
      });
      nowCookie("lastUpdateTipsDay", null, {
        expires: -1,
      });

      if (currentRoute.name != "userLogin") {
        router.replace({
          path: "/login",
          query: { redirect: currentRoute.fullPath }
        })
      }
    }

    return response;
  },
  error => {
    if (error.response) {
      //
    }
    return Promise.reject(error.response.data)
  });

const appApi = baseUrl;

const gameApi = baseUrl + "?method=game";
const loginApi = baseUrl + "?method=login";
const robotApi = baseUrl + "?method=robot";
const payApi = baseUrl + "?method=pay";

const appAdminApi = baseUrl + "?method=admin";
const robotAdminApi = process.env.VUE_APP_BOT_URL + "?method=admin";

const app = {
  apiHost: "//api.91m.top",
  appProxy: "//91m.top/p?url=",
  addHeroByCombination: appApi + "?type=addHeroByCombination",
  addHeroFightPowerByWebAccount: appApi + "?type=addHeroFightPowerByWebAccount",
  addHeroVote: appApi + "?type=addHeroVote",
  addWebAccountLikeHero: appApi + "?type=addWebAccountLikeHero",
  getAfdian: appApi + "?type=getAfdian",
  getAppHome: appApi + "?type=getAppHome",
  getAppInfo: appApi + "?type=getAppInfo",
  getChallenge: appApi + "?type=getChallenge",
  getCivilwarMatchInfo: appApi + "?type=getCivilwarMatchInfo",
  getCoordinate: appApi + "?type=getCoordinate",
  getHeroChartsLog: appApi + "?type=getHeroChartsLog",
  getHeroInfo: appApi + "?type=getHeroInfo",
  getHeroInfoByRandSuit: appApi + "?type=getHeroInfoByRandSuit",
  getHeroInfoByWebAccountList: appApi + "?type=getHeroInfoByWebAccountList",
  getHeroProficiency: appApi + "?type=getHeroProficiency",
  getHeroReplayByHeroId: appApi + "?type=getHeroReplayByHeroId",
  getHeroUpdate: appApi + "?type=getHeroUpdate",
  getJsapiTicket: appApi + "?type=getJsapiTicket",
  getMiniAppInfo: appApi + "?type=getMiniAppInfo",
  getRanking: appApi + "?type=getRanking",
  getSearch: appApi + "?type=getSearch",
  getShoppingInfo: appApi + "?type=getShoppingInfo",
  getShortUrl: appApi + "?type=getShortUrl",
  getSign: appApi + "?type=getSign",
  getSkinReturnLog: appApi + "?type=getSkinReturnLog",
  getSmobaHelperUserInfo: appApi + "?type=getSmobaHelperUserInfo",
  getWebAccountInfo: appApi + "?type=getWebAccountInfo",
  loginWebAccount: appApi + "?type=loginWebAccount",
  updateShoppingInfo: appApi + "?type=updateShoppingInfo",
  updateSkinRate: appApi + "?type=updateSkinRate",
  updateWebAccountInfo: appApi + "?type=updateWebAccountInfo",
  uploadImg: appApi + "?type=uploadImg",
  //
  getAdminData: appAdminApi + "&type=getAdminData",
  cleanAdminData: appAdminApi + "&type=cleanAdminData",
}

const game = {
  createEngage: gameApi + "&type=createEngage",
  createRole: gameApi + "&type=createRole",
  createTeam: gameApi + "&type=createTeam",
  deleteGameBP: gameApi + "&type=deleteGameBP",
  deleteTeam: gameApi + "&type=deleteTeam",
  getGameBP: gameApi + "&type=getGameBP",
  getGameBPFile: gameApi + "&type=getGameBPFile",
  getGameDashboard: gameApi + "&type=getGameDashboard",
  getGameHome: gameApi + "&type=getGameHome",
  getGamePrediction: gameApi + "&type=getGamePrediction",
  getTeamInfo: gameApi + "&type=getTeamInfo",
  joinTeam: gameApi + "&type=joinTeam",
  setStatus: gameApi + "&type=setStatus",
  setUsed: gameApi + "&type=setUsed",
  updateGameBP: gameApi + "&type=updateGameBP",
  updateGameBPIndex: gameApi + "&type=updateGameBPIndex",
  updateTeamInfo: gameApi + "&type=updateTeamInfo",
}

const login = {
  getLogin: loginApi
}

const robot = {
  getRssList: robotApi + "&type=rss",
  //
  getDataByRobotData: robotAdminApi + "&type=getDataByRobotData",
  sendMsg: robotAdminApi + "&type=sendMsg",
}

const pay = {
  getAdminData: payApi + "&type=getAdminData",
}

export default {
  app,
  game,
  login,
  robot,
  pay
}