import Vue from 'vue';

import qs from 'qs';
Vue.prototype.$qs = qs;

import cookie from 'vue-cookie';
Vue.prototype.$cookie = cookie;

import aegis from "aegis-web-sdk";

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

if (/127\.0\.0\.1|localhost/i.test(url.host)) {
    baseUrl = "//localhost/api.91m.top";
} else {
    baseUrl = "//api.91m.top";

    new aegis({
        id: "5GVrzSe8lWdPQ86vmw",
        uin: cookie.get("openId") || "",
        reportApiSpeed: true,
        reportAssetSpeed: true,
        spa: true,
    });
}
axios.defaults.baseURL = baseUrl;
axios.interceptors.request.use(function(config) {
        let data = qs.parse(config.data);

        config.url += "&host=" + (cookie.get("host") || url.host) + "&url=" + encodeURIComponent(url.pathname + url.search) + "&ref=" + encodeURIComponent(cookie.get("ref") || "");

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
    function(error) {
        return Promise.reject(error);
    })
Vue.prototype.$axios = axios;

const pvpApi = baseUrl + "/hero/v1/app.php";
const gameApi = baseUrl + "/hero/v1/game.php";
const loginApi = baseUrl + "/hero/v1/login.php";
const biliApi = baseUrl + "/hero/v1/bilibili.php";

const app = {
    proxyImg: baseUrl + "/proxy/img?url="
}

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

const pvp = {
    addHeroByCombination: pvpApi + "?type=addHeroByCombination",
    addHeroFightPowerByWebAccount: pvpApi + "?type=addHeroFightPowerByWebAccount",
    addHeroVote: pvpApi + "?type=addHeroVote",
    addWebAccountLikeHero: pvpApi + "?type=addWebAccountLikeHero",
    createEngage: pvpApi + "?type=createEngage",
    createTeam: pvpApi + "?type=createTeam",
    deleteGameBP: pvpApi + "?type=deleteGameBP",
    deleteTeam: pvpApi + "?type=deleteTeam",
    getImg: pvpApi + "?type=getImg",
    getAppHome: pvpApi + "?type=getAppHome",
    getAppInfo: pvpApi + "?type=getAppInfo",
    getCivilwarMatchInfo: pvpApi + "?type=getCivilwarMatchInfo",
    getGameDashboard: pvpApi + "?type=getGameDashboard",
    getHeroChartsLog: pvpApi + "?type=getHeroChartsLog",
    getHeroInfo: pvpApi + "?type=getHeroInfo",
    getHeroInfoByWebAccountList: pvpApi + "?type=getHeroInfoByWebAccountList",
    getHeroReplayByHeroId: pvpApi + "?type=getHeroReplayByHeroId",
    getHeroUpdate: pvpApi + "?type=getHeroUpdate",
    getHeroUpdateText: pvpApi + "?type=getHeroUpdateText",
    getMiniAppInfo: pvpApi + "?type=getMiniAppInfo",
    getRanking: pvpApi + "?type=getRanking",
    getShortUrl: pvpApi + "?type=getShortUrl",
    getSearch: pvpApi + "?type=getSearch",
    getSkinReturnLog: pvpApi + "?type=getSkinReturnLog",
    getSmobaHelperUserInfo: pvpApi + "?type=getSmobaHelperUserInfo",
    getWebAccountInfo: pvpApi + "?type=getWebAccountInfo",
    loginWebAccount: pvpApi + "?type=loginWebAccount",
    updateGameBP: pvpApi + "?type=updateGameBP",
    updateTeamInfo: pvpApi + "?type=updateTeamInfo",
    updateWebAccountInfo: pvpApi + "?type=updateWebAccountInfo",
    uploadImg: pvpApi + "?type=uploadImg"
}

export default {
    app,
    bili,
    game,
    login,
    pvp
}