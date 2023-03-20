import AuthService from 'api/auth/auth.service'

class ReconciliationsService {
  getReconciliation () {
    return AuthService.middleware('GET', 'reconciliation-docs/types').then(res => res.data)
  }
}
export default new ReconciliationsService()
