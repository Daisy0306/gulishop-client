import {
    reqCategoryList
} from "@/api";
const state = {
    categoryList: []
}

const mutations = {
    // 直接修改数据 （不允许出现 if判断 for循环 异步操作 ）
    RECEIVECATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    }
}
const actions = {
    // 异步请求获取数据  （允许 if for 异步操作）
    // 用 async await 和 promise结合的方式解决异步问题
    // 因为之前的二次封装axios那里已经统一处理了错误结果，这里不需要处理 .catch()了
    async getCategoryList({
        commit
    }) {
        // 用promise的.then()方法直接处理
        //reqCategoryList().then(result => {
        //  commit("RECEIVECATEGORYLIST",result.data)
        //})

        const result = await reqCategoryList();
        if (result.code === 200) {
            commit("RECEIVECATEGORYLIST", result.data);
        }
    }
}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}