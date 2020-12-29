import Vue from 'vue'
import XEUtils from 'xe-utils'

import {
    VXETable,
    Icon,
    Column,
    Header,
    Grid,
    Table,
    Toolbar,
    Button,
    Filter
} from 'vxe-table'
import zhCNLocat from 'vxe-table/lib/locale/lang/zh-CN'

Vue
    .use(Column)
    .use(Icon)
    .use(Header)
    .use(Grid)
    .use(Table)
    .use(Toolbar)
    .use(Button)
    .use(Filter)

VXETable.setup({
    table: {
        align: "center",
        border: "inner",
        resizable: true,
        showOverflow: false,
        highlightCurrentRow: true,
        highlightHoverRow: true,
        scrollX: {
            gt: -1
        },
        scrollY: {
            gt: -1
        }
    },
    i18n: (key, value) => XEUtils.get(zhCNLocat, key, value)
});

Vue.prototype.$XModal = VXETable.modal