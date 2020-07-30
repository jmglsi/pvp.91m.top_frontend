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
    Button
} from 'vxe-table'
import zhCNLocat from 'vxe-table/lib/locale/lang/zh-CN'

VXETable.setup({
    table: {
        align: "center",
        border: "inner",
        resizable: true,
        showOverflow: null,
        highlightCurrentRow: true,
        highlightHoverRow: true
    },
    i18n: (key, value) => XEUtils.get(zhCNLocat, key, value)
});

Vue.use(Column).use(Icon).use(Header).use(Grid).use(Table).use(Toolbar).use(Button)

Vue.prototype.$XModal = VXETable.modal