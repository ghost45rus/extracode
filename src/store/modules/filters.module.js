export default {
  namespaced: true,
  state: {
    filters: {
      'directDeliveries': {
        transactionId: { value: '', visibility: true, name: 'Ид. транзакции', resetValue: '' },
        numberUpd: { value: '', visibility: true, name: 'Номер УПД', resetValue: ''  },
        dateFrom: { value: new Date(new Date().setHours(0, 0, 0, 0)), visibility: true, name: 'Дата УПД с', resetValue: null },
        status: { value: [], visibility: true, name: 'Статус', resetValue: []},
        dateTo: { value: null, visibility: true, name: 'Дата УПД по', resetValue: null  },
        vendor: { value: {}, visibility: false, name: 'Отправитель', resetValue: {} },
        buyer: { value: {}, visibility: false, name: 'Получатель', resetValue: {}  },
      },
      'groupOperations': {
        transactionId: { value: '', visibility: true, name: 'Ид. транзакции', resetValue: '' },
        dateFrom: { value: new Date(new Date().setHours(0, 0, 0, 0)), visibility: true, name: 'Дата отгрузки с', resetValue: null  },
        dateTo: { value: null, visibility: true, name: 'Дата отгрузки по', resetValue: null  },
        status: { value: [], visibility: true, name: 'Статус', resetValue: [] },
        vendor: { value: {}, visibility: false, name: 'Отправитель', resetValue: {}  },
        buyer: { value: {}, visibility: false, name: 'Получатель', resetValue: {}  }

      },
      'SUZ': {
        transactionId: { value: '', visibility: true, name: 'Ид. транзакции', resetValue: '' },
        productionOrderId: { value: '', visibility: true, name: 'Ид. производственного заказа', resetValue: '' },
        productGroup: { value: {}, visibility: true, name: 'Товарная группа', resetValue: {} },
        businessProcess: { value: {}, visibility: false, name: 'Способ выпуска КМ', resetValue: {} },
        dateFrom: { value: new Date(new Date().setHours(0, 0, 0, 0)), visibility: true, name: 'Дата заказа с', resetValue: null },
        dateTo: { value: null, visibility: true, name: 'Дата заказа по', resetValue: null },
        status: { value: [], visibility: true, name: 'Статус', resetValue: [] }
      },
      'Commissioning': {
        transactionId: { value: '', visibility: true, name: 'Ид. транзакции', resetValue: '' },
        productGroup: { value: {}, visibility: true, name: 'Товарная группа', resetValue: {} },
        introduceType: { value: {}, visibility: true, name: 'Типа документа', resetValue: {} },
        dateFrom: { value: new Date(new Date().setHours(0, 0, 0, 0)), visibility: true, name: 'Дата документа c', resetValue: null },
        dateTo: { value: null, visibility: true, name: 'Дата документа по', resetValue: null },
        status: { value: [], visibility: true, name: 'Статус', resetValue: [] }
      },
      'Leaving': {
        transactionId: { value: '', visibility: true, name: 'Ид. транзакции', resetValue: '' },
        docNumber: { value: '', visibility: true, name: 'Номер документа', resetValue: '' },
        productGroup: { value: {}, visibility: true, name: 'Товарная группа', resetValue: {} },
        markLeavingType: { value: {}, visibility: true, name: 'Типа документа', resetValue: {} },
        dateFrom: { value: new Date(new Date().setHours(0, 0, 0, 0)), visibility: true, name: 'Дата документа c', resetValue: null },
        dateTo: { value: null, visibility: true, name: 'Дата документа по', resetValue: null },
        status: { value: [], visibility: true, name: 'Статус', resetValue: [] }
      },
      'Incoming': {
        transactionId: { value: '', visibility: true, name: 'Ид. транзакции', resetValue: '' },
        productionOrderId: { value: '', visibility: true, name: 'Ид.заказа', resetValue: '' },
        dateFrom: { value: new Date(new Date().setHours(0, 0, 0, 0)), visibility: true, name: 'Дата документа c', resetValue: null },
        dateTo: { value: null, visibility: true, name: 'Дата документа по', resetValue: null },
        status: { value: [], visibility: true, name: 'Статус', resetValue: [] }
      },
      'Aggregation': {
        transactionId: { value: '', visibility: true, name: 'Ид. транзакции', resetValue: '' },
        productGroup: { value: {}, visibility: true, name: 'Товарная группа', resetValue: {} },
        dateFrom: { value: new Date(new Date().setHours(0, 0, 0, 0)), visibility: true, name: 'Дата документа c', resetValue: null },
        dateTo: { value: null, visibility: true, name: 'Дата документа по', resetValue: null },
        status: { value: [], visibility: true, name: 'Статус', resetValue: [] }
      },
      'externalShipment': {
        transactionId: { value: '', visibility: true, name: 'Ид. транзакции', resetValue: '' },
        dateFrom: { value: new Date(new Date().setHours(0, 0, 0, 0)), visibility: true, name: 'Дата отгрузки с', resetValue: null  },
        dateTo: { value: null, visibility: true, name: 'Дата отгрузки по', resetValue: null  },
        status: { value: [], visibility: true, name: 'Статус', resetValue: [] },
        vendor: { value: {}, visibility: false, name: 'Отправитель', resetValue: {}  },
        buyer: { value: {}, visibility: false, name: 'Получатель', resetValue: {}  },
      },
      'reconciliation': {
        transactionId: { value: '', visibility: true, name: 'Ид. транзакции', resetValue: '' },
        reconciliationType: { value: {}, visibility: true, name: 'Тип сверки', resetValue: {} },
        dateFrom: { value: new Date(new Date().setHours(0, 0, 0, 0)), visibility: true, name: 'Дата документа с', resetValue: null  },
        dateTo: { value: null, visibility: true, name: 'Дата документа по', resetValue: null  },
        status: { value: [], visibility: true, name: 'Статус', resetValue: [] }
      },
      'activeRecords': {
        barcode: { value: '', visibility: true, name: 'Поиск по КИ', resetValue: '' },
        objectKiLost: { value: {}, visibility: true, name: 'Объект (КИ утрачен)', resetValue: {} },
        objectKiFind: { value: {}, visibility: true, name: 'Объект (КИ найден)', resetValue: {} },
        status: { value: [], visibility: true, name: 'Статус', resetValue: [] },
        dateFrom: { value: new Date(new Date().setHours(0, 0, 0, 0)), visibility: true, name: 'Дата добавления в фонд c', resetValue: null  },
        dateTo: { value: null, visibility: true, name: 'Дата добавления в фонд по', resetValue: null  },
      },
      'processedRecords': {
        barcode: { value: '', visibility: true, name: 'Поиск по КИ', resetValue: '' },
        objectKiLost: { value: {}, visibility: true, name: 'Объект (КИ утрачен)', resetValue: {} },
        objectKiFind: { value: {}, visibility: true, name: 'Объект (КИ найден)', resetValue: {} },
        status: { value: [], visibility: true, name: 'Статус', resetValue: [] },
        dateFrom: { value: new Date(new Date().setHours(0, 0, 0, 0)), visibility: true, name: 'Дата добавления в фонд c', resetValue: null  },
        dateTo: { value: null, visibility: true, name: 'Дата добавления в фонд по', resetValue: null  }
      },
      'autoTest': {
        testId: { value: '', visibility: true, name: 'Ид. сценария', resetValue: '' },
        testName: { value: '', visibility: true, name: 'Наименование сценария', resetValue: '' },
        dateFrom: { value: new Date(new Date().setHours(0, 0, 0, 0)), visibility: true, name: 'Создан', resetValue: null  },
        status: { value: [], visibility: true, name: 'Статус', resetValue: [] },
      },
      'autoTestSample': {
        sampleName: { value: '', visibility: true, name: 'Наименование шаблона', resetValue: '' },
      },
    },
  },
  mutations: {
    cleanFiltres(state, filtersType) {
      for (let filter in state.filters[filtersType]){
        if (filter === 'status'){
          state.filters[filtersType][filter].value = []
        } else {
          state.filters[filtersType][filter].value = state.filters[filtersType][filter].resetValue
        }
      }
    },
    saveFiltersOnLocalStorage(state) {
      localStorage.setItem('filters', JSON.stringify(state.filters))
    },
    getFiltersFromLocalStorage(state) {
      let filters = JSON.parse(localStorage.getItem('filters'))
      if (filters){
        state.filters = filters
      }
    },
    filters(state, filters) {
        state.filters[filters.doctype.value] = filters
    },
  },
  actions:{
    cleanFilters({commit}, filterType) {
      commit('cleanFiltres', filterType)
    },
    saveFilters({commit}, filters) {
      for (let key of Object.keys(filters)){
        if (!filters[key].visibility && key !== 'doctype'){
          filters[key].value = filters[key].resetValue
          }
        }
      commit('filters', filters)
      commit('saveFiltersOnLocalStorage')
    },
    loadFiltersFromLocalStorage( { commit } ) {
      commit('getFiltersFromLocalStorage')
    }
  },
  getters: {
    filters: state => type => state.filters[type]
  }
}
