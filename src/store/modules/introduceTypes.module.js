import IntroduceTypesService from 'api/introduce_types.service'
export default {
  namespaced: true,
  state: {
    introduceTypes: [],
  },
  actions: {
    async fetchIntroduceTypes({ commit, dispatch }){
      commit('setLoading', true, {root: true});
      return await IntroduceTypesService.getIntroduceTypesAll().then(
        response => {
          if (response){
              commit('introduceTypesSuccess', {introduceTypes: response.data});
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
    introduceTypesSuccess(state, data){
      state.introduceTypes = data.introduceTypes
    }
  },
  getters: {
    getIntroduceTypes: (state) => state.introduceTypes
  }
};
