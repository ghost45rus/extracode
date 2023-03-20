import { Document } from './document'
import { dateTimeFormat } from 'utils/datetime'
import { StatusLeaving } from 'models/status/status.leaving'

export class DocumentLeaving extends Document {
  constructor (params, type) {
    super(params)
    const status = new StatusLeaving({ statusName: params.statusName, statusDescription: params.statusDescription })
    super.setStatus(status)
    switch (type) {
      case 'list': {
        const cols = [
          { value: params.transactionId, type: 'string' },
          { value: params.productGroupName, type: 'string' },
          { value: params.markLeavingTypeName, type: 'string' },
          { value: params.cancellationDocNumber, type: 'string' },
          { value: dateTimeFormat(params.cancellationDocDate, 'date'), type: 'date' },
          { value: params.organizationName, type: 'string' },
          { value: params.objectCode, type: 'string' },
          { value: params.statusDescription, type: 'string' },
          { value: dateTimeFormat(params.docAddDate, 'minutes'), type: 'dateTime' },
          { value: dateTimeFormat(params.docModDate, 'minutes'), type: 'dateTime' }
        ]
        super.setCols(cols)
      }
        break
      case 'card':
        super.setParams(params)
        this.setDetails()
        break
    }
  }

  setDetails () {
    this.docDate = dateTimeFormat(this.docDate, 'date')
    this.rows = []
    for (const item in this.items) {
      const object = {
        cols: [
          this.items[item].barcode,
          this.items[item].plu,
          this.items[item].gtin,
          this.items[item].itemName,
          this.items[item].numberOfChildren,
          this.items[item].isValid,
          this.items[item].statusDescription
        ]
      }
      this.rows.push(object)
    }
  }
}
