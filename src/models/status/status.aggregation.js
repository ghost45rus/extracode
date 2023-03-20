import { DocStatus } from 'models/status/status'

export class StatusAggregation extends DocStatus {
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
        this.statusColor = 'red'
        break
    }
  }
}
