import Vue from 'vue';

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
    Image,
    ImagePreview,
    Lazyload,
    Loading,
    NavBar,
    Progress,
    Pagination,
    Picker,
    Popup,
    PullRefresh,
    Row,
    Search,
    ShareSheet,
    Sidebar,
    SidebarItem,
    Skeleton,
    Sticky,
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
} from 'vant';
import '@vant/touch-emulator';

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
    .use(Image)
    .use(ImagePreview)
    .use(Lazyload, {
        lazyComponent: true,
        loading: '/img/app-icons/loading.png'
    })
    .use(Loading)
    .use(NavBar)
    .use(Pagination)
    .use(Progress)
    .use(Picker)
    .use(Popup)
    .use(PullRefresh)
    .use(Row)
    .use(Search)
    .use(ShareSheet)
    .use(Sidebar)
    .use(SidebarItem)
    .use(Skeleton)
    .use(Sticky)
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