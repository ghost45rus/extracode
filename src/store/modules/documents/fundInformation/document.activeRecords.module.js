import DocumentService from 'api/documents/documents.service'
import { DocumentActiveRecord } from 'models/documents/documentActiveRecord'
export default {
  namespaced: true,
  state: {
    documents: [],
    selectedDocument: false
  },
  actions: {
    async activeRecordDocuments({ commit, dispatch}, filters){
      commit('setLoading', true, { root: true })
      return await DocumentService.getFundInformation('active', filters).then(
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

    clearDocument ({ commit }){
      commit('clear')
    }
  },
  mutations: {
    documentSuccess(state, data) {
      state.selectedDocument = new DocumentActiveRecord(data.document, 'card')
    },
    documentsSuccess(state, data) {
      data.documents.sort( (a, b) => new Date(b.docAddDate) - new Date(a.docAddDate) )
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
          return new DocumentActiveRecord(doc, 'list')
        }) }
      return documents
    },
    document: (state) => state.selectedDocument,
  },
}
