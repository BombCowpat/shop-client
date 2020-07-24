### step1 
1. 创建脚手架4/3的vue项目, 并运行
		npm install -g @vue/cli
		vue create vue-demo  default 
		npm run serve



2. 开发阶段直接关闭eslint的提示功能

	手动创建vue.config.js,改动需要重启服务 
	module.exports = {
		//  写自己想要配置的东西去覆盖系统自带的
		// 关闭ESLint的规则
 		lintOnSave: false
	}



	jsconfig.json配置别名@提示

{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
        "@/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}

完成   app.vue main.js


3. 重新配置  .gitignore git init 提交   配置remote   
4. 观察页面确定页面主体框架
所有的功能页面都是 上中下结构    上和下是不变化的，只有中间(路由组件)在变化   

5. 定义页面主体组件组装，切换路径可以组件跳转（非路由组件和路由组件）
	Header和Footer是固定的所以是非路由组件
	Home  Search  Login  Register 都是点击才会出现所以是路由组件并且是一级的（可能内部还有二级）
	非路由组件组装
	路由的注册使用
	路由可以分模块去编写 

6. 把Header和Footer的模板进行替换显示
  组件拆分过程：
	  引入html到vue组件 template
	  引入less到vue组件 style   解决loader   只需要安装less 和 less-loader就可以了 npm install less-loader
	  引入图片 

7. 在对应点击切换路由组件的位置(pages文件夹)，替换路由链接	 声明式导航和编程式导航 
8. 登录注册不需要Footer,通过路由meta  (对象)配置解决 从route当中可以获取到path判断可以解决但是麻烦 $route.meta 
9. 路由传参相关
	1)跳转路由的2种基本方式
        	声明式: <router-link to="">
        	编程式: this.$router.push()/replace()

	2)跳转路由携带参数的2种方式
        	params参数
        	query参数

	3)面试问题1: 
		描述: 编程式路由跳转到当前路由(参数不变), 会抛出NavigationDuplicated的警告错误
		      声明式路由跳转内部已经处理

    			

		原因：vue-router3.1.0之后, 引入了push()的promise的语法
		     如果没有通过参数指定成功或者失败回调函数就返回一个promise来指定成功/失败的回调
		     且内部会判断如果要跳转的路径和参数都没有变化, 会抛出一个失败的promise

		解决: 1：在跳转时指定成功或失败的回调函数, 或者catch处理错误
		      2: 修正VueRouter原型上的push和replace方法 (优秀)
		     		
	

	4)面试问题2: 如何指定params参数可传可不传?  (如果未指定就不能跳转到search组件)   
		path: '/search/:keyword?'

	5)面试问题3: 指定params参数时可不可以用path和params配置的组合?（对象写法）
		不可以用path和params配置的组合, 只能用name和params配置的组合
		query配置可以与path或name进行组合使用

	6)面试问题4: 如果指定name与params配置, 但params中数据是一个"", 无法跳转，路径会出问题
    		解决1: 不指定params
		解决2: 指定params参数值为undefined
		前提是路由params参数要可传可不传

	7)面试问题5: 路由组件能不能传递props数据?
    		可以: 可以将query或且params参数映射/转换成props传递给路由组件对象
		实现: props: (route)=>({keyword1:route.params.keyword, keyword2: route.query.keyword })

### day02



1. 先来搞Home,Home的子组件静态页面实现
	费时费力  但是莫急莫慌 TypeNav 是公用组件，可以放在components文件夹内 

Home的静态页面就有了，接下来要去实现动态数据 




2. postman测试后台api接口，保存请求信息以便后期使用（参考接口文档）
	postman的基本使用方法



3. 前后台交互模块ajax模块，对axios的二次封装 
	获取数据离不开ajax，所以先把ajax工具搞定

		安装axios $ npm install axios -S

		配置基础路径和超时限制

		添加进度条信息  nprogress --- npm install nprogress -S

		返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据

		统一处理请求错误, 具体请求也可以选择处理或不处理



	
4. 所有接口的请求函数模块，我们定义一个index.js去写
	以后请求什么数据直接导入去调函数就可以
	先写请求三级分类列表数据
	测试ajax请求是否能够拿到数据



5. 测试ajax请求机解决跨域问题
	随便在App当中或者在TypeNav当中mounted去发请求
	返回404需要解决跨域
	配置代理服务器解决跨域问题
	webpack proxy
	https://www.webpackjs.com/configuration/dev-server/#devserver-proxy


6. 可以拿到数据，但是我们得去管理我们的数据，使用vuex
	每个vuex模块都能包含 state  mutations actions getters
	多模块化  画图分析
	总的state结构是什么
	mapState的写法分析  之前的state就是总的state  现在state里面包含了子模块对象
	state结构要注意
	state:{
		home:{
		},
		user:{
		}
	}


7. 获取到数据后显示三级分类列表
	分析数据结构：在模板上展示数据v-for

	鼠标悬停在链接上变色，需要修改一下公共样式
	悬停在分类上背景色需要变化，修改分类组件的样式
	三级分类列表宽度比较小，右边的缝隙比较大






### day03

1. 事件控制显示23级的显示和隐藏
	原来的是使用css去做的，咱们不用
	添加移入和移出事件（关键是数据的设计）
		移入哪一个把哪一个的index，传到回调函数，然后把currentIndex = index
		上面使用类的对象写法：item_on : currentIndex == index
		而移出事件我们需要移出全部分类的时候才会消失，因此移出事件我们需要添加在外部一个div上



2. 演示快速触发事件卡顿现象



3. 函数的防抖和节流讲解
	正常：事件触发非常频繁，而且每一次的触发，回调函数都要去执行
	节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
	防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才会，也就是说如果连续快速的触发  只会执行一次


4. 优化快速触发typeNav鼠标移入和移出事件，节流lodash的throttle节流操作
	将移入事件的回调进行节流操作
	

5. 按需引入lodash减少打包体积
	引入的时候不要去引入整个lodash
	引入lodash/throttle
	
6. 解决使用lodash节流后，快速移出后，可能还会显示某个子项
	{ 'trailing': fasle}的作用    是否在结束延迟之后调用   



7. 点击某个类别（无论几级）跳转到搜索页面
	先用声明式导航替换原来的a
	需要把类别的id和类别的名字通过query参数传递


	
8. 使用编程式路由导航优化声明式导航组件对象过多造成的卡顿
	声明式导航本质上是组件对象，组件对象过多，会造成效率很慢  所以会很卡
	
	
	
9. 利用事件委派提高处理事件的效率
	每个项都添加事件，事件的回调函数很多，效率也不好
	在共同的父级元素添加事件监听
		问题：怎么知道点击的是一级还是二级还是三级
		问题：参数怎么携带，要携带携带哪些个的参数


10. 利用自定义属性携带动态数据
	标签的data-开头的属性，叫做自定义属性
	通过我们的标签对象.dataset

跳转搜索页后

11. 搜索页的typeNav一级列表隐藏
	首先这个组件被多个页面公用
	在mounted的时候可以判断路由是不是home如果不是把isShow改为false
	再次考虑外部盒子移入和移出  首页的移入移出，不会隐藏，但是其余的会移出隐藏，因此移入和移出我们需要使用回调函数
	点击搜索类别跳转到当前搜索页面也要把一级类别隐藏
	

12. 显示和隐藏一级列表的过渡效果添加
	首先谁要加过渡就看谁在隐藏和显示
	需要放在transition标签内部，name需要起名字
	参考官方给的过渡图
	移入的时候是有过渡的
	移出的时候立马隐藏的
	注意：高度也是变化的


13. 优化typeNav数据ajax请求次数，改变请求的位置
	之前我们是在typeNav组件内部dispatch去发送ajax请求，这样的话
	因为typeNav是被多个页面公用的，所以每次切换到一个页面，这个组件都会重新创建  mounted都会执行
	因此有几个页面公用了这个typeNav就会执行几次ajax请求
	所以我们放到App里面就只用执行一次，因为数据一样，没必要多次请求


14. 合并分类的query参数和搜索关键字的params参数
	找到对应组件
	点击search按钮的时候，去看看有没有query参数
	点击类别选项的时候，去看看有没有params参数
	注意：我们点击搜索的时候关键字使用的是params参数
	      点击类别选项的时候我们的参数使用的是query参数


到此为止我们的类别选项列表就完成了，后面开始做ListContainer和Floor


### day04

接下来我们就要做首页的ListContainer和Floor组件


1. 设计json数据的结构和值
	banners.json
	floors.json
	
2. 使用mockjs来模拟数据接口（其实和ajax差不多，mock其实就是给我们的json数据指定一个url路径去做请求）
	准备json数据
	使用mockjs来模拟提供接口地址
	mock会拦截我们的ajax请求，不会真正去发送请求。
	
	
3. mock数据的随机语法
	看文档


4. mock数据的vuex编码
	和categoryList的获取几乎一致，把mock接口当真正接口对待就好了
	

5. 实现页面轮播
	swiper的用法参考官方网站
	安装 引入js和css
	swiper必须在页面的数据结构显示完成后创建才会生效

6. 解决swiper影响多个页面的bug

	通过选择器可以指定哪个地方需要，但是不好
	通过ref最好
	

7. swiper创建的时间应该是在页面列表创建之后才会有效果
	静态页面是没问题的
	静态页面不需要等待数据，因此monted完全可以去创建swiper
	现在我们的数据是动态的，monted内部去创建，数据还没更新到界面上，因此无效
	可以使用延迟定时器去创建 但是不好



8. 使用watch + nextTick  去解决比较好	
	Vue.nextTick 和 vm.$nextTick 效果一样
	nextTick是在最近的更新dom之后会立即调用传入nextTick的回调函数



9. 动态显示Floor组件
	数据要对应起来


10. Floor当中的轮播没效果？
	它是根据数据循环创建组件对象的，外部的floor创建的时候
	所以数据肯定是已经获取到了，所以我们在mounted内部去创建swiper


11. 定义可复用的轮播组件
	banner是在watch当中去创建swiper 因为组件创建的时候数据不一定更新
	floor是在mounted当中去创建swiper，因为内部组件创建的时候，数据已经存在了


12. 查看数据的时候应该怎么去查看
	看组件没有数据  接着看vuex没有数据   然后看network请求状态


//到此  首页逻辑就算告一段落  下面开始就是搜索页




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
8. 商品数量增减 v-model 不能减小到小于0  @change 事件 input 输入框数值不能小于1  `@change="$event.target.value<1?skuNum=1:skuNum=$event.target.value"`
9. 加入购物车功能 发送（api -> vuex）加入购物车请求 - 返回成功或失败结果 成功返回成功的值（promise对象）失败返回失败的promise对象 组件内await 后是失败的promise是会报错 然后trycatch alert（error）  导入加入购物车成功组件 添加路由  组件内dispatch的函数返回值即为dispatch的action的返回值 成功则跳转到加入购物车成功组件 顺便 将商品信息存到 sessionStorage 中（重复添加会覆盖原来的）  路由传递?skuNum=${this.skuNum} 然后在加入购物车成功组件中加载数据 字体（css,font）文件引入   跳转回详情页路由 `/detail/${this.skuInfo.id}`
10. 点击加入购物车 - 发生请求 - 成功 - 跳转到加入购物车成功组件 -失败 alert 加入购物车失败  

### day08

1. 购物车结算页  购物车路由组件实现    
2.  usertempid（字符串）添加购物车时使用零时id （后端能有标识的存储商品信息），在后面的购物车列表请求中带上usertempid 就能找到购物车列表信息 
3. /src下创建utils文件夹 工具函数 创建获取usertempid工具（优先本地获取，获取不到通过uuid生成）同时将usertempid存储到本地的localstorage   然后 vuex 创建user.js 将userTempId 在state中直接通过utils/userAbout.js中的uuid获取函数取到值  
4. 导入store对象到axios二次封装文件 在请求拦截器config 的 header中添加 usertempId 这样就可以在每次的请求中带着零时的用户id去到服务器 
5. 通过零时id 购物车组件中就能拿到未登录状态下的购物车商品列表  获取购物车商品列表api函数 -vuex(shopcart.js) 管理购物车列表数据 -组件内挂载后 发请求拿到数据  
6. 重新加入购物车，在购物车组件发请求  就能拿到数据 api-vuex(shopcart.js)-组件   
7. 动态展示数据 很多数据需要数组方法计算 redece every  全选需要双向绑定 
8. 向后台发请求 改变列表数据 数量 单项选择 全选  删除 删除所有 
9. 改变商品数量（和添加购物车使用同一个api接口函数） 先完成改变商品数量api函数定义 然后在vuex中封装异步请求 然后再组件中通过  click change 事件 中 传入当前goods changeNum  如果skuNum - changeNum <1,changeNum=1-skuNum 分发改变数量需求给store 重新发送更新商品请求addOrUpdateShopCart  然后发送更新商品列表请求   (changeNum  商品数量的改变量) 
10. 改变商品选中状态 单个改变 api中创建请求函数 vuex（shopcart.js） 中封住异步请求  组件中点击单选框分发给vuex  参数（0代表取消选中，1代表选中），vuex发送请求，返回请求结果   请求成功后 重新发送购物车列表请求改变页面状态  全部改变 在store中重新封装全部改变的异步请求函数 然后遍历购物车商品列表 每个商品一次dispatch 前面的单个状态改变的异步请求 将请求函数返回的promise对象存进数组 使用 promise.all（内部的promise全部成功则返回成功的promise对象）返回promise.all的结果给组件的dispatch函数 使用await接收是否成功 成功后重新发送请求更新页面数据 trycatch 失败时alert 失败的信息 


### day09
1. 删除商品  api - vuex封装异步请求 根据await 返回的axios请求结果 返回不同状态的promise 
组件内根据 返回的成功失败结果 来确定是否需要重新发送请求 
2. 登录注册静态组件 logo.png公用assert内的图片   相互跳转 
3. 注册 api  vuex（user.js） 封装注册异步请求函数（返回注册状态，成功或失败） 组件内点击注册 收集用户数据 验证码通过代理服务器获取（先发给本地代理服务器，然后代理转发,带cookie?）  提交  
4. 登录 api vuex 封装登录异步请求函数  组件内点击登录 收集登录信息 传递给vuex的登录异步请求函数 返回登录请求成功或失败的结果 成功返回成功的promise，同时将登录成功返回的用户信息提交到state(包含了token) 失败返回失败的promise 点击的登录函数中接收结果 trycatch async await  登录成功后跳转到首页 否则 alert失败的结果  首页 v-if v-else 展示不同的登录状态  处理form 中button 的默认提交行为 @click.prevent
5. 自动登录 刷新后自动登录 保持登录状态  将用户信息存在 localStroage 刷新后先从localstroage取 取到了就可以保持登录状态  将登录后服务端返回的数据保存在localstorage （token）
6. 退出登录 api vuex 封装退出登录请求  请求成功删除本地 登录信息 vuex 和 localstorage 中的 

7. 在请求头中加入登录后返回的token ，ajax请求带token（请求不带token就相当于零时操作，非登录状态）  就能找到用户的信息了（订单，购物车） 完善相关路由跳转逻辑  
8. 跳转到结算  



### day10 

订单信息请求 api vuex 保存数据  组件请求数据 动态加载数据到组件 地址切换   买家留言收集

收集订单信息，提交订单 提交成功后返回订单编号
交易编号 订单编号

支付微信弹框 elementUI 弹框  
定时器 定时发送请求查看支付状态，支付成功后跳转到支付成功页面  查看支付状态 


