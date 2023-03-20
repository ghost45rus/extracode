import { Document } from './document'
import { dateTimeFormat } from 'utils/datetime'
import { MarkStatus } from 'models/status/status'
import { StatusReconiliation } from 'models/status/status.reconiliation'

export class DocumentReconciliation extends Document {
  constructor (params, type) {
    super(params)
    switch (type) {
      case 'list': {
        const cols = [
          { value: params.transactionId, type: 'string' },
          { value: params.reconciliationType, type: 'string' },
          { value: dateTimeFormat(params.reconciliationDate, 'minutes'), type: 'dateTime' },
          { value: params.vendorName, type: 'string' },
          { value: params.vendorCode, type: 'string' },
          { value: params.status, type: 'string' },
          { value: dateTimeFormat(params.docAddDate, 'minutes'), type: 'dateTime' }
        ]
        super.setCols(cols)
      }
        break
      case 'card':
        super.setParams(params)
        super.setStatus(new StatusReconiliation({ statusName: params.statusName, statusDescription: params.status }))
        this.setDetails()
        break
    }
  }

  setDetails () {
    this.reconciliationDate = dateTimeFormat(this.reconciliationDate, 'minutes')
    this.details = this.items.map(detail => {
      let statusRow = []
      if (detail.details?.length) {
        statusRow = detail.details.map(detail => {
          let marks = []
          if (detail.marks.length) {
            marks = detail.marks.map(mark => {
              return {
                id: mark.id,
                cols: [
                  mark.barcode,
                  mark.markObject,
                  mark.vendorObject,
                  mark.statusDescription
                ]
              }
            })
          }
          return {
            cols: [
              detail.statusDescription,
              detail.count
            ],
            status: new MarkStatus({ statusName: detail.statusName, statusDescription: detail.statusDescription }),
            marks: marks
          }
        })
      }
      const item = {
        id: detail.id,
        cols: [
          detail.gtin ?? '',
          detail.pluCode ?? '',
          detail.pluName ?? '',
          detail.declaredQuantity ?? '',
          detail.quantity ?? '',
          detail.delta ?? ''
        ],
        details: statusRow
      }
      return item
    })
  }
}
