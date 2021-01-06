let host = "";

location.host.indexOf("91m.top") > -1 ? host = "//api.91m.top" : host = "//localhost/api.91m.top"

const pvpApi = host + "/hero/v1/app.php";
const gameApi = host + "/hero/v1/game.php";
const biliApi = host + "/hero/v1/bilibili.php";

const pvp = {
    addHeroByCombination: pvpApi + "?type=addHeroByCombination",
    addHeroVote: pvpApi + "?type=addHeroVote",
    addWebAccountHeroLike: pvpApi + "?type=addWebAccountHeroLike",
    createEngage: pvpApi + "?type=createEngage",
    createTeam: pvpApi + "?type=createTeam",
    deleteGameBP: pvpApi + "?type=deleteGameBP",
    deleteTeam: pvpApi + "?type=deleteTeam",
    getAppHome: pvpApi + "?type=getAppHome",
    getAppInfo: pvpApi + "?type=getAppInfo",
    getGameDashboard: pvpApi + "?type=getGameDashboard",
    getHeroByWebAccountList: pvpApi + "?type=getHeroByWebAccountList",
    getHeroChartsLog: pvpApi + "?type=getHeroChartsLog",
    getHeroEquipment: pvpApi + "?type=getHeroEquipment",
    getHeroInfo: pvpApi + "?type=getHeroInfo",
    getHeroReplayByHeroId: pvpApi + "?type=getHeroReplayByHeroId",
    getHeroSkill: pvpApi + "?type=getHeroSkill",
    getHeroUpdate: pvpApi + "?type=getHeroUpdate",
    getHeroUpdateText: pvpApi + "?type=getHeroUpdateText",
    getMiniAppInfo: pvpApi + "?type=getMiniAppInfo",
    getRanking: pvpApi + "?type=getRanking",
    getSkinReturn: pvpApi + "?type=getSkinReturn",
    getSkinReturnLog: pvpApi + "?type=getSkinReturnLog",
    getSmobaHelperUserInfo: pvpApi + "?type=getSmobaHelperUserInfo",
    getWebAccountInfo: pvpApi + "?type=getWebAccountInfo",
    loginWebAccount: pvpApi + "?type=loginWebAccount",
    updateGameBP: pvpApi + "?type=updateGameBP",
    updateTeamInfo: pvpApi + "?type=updateTeamInfo",
    uploadImg: pvpApi + "?type=uploadImg"
}

const game = {
    getGameBP: gameApi + "?type=getGameBP",
    getGameHome: gameApi + "?type=getGameHome",
    getGamePrediction: gameApi + "?type=getGamePrediction"
}

const bili = {
    getOrderInfo: biliApi + "?type=getOrderInfo"
}

export default {
    bili,
    game,
    pvp
}