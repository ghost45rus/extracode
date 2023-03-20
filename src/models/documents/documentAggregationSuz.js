import { Document } from './document'
import { dateTimeFormat } from 'utils/datetime'

export class DocumentAggregationSuz extends Document {
  constructor (params, type) {
    super(params)
    switch (type) {
      case 'list': {
        const cols = [
          { value: params.transactionId, type: 'string' },
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
