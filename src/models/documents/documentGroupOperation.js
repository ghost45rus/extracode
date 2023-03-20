import { Document } from './document'
import { dateTimeFormat } from 'utils/datetime'
import { StatusGroupOperation } from 'models/status/upd/status.groupOperation'

export class DocumentGroupOperation extends Document {
  constructor (params, type) {
    super(params)
    const status = new StatusGroupOperation({ statusName: params.statusName, statusDescription: params.statusDescription })
    super.setStatus(status)
    switch (type) {
      case 'list': {
        const cols = [
          { value: params.transactionId, type: 'string' },
          { value: dateTimeFormat(params.receiveDate, 'date'), type: 'date' },
          { value: params.statusDescription, type: 'string' },
          { value: params.movementType, type: 'string' },
          { value: params.vendorInn, type: 'string' },
          { value: params.vendorName, type: 'string' },
          { value: params.vendorCode, type: 'string' },
          { value: params.vendorObjectName, type: 'string' },
          { value: params.buyerInn, type: 'string' },
          { value: params.buyerName, type: 'string' },
          { value: params.buyerCode, type: 'string' },
          { value: params.buyerObjectName, type: 'string' },
          { value: dateTimeFormat(params.docAddDate, 'minutes'), type: 'dateTime' },
          { value: dateTimeFormat(params.docModDate, 'minutes'), type: 'dateTime' }
        ]
        super.setCols(cols)
      }
        break
      case 'card':
        super.setParams(params)
        super.setDetails()
        super.setProcessStatuses()
        break
    }
  }
}
