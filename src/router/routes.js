import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

export default [
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/search/:keyword?',
    component: Search,
    name:'search',
    props:route => ({keyword:route.params.keyword,keyword1:route.query.keyword1})
    //keyword:route.params.keyword,keyword1:route.query.keyword1
  },
  {
    path: '/',
    redirect: '/home'
  },
];
