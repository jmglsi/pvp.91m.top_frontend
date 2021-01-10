import Vue from 'vue'

Vue.prototype.$isMobile = /(Android|Linux|iPhone|iPad|iPod|Mobile)/i.test(navigator.userAgent);
Vue.prototype.$appTs = Date.parse(new Date()).toString().slice(0, 10);
Vue.prototype.$appHeight = document.documentElement.clientHeight;
Vue.prototype.$appWidth = document.documentElement.clientWidth;

Vue.prototype.$appInfo = {
    name: "苏苏的荣耀助手"
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

    (!this.$isMobile || width > 300) && width > tableWidth ? ret = 0 : ret = 90;

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