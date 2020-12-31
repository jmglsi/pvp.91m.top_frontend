import Vue from 'vue'

import 'ant-design-vue/dist/antd.css'
import {
    Dropdown,
    Icon,
    Menu,
    Message,
    Notification,
    Timeline
} from 'ant-design-vue'

Vue
    .use(Dropdown)
    .use(Icon)
    .use(Menu)
    .use(Message, {
        duration: 5
    })
    .use(Notification, {
        duration: 10
    })
    .use(Timeline)

Vue.prototype.$message = Message
Vue.prototype.$notification = Notification