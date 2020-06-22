let host, debug = false;

debug ? host = "localhost/api.91m.top" : host = "api.91m.top"

const pvp = "//" + host + "/hero/v1/app.php"
const game = "//" + host + "/hero/v1/game.php"
const bili = "//" + host + "/hero/v1/bilibili.php"

const list = {
    getGameBP: game + "?type=getGameBP",
    getAppInfo: pvp + "?type=getAppInfo",
    getAppHome: pvp + "?type=getAppHome",
    getMiniApp: pvp + "?type=getMiniApp",
    addHeroVote: pvp + "?type=addHeroVote",
    getHeroInfo: pvp + "?type=getHeroInfo",
    getUserInfo: pvp + "?type=getUserInfo",
    getGameHome: game + "?type=getGameHome",
    getOrderInfo: bili + "?type=getOrderInfo",
    getHeroUpdate: pvp + "?type=getHeroUpdate",
    getHeroRanking: pvp + "?type=getHeroRanking",
    getPlayerRanking: pvp + "?type=getPlayerRanking",
    getHeroChartsLog: pvp + "?type=getHeroChartsLog",
    getHeroCombination: pvp + "?type=getHeroCombination",
    addHeroByCombination: pvp + "?type=addHeroByCombination",
    getHeroReplayByHeroId: pvp + "?type=getHeroReplayByHeroId",
    getHeroChartsLogBySimilar: pvp + "?type=getHeroChartsLogBySimilar",
    getHeroChartsLogByCustomize: pvp + "?type=getHeroChartsLogByCustomize"
}

export default {
    list
}