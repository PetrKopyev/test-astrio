import brandsFromJSON from "@/data/brands.json"
import products from "@/store/modules/products"

export default {
    namespaced: true,
    state: {
        brands: brandsFromJSON,
        selectedBrand: null,
    },
    mutations: {
        SET_SELECTED_BRAND(state, item) {
            state.selectedBrand = item;
        },
        CLEAR_SELECTED_BRAND(state) {
            state.selectedBrand = null;
        }
    },
    actions: {
        setSelectedBrand({commit}, item) {
            commit('SET_SELECTED_BRAND', item);
        },
        clearSelectedBrand({commit}) {
            commit('CLEAR_SELECTED_BRAND')
        }
    },
    getters: {
        filteredProducts: (state) => (state.selectedBrand
            ? products.state.products.filter(item => item.brand === state.selectedBrand.id)
            : products.state.products),
    }
}
