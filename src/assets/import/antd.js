import Vue from 'vue';

import {
  Avatar,
  Card,
  Checkbox,
  Col,
  Dropdown,
  Icon,
  Input,
  Menu,
  Message,
  Modal,
  Notification,
  Popover,
  Radio,
  Row,
  Statistic,
  Table,
  Timeline,
  Tooltip,
} from 'ant-design-vue';

Vue
  .use(Avatar)
  .use(Card)
  .use(Checkbox)
  .use(Col)
  .use(Dropdown)
  .use(Icon)
  .use(Input)
  .use(Menu)
  .use(Message)
  .use(Modal)
  .use(Notification)
  .use(Popover)
  .use(Radio)
  .use(Row)
  .use(Statistic)
  .use(Table)
  .use(Timeline)
  .use(Tooltip)

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