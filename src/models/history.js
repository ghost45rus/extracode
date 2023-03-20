import { dateTimeFormat } from 'utils/datetime'
import { DocStatus } from 'models/status/status'

export class DocumentHistory {
  constructor (params) {
    this.status = new DocStatus({ statusName: params.docStatusName, statusDescription: params.docStatusDescription })
    this.cols = [
      params.addDate ? dateTimeFormat(params.addDate, 'seconds') : '',
      params.operationName ? params.operationName : '',
      params.docStatusDescription ? params.docStatusDescription : '',
      params.comment ? params.comment : ''
    ]
  }
}
