import DocumentService from 'api/documents/documents.service'

import { DocumentHistory } from 'models/history'

import aggregation from './document.aggregation.module'
import commissioning from './document.commissioning.module'
import directDeliveries from './document.directDeliveries.module'
import groupOperations from './document.groupOperations.module'
import incoming from './document.incoming.module'
import leaving from './document.leaving.module'
import externalShipment from './document.exterrnalShipment.module'
import externalReturn from './document.externalReturn.module'
import reconciliation from './document.reconciliation.module'
import SUZ from './document.suz.module'
import ucd from './UCD'
import fundInformation from './fundInformation'
import autoTest from './document.autotest.module'

export default {
  namespaced: true,
  state: {
    history: null
  },
  actions: {
    async documentHistory({ commit, dispatch }, params){
      return await DocumentService.getDocumentHistory(params.id, params.type).then(
        response => {
          commit('historySuccess', {history: response.data.data})
          return Promise.resolve(response)
        },
        error => {
          dispatch('setErrorMessage', error, {root: true})
        }
      )
    },

    clearHistory ({ commit }){
      commit('clear')
    },
  },
  mutations: {
    historySuccess(state, data) {
      state.history = data.history
    },

    clear(state){
      state.history = []
    },
  },
  getters: {
    history: (state) => {
      let documents = null
      documents = {
        rows: state.history?.map(h => {
          return new DocumentHistory(h)
        })
      }
      return documents
    }
  },
  modules: {
    aggregation,
    commissioning,
    directDeliveries,
    groupOperations,
    incoming,
    leaving,
    externalShipment,
    externalReturn,
    reconciliation,
    SUZ,
    ucd,
    fundInformation,
    autoTest
  }
}
