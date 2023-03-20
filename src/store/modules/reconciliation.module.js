import ReconciliationsService from 'api/reconciliation.service'
export default {
  namespaced: true,
  state: {
    reconciliation: [],
  },
  actions: {
    async getReconciliation({ commit, dispatch }){
      commit('setLoading', true, {root: true});
      return await ReconciliationsService.getReconciliation().then(
        response => {
          if (response){
            commit('reconciliationsSuccess', {reconciliation: response.data, type: 'external'});
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
    reconciliationsSuccess(state, data){
      state.reconciliation = data.reconciliation
    }
  },
  getters: {
    reconciliation (state) {
      return state.reconciliation
    },
  }
};
