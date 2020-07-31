import Vue from 'vue'

Vue.prototype.appDevice = /(Android|Linux|iPhone|iPad|iPod|Mobile)/i.test(navigator.userAgent)

Vue.prototype.appCopyData = function(data) {
    this.$copyText(data).then(
        () => {
            this.$message.success("复制成功");
        },
        () => {
            this.$message.error("复制失败");
        }
    );
}

Vue.prototype.appSign = function(data) {
    const token = "8df1317edf84af453e342962f9df87a4"
    const time = Math.round(new Date().getTime() / 1000).toString()
    const sign = this.$md5(token + time + data)
    return sign
}

Vue.prototype.appPush = function(path, name, type = null) {
    this.$router.push({
        path: path,
        query: {
            type: type,
            sign: this.appSign(name)
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
            //this.$message.error("已取消");
        });
}

Vue.prototype.appHeight = document.documentElement.clientHeight
Vue.prototype.appWidth = document.documentElement.clientWidth

Vue.prototype.appInitTable = function(aHeight = 0) {
    const cHeight = this.appHeight
    const cWidth = this.appWidth

    cWidth > cHeight ?
        (this.clientHeight = cHeight - 133) :
        (this.clientHeight = cHeight - 173)

    if (aHeight > 0) this.clientHeight = this.clientHeight + 17;
}

Vue.prototype.appTs = Date.parse(new Date()).toString().slice(0, 10)