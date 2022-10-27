import {calculateAmount, calculateTotal} from "@/functions";

export default {
    namespaced: true,
    state: {
        cart: {},
        cartItemsQty: 0,
        Total: 0
    },
    mutations: {
        ADD_ITEM: (state, item) => {
            state.cartItemsQty++;
            for (let i = 0; i < item.variants.length; i++) {
                if (item.variants[i].attributes[0].value_index === item.colorId &&
                    item.variants[i].attributes[1].value_index === item.sizeId) {
                    item.id = item.variants[i].product.id;
                }
            }

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
            state.cartItemsQty = calculateTotal(state.cart);
        },
        CHANGE_QT: state => {
            state.cartItemsQty = calculateTotal(state.cart);
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
        cartItemsQty: ({cartItemsQty}) => cartItemsQty,
    },

}
