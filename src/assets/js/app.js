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

Vue.prototype.appPush = function(path, type = null) {
    this.$router.push({
        path: path,
        query: {
            type: type
        }
    });
}

Vue.prototype.appOpenUrl = function(title, message, url) {
    this.$dialog
        .confirm({
            title: title,
            message: message
        })
        .then(() => {
            // on confirm
            window.open(url);
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