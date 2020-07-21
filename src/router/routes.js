import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
export default [
  {
    path:'/shopcart',
    component:ShopCart
  },
  {
    path:'/addCartSuccess',
    component:AddCartSuccess
  },
  {
    path:'/details/:goodsId',
    component:Detail
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
    meta:{
      isHide:true 
    }
  },
  {
    path: '/register',
    component: Register,
    meta:{
      isHide:true 
    },
  },
  {
    // path: '/search/:keyword?',
    path: '/search/:keyword?',
    component: Search,
    name:'search',
    // props:route => ({keyword:route.params.keyword,keyword1:route.query.keyword1})
    //keyword:route.params.keyword,keyword1:route.query.keyword1
  },
  {
    path: '/',
    redirect: '/home'
  },
];
