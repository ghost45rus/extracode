import OrganizationsService from 'api/organizations.service'
export default {
  namespaced: true,
  state: {
    external: [],
    internal: [],
    objects: [],
    },
    actions: {
        async externalOrganizations({ commit, dispatch }){
          commit('setLoading', true, {root: true});
          return await OrganizationsService.getOrganizations(1).then(
            response => {
              if (response){
                  commit('organizationsSuccess', {organizations: response.data, type: 'external'});
                  commit('setLoading', false, {root: true});
                  return Promise.resolve(response);
              }
            },
          ).catch(err => {
            dispatch('setMessage', err.message ? err.message : '', {root: true})
            commit('setLoading', false, {root: true});
          });
        },
        async internalOrganizations({ commit, dispatch }){
        commit('setLoading', true, {root: true});
        return await OrganizationsService.getOrganizations(0).then(
          response => {
            if (response){
              commit('organizationsSuccess', {organizations: response.data, type: 'internal'});
              commit('setLoading', false, {root: true});
              return Promise.resolve(response);
            }
          },
        ).catch(err => {
          dispatch('setMessage', err.message ? err.message : '', {root: true})
          commit('setLoading', false, {root: true});
        });
      },
        async objects({ commit, dispatch }){
          commit('setLoading', true, {root: true});
          return await OrganizationsService.getObjects().then(
            response => {
              if (response){
                commit('objectsSuccess', response.data)
                commit('setLoading', false, {root: true})
                return Promise.resolve(response)
              }
            },
          ).catch(err => {
            dispatch('setMessage', err.message ? err.message : '', {root: true})
            commit('setLoading', false, {root: true});
          });
        },
    },
    mutations: {
    objectsSuccess(state, data){
      state.objects = data
    },
      organizationsSuccess(state, data){
        switch (data.type){
          case 'external':
            state.external = data.organizations
            break
          case 'internal':
            state.internal = data.organizations
            break
        }
      }
    },
    getters: {
      external (state) {
        return state.external
      },
      internal (state) {
        return state.internal
      },
      objects (state) {
        return state.objects
      }
    }
};
