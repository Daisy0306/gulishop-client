// 这个文件是所有的接口请求函数的文件
// 每一个请求接口数据功能都能给它定义成一个函数，以后哪里需要去请求数据，就调用对应的这个接口请求函数就好了

// 引入刚才暴露出去的 instance
import Ajax from "@/ajax/Ajax";

export const reqCategoryList = () => {
    return Ajax({
        url: "product/getBaseCategoryList",
        method: "get"
    })
}

//reqCategoryList(); // 测试发送请求的时候，通过nprogress 设置在上方的进度条是否可以正常显示