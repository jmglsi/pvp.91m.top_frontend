import Vue from 'vue';

Vue.prototype.$appCountry = location.host.match(/127\.0\.0\.1|localhost|pvp\.91m\.top/);
Vue.prototype.$appIsApple = /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
Vue.prototype.$appIsMobile = /(Android|Linux|iPhone|iPad|iPod|Mobile)/i.test(navigator.userAgent);
Vue.prototype.$appTs = Number(Date.parse(new Date()).toString().slice(0, 10));
Vue.prototype.$appHeight = document.documentElement.clientHeight;
Vue.prototype.$appWidth = document.documentElement.clientWidth;

Vue.prototype.$appConfigInfo = {
    appInfo: {
        isReducedMode: false,
        isSmallMobile: false,
        openUrl: false,
        newsPush: true,
        link: [],
        name: "苏苏的荣耀助手",
        pwa: 0,
        script: [],
        tempText: "",
        updateTime: 0,
        version: 0,
        search: {
            img: null,
            placeholder: "",
            to: null,
            url: null,
        },
    },
    tipsInfo: {
        dfsTips: false,
        skillTips: false,
        wanjiaTips: false
    },
    updateInfo: {
        timeout: 43200
    }
};

Vue.prototype.$appColumnsInfo = {
    areaType: [
        "请选择大区",
        "安卓QQ",
        "苹果QQ",
        "安卓WX",
        "苹果WX"
    ],
    provinceType: [
        "请选择省份",
        "安徽省",
        "澳门特别行政区",
        "北京市",
        "重庆市",
        "福建省",
        "甘肃省",
        "广东省",
        "广西壮族自治区",
        "贵州省",
        "海南省",
        "河北省",
        "河南省",
        "黑龙江省",
        "湖北省",
        "湖南省",
        "吉林省",
        "江苏省",
        "江西省",
        "辽宁省",
        "内蒙古自治区",
        "宁夏回族自治区",
        "青海省",
        "山东省",
        "山西省",
        "陕西省",
        "上海市",
        "四川省",
        "台湾省",
        "天津市",
        "西藏自治区",
        "香港特别行政区",
        "新疆维吾尔自治区",
        "云南省",
        "浙江省",
    ],
    starType: {
        value: [1, 0, 16, 22, 20, 18, 17, 4, 1],
        text: [
            "请选择段位",
            "荣耀王者",
            "最强王者",
            "至尊星耀",
            "永恒钻石",
            "尊贵铂金",
            "荣耀黄金",
            "秩序白银",
            "倔强青铜",
        ],
    },
    fightPowerType: {
        value: [0, 1, 2],
        text: [
            "请选择类型",
            "省1",
            "省100"
        ]
    },
    now: [],
    index: 0,
    type: 0,
}

Vue.prototype.$appSetLocalStorage = function(key, value = {}) {
    localStorage.setItem(key, JSON.stringify(value));
}

Vue.prototype.$appGetLocalStorage = function(key) {
    return JSON.parse(localStorage.getItem(key));
}

Vue.prototype.$appDelectLocalStorage = function(key = "ranking") {
    for (let cache in localStorage) {
        if (cache.indexOf(key) > -1) {
            localStorage.removeItem(cache);
        }
    }
}

let ls = Vue.prototype.$appGetLocalStorage("appConfigInfo");
if (!ls) {
    Vue.prototype.$appSetLocalStorage("appConfigInfo", Vue.prototype.$appConfigInfo);
}
Vue.prototype.$appConfigInfo = Vue.prototype.$appGetLocalStorage("appConfigInfo");

Vue.prototype.$appPush = function(url = { path: '/' }) {
    this.$router.push(url);
}

Vue.prototype.$appPushBack = function(url = { path: '/', query: { refresh: 0 } }) {
    let previousPage = this.$store.state.previousPage,
        lastUrl = previousPage[previousPage.length - 1],
        nowUrl = null;

    if (previousPage.length < 2) {
        nowUrl = url;
    } else {
        /miniapp|friends|hero(.*?)info/i.test(lastUrl.path) ? nowUrl = url : nowUrl = lastUrl;
        nowUrl.query.refresh = 1;
        //防止套娃
    }

    this.$router.push(nowUrl);
}

Vue.prototype.$appOpenUrl = function(title, message = null, url = { path: '/' }, urlType = 0) {
    if (urlType == 0) {
        let ls = Vue.prototype.$appConfigInfo;

        if (ls.appInfo.openUrl) {
            this.$dialog
                .confirm({
                    title: title,
                    message: message
                })
                .then(() => {
                    // on confirm
                    window.open(url.path);
                })
                .catch(() => {
                    // on cancel
                });
        } else {
            window.open(url.path);
        }
    } else {
        if (message) {
            this.$message.warning(message);
        }

        setTimeout(() => {
            this.$router.push(url)
        }, 2500)
    }
}

Vue.prototype.$appInitTableHeight = function(newHeight = 0) {
    let ret = 0,
        width = this.$appWidth,
        height = this.$appHeight;

    width > height ? (ret = height - 103) : (ret = height - 138);

    return ret + newHeight;
}

Vue.prototype.$appInitTableWidth = function(tableWidth) {
    let ret = 0,
        width = this.$appWidth;

    (!this.$appIsMobile || width > 300) && width > tableWidth ? ret = 0 : ret = 90;

    return ret;
}

Vue.prototype.$appCopyData = function(data, successText = "复制成功", errorText = "复制失败") {
    setTimeout(() => {
        this.$dialog
            .confirm({
                title: "是否复制?",
                message: "您的分享是我更新的动力"
            })
            .then(() => {
                this.$copyText(data).then(
                    () => {
                        this.$message.success(successText);
                    },
                    () => {
                        this.$message.error(errorText);
                    }
                );
            })
            .catch(() => {
                // on cancel
            });
    }, 250);
}