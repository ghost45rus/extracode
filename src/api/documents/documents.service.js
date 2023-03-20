import AuthService from 'api/auth/auth.service'
class DocumentsService {
  getAllDocumentsDirectDeliverie (filters) {
    return AuthService.middleware('GET', `external-incoming/documents/filters${this.filtersToParams(filters)}`).then(res => res.data)
  }

  getDocumentDirectDeliverieByIdCard (id) {
    return AuthService.middleware('GET', `external-incoming/documents/${id}/card`)
  }

  getDocumentDetailed (id) {
    return AuthService.middleware('POST', 'external-incoming/documents/start/detail', { id: id })
  }

  getAllDocumentsGroupOperation (filters) {
    return AuthService.middleware('GET', `intra-group-transactions/documents/filters${this.filtersToParams(filters)}`).then(res => res.data)
  }

  getDocumentGroupOperationByIdCard (id) {
    return AuthService.middleware('GET', `intra-group-transactions/documents/${id}/card`)
  }

  getUniversalCorrectionDocumentsById (id, type) {
    return AuthService.middleware('GET', `universal-correction-document/list/${type}/${id}`)
  }

  getDocumentHistory (id, type) {
    return AuthService.middleware('GET', `documents/history?id=${id}&type=${type}`)
  }

  getSuzDocuments (filters) {
    return AuthService.middleware('GET', `orders-marks/documents/filters${this.filtersToParams(filters)}`).then(res => res.data)
  }

  getSuzDocumentById (id) {
    return AuthService.middleware('GET', `orders-marks/documents/${id}/card`).then(res => res.data)
  }

  getSuzSuborders (id) {
    return AuthService.middleware('GET', `orders-marks/documents/${id}/suborders`).then(res => res.data)
  }

  getSuzAggregation (id) {
    return AuthService.middleware('GET', `orders-marks/documents/${id}/aggregation`).then(res => res.data)
  }

  getRepeatRequest (id) {
    return AuthService.middleware('POST', `orders-marks/documents/${id}/repeat-request`).then(res => res.data)
  }

  getCommissioningDocuments (filters) {
    return AuthService.middleware('GET', `commissioning/documents/filters${this.filtersToParams(filters)}`).then(res => res.data)
  }

  getCommissioningDocumentById (id) {
    return AuthService.middleware('GET', `commissioning/documents/${id}/card`).then(res => res.data)
  }

  getIncomingDocumentById (id) {
    return AuthService.middleware('GET', `incoming-docs/documents/${id}/card`).then(res => res.data)
  }

  getLeavingDocuments (filters) {
    return AuthService.middleware('GET', `mark-leaving-docs/documents/filters${this.filtersToParams(filters)}`).then(res => res.data)
  }

  getLeavingDocumentById (id) {
    return AuthService.middleware('GET', `mark-leaving-docs/documents/${id}/card`).then(res => res.data)
  }

  getIncomingDocuments (filters) {
    return AuthService.middleware('GET', `incoming-docs/documents/filters${this.filtersToParams(filters)}`).then(res => res.data)
  }

  getAggregationDocuments (filters) {
    return AuthService.middleware('GET', `aggregation-docs/documents/filters${this.filtersToParams(filters)}`).then(res => res.data)
  }

  getAggregationDocumentById (id) {
    return AuthService.middleware('GET', `aggregation-docs/documents/${id}/card`).then(res => res.data)
  }

  getExternalShipmentDocuments (filters) {
    return AuthService.middleware('GET', `external-shipment-docs/documents/filters${this.filtersToParams(filters)}`).then(res => res.data)
  }

  getExternalShipmentDocumentById (id) {
    return AuthService.middleware('GET', `external-shipment-docs/documents/${id}/card`).then(res => res.data)
  }

  getExternalReturnDocumentById (id) {
    return AuthService.middleware('GET', `external-return-docs/documents/${id}/card`).then(res => res.data)
  }

  getExternalShipmentReturn (id) {
    return AuthService.middleware('GET', `external-shipment-docs/documents/${id}/external-return`).then(res => res.data)
  }

  getReconciliationDocuments (filters) {
    return AuthService.middleware('GET', `reconciliation-docs/documents/filters${this.filtersToParams(filters)}`).then(res => res.data)
  }

  getReconciliationDocumentById (id) {
    return AuthService.middleware('GET', `reconciliation-docs/documents/${id}/card`).then(res => res.data)
  }

  getRepeatMarksCheck (params) {
    return AuthService.middleware('POST', 'recheck-marks', { transactionId: params.transactionId, docTableName: params.docTableName }).then(res => res.data)
  }

  getFundInformation (type, filters) {
    return AuthService.middleware('GET', `fund/${type}/filters${this.filtersToParams(filters)}`).then(res => res.data)
  }

  getAutotests (filters) {
    return AuthService.middleware('GET', `auto-test/documents/filters${this.filtersToParams(filters)}`).then(res => res.data)
  }

  getAutotestSamples (filters) {
    return AuthService.middleware('GET', `auto-samples/documents/filters${this.filtersToParams(filters)}`).then(res => res.data)
  }

  getAutoTestById (id) {
    return AuthService.middleware('GET', `auto-test/documents/${id}/card`).then(res => res.data)
  }
  getAutoSampleById (id) {
    return AuthService.middleware('GET', `auto-samples/${id}/card`).then(res => res.data)
  }

  getAutoTestByIndex (id, index) {
    return AuthService.middleware('GET', `auto-test/documents/${id}/${index}`).then(res => res.data)
  }

  getAutoTestAllCommands () {
    return AuthService.middleware('GET', 'auto-test/command').then(res => res.data)
  }

  createAutoTest (params) {
    return AuthService.middleware('POST', 'auto-test/create', { autotestName: params.autotestName, commands: params.commands }).then(res => res.data)
  }

  startTestByIndex (id, index) {
    return AuthService.middleware('POST', 'auto-test/documents/run-command', {
      id: id,
      index: index
    }).then(res => res.data)
  }


  startTestById (id) {
    return AuthService.middleware('POST', 'auto-test/documents/run-all', {
      id: id
    }).then(res => res.data)
  }

  createTestBySample (id, name) {
    return AuthService.middleware('POST', 'auto-samples/create-by-sample', {
      sampleId: id,
      autotestName: name
    }).then(res => res.data)
  }

  createSample (sampleName, commands) {
    return AuthService.middleware('POST', 'auto-samples/create', {
      sampleName: sampleName,
      commands: commands
    }).then(res => res.data)
  }

  changeAutoTest (id, commands) {
    return AuthService.middleware('POST', 'auto-test/edit', {
      id: id,
      commands: commands
    }).then(res => res.data)
  }

    saveChangesSample (sampleId, sampleName, commands) {
    return AuthService.middleware('POST', 'auto-samples/change', {
      sampleId: sampleId,
      sampleName: sampleName,
      commands: commands
    }).then(res => res.data)
  }

  filtersToParams (filters) {
    let filtersParams = '?'
    let countProperties = 1
    for (const filter in filters) {
      if (filters[filter] !== null && filters[filter] !== '') {
        if (countProperties !== 1) {
          filtersParams += '&'
        }
        filtersParams += filter + '=' + filters[filter]
        countProperties++
      }
    }
    return filtersParams
  }
}

export default new DocumentsService()
