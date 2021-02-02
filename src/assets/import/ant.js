import Vue from 'vue'

import 'ant-design-vue/dist/antd.css'
import {
    Dropdown,
    Menu,
    Tooltip,
    Message,
    Notification,
    Timeline
} from 'ant-design-vue'

Vue
    .use(Dropdown)
    .use(Menu)
    .use(Tooltip)
    .use(Message, {
        duration: 5
    })
    .use(Notification, {
        duration: 10
    })
    .use(Timeline)

Vue.prototype.$message = Message
Vue.prototype.$notification = Notification