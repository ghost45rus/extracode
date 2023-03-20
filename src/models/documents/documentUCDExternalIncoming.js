import { Document } from './document'
import { dateTimeFormat } from 'utils/datetime'

export class DocumentUCDExternalIncoming extends Document {
  constructor (params, type) {
    super(params)
    super.setId(params.ucdId)
    switch (type) {
      case 'list': {
        const cols = [
          { value: dateTimeFormat(params.invoiceDate, 'date'), type: 'date' },
          { value: params.invoice, type: 'string' },
          { value: params.prevInvoice, type: 'string' },
          { value: params.statusDescription, type: 'string' },
          { value: dateTimeFormat(params.docAddDate, 'minutes'), type: 'dateTime' },
          { value: dateTimeFormat(params.docModDate, 'minutes'), type: 'dateTime' }
        ]
        super.setCols(cols)
      }
        break
      case 'card':
        break
    }
  }
}
