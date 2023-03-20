import { DocStatus } from 'models/status/status'

export class StatusCommissioning extends DocStatus {
  constructor (params) {
    super(params)
    this.setStatusColor(params.statusName)
  }

  setStatusColor (name) {
    switch (name) {
      case 'DOC_READY':
        this.statusColor = 'green'
        break
      case 'DOC_PART_MAPPED':
      case 'DOC_REJECTED':
      case 'DOC_INVALID':
        this.statusColor = 'red'
        break
    }
  }
}
