import DocumentService from 'api/documents/documents.service'
import { DocumentSuz } from 'models/documents/documentSuz'
import { DocumentSuborderSuz } from 'models/documents/documentSuborderSuz'
import { DocumentAggregationSuz } from 'models/documents/documentAggregationSuz'

export default {
  namespaced: true,
  state: {
    documents: [],
    selectedDocument: null,
    aggregations: [],
    suborders: [],
    repeatRequest: false
  },
  actions: {
    async suzDocuments({ commit, dispatch }, filters){
      commit('setLoading', true, { root: true })
      return await DocumentService.getSuzDocuments(filters).then(
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

    async suzDocumentById({ commit, dispatch }, id){
      commit('setLoading', true, { root: true })
      return await DocumentService.getSuzDocumentById(id).then(
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

    async fetchSubordersSUZ({ commit, dispatch }, id){
      commit('setLoading', true, { root: true })
      return await DocumentService.getSuzSuborders(id).then(
        document => {
          commit('documentsSuborders', { documents: document.data })
          commit('setLoading', false, { root: true })
          return Promise.resolve(document)
        },
        error => {
          // dispatch('setErrorMessage', error, { root: true })
          commit('setLoading', false, { root: true })
        }
      )
    },

    async fetchAggregationSUZ({ commit, dispatch }, id){
      commit('setLoading', true, {root: true})
      return await DocumentService.getSuzAggregation(id).then(
        document => {
          commit('documentsAggregations', { documents: document.data })
          commit('setLoading', false, {root: true})
          return Promise.resolve(document)
        },
        error => {
          commit('setLoading', false, {root: true})
        }
      )
    },

    async fetchRepeatRequest({ commit, dispatch }, id){
      commit('setLoading', true, {root: true})
      return await DocumentService.getRepeatRequest(id).then(
        document => {
          commit('setRepeatRequest')
          return Promise.resolve(document)
        },
        error => {
          dispatch('setErrorMessage', error, { root: true })
          commit('setLoading', false, { root: true })
        }
      )
    },

    clearDocument ({ commit }){
      commit('clear')
    },

    clearDocumentsSuborders ({ commit }){
      commit('clearSuborders')
    },

    clearDocumentsAggregations ({ commit }){
      commit('clearAggregations')
    },

    clearRepeatRequest ({ commit }){
      commit('clearRequest')
    }
  },
  mutations: {
    documentSuccess(state, data) {
      state.selectedDocument = new DocumentSuz(data.document, 'card')
    },

    documentsSuccess(state, data) {
      data.documents.sort( (a, b) =>  new Date(b.docAddDate) - new Date(a.docAddDate) )
      state.documents = data.documents
    },

    documentsSuborders(state, data) {
      state.suborders = data.documents
    },

    documentsAggregations(state, data) {
      state.aggregations = data.documents
    },

    setRepeatRequest(state) {
      state.repeatRequest = true
    },

    clear(state) {
      state.selectedDocument = null
    },

    clearSuborders(state) {
      state.suborders = []
    },

    clearAggregations(state) {
      state.aggregations = []
    },

    clearRequest(state) {
      state.repeatRequest = false
    },

    clearHistory(state) {
      state.history = []
    }
  },
  getters: {
    documents: state => {
      let documents = []
      documents = {
        rows: state.documents?.map((doc) => {
          return new DocumentSuz(doc, 'list')
        }) }
      return documents
    },
    document: (state) => state.selectedDocument,
    suborders: (state) => {
      let documents = []
      documents = {
        rows: state.suborders?.map((doc) => {
          return new DocumentSuborderSuz(doc, 'list')
        }) }
      return documents
    },
    aggregations: (state) => {
      let documents = []
      documents = {
        rows: state.aggregations?.map((doc) => {
          return new DocumentAggregationSuz(doc, 'list')
        }) }
      return documents
    },
    repeatRequest: (state) => state.repeatRequest,
  },
}
