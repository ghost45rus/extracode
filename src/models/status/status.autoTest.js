import { DocStatus } from 'models/status/status'

export class StatusAutoTest extends DocStatus {
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
      case 'AUTOTEST_READY':
        this.statusColor = 'green'
        break
      case 'AUTOTEST_WAITING':
        this.statusColor = 'grey'
        break
      case 'AUTOTEST_INVALID':
        this.statusColor = 'red'
        break
    }
  }
}
