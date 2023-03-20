import BusinessProcessesService from 'api/business_processes.service'
export default {
  namespaced: true,
  state: {
    businessProcesses: [],
  },
  actions: {
    async fetchBusinessProcesses({ commit, dispatch }){
      commit('setLoading', true, {root: true});
      return await BusinessProcessesService.getBusinessProcessesAll().then(
        response => {
          if (response){
              commit('businessProcessesSuccess', {businessProcesses: response.data});
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
    businessProcessesSuccess(state, data){
      state.businessProcesses = data.businessProcesses
    }
  },
  getters: {
    getBusinessProcesses: (state) => state.businessProcesses
  }
};
