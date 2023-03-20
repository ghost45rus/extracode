import MarkLeavingTypesService from 'api/mark_leaving_types.service'
export default {
  namespaced: true,
  state: {
    markLeavingTypes: [],
  },
  actions: {
    async fetchMarkLeavingTypes({ commit, dispatch }){
      commit('setLoading', true, {root: true});
      return await MarkLeavingTypesService.getMarkLeavingTypesAll().then(
        response => {
          if (response){
              commit('markLeavingTypesSuccess', {markLeavingTypes: response.data});
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
    markLeavingTypesSuccess(state, data){
      state.markLeavingTypes = data.markLeavingTypes
    }
  },
  getters: {
    getMarkLeavingTypes: (state) => state.markLeavingTypes
  }
};
