import Vue from 'vue'

import 'ant-design-vue/dist/antd.css'
import {
    Dropdown,
    Menu,
    Radio,
    Tooltip,
    Message,
    Notification,
    Input,
    Timeline
} from 'ant-design-vue'

Vue
    .use(Dropdown)
    .use(Menu)
    .use(Radio)
    .use(Tooltip)
    .use(Message)
    .use(Notification)
    .use(Input)
    .use(Timeline)

Message.config({
    top: "50px",
    duration: 5
})

Notification.config({
    top: "50px",
    duration: 5
})

Vue.prototype.$message = Message
Vue.prototype.$notification = Notification