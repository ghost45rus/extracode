import { Document } from './document'
import { dateTimeFormat } from 'utils/datetime'
import { StatusAggregation } from 'models/status/status.aggregation'

export class DocumentAggregation extends Document {
  constructor (params, type) {
    super(params)
    const status = new StatusAggregation({ statusName: params.statusName, statusDescription: params.statusDescription })
    super.setStatus(status)
    switch (type) {
      case 'list': {
        const cols = [
          { value: params.transactionId, type: 'string' },
          { value: params.productGroupName, type: 'string' },
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
        this.setAggregationDetails()
        break
    }
  }

  setDetails () {
    this.receivedDate = dateTimeFormat(this.receivedDate, 'date')
    this.rows = []
    for (const item in this.items) {
      const object = {
        cols: [
          this.items[item].barcode,
          this.items[item].numberOfChildren,
          this.items[item].statusDescription
        ]
      }
      this.rows.push(object)
    }
  }

  setAggregationDetails () {
    this.rowsAggregation = []

    for (const item in this.items) {
      const marks = []
      for (const mark in this.items[item].marks) {
        marks.push({
          cols: [
            this.items[item].marks[mark].barcode ?? '',
            this.items[item].marks[mark].levelPackage ?? '',
            this.items[item].marks[mark].typePackage ?? '',
            this.items[item].marks[mark].numberOfChildren ?? '',
            this.items[item].marks[mark].statusDescription ?? ''
          ]
        })
      }
      const object = {
        cols: [
          this.items[item].barcode ?? '',
          this.items[item].itemCode ?? '',
          this.items[item].itemName ?? '',
          this.items[item].levelPackage ?? '',
          this.items[item].typePackage ?? '',
          this.items[item].numberOfChildren ?? '',
          this.items[item].isGenerated ?? ''
        ],
        marks: marks
      }
      this.rowsAggregation.push(object)
    }
  }
}
