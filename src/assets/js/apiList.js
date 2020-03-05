const pvp = "https://api.91m.top/hero/word.php"
const bili = "https://api.91m.top/hero/bilibili.php"

const list = {
    getBp: pvp + "?type=getBp",
    getApp: pvp + "?type=getApp",
    getHome: pvp + "?type=getHome",
    getAbout: pvp + "?type=getAbout",
    getOrder: bili + "?type=getOrder",
    getSetting: pvp + "?type=getSetting",
    addHeroVote: pvp + "?type=addHeroVote",
    getHeroInfo: pvp + "?type=getHeroInfo",
    getUserInfo: pvp + "?type=getUserInfo",
    getHeroRanking: pvp + "?type=getHeroRanking",
    getPlayerRanking: pvp + "?type=getPlayerRanking",
    getHeroChartsLog: pvp + "?type=getHeroChartsLog",
    getHeroCombination: pvp + "?type=getHeroCombination",
    getHeroReplayByHeroId: pvp + "?type=getHeroReplayByHeroId",
    addHeroByCombination: pvp + "?type=addHeroByCombination",
    getHeroChartsLogBySimilar: pvp + "?type=getHeroChartsLogBySimilar",
    getHeroChartsLogByCustomize: pvp + "?type=getHeroChartsLogByCustomize"
}

export default {
    list
}