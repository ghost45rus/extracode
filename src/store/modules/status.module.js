import StatusService from 'api/status.service'
export default {
  namespaced: true,
  state: {
    statusesDirectDelivery: null,
    statusesGroupOperation: null,
    statusesSuz: null,
    statusesCommissioning: null,
    statusesLeaving: null,
    statusesIncoming: null,
    statusesAggregation: null,
    statusesExternalShipment: null,
    statusesReconciliation: null,
    statusesActive: null,
    statusesProcessed: null,
    statusesAutoTest: null,
  },
  actions: {
    async getStatuses({commit, dispatch}, docTable) {
      commit('setLoading', true, {root: true});
      return await StatusService.getAllStatus(docTable).then(
        response => {
          if (response) {
            commit('statusesSuccess', {statuses: response.data, type: docTable});
            commit('setLoading', false, {root: true});
            return Promise.resolve(response);
          }
        },
      ).catch(err => {
        dispatch('setMessage', err.message ? err.message : '', {root: true})
        commit('setLoading', false, {root: true});
      });
    },
    async getStatusesFund({commit, dispatch}, type) {
      commit('setLoading', true, {root: true});
      return await StatusService.getAllStatusFund(type).then(
        response => {
          if (response) {
            commit('statusesSuccess', {statuses: response.data, type: type});
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
    statusesSuccess(state, data) {
      switch (data.type) {
        case 'external_incoming_docs':
          state.statusesDirectDelivery = data.statuses
          break
        case 'intragroup_transactions_docs':
          state.statusesGroupOperation = data.statuses
          break
        case 'mark_issue_docs':
          state.statusesSuz = data.statuses
          break
        case 'mark_introduce_docs':
          state.statusesCommissioning = data.statuses
          break
        case 'incoming_docs':
          state.statusesIncoming = data.statuses
          break
        case 'mark_leaving_docs':
          state.statusesLeaving = data.statuses
          break
        case 'aggregation_docs':
          state.statusesAggregation = data.statuses
          break
        case 'external_shipment_docs':
          state.statusesExternalShipment = data.statuses
          break
        case 'reconciliation_docs':
          state.statusesReconciliation = data.statuses
          break
        case 'active':
          state.statusesActive = data.statuses
          break
        case 'processed':
          state.statusesProcessed = data.statuses
          break
        case 'autotest_docs':
          state.statusesAutoTest = data.statuses
          break
      }
    }
  },
  getters: {
    statuses: state => docTable => {
      let statuses = []
      switch (docTable) {
        case 'external_incoming_docs':
          statuses = state.statusesDirectDelivery?.map(status => {
            return {
              id: status.id,
              name: status.description,
              description: status.name
            }
          })
          break
        case 'intragroup_transactions_docs':
          statuses = state.statusesGroupOperation?.map(status => {
            return {
              id: status.id,
              name: status.description,
              description: status.name
            }
          })
          break
        case 'mark_issue_docs':
          statuses = state.statusesSuz?.map(status => {
            return {
              id: status.id,
              name: status.description,
              description: status.name
            }
          })
          break
        case 'mark_introduce_docs':
          statuses = state.statusesCommissioning?.map(status => {
            return {
              id: status.id,
              name: status.description,
              description: status.name
            }
          })
          break
        case 'incoming_docs':
          statuses = state.statusesIncoming?.map(status => {
            return {
              id: status.id,
              name: status.description,
              description: status.name
            }
          })
          break
        case 'mark_leaving_docs':
          statuses = state.statusesLeaving?.map(status => {
            return {
              id: status.id,
              name: status.description,
              description: status.name
            }
          })
          break
        case 'aggregation_docs':
          statuses = state.statusesAggregation?.map(status => {
            return {
              id: status.id,
              name: status.description,
              description: status.name
            }
          })
          break
        case 'external_shipment_docs':
          statuses = state.statusesExternalShipment?.map(status => {
            return {
              id: status.id,
              name: status.description,
              description: status.name
            }
          })
          break
        case 'reconciliation_docs':
          statuses = state.statusesReconciliation?.map(status => {
            return {
              id: status.id,
              name: status.description,
              description: status.name
            }
          })
          break
        case 'active':
          statuses = state.statusesActive?.map(status => {
            return {
              id: status.id,
              name: status.description,
              description: status.name
            }
          })
          break
        case 'processed':
          statuses = state.statusesProcessed?.map(status => {
            return {
              id: status.id,
              name: status.description,
              description: status.name
            }
          })
          break
        case 'autotest_docs':
          statuses = state.statusesAutoTest?.map(status => {
            return {
              id: status.id,
              name: status.description,
              description: status.name
            }
          })
          break
      }
      return statuses
    }
  }
}
