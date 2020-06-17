import Vue from 'vue'

import {
    VXETable,
    Icon,
    Column,
    Header,
    Loading,
    Grid,
    Table
} from 'vxe-table'

VXETable.setup({
    border: "none",
    showOverflow: false,
    highlightCurrentRow: true,
    highlightHoverRow: true
});

Vue.use(Column).use(Icon).use(Header).use(Loading).use(Grid).use(Table)

Vue.prototype.$XModal = VXETable.modal