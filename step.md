






### day05 
1. search 页静态组件  
2. search 页数据api请求函数 
3. search 页数据Vuex 管理 store/search.js  state-mutations-actions 注册进store.js
5. search 组件data中提供searchParams 参数 
6. 编写data中的searchParams数据更新函数(数据来自当前路由对象) 数据请求函数(映射store中actions内的对应ajax请求函数)
7. 在beforeMount时调用 searchParams更新函数 加入 路由中params，query参数 然后mounte时发送ajax请求 
8. search.js getters 提供state加工后的页面数据 
9. 动态加载search，searchSelector中的数据 （对应组件中通过mapGetters获得store中数据） 
10. 使用watch属性监视路由数据 路由发生变化后再次调用searchParams  更新函数，重新发送请求 (搜索的用户交互)
11. 面包屑写法：根据searchParams中的属性是否存在判断相关标签是否显示，v-if 消除通过点击事件清除相应属性，重发请求 ==> 通过push更新路由发送请求，或直接发送请求
12. 全局事件总线更新header搜索框 main.js中注册$bus，Header组件中注册事件，search组件中触发事件
13. 通过自定义事件子父组件传参实现属性，品牌搜索 父组件中给子组件绑定自定义事件(回调事件名，回调函数)=>子组件中点击事件中触发自定义事件（传递品牌，属性参数）
14. url 参数配置对像中params参数会变为query参数，路由参数中不会

### -----------------------------------------

### day06 
1. 搜索页多次跳转后直接返回home页 修改之前所有的路由跳转 如果是从主页跳转到search页的用push，如果是search页跳转到search页的改成repl
2. 商品列表排序 sortFlag 1 or 2      sortType asc or desc 
3. 从searchParams中分离出计算属性sortFlag sortType
4. 动态加载排序项中的样式和箭头 下载图标字体，编辑类名去掉- 
5. 给排序项添加点击事件 sortGoods 接收当前的sortFlag 和 sortType 
6. 定义sortGoods  函数 注意参数为字符串 如果 sortFlag和原来相同 修改sortType 为反向排序 如果不同修改为当前sortFlag 并且修改sortType为默认desc  然后将配置项赋值给searchParams中对应排序参数 重新发送商品请求   
### -----------------------------------------
7. 自定义分页组件 
8. 课件中获取静态组件 注册 添加到页面中
9.  动态组件逻辑实现 
10. 外部接收 当前页码 每页数量 总数 连续页码数量（奇数） 
11. 分页组件内部需要计算的数据 总页数 连续页码的起始和结束 
12. 在分页中计算逻辑 
13. 计算连续页码的起始和结束 
14. 判断总页码是否比连续页码还小 
15. 

### 商品详情页 
1. 详情页静态路由组件 
2. api 数据接口函数 
3. vuex 管理详情数据
4. 动态加载页面数据  





