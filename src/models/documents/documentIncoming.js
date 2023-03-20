import { Document } from './document'
import { dateTimeFormat } from 'utils/datetime'
import { StatusIncoming } from 'models/status/status.incoming'

export class DocumentIncoming extends Document {
  constructor (params, type) {
    super(params)
    const status = new StatusIncoming({ statusName: params.statusName, statusDescription: params.statusDescription })
    super.setStatus(status)
    switch (type) {
      case 'list': {
        const cols = [
          { value: params.transactionId, type: 'string' },
          { value: params.productionOrderId, type: 'string' },
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
    this.docAddDate = dateTimeFormat(this.docAddDate, 'minutes')
    this.rows = []
    for (const item in this.items) {
      const object = {
        cols: [
          this.items[item].barcode,
          this.items[item].plu,
          this.items[item].itemName,
          this.items[item].gtin,
          this.items[item].numberOfChildren,
          this.items[item].statusDescription
        ]
      }
      this.rows.push(object)
    }
  }
}
