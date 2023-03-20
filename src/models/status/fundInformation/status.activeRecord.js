import { DocStatus } from 'models/status/status'

export class StatusActiveRecord extends DocStatus {
  constructor (params) {
    super(params)
    this.setStatusColor(params.statusName)
    this.setStatusIconName(params.statusName)
  }

  setStatusIconName (name) {
    switch (name) {
      case 'AMF_WAITING_WRITEOFF':
        this.statusIconName = 'clock'
        break
      case 'AMF_DELETED':
        this.statusIconName = 'delete'
        break
      case 'AMF_READY_TO_ASSOCIATION':
        this.statusIconName = 'fund-information'
        break
      case 'AMF_ASSOCIATED':
        this.statusIconName = 'ok'
        break
      case 'AMF_LOST':
      case 'AMF_INVALID':
        this.statusIconName = 'attention'
        break
      case 'AMF_WRITTEN_OFF':
        this.statusIconName = 'emitted'
        break
    }
  }

  setStatusColor (name) {
    switch (name) {
      case 'AMF_WAITING_WRITEOFF':
      case 'AMF_DELETED':
        this.statusColor = 'grey'
        break
      case 'AMF_ASSOCIATED':
        this.statusColor = 'green'
        break
      case 'AMF_LOST':
      case 'AMF_INVALID':
      case 'AMF_WRITTEN_OFF':
        this.statusColor = 'red'
        break
    }
  }
}
