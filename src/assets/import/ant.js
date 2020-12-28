import Vue from 'vue'

import 'ant-design-vue/dist/antd.css'
import {
    Icon,
    Timeline,
    Dropdown,
    Menu,
    message,
    notification
} from 'ant-design-vue'

Vue.use(Icon).use(Timeline).use(Dropdown).use(Menu).use(message).use(notification)

message.config({
    top: "50px",
    duration: 10
})

notification.config({
    top: "50px",
    duration: 10
})

Vue.prototype.$message = message
Vue.prototype.$notification = notification