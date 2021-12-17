import {SET_SELECTED_ORDER, SET_SELECTED_ORDER_INFO, SET_SELECTED_PROCESS} from "./mutations.type";

const state = {
    selectedOrder: {},
    selectedProcess: "",
    selectedOrderInfo: "",
};

const getters = {
    selectedOrder(state) {
        return state.selectedOrder;
    }
};

const actions = {};

const mutations = {
    [SET_SELECTED_ORDER](state, order) {
        state.selectedOrder = order;
    },
    [SET_SELECTED_ORDER_INFO](state, info) {
        state.selectedOrderInfo = info;
    },
    [SET_SELECTED_PROCESS](state, proc) {
        state.selectedProcess = proc;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
