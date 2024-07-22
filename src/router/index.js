//导入模块
import Vue from 'vue';
import VueRouter from 'vue-router';
import MyGrid from "@/views/my-grid.vue"
import MyTiny from "@/views/my-tiny.vue"
import MyRouter from "@/views/my-router.vue"
//注册路由组件
Vue.use(VueRouter);
//编写路由规则
const routes = [
    {
        path: "/",
        name: '<main></main>yRouter',
        component: MyRouter
    },
    {
        path: "/myGrid",
        name: 'MyGrid',
        component: MyGrid
    },
    {
        path: "/myTiny",
        name: 'MyTiny',
        component: MyTiny
    },

]
//创建路由
const router = new VueRouter({
    mode: 'history',
    routes
})
//导出
export default router;