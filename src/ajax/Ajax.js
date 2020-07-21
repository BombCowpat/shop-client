//二次封装axios 

import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const service = axios.create({
    baseURL:'/api',
    timeout:20000,
})


// Add a request interceptor
service.interceptors.request.use(config => {
    NProgress.start()
    //add userTempId
    let userTempId = store.state.user.userTempId
    if(userTempId){
        config.headers.userTempId = userTempId
    }
    return config
});

// Add a response interceptor
service.interceptors.response.use(response =>{
    NProgress.done()
    return response.data
},error => {
    NProgress.done()
    alert('请求出错' + error.message || '未知错误')
    return new Promise(()=>{})
    // return Promise.reject(error)
});



export default service









