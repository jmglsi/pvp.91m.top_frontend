import Vue from 'vue'

import '@vant/touch-emulator'

import {
    ActionSheet,
    Button,
    Calendar,
    Cell,
    CellGroup,
    Circle,
    Col,
    Collapse,
    CollapseItem,
    Dialog,
    Divider,
    DropdownItem,
    DropdownMenu,
    Field,
    Grid,
    GridItem,
    Icon,
    ImagePreview,
    Lazyload,
    Loading,
    NavBar,
    Pagination,
    Popup,
    PullRefresh,
    Row,
    Search,
    ShareSheet,
    Skeleton,
    Swipe,
    SwipeItem,
    Switch,
    SwitchCell,
    Tab,
    Tabbar,
    TabbarItem,
    Tabs,
    Tag,
    Uploader,
    Picker,
    Sticky
} from 'vant'

Vue
    .use(ActionSheet)
    .use(Button)
    .use(Calendar)
    .use(Cell)
    .use(CellGroup)
    .use(Circle)
    .use(Col)
    .use(Collapse)
    .use(CollapseItem)
    .use(Dialog)
    .use(Divider)
    .use(DropdownItem)
    .use(DropdownMenu)
    .use(Field)
    .use(Grid)
    .use(GridItem)
    .use(Icon)
    .use(ImagePreview)
    .use(Lazyload, { lazyComponent: true })
    .use(Loading)
    .use(NavBar)
    .use(Pagination)
    .use(Popup)
    .use(PullRefresh)
    .use(Row)
    .use(Search)
    .use(ShareSheet)
    .use(Skeleton)
    .use(Swipe)
    .use(SwipeItem)
    .use(Switch)
    .use(SwitchCell)
    .use(Tab)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Tabs)
    .use(Tag)
    .use(Uploader)
    .use(Picker)
    .use(Sticky)