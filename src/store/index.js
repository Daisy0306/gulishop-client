import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import home from "./home";
import user from "./user";
import search from "./search";
import detail from "./detail";

const state = {};
const getters = {};
const actions = {};
const mutations = {};
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: {
        // 合并小的 store 到大的 store 身上
        user,
        home,
        search,
        detail
    }
})