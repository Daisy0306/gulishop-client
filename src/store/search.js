import {
    reqGoodsListInfo
} from '@/api'

const state = {
    goodsListInfo: {}
}

const mutations = {
    RECEIVEGOODSLISTINFO(state, goodsListInfo) {
        state.goodsListInfo = goodsListInfo
    }
}
const actions = {
    // 如果通过 dispath 去调用的函数，接收的第一个参数是 context上下文
    // 我们传递的参数是第二个，如果我们传递的是多个参数，需要使用对象传递给第二个
    async getGoodsListInfo({
        commit
    }, searchParams) {
        const result = await reqGoodsListInfo(searchParams);
        if (result.code === 200) {
            commit("RECEIVEGOODSLISTINFO", result.data);
        }
    }
}

// 加 getters 的目的是为了防止 A.B.C 的出现，vue中会出现假报错
const getters = {
    attrslist(state) {
        return state.goodsListInfo.attrslist || [];
    },
    goodsList(state) {
        return state.goodsListInfo.goodsList || [];
    },
    trademarkList(state) {
        return state.goodsListInfo.trademarkList || [];
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}