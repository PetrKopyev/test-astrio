import {calculateAmount, calculateTotal} from "@/functions";

export default {
    namespaced: true,
    state: {
        cart: {},
        TotalPositions: 0,
        Total: 0
    },
    mutations: {
        ADD_ITEM: (state, item) => {
            state.TotalPositions++;
            if (item.id in state.cart) {
                state.cart[item.id].qt++;
            } else {
                let stateItem = {...item};
                stateItem.qt = 1;
                state.cart[item.id] = stateItem;
            }
            state.Total = calculateAmount(state.cart);
        },

        REMOVE_ITEM: (state, item) => {
            delete state.cart[item];
            state.Total = calculateAmount(state.cart);
            state.TotalPositions = calculateTotal(state.cart);
        },
        CHANGE_QT: state => {
            state.TotalPositions = calculateTotal(state.cart);
            state.Total = calculateAmount(state.cart);
        },
    },
    actions: {
        addToItems: ({commit}, item) => commit("ADD_ITEM", item),
        removeItem: ({commit}, item) => commit("REMOVE_ITEM", item),
        changeQt: ({commit}) => commit("CHANGE_QT"),
    },
    getters: {
        cart: ({cart}) => cart,
        Total: ({Total}) => Total,
        TotalPositions: ({TotalPositions}) => TotalPositions,
    },

}
