import Vue from 'vue';
import router from '../../router';

import qs from 'qs';
Vue.prototype.$qs = qs;

import cookie from 'vue-cookie';
Vue.prototype.$cookie = cookie;

import md5 from "js-md5";
Vue.prototype.$md5 = md5;

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
  //生产环境
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
    ts = Number(Date.parse(new Date()).toString().slice(0, 10)),
    url_real = window.location.href.split("#")[0] || "",
    url_last = url_real || "";

  if (Vue.prototype.$appIsApple) {
    url_last = Vue.prototype.$store.getters.getLastUrl || "";

    if (!url_last) {
      Vue.prototype.$store.commit("saveLastUrl", url_real);
    }
  }

  config.url += "&host=" + encodeURIComponent(cookie.get("host") || url.host) + "&lang=" + encodeURIComponent(cookie.get("lang") || "zh-CN") + "&ref=" + encodeURIComponent(cookie.get("ref") || "") + "&game_type=" + encodeURIComponent(cookie.get("game-type") || "wzry") + "&url=" + encodeURIComponent(url_last) + "&url_real=" + encodeURIComponent(url_real) + "&ts=" + ts;

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

  var newUrl = "",
    get = config.url.split("?")[1].split("&"),
    post = config.data.split("&");

  newUrl = get.join("&") + "&" + post.join("&");
  newUrl = newUrl.split("&").sort().join("&");

  config.url += "&sign=" + Vue.prototype.$md5(newUrl);

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
      window.location.href = "https://docs.91m.top?ref=expired";
    } else if (code == 2004) {
      let currentRoute = router.currentRoute;

      cookie.delete("openId");
      cookie.delete("accessToken");
      //-
      cookie.delete("tempOpenId");
      cookie.delete("tempAccessToken");
      cookie.delete("game-type");
      cookie.delete("game-index");
      cookie.delete("lastUpdateTipsDay");

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