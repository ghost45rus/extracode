import { DocStatus } from 'models/status/status'

export class StatusLeaving extends DocStatus {
  constructor (params) {
    super(params)
    this.setStatusColor(params.statusName)
    this.setStatusIconName(this.statusColor)
  }

  setStatusIconName (statusColor) {
    switch (statusColor) {
      case 'green':
        this.statusIconName = 'ok'
        break
      case 'orange':
        this.statusIconName = 'repeat'
        break
      case 'red':
        this.statusIconName = 'attention'
        break
      case 'grey':
        this.statusIconName = 'clock'
        break
    }
  }

  setStatusColor (name) {
    switch (name) {
      case 'DOC_READY':
        this.statusColor = 'green'
        break
      case 'DOC_WAITING_WRITEOFF':
        this.statusColor = 'grey'
        break
      case 'DOC_REJECTED':
      case 'DOC_INVALID':
        this.statusColor = 'red'
        break
    }
  }
}
