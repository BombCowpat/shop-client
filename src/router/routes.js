import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
export default [
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
