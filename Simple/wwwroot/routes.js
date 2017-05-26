import Login from './views/login.vue'
import NotFound from './views/404.vue'
import Home from './views/home.vue'
import Users from './views/sys/users.vue'
import UserAdd from './views/sys/useradd.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }, {
        path: '/',
        component: Home,
        name: '系统管理',
        iconCls: 'el-icon-setting',//图标样式class
        children: [
            { path: '/users', component: Users, name: '用户管理' },
            { path: '/useradd', component: UserAdd, name: '用户添加',hidden:true }
        ]
    },
];

export default routes;