let host;

location.host.indexOf("91m.top") > -1 ? host = "//api.91m.top" : host = "//localhost/api.91m.top"

const appApi = host + "/hero/v1/app.php";
const gameApi = host + "/hero/v1/game.php";
const biliApi = host + "/hero/v1/bilibili.php";

const pvp = {
    addHeroByCombination: appApi + "?type=addHeroByCombination",
    addHeroVote: appApi + "?type=addHeroVote",
    addWebAccountHeroLike: appApi + "?type=addWebAccountHeroLike",
    createEngage: appApi + "?type=createEngage",
    createTeam: appApi + "?type=createTeam",
    deleteGameBP: appApi + "?type=deleteGameBP",
    deleteTeam: appApi + "?type=deleteTeam",
    getAppHome: appApi + "?type=getAppHome",
    getAppInfo: appApi + "?type=getAppInfo",
    getGameDashboard: appApi + "?type=getGameDashboard",
    getHeroByWebAccountList: appApi + "?type=getHeroByWebAccountList",
    getHeroChartsLog: appApi + "?type=getHeroChartsLog",
    getHeroInfo: appApi + "?type=getHeroInfo",
    getHeroReplayByHeroId: appApi + "?type=getHeroReplayByHeroId",
    getHeroUpdate: appApi + "?type=getHeroUpdate",
    getHeroUpdateText: appApi + "?type=getHeroUpdateText",
    getMiniApp: appApi + "?type=getMiniApp",
    getRanking: appApi + "?type=getRanking",
    getSkinReturn: appApi + "?type=getSkinReturn",
    getSkinReturnLog: appApi + "?type=getSkinReturnLog",
    getSmobaHelperUserInfo: appApi + "?type=getSmobaHelperUserInfo",
    getWebAccountInfo: appApi + "?type=getWebAccountInfo",
    loginWebAccount: appApi + "?type=loginWebAccount",
    updateGameBP: appApi + "?type=updateGameBP",
    updateTeamInfo: appApi + "?type=updateTeamInfo",
    uploadImg: appApi + "?type=uploadImg"
}

const game = {
    getGameBP: gameApi + "?type=getGameBP",
    getGameHome: gameApi + "?type=getGameHome"
}

const bili = {
    getOrderInfo: biliApi + "?type=getOrderInfo"
}

export default {
    bili,
    game,
    pvp
}