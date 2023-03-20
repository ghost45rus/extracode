export default {
  namespaced: true,
  state: {
    pagination: {
      'directDeliveries': {
        size: 10,
        start: 0,
        end: 10
      },
      'groupOperations': {
        size: 10,
        start: 0,
        end: 10
      },
      'suz': {
        size: 10,
        start: 0,
        end: 10
      },
      'commissioning': {
        size: 10,
        start: 0,
        end: 10
      },
      'incoming': {
        size: 10,
        start: 0,
        end: 10
      },
      'leaving': {
        size: 10,
        start: 0,
        end: 10
      },
      'aggregation': {
        size: 10,
        start: 0,
        end: 10
      },
      'externalShipment': {
        size: 10,
        start: 0,
        end: 10
      },
      'reconciliation': {
        size: 10,
        start: 0,
        end: 10
      },
      'fundInformation': {
        size: 10,
        start: 0,
        end: 10
      },
      'autoTest': {
        size: 10,
        start: 0,
        end: 10
      }
    },
  },
  mutations: {
    pagination(state, paginate) {
      state.pagination[paginate.doctype] = paginate
    }
  },
  getters: {
    pagination: state => doctype => state.pagination[doctype]
  }
}
