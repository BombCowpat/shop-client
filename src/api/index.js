// 项目的接口请求函数文件 

import Ajax from '@/ajax/Ajax'

//三级分类列表数据 
// get   /api/product/getBaseCategoryList  参数：无

export const reqCategoryList = ()=> Ajax.get('/product/getBaseCategoryList')









