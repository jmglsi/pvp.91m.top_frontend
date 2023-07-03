import Vue from 'vue';
import router from '../../router';

import qs from 'qs';
Vue.prototype.$qs = qs;

import cookie from 'vue-cookie';
Vue.prototype.$cookie = cookie;

import aegis from 'aegis-web-sdk';

import axios from 'axios';

let url = location,
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
  let data = qs.parse(config.data);

  config.url += "&host=" + (cookie.get("host") || url.host) + "&lang=" + (cookie.get("lang") || "zh-CN") + "&url=" + encodeURIComponent(url.pathname + url.search) + "&ref=" + encodeURIComponent(cookie.get("ref") || "");

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
    if (response.data.status.code == 2004) {
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
const gameApi = baseUrl + "/hero/v1/game.php";
const loginApi = baseUrl + "/hero/v1/login.php";
const biliApi = baseUrl + "/hero/v1/bilibili.php";

const bili = {
  getOrderInfo: biliApi + "?type=getOrderInfo"
}

const game = {
  getGameBP: gameApi + "?type=getGameBP",
  getGameBPFile: gameApi + "?type=getGameBPFile",
  getGameHome: gameApi + "?type=getGameHome",
  getGamePrediction: gameApi + "?type=getGamePrediction"
}

const login = {
  getLogin: loginApi
}

const app = {
  apiHost: "//api.91m.top",
  appProxy: "//91m.top/p?url=",
  addHeroByCombination: appApi + "?type=addHeroByCombination",
  addHeroFightPowerByWebAccount: appApi + "?type=addHeroFightPowerByWebAccount",
  addHeroVote: appApi + "?type=addHeroVote",
  addWebAccountLikeHero: appApi + "?type=addWebAccountLikeHero",
  createEngage: appApi + "?type=createEngage",
  createTeam: appApi + "?type=createTeam",
  deleteGameBP: appApi + "?type=deleteGameBP",
  deleteTeam: appApi + "?type=deleteTeam",
  getAppHome: appApi + "?type=getAppHome",
  getAppInfo: appApi + "?type=getAppInfo",
  getCivilwarMatchInfo: appApi + "?type=getCivilwarMatchInfo",
  getGameDashboard: appApi + "?type=getGameDashboard",
  getHeroBpIndex: appApi + "?type=getHeroBpIndex",
  getHeroChartsLog: appApi + "?type=getHeroChartsLog",
  getHeroInfo: appApi + "?type=getHeroInfo",
  getHeroInfoByWebAccountList: appApi + "?type=getHeroInfoByWebAccountList",
  getHeroProficiency: appApi + "?type=getHeroProficiency",
  getHeroReplayByHeroId: appApi + "?type=getHeroReplayByHeroId",
  getHeroUpdate: appApi + "?type=getHeroUpdate",
  getHeroUpdateDetail: appApi + "?type=getHeroUpdateDetail",
  getMiniAppInfo: appApi + "?type=getMiniAppInfo",
  getRanking: appApi + "?type=getRanking",
  getSearch: appApi + "?type=getSearch",
  getShortUrl: appApi + "?type=getShortUrl",
  getSkinReturnLog: appApi + "?type=getSkinReturnLog",
  getSmobaHelperUserInfo: appApi + "?type=getSmobaHelperUserInfo",
  getWebAccountInfo: appApi + "?type=getWebAccountInfo",
  loginWebAccount: appApi + "?type=loginWebAccount",
  updateGameBP: appApi + "?type=updateGameBP",
  updateTeamInfo: appApi + "?type=updateTeamInfo",
  updateWebAccountInfo: appApi + "?type=updateWebAccountInfo",
  uploadImg: appApi + "?type=uploadImg"
}

export default {
  app,
  bili,
  game,
  login
}