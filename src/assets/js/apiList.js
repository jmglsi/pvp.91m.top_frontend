let host, debug = false;

debug ? host = "api-test.frp.smartfox.cc" : host = "api.91m.top"

const pvp = "//" + host + "/hero/v1/app.php"
const bili = "//" + host + "/hero/v1/bilibili.php"

const list = {
    getBp: pvp + "?type=getBp",
    getApp: pvp + "?type=getApp",
    getHome: pvp + "?type=getHome",
    getAbout: pvp + "?type=getAbout",
    getOrder: bili + "?type=getOrder",
    getMiniApp: pvp + "?type=getMiniApp",
    addHeroVote: pvp + "?type=addHeroVote",
    getHeroInfo: pvp + "?type=getHeroInfo",
    getUserInfo: pvp + "?type=getUserInfo",
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