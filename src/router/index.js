import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store'

Vue.use(VueRouter);

const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, onResolved, onRejected) {
  if (onResolved === undefined && onRejected === undefined) {
    return originPush.call(this, location).catch(() => {});
  } else {
    return originPush.call(this, location, onResolved, onRejected);
  }
};

import routes from "@/router/routes";

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

// 添加全局前置路由导航守卫
router.beforeEach((to,from,next) => {
  let targetPath = to.path
  if(targetPath.startsWith('/pay') || targetPath.startsWith('/center') || targetPath.startsWith('/trade')){
    if(store.state.user.userInfo.name){
      next()
    }else{
      //配合登录逻辑自动去到登录前想去的页面
      next('/login?redirect='+targetPath)
    }
  }else{
    next()
  }
})


export default  router
