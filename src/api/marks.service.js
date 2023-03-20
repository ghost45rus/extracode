import AuthService from 'api/auth/auth.service'

class MarksService {
  getMarks (id) {
    return AuthService.middleware('GET', `marks/${id}/children`).then(res => res.data)
  }

  getKizByBarCode (barCode) {
    return AuthService.middleware('GET', `marks/history?barcode=${encodeURIComponent(barCode)}`)
  }

  getMarksByUkdId (id) {
    return AuthService.middleware('GET', `universal-correction-document/changes/${id}`).then(res => res.data)
  }

  updateMarkInGis (data) {
    return AuthService.middleware('POST', 'recheck-marks/gis', data).then(res => res.data)
  }
}

export default new MarksService()
