import Vue from 'vue';
import { i18n } from './i18n';

import {
  VXETable,
  Button,
  Colgroup,
  Column,
  Filter,
  Header,
  Icon,
  Pager,
  Select,
  Table,
  Toolbar,
  Tooltip,
} from 'vxe-table';
import 'vxe-table/lib/style.css';

Vue
  .use(Button)
  .use(Colgroup)
  .use(Column)
  .use(Filter)
  .use(Header)
  .use(Icon)
  .use(Pager)
  .use(Select)
  .use(Table)
  .use(Toolbar)
  .use(Tooltip)

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
    }
  },
  i18n: (key, args) => i18n.t(key, args)
});

Vue.prototype.$XModal = VXETable.modal;