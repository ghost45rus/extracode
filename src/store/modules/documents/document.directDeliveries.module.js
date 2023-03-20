import DocumentService from 'api/documents/documents.service'
import { DocumentDirectDeliverie } from 'models/documents/documentDirectDeliverie'

export default {
  namespaced: true,
  state: {
    documents: [],
    selectedDocument: false
  },
  actions: {
    async directDeliveryDocuments({ commit, dispatch}, filters){
      commit('setLoading', true, { root: true })
      return await DocumentService.getAllDocumentsDirectDeliverie(filters).then(
        response => {
          if (response){
            commit('documentsSuccess', { documents: response.data })
            commit('setLoading', false, { root: true })
            return Promise.resolve(response)
          }
        },
      ).catch(error => {
        dispatch('setErrorMessage', error, {root: true})
        commit('setLoading', false, { root: true })
      })
    },

    async directDeliveryDocumentById({ commit, dispatch }, id){
      commit('setLoading', true, { root: true })
      return await DocumentService.getDocumentDirectDeliverieByIdCard(id).then(
        document => {
          commit('documentSuccess', { document: document.data.data })
          commit('setLoading', false, { root: true })
          return Promise.resolve(document)
        },
        error => {
          dispatch('setErrorMessage', error, { root: true })
          commit('setLoading', false, { root: true })
        }
      )
    },

    async detailDocument({ commit, dispatch}, id){
      return await DocumentService.getDocumentDetailed(id).then(response => {
        if (response){
          dispatch('setMessage', 'Запустили детализацию', {root: true})
          return Promise.resolve(response)
        }
      }).catch(err => {
        dispatch('setMessage', err.message ? err.message : '', {root: true})
      })
    },

    clearDocument ({ commit }){
      commit('clear')
    }
  },
  mutations: {
    documentSuccess(state, data) {
      state.selectedDocument = new DocumentDirectDeliverie(data.document, 'card')
    },
    documentsSuccess(state, data) {
      data.documents.sort( (a, b) => new Date(b.invoiceDate) - new Date(a.invoiceDate) || new Date(b.docAddDate) - new Date(a.docAddDate) )
      state.documents = data.documents
    },
    clear(state) {
      state.selectedDocument = null
    }
  },
  getters: {
    documents: state => {
      let documents = []
      documents = {
        rows: state.documents?.map((doc) => {
          return new DocumentDirectDeliverie(doc, 'list')
        }) }
      return documents
    },
    document: (state) => state.selectedDocument,
  },
}
