import Vue from 'vue';
import router from '../../router';

import qs from 'qs';
Vue.prototype.$qs = qs;

import cookie from 'vue-cookie';
Vue.prototype.$cookie = cookie;

import aegis from 'aegis-web-sdk';

import axios from 'axios';
Vue.prototype.$axios = axios;

let url = window.location,
  nowQuery = Vue.prototype.$appQuery,
  baseUrl,
  baseHost = nowQuery.host || null,
  baseRef = nowQuery.ref || null;

if (baseHost) {
  cookie.set("host", baseHost);
}

if (baseRef) {
  cookie.set("ref", baseRef);
}

if (process.env.NODE_ENV === 'production') {
  new aegis({
    id: "5GVrzSe8lWdPQ86vmw",
    uin: cookie.get("openId") || null,
    reportApiSpeed: true,
    reportAssetSpeed: true,
    spa: true,
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
    url_real = window.location.href.split("#")[0], url_last;

  if (Vue.prototype.$appIsApple) {
    url_last = Vue.prototype.$store.getters.getLastUrl || "";

    if (!url_last) {
      Vue.prototype.$store.commit("saveLastUrl", url_real);
    }
  } else {
    url_last = url_real;
  }

  config.url += "&host=" + (cookie.get("host") || url.host) + "&lang=" + (cookie.get("lang") || "zh-CN") + "&ref=" + encodeURIComponent(cookie.get("ref") || "") + "&url=" + encodeURIComponent(url_last) + "&url_real=" + encodeURIComponent(url_real);

  if (config.method == "post") {
    const openId = cookie.get("openId");
    const accessToken = cookie.get("accessToken");

    const tempOpenId = cookie.get("tempOpenId");
    const tempAccessToken = cookie.get("tempAccessToken");

    config.data = qs.stringify({
      openId: openId || tempOpenId,
      accessToken: accessToken || tempAccessToken,
      ...data
    });
  }

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
      location.href = "https://docs.91m.top?ref=expired";
    } else if (code == 2004) {
      let currentRoute = router.currentRoute;

      cookie.delete("openId");
      cookie.delete("accessToken");
      cookie.delete("tempOpenId");
      cookie.delete("tempAccessToken");

      if (currentRoute.name != "login") {
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

Vue.prototype.$axios = axios;

const appApi = baseUrl + "/hero/v1/app.php";
const appAdminApi = baseUrl + "/hero/v1/admin.php";
//const biliApi = baseUrl + "/hero/v1/bilibili.php";
const gameApi = baseUrl + "/hero/v1/game.php";
const loginApi = baseUrl + "/hero/v1/login.php";

const botAdminApi = process.env.VUE_APP_BOT_URL + "/admin.php";

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
  getCivilwarMatchInfo: appApi + "?type=getCivilwarMatchInfo",
  getCoordinate: appApi + "?type=getCoordinate",
  getChallenge: appApi + "?type=getChallenge",
  getHeroBpIndex: appApi + "?type=getHeroBpIndex",
  getHeroChartsLog: appApi + "?type=getHeroChartsLog",
  getHeroInfo: appApi + "?type=getHeroInfo",
  getHeroInfoByRandSuit: appApi + "?type=getHeroInfoByRandSuit",
  getHeroInfoByWebAccountList: appApi + "?type=getHeroInfoByWebAccountList",
  getHeroProficiency: appApi + "?type=getHeroProficiency",
  getHeroReplayByHeroId: appApi + "?type=getHeroReplayByHeroId",
  getHeroUpdate: appApi + "?type=getHeroUpdate",
  getHeroUpdateDetail: appApi + "?type=getHeroUpdateDetail",
  getJsapiTicket: appApi + "?type=getJsapiTicket",
  getMiniAppInfo: appApi + "?type=getMiniAppInfo",
  getRanking: appApi + "?type=getRanking",
  getSearch: appApi + "?type=getSearch",
  getShortUrl: appApi + "?type=getShortUrl",
  getSkinReturnLog: appApi + "?type=getSkinReturnLog",
  getSmobaHelperUserInfo: appApi + "?type=getSmobaHelperUserInfo",
  getWebAccountInfo: appApi + "?type=getWebAccountInfo",
  loginWebAccount: appApi + "?type=loginWebAccount",
  updateWebAccountInfo: appApi + "?type=updateWebAccountInfo",
  uploadImg: appApi + "?type=uploadImg",
  //
  getDataByWebData: appAdminApi + "?type=getDataByWebData"
}

/*
const bili = {
  getOrderInfo: biliApi + "?type=getOrderInfo"
}
*/

const game = {
  createEngage: gameApi + "?type=createEngage",
  createRole: gameApi + "?type=createRole",
  createTeam: gameApi + "?type=createTeam",
  deleteGameBP: gameApi + "?type=deleteGameBP",
  deleteTeam: gameApi + "?type=deleteTeam",
  getGameBP: gameApi + "?type=getGameBP",
  getGameBPFile: gameApi + "?type=getGameBPFile",
  getGameDashboard: gameApi + "?type=getGameDashboard",
  getGameHome: gameApi + "?type=getGameHome",
  getGamePrediction: gameApi + "?type=getGamePrediction",
  getTeamInfo: gameApi + "?type=getTeamInfo",
  joinTeam: gameApi + "?type=joinTeam",
  setStatus: gameApi + "?type=setStatus",
  setUsed: gameApi + "?type=setUsed",
  updateGameBP: gameApi + "?type=updateGameBP",
  updateGameBPIndex: gameApi + "?type=updateGameBPIndex",
  updateTeamInfo: gameApi + "?type=updateTeamInfo",
}

const login = {
  getLogin: loginApi
}

const bot = {
  getDataByRobotData: botAdminApi + "?type=getDataByRobotData",
  sendMsg: botAdminApi + "?type=sendMsg"
}

export default {
  app,
  //bili,
  game,
  login,
  bot
}