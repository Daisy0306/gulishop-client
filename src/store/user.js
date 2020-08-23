// import {
//     getUserTempId
// } from "@/utils/userabout";
import {
    getUserTempId
} from '@/utils/userabout'
const state = {
    // 用户的临时身份标识 userTempId，我们在 state 中存储一份
    // 为了以后获取的时候，效率更高一些
    // 用户的身份标识是要存储在永久保存的地方（localStorage），并且尽量不要更改
    // 先去 localStorage 内部去取，有就用，没有就得创建，可以使用函数
    userTempId: getUserTempId(),
}
const mutations = {}
const actions = {}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}