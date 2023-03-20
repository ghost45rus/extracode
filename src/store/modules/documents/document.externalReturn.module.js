import DocumentService from 'api/documents/documents.service'
import { DocumentExternalReturn } from 'models/documents/documentExternalReturn'

export default {
  namespaced: true,
  state: {
    documents: [],
    selectedDocument: null
  },
  actions: {
    async fetchExternalShipmentReturn({ commit, dispatch }, filters){
      commit('setLoading', true, { root: true })
      return await DocumentService.getExternalShipmentReturn(filters).then(
        response => {
          if (response){
            commit('documentsSuccess', { documents: response.data })
            commit('setLoading', false, { root: true })
            return Promise.resolve(response)
          }
        },
      ).catch(error => {
        dispatch('setErrorMessage', error, { root: true })
        commit('setLoading', false, { root: true })
      })
    },

    async externalReturnDocumentById({ commit, dispatch }, id){
      commit('setLoading', true, { root: true })
      return await DocumentService.getExternalReturnDocumentById(id).then(
        document => {
          commit('documentSuccess', { document: document.data })
          commit('setLoading', false, { root: true })
          return Promise.resolve(document)
        },
        error => {
          dispatch('setErrorMessage', error, { root: true })
          commit('setLoading', false, { root: true })
        }
      )
    },

    async repeatMarksCheck({ commit, dispatch}, params){
      return await DocumentService.getRepeatMarksCheck(params).then(response => {
        if (response){
          dispatch('setMessage', 'Запустили повторную проверку марок', {root: true})
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
      state.selectedDocument = new DocumentExternalReturn(data.document, 'card')
    },
    documentsSuccess(state, data) {
      data.documents.sort( (a, b) =>  new Date(b.docAddDate) - new Date(a.docAddDate) )
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
          return new DocumentExternalReturn(doc, 'list')
        }) }
      return documents
    },
    document: (state) => state.selectedDocument,
  },
}
