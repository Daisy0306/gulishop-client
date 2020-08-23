import {
    reqAddOrUpdateCart,
    reqShopCartList
} from "@/api";
const state = {
    shopCartList: []
}
const mutations = {
    RECEIVESHOPCARTLIST(state, shopCartList) {
        state.shopCartList = shopCartList
    }
}
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
        const result = await reqAddOrUpdateCart(skuId, skuNum)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed')) //返回的是失败的promise 结果就是这个return返回的失败的promise的原因
            // return 'failed'  行 但是async函数将永远返回成功状态的promise
        }
    },

    // 购物车列表数据
    async getShopCartList({
        commit
    }) {
        const result = await reqShopCartList()
        if (result.code === 200) {
            commit('RECEIVESHOPCARTLIST', result.data)
        }
    },
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}