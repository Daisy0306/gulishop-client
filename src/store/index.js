import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import home from "./home";
import user from "./user";

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
        user,
        home
    }
})