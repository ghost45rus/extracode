export default {
  namespaced: true,
  state: {
    sorting: {
      'directDeliveries': {
        sorted : false,
        activeSortingIndex: null,
        activeSortingMethod: null,
      },
      'groupOperations': {
        sorted : false,
        activeSortingIndex: null,
        activeSortingMethod: null,
      },
      'SUZ': {
        sorted : false,
        activeSortingIndex: null,
        activeSortingMethod: null,
      },
      'aggregationSUZ': {
        sorted : false,
        activeSortingIndex: null,
        activeSortingMethod: null,
      },
      'Incoming': {
        sorted : false,
        activeSortingIndex: null,
        activeSortingMethod: null,
      },
      'Leaving': {
        sorted : false,
        activeSortingIndex: null,
        activeSortingMethod: null,
      },
      'Reconciliation': {
        sorted : false,
        activeSortingIndex: null,
        activeSortingMethod: null,
      },
      'Aggregation': {
        sorted : false,
        activeSortingIndex: null,
        activeSortingMethod: null,
      },
      'Commissioning': {
        sorted : false,
        activeSortingIndex: null,
        activeSortingMethod: null,
      },
      'ExternalShipment': {
        sorted : false,
        activeSortingIndex: null,
        activeSortingMethod: null,
      },
      'ActiveRecords': {
        sorted : false,
        activeSortingIndex: null,
        activeSortingMethod: null,
      },
      'ProcessedRecords': {
        sorted : false,
        activeSortingIndex: null,
        activeSortingMethod: null,
      },
      'autoTest': {
        sorted : false,
        activeSortingIndex: null,
        activeSortingMethod: null,
      },
      'autoTestSamples': {
        sorted : false,
        activeSortingIndex: null,
        activeSortingMethod: null,
      },
    },
  },
  mutations: {
    sorting(state, sorting) {
      state.sorting[sorting.doctype] = sorting
    },
  },
  getters: {
    sorting: state => doctype => state.sorting[doctype]
  }
}
