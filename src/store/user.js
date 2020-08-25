// import {
//     getUserTempId
// } from "@/utils/userabout";
import {
    getUserTempId,
} from '@/utils/userabout'
import {
    reqRegister,
    reqLogin,
    reqLogout
} from "@/api";
const state = {
    // 用户的临时身份标识 userTempId，我们在 state 中存储一份
    // 为了以后获取的时候，效率更高一些
    // 用户的身份标识是要存储在永久保存的地方（localStorage），并且尽量不要更改
    // 先去 localStorage 内部去取，有就用，没有就得创建，可以使用函数
    userTempId: getUserTempId(),
    userInfo: JSON.parse(localStorage.getItem('USERINFO_KEY')) || {}
    //userInfo: {}
}
const mutations = {
    RECEIVEUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    RESETUSERINFO(state) {
        state.userInfo = {}
    }
}
const actions = {
    // 注册
    async register({
        commit
    }, userInfo) {
        const result = await reqRegister(userInfo);
        if (result.code === 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('failed'));
        }
    },
    // 登录
    async login({
        commit
    }, userInfo) {
        const result = await reqLogin(userInfo);
        if (result.code === 200) {
            commit('RECEIVEUSERINFO', result.data)
            localStorage.setItem('USERINFO_KEY', JSON.stringify(result.data))
            return "ok"
        } else {
            return Promise.reject(new Error("failed"))
        }
    },
    // 退出登录
    async logout({
        commit
    }) {
        const result = await reqLogout();
        if (result.code === 200) {
            // 清空 localStorage 当中的用户数据
            // 清空 state 中的 userInfo 数据
            localStorage.removeItem('USERINFO_KEY')
            commit('RESETUSERINFO')
            return "ok"
        } else {
            return Promise.reject(new Error('failed'))
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