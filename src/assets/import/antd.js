import Vue from 'vue';

import {
    Avatar,
    Card,
    Checkbox,
    Dropdown,
    Menu,
    Radio,
    Tooltip,
    Message,
    Notification,
    Input,
    Icon,
    Timeline,
    Popover
} from 'ant-design-vue';

Vue
    .use(Avatar)
    .use(Card)
    .use(Checkbox)
    .use(Dropdown)
    .use(Menu)
    .use(Radio)
    .use(Tooltip)
    .use(Message)
    .use(Notification)
    .use(Input)
    .use(Icon)
    .use(Timeline)
    .use(Popover)

Message.config({
    top: "50px",
    duration: 5
});

Notification.config({
    top: "50px",
    duration: 5
});

Vue.prototype.$message = Message;
Vue.prototype.$notification = Notification;