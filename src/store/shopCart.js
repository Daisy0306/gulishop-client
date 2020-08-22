import {
    reqAddOrUpdateCart
} from "@/api";
const state = {}
const mutations = {}
const actions = {
    // 异步发送请求，dispatch 有两个参数，必须用对象的形式，解构出来
    // 二次封装axios时已经对失败状态做了统一处理
    // {commit}    占位用- context
    async addOrUpdateCart({
        commit
    }, {
        skuId,
        skuNum
    }) {
        const result = await reqAddOrUpdateCart(skuId, skuNum);
        if (result.code === 200) {
            return "0k"
        } else {
            return Promise.reject(new Error('failed'));
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}