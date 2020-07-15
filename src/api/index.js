// 项目的接口请求函数文件 

import Ajax from '@/ajax/Ajax'
import mockAjax from '@/ajax/mockAjax'

//三级分类列表数据 
// get   /api/product/getBaseCategoryList  参数：无

export const reqCategoryList = ()=> Ajax.get('/product/getBaseCategoryList')




//mock 接口 


export const reqBannerList = ()=> mockAjax.get('/banner')
export const reqFloorList = ()=> mockAjax.get('/floor')

