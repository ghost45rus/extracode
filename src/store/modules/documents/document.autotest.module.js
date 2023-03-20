import DocumentService from 'api/documents/documents.service'
import { DocumentAutotest } from 'models/documents/documentAutotest'
import { DocumentAutotestInfo } from 'models/documents/documentAutotestInfo'
import { DocumentAutotestSample } from 'models/documents/documentAutotestSample'

export default {
  namespaced: true,
  state: {
    documents: [],
    samples: [],
    selectedDocument: null,
    selectedDocumentInfo: null,
    selectedSample: null,
    newAutoTest: [],
    commands: null
  },
  actions: {
    async saveChangedSample({commit, dispatch }, params){
      return await DocumentService.saveChangesSample(params.sampleId, params.sampleName, params.commands).then(
        sample => {
          return Promise.resolve(sample)
        }
      ).catch(
        err => {
          dispatch('setMessage', `Ошибка при сохранении шаблона`, {root: true})
        }
      )
    },

    async getAutotestSampleById({ commit, dispatch}, id){
      commit('setLoading', true, { root: true })
      return await DocumentService.getAutoSampleById(id).then(
        response => {
          if (response){
            commit('sampleSuccess', { sample: response.data })
            commit('setLoading', false, { root: true })
            return Promise.resolve(response)
          }
        },
      )
        .catch(error => {
        dispatch('setErrorMessage', error, {root: true})
        commit('setLoading', false, { root: true })
      })
    },
    async getAutotestSamples({ commit, dispatch}, filters){
      commit('setLoading', true, { root: true })
      return await DocumentService.getAutotestSamples(filters).then(
        response => {
          if (response){
            commit('samplesSuccess', { samples: response.data })
            commit('setLoading', false, { root: true })
            return Promise.resolve(response)
          }
        },
      ).catch(error => {
        dispatch('setErrorMessage', error, {root: true})
        commit('setLoading', false, { root: true })
      })
    },

    async getAutotests({ commit, dispatch}, filters){
      commit('setLoading', true, { root: true })
      return await DocumentService.getAutotests(filters).then(
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

    async getAutotestInfoByIdAndIndex({ commit, dispatch }, params){
      commit('clearDocumentInfo')
      return await DocumentService.getAutoTestByIndex(params.id, params.index).then(
        document => {
          commit('documentInfoSuccess', { document: document.data })
          return Promise.resolve(document)
        },
        error => {
          dispatch('setErrorMessage', error, { root: true })
          commit('setLoading', false, { root: true })
        }
      )
    },

    async getAutotestById({ commit, dispatch }, id){
      commit('setLoading', true, { root: true })
      return await DocumentService.getAutoTestById(id).then(
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

    async getAutoTestCommands({commit} ){
      return await DocumentService.getAutoTestAllCommands().then(
        response => {
          if (response){
            commit('commandsSuccess', response.data)
            return Promise.resolve(response)
          }
        },
      ).catch(error => {
        // dispatch('setErrorMessage', error, {root: true})
      })
    },

    async createAutoTest({state},params){
      return await DocumentService.createAutoTest(params).then(
        document => {
          return Promise.resolve(document)
        }
      )
    },

    async createAutoTestBySample({state},params){
      return await DocumentService.createTestBySample(params.id, params.name).then(
        document => {
          return Promise.resolve(document)
        }
      )
    },

    async createSample({state},params){
      return await DocumentService.createSample(params.sampleName, params.commands).then(
        document => {
          return Promise.resolve(document)
        }
      )
    },

    async startFullAutotest({state, dispatch}, params){
      return await DocumentService.startTestById(params.id).then(
        document => {
          dispatch('setMessage', `Запустили тест целиком`, {root: true})
          return Promise.resolve(document)
        }
      ).catch(
        err => {
          dispatch('setMessage', `Ошибка при запуске теста целиком`, {root: true})
        }
      )
    },

    async startAutoTestByIndex({state, dispatch}, params){
      return await DocumentService.startTestByIndex(params.id, params.index).then(
        document => {
          dispatch('setMessage', `Запустили команду №${params.index}`, {root: true})
          return Promise.resolve(document)
        }
      ).catch(
        err => {
          dispatch('setMessage', `Ошибка при запуске команды`, {root: true})
        }
      )
    },

    async changeAutoTest({state, dispatch}, params){
      return await DocumentService.changeAutoTest(params.id, params.commands).then(
        document => {
          return Promise.resolve(document)
        }
      ).catch(
        err => {
          dispatch('setMessage', `Ошибка при сохранение изменений`, {root: true})
        }
      )
    },

    createNewAutoTest({ commit }){
      commit('resetAutoTest')
    },

    addNewCommand({ commit }){
      commit('appendCommand')
    },

    clearDocument ({ commit }){
      commit('clear')
    }
  },
  mutations: {
    commandsSuccess(state, data) {
      let commands = data.map(item => {
        return {
          id: item.id,
          name: item.description,
          nameCommand: item.name,
          content:item.sample,
          regular: item.regular,
          sample: item.sample
        }
      })
      state.commands = commands
    },

    documentSuccess(state, data) {
      state.selectedDocument = new DocumentAutotest(data.document, 'card')
    },
    sampleSuccess(state, data) {
      state.selectedSample = new DocumentAutotestSample(data.sample, 'card')
    },
    documentsSuccess(state, data) {
      data.documents.sort( (a, b) => new Date(b.docAddDate) - new Date(a.docAddDate) )
      state.documents = data.documents
    },
    samplesSuccess(state, data) {
      data.samples.sort( (a, b) => new Date(b.docAddDate) - new Date(a.docAddDate) )
      state.samples = data.samples
    },
    documentInfoSuccess(state, data) {
      state.selectedDocumentInfo = new DocumentAutotestInfo(data.document, 'list')
    },
    clear(state) {
      state.selectedDocument = null
    },
    clearDocumentInfo(state) {
      state.selectedDocumentInfo = null
    },
    resetAutoTest(state){
      state.index = 0
      state.newAutoTest = []
    },
    setCommandsSample(state, value){
      state.selectedSample.commands = value
    },
    setCommands(state, value){
      state.newAutoTest = value
    },
  },
  getters: {
    documents: state => {
      let documents = []
      documents = {
        rows: state.documents?.map((doc) => {
          return new DocumentAutotest(doc, 'list')
        }) }
      return documents
    },
    samples: state => {
      let documents = []
      documents = {
        rows: state.samples?.map((doc) => {
          return new DocumentAutotestSample(doc, 'list')
        }) }
      return documents
    },
    document: (state) => state.selectedDocument,
    sample: (state) => state.selectedSample,
    documentInfo: (state) => state.selectedDocumentInfo,
    newAutoTest: (state) => state.newAutoTest,
    commands: (state) => state.commands,
  },
}
