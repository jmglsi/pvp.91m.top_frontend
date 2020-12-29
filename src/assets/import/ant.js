import Vue from 'vue'

import 'ant-design-vue/dist/antd.css'
import {
    Icon,
    Timeline,
    Dropdown,
    Menu,
    Message,
    Notification
} from 'ant-design-vue'

Vue
    .use(Icon)
    .use(Timeline)
    .use(Dropdown)
    .use(Menu)
    .use(Message, {
        duration: 5
    })
    .use(Notification, {
        duration: 10
    })

Vue.prototype.$message = Message
Vue.prototype.$notification = Notification