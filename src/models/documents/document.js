import { Mark } from 'models/marks'
import { DocStatus } from 'models/status/status'

export class Document {
  constructor (params) {
    this.setId(params.id)
    const status = new DocStatus({ statusName: params.statusName, statusDescription: params.statusDescription })
    this.setStatus(status)
  }

  setId (id) {
    this.id = id
  }

  setStatus (status) {
    this.status = status
  }

  setCols (cols) {
    this.cols = cols
  }

  setParams (params) {
    for (const key in params) {
      this[key] = params[key]
    }
  }

  setDetails () {
    if (this.details) {
      this.details = this.details.map(detail => {
        const marks = this.setMarks(detail)
        return {
          detailStatus: this.statusMark(marks),
          id: detail.id,
          cols: [
            detail.lineNum,
            detail.pluCode ? detail.pluCode : '',
            detail.detailUpdProductName,
            detail.qty,
            detail.uom
          ],
          marks: marks
        }
      })
    }
  }

  lineSort () {
    if (this.details && this.details.length > 1) {
      this.details = this.details.sort((a, b) => a.lineNum - b.lineNum)
    }
  }

  setProcessStatuses () {
    switch (this.isAccepted) {
      case 1:
      case 2:
        this.isAccepted = 'done'
        break
      case 3:
        this.isAccepted = 'close'
        break
      case 4:
        this.isAccepted = 'warning'
        break
    }
    switch (this.isSigned) {
      case 1:
        this.isSigned = 'done'
        break
      case 2:
        this.isSigned = 'warning'
        break
    }
    switch (this.isConfirmed) {
      case 1:
        this.isConfirmed = 'done'
        break
      case 2:
        this.isConfirmed = 'close'
        break
      case 3:
        this.isConfirmed = 'warning'
        break
    }
  }

  setMarks (detail) {
    let marks = []
    if (detail.marks) {
      marks = detail.marks.map(mark => {
        const Marka = new Mark(mark)
        return Marka
      })
    }
    return marks
  }

  statusMark (marks) {
    let statusRed = 0
    let statusGreen = 0
    let statusGray = 0
    let status = ''
    for (let i = 0; i < marks.length; i++) {
      switch (marks[i].status.statusName) {
        case 'MARK_BLOCKED':
        case 'MARK_REVERSED':
          statusGray++
          break
        case 'MARK_INVALID':
        case 'MARK_WMS_REJECTED':
        case 'MARK_SPOILED':
        case 'MARK_LOST':
        case 'MARK_DESTROYED':
        case 'MARK_DISAGGREGATION':
        case 'MARK_SOLD_WRONG_ORG':
        case 'MARK_GIS_NOT_EXIST':
        case 'MARK_SOLD_WRONG_OBJ':
        case 'MARK_EMITTED':
        case 'MARK_WRONG_ORG':
        case 'MARK_WRONG_OBJ':
        case 'MARK_WRONG_GTIN':
          statusRed++
          break
        case 'MARK_UNBLOCKED':
        case 'MARK_SOLD':
          statusGreen++
          break
      }
    }
    if (statusRed !== 0) {
      status = 'red'
    } else if (statusGray !== 0) {
      status = 'gray'
    } else if (statusGreen > 0) {
      status = 'green'
    } else {
      status = ''
    }
    return status
  }
}
