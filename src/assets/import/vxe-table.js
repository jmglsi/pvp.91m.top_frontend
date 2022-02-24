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
    Toolbar,
    Tooltip,
    Table,
} from 'vxe-table';
import zhCN from 'vxe-table/lib/locale/lang/zh-CN';

Vue
    .use(Button)
    .use(Colgroup)
    .use(Column)
    .use(Filter)
    .use(Header)
    .use(Icon)
    .use(Toolbar)
    .use(Tooltip)
    .use(Table)

VXETable.setup({
    table: {
        align: "center",
        autoResize: true,
        border: "inner",
        highlightCurrentRow: true,
        highlightHoverRow: true,
        resizable: true,
        showOverflow: null,
        stripe: true,
        sortConfig: {
            trigger: 'cell',
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