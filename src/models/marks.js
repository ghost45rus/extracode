import { MarkStatus } from 'models/status/status'
export class Mark {
  constructor (params) {
    this.id = params.id
    this.status = new MarkStatus({ statusName: params.statusName, statusDescription: params.statusDescription })
    this.cols = [
      params.barcode,
      params.packageLevelDescription,
      params.gtinCode,
      params.statusDescription
    ]
    this.hasChildren = params.hasChildren
    this.statusName = params.statusName
    this.detailId = params.detailId
  }
}
