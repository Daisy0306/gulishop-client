// 这个文件是所有的接口请求函数的文件
// 每一个请求接口数据功能都能给它定义成一个函数，以后哪里需要去请求数据，就调用对应的这个接口请求函数就好了

// 引入刚才暴露出去的 instance【向服务端发送ajax请求】
import Ajax from "@/ajax/Ajax";
// 引入向本地发送ajax请求的文件
import mockAjax from "@/ajax/mockAjax";

export const reqCategoryList = () => {
    return Ajax({
        url: "product/getBaseCategoryList",
        method: "get"
    })
}
//reqCategoryList(); // 测试发送请求的时候，通过nprogress 设置在上方的进度条是否可以正常显示

// 发送本地请求的接口数据,banner 和 floor
export const reqBannerList = () => {
    return mockAjax({
        url: "/banner",
        method: "GET"
    })
}
export const reqFloorList = () => {
    return mockAjax({
        url: "/floor",
        method: "GET"
    })
}

// 搜索商品的接口数据
export const reqGoodsListInfo = (searchParams) => {
    return Ajax({
        url: "/list",
        method: "post",
        data: searchParams
    })
}
// 测试 商品接口数据的post请求是否发送成功，必须传参：空对象
//reqGoodsListInfo({}); // XHR中新增 list 相关的请求记录

// 商品详情的接口数据
///api/item/{ skuId }  get
export const reqGoodsDetailInfo = (skuId) => {
    return Ajax({
        url: `item/${skuId}`,
        method: "GET"
    })
}

// 请求添加到购物车（或者修改购物车数量）
// /api/cart/addToCart/{ skuId }/{ skuNum }   POST 
// 参数：① skuID 商品ID；  ② skuNum 商品数量
export const reqAddOrUpdateCart = (skuId, skuNum) => {
    return Ajax({
        // 如果直接在路径当中就是 params 参数
        // 如果路径中有 ?key=value  ，就是query参数
        // 写在配置项中：①params:{ }；② 路径中写
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'POST'
    })
}

// 请求购物车列表数据
// /api/cart/cartList   get
export const reqShopCartList = () => {
    return Ajax({
        url: '/cart/cartList',
        method: "get"
    })
}
// 对象写法：export const reqShopCartList = () => Ajax.get('/cart/cartList')

// 切换购物车商品选中状态
// /api/cart/checkCart/{skuID}/{isChecked}  get  
// isChecked 0代表取消选中  1代表选中
export const reqUpdateIsCheck = (skuId, isChecked) => {
    return Ajax({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: 'get'
    })
}

// 删除购物车商品
// /api/cart/deleteCart/{skuId}    delete
export const reqDeleteCart = (skuId) => {
    return Ajax({
        url: `/cart/deleteCart/${skuId}`,
        method: "delete"
    })
}

// 创建请求注册接口请求函数
// /api/user/passport/register  POST
// mobile手机号   password密码   code验证码
export const reqRegister = (userInfo) => {
    return Ajax({
        url: "/user/passport/register",
        method: "post",
        data: userInfo // userInfo就是对象{mobile,code,password}
    })
}

// 创建请求登录的接口请求函数
// /api/user/passport/login  POST
// mobile 用户名   password 密码
export const reqLogin = (userInfo) => {
    return Ajax({
        url: "/user/passport/login",
        method: "POST",
        data: userInfo
    })
}

// 退出登录接口请求函数
// /api/user/passport/logout    GET  无参数
export const reqLogout = () => {
    return Ajax({
        url: "/user/passport/logout",
        method: "GET"
    })
}

// 请求订单交易页面接口请求函数
// /api/order/auth/trade   GET   无参数
export const reqTradeInfo = () => {
    return Ajax({
        url: '/order/auth/trade',
        method: "GET"
    })
}

// 请求创建订单接口请求函数：
///api/order/auth/submitOrder?tradeNo={tradeNo}  post
export const reqSubmitOrder = (tradeNo, tradeInfo) => {
    return Ajax({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method: 'post',
        data: tradeInfo
    })
}