import Vue from 'vue';
import { i18n } from './i18n';
import 'vxe-table/lib/style.css';

import {
  VXETable,
  Button,
  Colgroup,
  Column,
  Edit,
  Filter,
  Header,
  Icon,
  Input,
  Pager,
  Select,
  Toolbar,
  Tooltip,
  Table,
} from 'vxe-table';

Vue
  .use(Button)
  .use(Colgroup)
  .use(Column)
  .use(Edit)
  .use(Filter)
  .use(Header)
  .use(Icon)
  .use(Input)
  .use(Pager)
  .use(Select)
  .use(Toolbar)
  .use(Tooltip)
  .use(Table)

VXETable.setup({
  table: {
    align: "center",
    autoResize: true,
    border: "outer",
    keepSource: true,
    showOverflow: null,
    stripe: true,
    columnConfig: {
      resizable: true
    },
    rowConfig: {
      isCurrent: true,
      isHover: true
    },
    sortConfig: {
      trigger: "cell"
    },
    scrollX: {
      enabled: true,
      gt: -1
    },
    scrollY: {
      enabled: true,
      gt: -1
    },
    tooltipConfig: {
      //showAll: true
    },
  },
  i18n: (key, args) => i18n.t(key, args)
});

Vue.prototype.$XModal = VXETable.modal;