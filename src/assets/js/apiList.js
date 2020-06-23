let host;

location.host.indexOf("91m.top") > -1 ? host = "api.91m.top" : host = "localhost/api.91m.top"

const appApi = "//" + host + "/hero/v1/app.php"
const gameApi = "//" + host + "/hero/v1/game.php"
const biliApi = "//" + host + "/hero/v1/bilibili.php"

const pvp = {
    getAppInfo: appApi + "?type=getAppInfo",
    getAppHome: appApi + "?type=getAppHome",
    getMiniApp: appApi + "?type=getMiniApp",
    addHeroVote: appApi + "?type=addHeroVote",
    getHeroInfo: appApi + "?type=getHeroInfo",
    getHeroUpdate: appApi + "?type=getHeroUpdate",
    getHeroRanking: appApi + "?type=getHeroRanking",
    loginWebAccount: appApi + "?type=loginWebAccount",
    getPlayerRanking: appApi + "?type=getPlayerRanking",
    getHeroChartsLog: appApi + "?type=getHeroChartsLog",
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