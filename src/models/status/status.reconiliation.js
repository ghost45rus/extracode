import { DocStatus } from 'models/status/status'

export class StatusReconiliation extends DocStatus {
  constructor (params) {
    super(params)
    this.setStatusColor(params.statusName)
  }

  setStatusColor (name) {
    switch (name) {
      case 'DOC_READY':
        this.statusColor = 'green'
        break
    }
  }
}
