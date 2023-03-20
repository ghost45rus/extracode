import { Document } from './document'
import { dateTimeFormat } from 'utils/datetime'
import { StatusExternalShipment } from 'models/status/external/status.externalShipment'

export class DocumentExternalShipment extends Document {
  constructor (params, type, typeExternal) {
    super(params)
    const status = new StatusExternalShipment({ statusName: params.statusName, statusDescription: params.statusDescription })
    super.setStatus(status)
    switch (type) {
      case 'list': {
        const cols = [
          { value: params.transactionId, type: 'string' },
          { value: dateTimeFormat(params.shipmentDate, 'date'), type: 'date' },
          { value: params.vendorName, type: 'string' },
          { value: params.vendorCode, type: 'string' },
          { value: params.buyerName, type: 'string' },
          { value: params.buyerCode, type: 'string' },
          { value: params.statusDescription, type: 'string' },
          { value: dateTimeFormat(params.docAddDate, 'minutes'), type: 'dateTime' },
          { value: dateTimeFormat(params.docModDate, 'minutes'), type: 'dateTime' }
        ]
        super.setCols(cols)
      }
        break
      case 'card':
        super.setParams(params)
        this.setDetails(typeExternal)
        super.lineSort()
        break
    }
  }

  setDetails (typeExternal) {
    if (this.details) {
      this.details = this.details.map(detail => {
        const marks = this.setMarks(detail, typeExternal)
        return {
          // TODO переделать портянку
          typeExternal: typeExternal,
          detailStatus: this.statusMark(marks),
          id: detail.id,
          cols: [
            detail.lineNum,
            detail.pluCode ?? '',
            detail.productName,
            detail.qty,
            detail.uom
          ],
          marks: marks
        }
      })
    }
  }
}
