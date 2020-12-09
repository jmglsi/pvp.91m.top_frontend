import Vue from 'vue'

Vue.prototype.appDevice = /(Android|Linux|iPhone|iPad|iPod|Mobile)/i.test(navigator.userAgent)

Vue.prototype.appCopyData = function(data, successText = "复制成功", errorText = "复制失败") {
    this.$copyText(data).then(
        () => {
            this.$message.success(successText);
        },
        () => {
            this.$message.error(errorText);
        }
    );
}

Vue.prototype.appPush = function(urlPath, urlQuery = {}) {
    this.$router.push({
        path: urlPath,
        query: urlQuery
    });
}

Vue.prototype.appOpenUrl = function(title, message, urlPath, urlType = 0) {
    this.$dialog
        .confirm({
            title: title,
            message: message
        })
        .then(() => {
            // on confirm

            if (urlType == 0) {
                window.open(urlPath);
            } else if (urlType == 1) {
                this.$router.push({ path: urlPath });
            }
        })
        .catch(() => {
            // on cancel
        });
}

Vue.prototype.appHeight = document.documentElement.clientHeight
Vue.prototype.appWidth = document.documentElement.clientWidth

Vue.prototype.initAppTable = function() {
    const cHeight = this.appHeight
    const cWidth = this.appWidth

    cWidth > cHeight ?
        (this.clientHeight = cHeight - 133) :
        (this.clientHeight = cHeight - 173)
}

Vue.prototype.appTs = Date.parse(new Date()).toString().slice(0, 10)