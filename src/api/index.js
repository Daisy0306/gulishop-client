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

// 发送本地请求的接口数据
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