import Vue from 'vue'

Vue.prototype.isMobile = /(Android|Linux|iPhone|iPad|iPod|Mobile)/i.test(navigator.userAgent);
Vue.prototype.appTs = Date.parse(new Date()).toString().slice(0, 10);
Vue.prototype.appHeight = document.documentElement.clientHeight;
Vue.prototype.appWidth = document.documentElement.clientWidth;

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
    })
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

Vue.prototype.appInitTableHeight = function() {
    this.appWidth > this.appHeight ?
        (this.clientHeight = this.appHeight - 133) :
        (this.clientHeight = this.appHeight - 173)
}