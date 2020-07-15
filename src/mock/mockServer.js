import Mock from 'mockjs'
import banner from '@/mock/banner'
import floor from '@/mock/floor' //josn 数据被引入后会变回真正的数组，不再是json串了

Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})



//直接引入到main.js 直接执行
// console.log(1)


