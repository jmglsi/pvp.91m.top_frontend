import Vue from 'vue'

Vue.prototype.appDevice = /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent)

Vue.prototype.appHeightInit = function(uWidth) {
    const cHeight = document.documentElement.clientHeight
    const cWidth = document.documentElement.clientWidth

    cWidth > cHeight ?
        (this.clientHeight = cHeight - 138) :
        (this.clientHeight = cHeight - 178)

    cWidth >= uWidth ? (this.listWidth = 0) : (this.listWidth = 100)
}

Vue.prototype.appTs = Date.parse(new Date()).toString().slice(0, 10)