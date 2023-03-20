import { DocStatus } from 'models/status/status'

export class StatusExternalReturn extends DocStatus {
  constructor (params) {
    super(params)
    this.setStatusColor(params.statusName)
  }

  setStatusColor (name) {
    switch (name) {
      case 'DOC_READY':
      case 'DOC_REVERSED':
        this.statusColor = 'green'
        break
      case 'DOC_INVALID':
      case 'DOC_DETALIZATION_FAILED':
      case 'DOC_REJECTED':
        this.statusColor = 'red'
        break
    }
  }
}
