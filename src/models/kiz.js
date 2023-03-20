import { dateTimeFormat } from 'utils/datetime'
import { DocStatus, MarkStatus } from 'models/status/status'

export class Kiz {
  constructor (params) {
    for (const key in params) {
      this[key] = params[key]
    }
    this.rows = []
    this.markStatusIcon = ''
    this.markStatusColor = '#FFA500CC'
    this.setHierarchy(params.hierarchy)
    for (const document in params.history) {
      const object = {
        cols: [
          dateTimeFormat(params.history[document].docAddDate, 'seconds'),
          params.history[document].operationProcess,
          params.history[document].operationType,
          params.history[document].operationStatus,
          params.history[document].comment,
          {
            docId: params.history[document].docId,
            docType: params.history[document].docType,
            transactionId: params.history[document].transactionId,
            updDocTable: params.history[document].updDocTable,
            updId: params.history[document].updId
          },
          params.history[document].orgName,
          params.history[document].objectCode
        ]
      }
      this.rows.push(object)
    }
    if (this.lastDocument) {
      this.docStatus = new DocStatus({ statusName: this.lastDocument.docStatus, statusDescription: this.lastDocument.docStatusDescription })
    }
    this.status = new MarkStatus({ statusName: params.currentStatusName, statusDescription: params.currentStatusDescription })
    this.setMarkStatusColor()
    this.setMarkStatusIcon()
  }

  setHierarchy (data) {
    const hierarchy = []
    for (const item of data) {
      hierarchy.push({
        barcode: item.barcode,
        currentStatusDescription: item.currentStatusDescription,
        currentStatusName: item.currentStatusName,
        packageName: item.packageName
      })
      if (item.children && item.children.length !== 0) {
        hierarchy.push({ packageName: item.children[0].packageName, data: item.children })
      }
    }
    this.changedHierarchy = hierarchy
  }

  setMarkStatusColor () {
    switch (this.currentStatusName) {
      case 'MARK_UNBLOCKED':
      case 'MARK_SOLD':
      case 'MARK_TRANSFERRED':
        this.markStatusColor = '#0080008C'
        break
      case 'MARK_INVALID':
      case 'MARK_WMS_REJECTED':
      case 'MARK_SPOILED':
      case 'MARK_LOST':
      case 'MARK_DESTROYED':
      case 'MARK_DISAGGREGATION':
      case 'MARK_SOLD_WRONG_ORG':
      case 'MARK_GIS_NOT_EXIST':
      case 'UNIT_LOST':
      case 'UNIT_UTILIZED':
      case 'UNIT_DESTROYED':
        this.markStatusColor = '#FF2400CC'
        break
      case 'MARK_REVERSED':
      case 'MARK_BLOCKED':
      case 'MARK_SOLD_WRONG_OBJ':
      case 'MARK_EMITTED':
        this.markStatusColor = '#FFA500CC'
        break
    }
  }

  setMarkStatusIcon () {
    switch (this.currentStatusName) {
      case 'MARK_INVALID':
      case 'MARK_SOLD_WRONG_ORG':
      case 'MARK_GIS_NOT_EXIST':
      case 'MARK_SOLD_WRONG_OBJ':
        this.markStatusIcon = 'attention'
        break
      case 'MARK_WMS_REJECTED':
      case 'MARK_REVERSED':
        this.markStatusIcon = 'arrow_r'
        break
      case 'MARK_UNBLOCKED':
        this.markStatusIcon = 'door_unlock'
        break
      case 'MARK_BLOCKED':
        this.markStatusIcon = 'door_lock'
        break
      case 'MARK_SPOILED':
      case 'MARK_LOST':
      case 'MARK_DESTROYED':
      case 'MARK_SOLD':
      case 'UNIT_LOST':
      case 'UNIT_UTILIZED':
      case 'UNIT_DESTROYED':
        this.markStatusIcon = 'destroyed'
        break
      case 'MARK_DISAGGREGATION':
        this.markStatusIcon = 'disaggregation'
        break
      case 'MARK_EMITTED':
        this.markStatusIcon = 'emitted'
        break
      case 'MARK_TRANSFERRED':
        this.markStatusIcon = 'transfer'
    }
  }
}

export class KizUKD {
  constructor (params) {
    this.after = {}
    this.before = {}
    if (params.after) {
      this.after.rows = params.after.map(item => {
        return {
          cols: [
            item.lineNumber,
            item.productName,
            item.barcode
          ]
        }
      })
    } else {
      this.after.rows = []
    }
    if (params.before) {
      this.before.rows = params.before.map(item => {
        return {
          cols: [
            item.lineNumber,
            item.productName,
            item.barcode
          ]
        }
      })
    } else {
      this.before.rows = []
    }
  }
}
