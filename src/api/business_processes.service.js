import AuthService from 'api/auth/auth.service'

class BusinessProcessesService {
  getBusinessProcessesAll () {
    return AuthService.middleware('GET', 'business-processes/show-for-mark-issue-doc').then(res => res.data)
  }
}

export default new BusinessProcessesService()
