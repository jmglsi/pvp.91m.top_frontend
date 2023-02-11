import Vue from 'vue';
import XEUtils from 'xe-utils';

import {
  VXETable,
  Button,
  Colgroup,
  Column,
  Filter,
  Header,
  Icon,
  Table,
  Toolbar,
  Tooltip,
} from 'vxe-table';
import zhCN from 'vxe-table/lib/locale/lang/zh-CN';

Vue
  .use(Button)
  .use(Colgroup)
  .use(Column)
  .use(Filter)
  .use(Header)
  .use(Icon)
  .use(Table)
  .use(Toolbar)
  .use(Tooltip)

VXETable.setup({
  table: {
    align: "center",
    autoResize: true,
    border: "inner",
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
      gt: -1
    },
    scrollY: {
      gt: -1
    }
  },
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
});

Vue.prototype.$XModal = VXETable.modal;