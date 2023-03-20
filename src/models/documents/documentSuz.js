import { Document } from './document'
import { dateTimeFormat } from 'utils/datetime'
import { StatusSuz } from 'models/status/suz/status.suz'

export class DocumentSuz extends Document {
  constructor (params, type) {
    super(params)
    const status = new StatusSuz({ statusName: params.statusName, statusDescription: params.statusDescription })
    super.setStatus(status)
    switch (type) {
      case 'list': {
        const cols = [
          { value: params.transactionId, type: 'string' },
          { value: params.productionOrderId, type: 'string' },
          { value: params.productGroupName, type: 'string' },
          { value: params.businessProcess, type: 'string' },
          { value: params.organizationName, type: 'string' },
          { value: params.objectCode, type: 'string' },
          { value: params.itemsQuantity, type: 'string' },
          { value: params.marksQuantity, type: 'string' },
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
        this.lineSort()
        break
    }
  }

  setDetails () {
    this.rows = []
    for (const item in this.items) {
      const object = {
        cols: [
          this.items[item].lineNum,
          this.items[item].plu,
          this.items[item].gtin,
          this.items[item].itemName,
          this.items[item].marksQuantity,
          this.items[item].marksReceived,
          this.items[item].blockQuantity,
          this.items[item].boxQuantity,
          this.items[item].palletQuantity,
          this.items[item].isAggregation
        ]
      }
      this.rows.push(object)
    }
  }
}
