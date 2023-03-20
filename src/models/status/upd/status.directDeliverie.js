import { DocStatus } from 'models/status/status'

export class StatusDirectDeliverie extends DocStatus {
  constructor (params) {
    super(params)
    this.setStatusColor(params.statusName)
  }

  setStatusColor (name) {
    switch (name) {
      case 'DOC_READY':
        this.statusColor = 'green'
        break
      case 'DOC_DETALIZATION_FAILED':
      case 'DOC_NOT_ACCEPTED':
      case 'DOC_REJECTED':
      case 'DOC_INVALID':
        this.statusColor = 'red'
        break
    }
  }
}
