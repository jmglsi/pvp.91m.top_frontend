let host;

location.host.indexOf("91m.top") > -1 ? host = "api.91m.top" : host = "192.168.1.204/api.91m.top"

const appApi = "//" + host + "/hero/v1/app.php"
const gameApi = "//" + host + "/hero/v1/game.php"
const biliApi = "//" + host + "/hero/v1/bilibili.php"

const pvp = {
    getAppInfo: appApi + "?type=getAppInfo",
    getAppHome: appApi + "?type=getAppHome",
    getMiniApp: appApi + "?type=getMiniApp",
    createTeam: appApi + "?type=createTeam",
    delectTeam: appApi + "?type=delectTeam",
    addHeroVote: appApi + "?type=addHeroVote",
    getHeroInfo: appApi + "?type=getHeroInfo",
    createEngage: appApi + "?type=createEngage",
    updateGameBP: appApi + "?type=updateGameBP",
    delectGameBP: appApi + "?type=delectGameBP",
    getHeroUpdate: appApi + "?type=getHeroUpdate",
    updateTeamInfo: appApi + "?type=updateTeamInfo",
    getHeroRanking: appApi + "?type=getHeroRanking",
    loginWebAccount: appApi + "?type=loginWebAccount",
    getPlayerRanking: appApi + "?type=getPlayerRanking",
    getHeroChartsLog: appApi + "?type=getHeroChartsLog",
    getGameDashboard: appApi + "?type=getGameDashboard",
    getWebAccountInfo: appApi + "?type=getWebAccountInfo",
    getHeroCombination: appApi + "?type=getHeroCombination",
    addHeroByCombination: appApi + "?type=addHeroByCombination",
    getHeroReplayByHeroId: appApi + "?type=getHeroReplayByHeroId",
    getSmobaHelperUserInfo: appApi + "?type=getSmobaHelperUserInfo",
    getHeroChartsLogBySimilar: appApi + "?type=getHeroChartsLogBySimilar",
    getHeroChartsLogByCustomize: appApi + "?type=getHeroChartsLogByCustomize"
}

const game = {
    getGameBP: gameApi + "?type=getGameBP",
    getGameHome: gameApi + "?type=getGameHome"
}

const bili = {
    getOrderInfo: biliApi + "?type=getOrderInfo"
}

export default {
    pvp,
    game,
    bili
}