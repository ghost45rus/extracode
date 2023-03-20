import ProductGroupsService from 'api/product_groups.service'
export default {
  namespaced: true,
  state: {
    productGroups: [],
  },
  actions: {
    async fetchProductGroups({ commit, dispatch }){
      commit('setLoading', true, {root: true});
      return await ProductGroupsService.getProductGroupsAll().then(
        response => {
          if (response){
              commit('productGroupsSuccess', {productGroups: response.data});
              commit('setLoading', false, {root: true});
              return Promise.resolve(response);
          }
        },
      ).catch(err => {
        dispatch('setMessage', err.message ? err.message : '', {root: true})
        commit('setLoading', false, {root: true});
      });
    },
  },
  mutations: {
    productGroupsSuccess(state, data){
      state.productGroups = data.productGroups
    }
  },
  getters: {
    getProductGroups: (state) => state.productGroups
  }
};
