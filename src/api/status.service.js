import AuthService from 'api/auth/auth.service'

class StatusService {
  getAllStatus (docTable) {
    return AuthService.middleware('GET', `doc-status/${docTable}`).then(res => res.data)
  }

  getAllStatusFund (type) {
    return AuthService.middleware('GET', `fund/${type}/statuses`).then(res => res.data)
  }
}

export default new StatusService()
