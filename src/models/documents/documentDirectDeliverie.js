import { Document } from './document'
import { dateTimeFormat } from 'utils/datetime'
import { StatusDirectDeliverie } from 'models/status/upd/status.directDeliverie'

export class DocumentDirectDeliverie extends Document {
  constructor (params, type) {
    super(params)
    const status = new StatusDirectDeliverie({ statusName: params.statusName, statusDescription: params.statusDescription })
    super.setStatus(status)
    switch (type) {
      case 'list': {
        const cols = [
          { value: params.transactionId, type: 'string' },
          { value: dateTimeFormat(params.invoiceDate, 'date'), type: 'date' },
          { value: params.invoice, type: 'string' },
          { value: params.statusDescription, type: 'string' },
          { value: params.vendorInn, type: 'string' },
          { value: params.vendorName, type: 'string' },
          { value: params.vendorCode, type: 'string' },
          { value: params.buyerInn, type: 'string' },
          { value: params.buyerName, type: 'string' },
          { value: params.buyerCode, type: 'string' },
          { value: params.name, type: 'string' },
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
