// import Home from "@/pages/Home";
const Home = () => import('@/pages/Home')
// import Login from "@/pages/Login";
const Login = () => import('@/pages/Login')
// import Register from "@/pages/Register";
const Register = () => import('@/pages/Register')
// import Search from "@/pages/Search";
const Search = () => import('@/pages/Search')
// import Detail from "@/pages/Detail";
const Detail = () => import('@/pages/Detail')
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import MyOrder from "@/pages/MyOrder";
import GroupOrder from "@/pages/GroupOrder";

import store from "@/store";
export default [
  {
    path: "/center",
    component: Center,
    children: [
      {
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "grouporder",
        component: GroupOrder,
      },
      {
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },
  {
    path: "/pay",
    component: Pay,
    beforeEnter: (to, from, next) => {
      // 专门针对此路由
      if (from.path === "/trade") {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      // 专门针对此路由
      if(from.path === '/pay'){
        next()
      }else{
        next('/')
      }
    },
  },
  {
    path: "/trade",
    component: Trade,
    beforeEnter: (to, from, next) => {
      // 专门针对此路由
      if (from.path === "/shopcart") {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/shopcart",
    component: ShopCart,
  },
  {
    path: "/addCartSuccess",
    component: AddCartSuccess,
    beforeEnter: (to, from, next) => {
      // 专门针对此路由
      let skuNum = to.query.skuNum;
      let skuInfo = sessionStorage.getItem("SKUINFO_KEY");
      if (skuNum && skuInfo) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/details/:goodsId",
    component: Detail,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
    meta: {
      isHide: true,
    },
    beforeEnter: (to, from, next) => {
      // 专门针对此路由
      if (!store.state.user.userInfo.name) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      isHide: true,
    },
  },
  {
    // path: '/search/:keyword?',
    path: "/search/:keyword?",
    component: Search,
    name: "search",
    // props:route => ({keyword:route.params.keyword,keyword1:route.query.keyword1})
    //keyword:route.params.keyword,keyword1:route.query.keyword1
  },
  {
    path: "/",
    redirect: "/home",
  },
];
