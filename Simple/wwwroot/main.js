import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import VueSource from 'vue-resource'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'


Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueSource)

//创建路由实例
const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {

    //这里进行了简单的登录验证
    //访问login时直接清除user
    if (to.path == '/login') {
        sessionStorage.removeItem('user');
    }
    
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path != '/login') {
        next({ path: '/login' })
    } else {
        next()
    }
})


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')