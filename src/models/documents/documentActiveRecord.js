import { Document } from './document'
import { dateTimeFormat } from 'utils/datetime'
import { StatusActiveRecord } from 'models/status/fundInformation/status.activeRecord'

export class DocumentActiveRecord extends Document {
  constructor (params, type) {
    super(params)
    const status = new StatusActiveRecord({ statusName: params.statusName, statusDescription: params.statusDescription })
    super.setStatus(status)
    switch (type) {
      case 'list': {
        const cols = [
          { value: params.barcode, type: 'string' },
          { value: params.objectLost, type: 'string' },
          { value: params.businessProcessLost, type: 'string' },
          { value: params.objectFind, type: 'string' },
          { value: params.businessProcessFind, type: 'string' },
          { value: params.transactionId, type: 'string' },
          { value: params.reasonDescription, type: 'string' },
          { value: params.statusDescription, type: 'string' },
          { value: dateTimeFormat(params.docAddDate, 'minutes'), type: 'dateTime' },
          { value: dateTimeFormat(params.docModDate, 'minutes'), type: 'dateTime' }
        ]
        super.setCols(cols)
      }
        break
      case 'card':
        super.setParams(params)
        super.setDetails()
        break
    }
  }
}
