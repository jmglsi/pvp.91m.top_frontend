import Vue from 'vue'

import 'vxe-table/lib/style.css'
import XEUtils from 'xe-utils'
import zhCNLocat from 'vxe-table/lib/locale/lang/zh-CN'

import {
    VXETable,
    Button,
    Column,
    Filter,
    Grid,
    Header,
    Icon,
    Toolbar,
    Table,
} from 'vxe-table'

Vue
    .use(Button)
    .use(Column)
    .use(Filter)
    .use(Grid)
    .use(Header)
    .use(Icon)
    .use(Toolbar)
    .use(Table)


VXETable.setup({
    table: {
        align: "center",
        border: "inner",
        resizable: true,
        autoResize: true,
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