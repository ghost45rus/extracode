import { DocStatus } from 'models/status/status'

export class StatusSuz extends DocStatus {
  constructor (params) {
    super(params)
    this.setStatusColor(params.statusName)
  }

  setStatusColor (name) {
    switch (name) {
      case 'DOC_READY':
        this.statusColor = 'green'
        break
      case 'DOC_INVALID':
      case 'DOC_REJECTED':
      case 'DOC_NOT_RECEIVED':
      case 'DOC_PACKING_FAILED':
        this.statusColor = 'red'
        break
    }
  }
}
