// 项目的接口请求函数文件 

import Ajax from '@/ajax/Ajax'
import mockAjax from '@/ajax/mockAjax'

//三级分类列表数据 
// get   /api/product/getBaseCategoryList  参数：无

export const reqCategoryList = ()=> Ajax.get('/product/getBaseCategoryList')




//mock 接口 


export const reqBannerList = ()=> mockAjax.get('/banner')
export const reqFloorList = ()=> mockAjax.get('/floor')


//请求商品
export const reqGoodsList = (searchParams)=> Ajax.post('/list',searchParams)


//商品详情数据请求 /api/item/{skuId}
export const reqGoodsDetailInfo = (skuId) => Ajax.get(`/item/${skuId}`) 


//加入购物车 /api/cart/addToCart/{ skuId }/{ skuNum }

export const reqAddOrUpdateShopCart = (skuId,skuNum) => Ajax.post(`/cart/addToCart/${ skuId }/${ skuNum }`)

// shopcartList /cart/cartList
export const reqShopCartList = () => Ajax.get('/cart/cartList')

// 请求修改购物车选中状态 /cart/checkCart/{skuID}/{isChecked}
export const reqUpdateIsChecked = (skuId,isChecked) => Ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)

