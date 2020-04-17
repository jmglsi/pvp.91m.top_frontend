const pvp = "//api.91m.top/hero/app.php"
const bili = "//api.91m.top/hero/bilibili.php"
const hitokoto = "//v1.hitokoto.cn"

const list = {
    getBp: pvp + "?type=getBp",
    getApp: pvp + "?type=getApp",
    getHome: pvp + "?type=getHome",
    getAbout: pvp + "?type=getAbout",
    getOrder: bili + "?type=getOrder",
    getMiniApp: pvp + "?type=getMiniApp",
    getFriendship: pvp + "?type=getFriendship",
    getHitokoto: hitokoto,
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