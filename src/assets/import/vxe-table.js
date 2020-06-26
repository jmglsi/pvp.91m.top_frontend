import Vue from 'vue'

import {
    VXETable,
    Icon,
    Column,
    Header,
    Grid,
    Table
} from 'vxe-table'

VXETable.setup({
    table: {
        align: "center",
        border: "none",
        showOverflow: null,
        highlightCurrentRow: true,
        highlightHoverRow: true
    }
});

Vue.use(Column).use(Icon).use(Header).use(Grid).use(Table)

Vue.prototype.$XModal = VXETable.modal