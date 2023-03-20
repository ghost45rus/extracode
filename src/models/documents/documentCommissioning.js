import { Document } from './document'
import { dateTimeFormat } from 'utils/datetime'
import { StatusCommissioning } from 'models/status/status.commissioning'

export class DocumentCommissioning extends Document {
  constructor (params, type) {
    super(params)
    const status = new StatusCommissioning({ statusName: params.statusName, statusDescription: params.statusDescription })
    super.setStatus(status)
    switch (type) {
      case 'list': {
        const cols = [
          { value: params.transactionId, type: 'string' },
          { value: params.itemGroupName, type: 'string' },
          { value: params.typeDoc, type: 'string' },
          { value: params.orderId, type: 'string' },
          { value: params.organizationName, type: 'string' },
          { value: params.objectInfo, type: 'string' },
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
    this.productionDate = dateTimeFormat(this.productionDate, 'date')
    this.declarationDate = dateTimeFormat(this.declarationDate, 'date')
    this.rows = []
    for (const item in this.items) {
      const object = {
        cols: [
          this.items[item].barcode,
          this.items[item].plu,
          this.items[item].gtin,
          this.items[item].itemName,
          this.items[item].tnvedCode,
          this.items[item].numberOfChildren,
          this.items[item].isMapped ? 'Да' : 'Нет',
          this.items[item].statusDescription
        ],
        isMapped: this.items[item].isMapped
      }
      this.rows.push(object)
    }
  }
}
