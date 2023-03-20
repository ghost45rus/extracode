import DocumentService from 'api/documents/documents.service'
import { DocumentUCDExternalShipment } from 'models/documents/documentUCDExternalShipment'

export default {
  namespaced: true,
  state: {
    documents: [],
    selectedDocument: null
  },
  actions: {
    async universalCorrectDocuments({ commit, dispatch}, params){
      return await DocumentService.getUniversalCorrectionDocumentsById(params.id, params.type).then(
        response => {
          if (response){
            commit('documentsSuccess', {documents: response.data.data})
            return Promise.resolve(response)
          }
        },
      ).catch(err => {
        dispatch('setMessage', err.message ? err.message : '', {root: true})
      })
    },

    clearDocument ({ commit }){
      commit('clear')
    }
  },
  mutations: {
    documentSuccess(state, data) {
      state.selectedDocument = new DocumentUCDExternalShipment(data.document, 'card')
    },
    documentsSuccess(state, data) {
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
          return new DocumentUCDExternalShipment(doc, 'list')
        }) }
      return documents
    },
    document: (state) => state.selectedDocument,
  },
}
