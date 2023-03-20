import { Document } from './document'

export class DocumentSuborderSuz extends Document {
  constructor (params, type) {
    super(params)
    switch (type) {
      case 'list': {
        const cols = [
          { value: params.lineNum, type: 'string' },
          { value: params.gtin, type: 'string' },
          { value: params.gisId, type: 'string' },
          { value: params.marksQuantity, type: 'string' },
          { value: params.marksReceived, type: 'string' },
          { value: params.isConfirmed, type: 'string' },
          { value: params.error, type: 'string' }
        ]
        super.setCols(cols)
      }
        break
      case 'card':
        break
    }
  }
}
