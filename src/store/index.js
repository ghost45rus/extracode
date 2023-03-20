import { createStore } from 'vuex'

import {auth} from './modules/auth.module'
import kiz from './modules/kiz.module'
import settings from './modules/settings.module'
import documents from './modules/documents'
import organizations from './modules/organizations.module'
import headers from './modules/headers.module'
import pagination from './modules/pagination.module'
import sorting from './modules/sorting.module'
import filters from './modules/filters.module'
import productGroups from './modules/productGroups.module'
import introduceTypes from './modules/introduceTypes.module'
import markLeavingTypes from './modules/markLeavingTypes.module'
import businessProcesses from './modules/businessProcesses.module'
import reconciliation from './modules/reconciliation.module'
import statuses from './modules/status.module'

const store = {
  state: {
    chapter: '',
    loading: false,
    message: ''
  },
  getters: {
    loading: (state) => state.loading,
    message: (state) => state.message
  },
  mutations: {
    setLoading(state, value){
      state.loading = value
    },
    changeMessage(state, message){
      state.message = message
    }
  },
  actions: {
    setMessage({commit}, message){
      commit('changeMessage', message)
    },
    setErrorMessage({commit}, error){
      let message = error.response.data?.error?.message ?? error.response.data?.error ?? error.response.data ?? error.response?.statusText ?? 'Неизвестная ошибка'
      commit('changeMessage', message)
    },
    chapterAction ({ commit }, chapter) {
      commit('changeChapter', chapter)
    },
    logInAction ({ commit }) {
       commit('loginIn')
    },
    logOutAction ({ commit }) {
      commit('loginOut')
    }
  },
  modules: {
    auth,
    documents,
    kiz,
    organizations,
    pagination,
    sorting,
    settings,
    headers,
    filters,
    productGroups,
    introduceTypes,
    markLeavingTypes,
    businessProcesses,
    reconciliation,
    statuses
  }
}

export default createStore(store)
