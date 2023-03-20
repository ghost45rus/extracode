class Status {
  constructor (params) {
    this.statusName = params.statusName
    this.statusDescription = params.statusDescription
    this.statusColor = params.statusColor
    this.statusIconName = params.statusIconName
  }
}

export class MarkStatus extends Status {
  constructor (params) {
    super(params)
    this.statusColor = '#FFA500CC'
    this.statusIconName = ''
    this.setStatusColor(params.statusName)
    this.setStatusIconName(params.statusName)
  }

  setStatusColor (name) {
    switch (name) {
      case 'MARK_UNBLOCKED':
      case 'MARK_SOLD':
      case 'MARK_TRANSFERRED':
        this.statusColor = '#0080008C'
        break
      case 'MARK_INVALID':
      case 'MARK_WMS_REJECTED':
      case 'MARK_SPOILED':
      case 'MARK_LOST':
      case 'MARK_DESTROYED':
      case 'MARK_DISAGGREGATION':
      case 'MARK_SOLD_WRONG_ORG':
      case 'MARK_WRONG_ORG ':
      case 'MARK_GIS_NOT_EXIST':
      case 'UNIT_LOST':
      case 'UNIT_UTILIZED':
      case 'UNIT_DESTROYED':
        this.statusColor = '#FF2400CC'
        break
      case 'MARK_REVERSED':
      case 'MARK_BLOCKED':
      case 'MARK_SOLD_WRONG_OBJ':
      case 'MARK_EMITTED':
        this.statusColor = '#FFA500CC'
        break
    }
  }

  setStatusIconName (statusName) {
    switch (statusName) {
      case 'MARK_INVALID':
      case 'MARK_SOLD_WRONG_ORG':
      case 'MARK_GIS_NOT_EXIST':
      case 'MARK_SOLD_WRONG_OBJ':
      case 'MARK_WRONG_ORG':
      case 'MARK_WRONG_OBJ':
        this.statusIconName = 'attention'
        break
      case 'MARK_WMS_REJECTED':
      case 'MARK_REVERSED':
        this.statusIconName = 'arrow_r'
        break
      case 'MARK_UNBLOCKED':
        this.statusIconName = 'door_unlock'
        break
      case 'MARK_BLOCKED':
        this.statusIconName = 'door_lock'
        break
      case 'MARK_SPOILED':
      case 'MARK_LOST':
      case 'MARK_DESTROYED':
      case 'MARK_SOLD':
      case 'UNIT_LOST':
      case 'UNIT_UTILIZED':
      case 'UNIT_DESTROYED':
        this.statusIconName = 'destroyed'
        break
      case 'MARK_DISAGGREGATION':
        this.statusIconName = 'disaggregation'
        break
      case 'MARK_EMITTED':
        this.statusIconName = 'emitted'
        break
      case 'MARK_TRANSFERRED':
        this.statusIconName = 'transfer'
    }
  }

  colorClassMark (type = null) {
    let colorClass = ''
    switch (this.statusName) {
      case 'MARK_UNBLOCKED':
      case 'MARK_SOLD':
        colorClass = 'green'
        break
      case 'MARK_TRANSFERRED':
        if (type) {
          // TODO переделать портянку
          colorClass = type === 'externalShipment' ? 'green' : 'gray'
        }
        break
      case 'MARK_BLOCKED':
      case 'MARK_REVERSED':
      case 'MARK_CANDIDATE_WRITE_OFF':
      case 'MARK_WRONG_OBJ':
        colorClass = 'gray'
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
      case 'UNIT_LOST':
      case 'UNIT_UTILIZED':
      case 'UNIT_DESTROYED':
      case 'MARK_WRONG_ORG':
      case 'MARK_WRONG_GTIN':
        colorClass = 'red'
        break
    }
    return colorClass
  }
}

export class DocStatus extends Status {
  constructor (params) {
    super(params)
    this.statusColor = 'orange'
    this.statusIconName = ''
    this.setStatusColor(params.statusName)
    this.setStatusIconName(this.statusColor)
  }

  setStatusColor (name) {
    switch (name) {
      case 'DOC_READY':
      case 'DOC_REVERSED':
      case 'Успешно выполнена':
        this.statusColor = 'green'
        break
      case 'DOC_INVALID':
      case 'DOC_DETALIZATION_FAILED':
      case 'DOC_PART_MAPPED':
      case 'DOC_NOT_ACCEPTED':
      case 'DOC_REJECTED':
      case 'DOC_NOT_RECEIVED':
        this.statusColor = 'red'
        break
    }
  }

  setStatusIconName (statusColor) {
    switch (statusColor) {
      case 'green':
        this.statusIconName = 'ok'
        break
      case 'orange':
        this.statusIconName = 'repeat'
        break
      case 'red':
        this.statusIconName = 'attention'
        break
    }
  }
}
