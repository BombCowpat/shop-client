






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
1. 搜索页多次跳转后直接返回home页（如不修改，push会记录之前的路由跳转历史，返回时会返回到上一次路由地址，点击品牌和属性搜索不会修改路由，只是修改searchParams 参数，所以不会有路由记录） 修改之前所有的路由跳转， TypeNav 和 Header 以及 删除面包屑中keyword category 参数 都是通过修改路由来触发watch 中对路由的监视 然后重新发送请求的。TypeNav 和 Header  如果是从主页跳转到search页的用push，如果是search页跳转到search页的改成replace  面包屑中的路由修改则只能是 from search to search 所以直接改为replace即可
2. ----------------------------- 
3. 商品列表排序 sortFlag 1 or 2      sortType asc or desc 
4. 从searchParams中分离出 计算属性sortFlag sortType
5. 动态加载排序项中的样式和箭头(v-if 控制箭头是否显示) 下载图标字体，编辑类名去掉- 
6. 给排序项添加点击事件 sortGoods 接收当前的sortFlag 和 sortType 
7. 定义sortGoods  函数 注意参数为字符串 如果 sortFlag和原来相同 修改sortType 为反向排序 如果不同修改为当前sortFlag 并且修改sortType为默认desc  然后将配置项赋值给searchParams中对应排序参数 重新发送商品请求   
### -----------------------------------------
7. 自定义分页组件 
8. 课件中获取静态组件 定义Pagination  注册 添加到页面中
9.  动态组件逻辑实现 
10. 外部接收 当前页码pageNo 每页数量pageSize 总数goodsListInfo.total 连续页码数量（奇数,自定义 5） 
11. 计算分页组件内部需要计算的数据 总页数 连续页码的起始和结束 
12. 在分页中计算逻辑 
13. 计算连续页码的起始和结束 
14. 当前页码 +/- 连续页码/2向下取整
15. 4种情况  总页数小于连续页数-正常-起始页码小于1-结束页码大于最大页码 后面两种修正页码即可 start-end 同时加上或者减去偏差的页码
16. 动态显示页码 
17. 遍历显示start- end v-for v-if 配合使用 

### 商品详情页 day07
1. 详情页静态路由组件 添加组件到路由 添加声明式路由导航到search页的商品图片 添加滚动配置
2. api 数据接口函数 
3. vuex 管理详情数据
4. detail组件获取数据
5. 动态加载页面数据 getters 返回数据时为保证不报错，可以|| 一个{} 或[] `:src="(imgList[imgIndex]?imgList[imgIndex]:{}).imgUrl"`  a.b.c 一般到第三级时会报错(可以在getters computed内先处理好) `(this.imgList[this.imgIndex] || {}).imgUrl`   v-for 内外循环不能用到相同的键值  
6. 放大镜区域图片加载 完成底部图片列表（图片均来自父组件Detail） 点击加边框 轮播效果(swiper 插件 slidesPerView : 5,  //根据slide的宽度自动调整展示数量。slidesPerGroup : 5, //在carousel mode下定义slides的数量多少为一组) 完成放大镜效果--鼠标在元素内位置，mask 偏移量为鼠标偏移量减去mask大小一半 大图往相反方向移动两倍距离 
7. 商品属性选择交互 排他 事件传入当前列表和当前index 注意isChecked 属性为字符串 
8. 商品数量增减 v-model 不能减小到小于0 
9. 加入购物车功能 发送（api -> vuex）加入购物车请求 - 返回成功或失败结果 成功返回成功的值（promise对象）失败返回失败的promise对象 组件内await 后是失败的promise是会报错 然后trycatch alert（error）  导入加入购物车成功组件 添加路由  组件内dispatch的函数返回值即为dispatch的action的返回值 成功则跳转到加入购物车成功组件 顺便 将商品信息存到 sessionStorage 中（重复添加会覆盖原来的）  路由传递?skuNum=${this.skuNum} 然后在加入购物车成功组件中加载数据 字体（css,font）文件引入   跳转回详情页路由 `/detail/${this.skuInfo.id}`
10. 点击加入购物车 - 发生请求 - 成功 - 跳转到加入购物车成功组件 -失败 alert 加入购物车失败  

### day08

1.  购物车路由组件实现 api-vuex-组件内发请求   
2.  usertempid（字符串）添加购物车时使用零时id （后端能有标识的存储商品信息） 同时将usertempid存储到本地的localstorage  ， 在后面的购物车列表请求中带上usertempid 就能找到购物车列表信息 
3.  vuex 创建user.js 管理usertempid  /src下创建utils文件夹 工具函数 创建获取usertempid工具（优先本地获取，获取不到通过uuid生成） 
4.  导入store对象到ajax封装文件 在请求拦截器config 的 header中添加 usertempId 
5.  重新加入购物车，在购物车组件发请求 就能拿到数据  
6.  动态展示数据 
7.  向后台发请求 改变列表数据 数量 单项选择 全选  删除 删除所有 
8.  改变商品数量 click change 事件 中 传入当前goods changeNum  如果skuNum - changeNum <1,changeNum=1-skuNum 重新发送更新商品请求addOrUpdateShopCart  然后发送更新商品列表请求   (changeNum  商品数量的改变量) 
9.  改变商品选中状态 单个改变 点击发送请求直接改变 全部改变 promise.all 改变后要重新发送请求更新页面数据 
10.  








