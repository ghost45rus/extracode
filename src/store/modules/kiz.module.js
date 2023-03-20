import MarksService from 'api/marks.service'
import { Kiz, KizUKD } from 'models/kiz'
export default {
  namespaced: true,
  state: {
    kiz: {
      selectedKIZ: null
    },
    kizUKD:{
      data: null
    }
  },
  actions: {
    async getMarksByUkdId({ commit, dispatch }, id){
      return await MarksService.getMarksByUkdId(id).then(
        document => {
          commit('documentKizUkdSuccess', document.data)
          return Promise.resolve(document)
        },
        error => {
          dispatch('setErrorMessage', error, {root: true})
        }
      )
    },
    async kizByBarCode({ commit, dispatch }, barCode){
      commit('setLoading', true, {root: true})
      return await MarksService.getKizByBarCode(barCode).then(
        document => {
          document.data.data.barCode = barCode
          commit('documentSuccess', {document: document.data.data})
          commit('setLoading', false, {root: true})
          return Promise.resolve(document)
        },
        error => {
          dispatch('setErrorMessage', error, {root: true})
          commit('documentError')
          commit('setLoading', false, {root: true})
        }
      )
    },

    async updateInGIS({ commit, dispatch }, data) {
      dispatch('setMessage', 'Запущено обновление марки из ГИС МТ.\n' +
        ` КИ: ${data.details[0].markInfoList[0].markCode}`, {root: true})
      return await MarksService.updateMarkInGis(data).then().catch(error => {
        dispatch('setMessage', 'Не удалось запустить обновление', {root: true})
      })
    }
  },
  mutations: {
    documentSuccess(state, data) {
      let document = new Kiz(data.document)
      state.kiz.selectedKIZ = document
    },
    documentKizUkdSuccess(state, data) {
      let document = new KizUKD(data)
      state.kizUKD.data = document
    },
    documentError(state) {
      state.kiz.selectedKIZ = null
    },
  },
  getters: {
    selectedKiz: (state) => state.kiz.selectedKIZ,
    kizUKD: (state) => state.kizUKD.data
  }
}
