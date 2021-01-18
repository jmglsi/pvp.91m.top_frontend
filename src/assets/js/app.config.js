import Vue from 'vue'

Vue.prototype.$appIsMobile = /(Android|Linux|iPhone|iPad|iPod|Mobile)/i.test(navigator.userAgent);
Vue.prototype.$appTs = Date.parse(new Date()).toString().slice(0, 10);
Vue.prototype.$appHeight = document.documentElement.clientHeight;
Vue.prototype.$appWidth = document.documentElement.clientWidth;

Vue.prototype.$appInfo = {
    name: "苏苏的荣耀助手"
}

Vue.prototype.$appColumnsInfo = {
    area: ["安卓手Q", "苹果手Q", "安卓微信", "苹果微信"],
    province: [
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
    rank: {
        type: [0, 16, 22, 20, 18, 17, 4, 1],
        text: [
            "荣耀",
            "王者",
            "星耀",
            "钻石",
            "铂金",
            "黄金",
            "白银",
            "青铜",
        ],
    },
    now: [],
    type: 0,
}

Vue.prototype.$appPush = function(url = { path: '/' }) {
    this.$router.push(url);
}

Vue.prototype.$appOpenUrl = function(title, message, url = { path: '/' }, urlType = 0) {
    this.$dialog
        .confirm({
            title: title,
            message: message
        })
        .then(() => {
            // on confirm
            if (urlType == 0) {
                window.open(url.path);
            } else if (urlType == 1) {
                this.$appPush(url);
            }
        })
        .catch(() => {
            // on cancel
        });
}

Vue.prototype.$appInitTableHeight = function() {
    let ret = 0,
        width = this.$appWidth,
        height = this.$appHeight;

    width > height ? (ret = height - 133) : (ret = height - 173);

    return ret;
}

Vue.prototype.$appInitTableWidth = function(tableWidth) {
    let ret = 0,
        width = this.$appWidth;

    (!this.$appIsMobile || width > 300) && width > tableWidth ? ret = 0 : ret = 90;

    return ret;
}

Vue.prototype.$appCopyData = function(data, successText = "复制成功", errorText = "复制失败") {
    this.$copyText(data).then(
        () => {
            this.$message.success(successText);
        },
        () => {
            this.$message.error(errorText);
        }
    );
}