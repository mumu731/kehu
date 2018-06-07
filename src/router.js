import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter);
const routers = [
    {path: '/',name: 'Index',meta: {title: '首页'},component: (resolve) => require(['./views/index.vue'], resolve)},
    {path: '/shuju',name: 'shuju',meta: {title: '数据添加'},component: (resolve) => require(['./views/shuju.vue'], resolve)},
];
export default routers;