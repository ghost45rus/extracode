import AuthService from 'api/auth/auth.service'

class MarkLeavingTypesService {
  getMarkLeavingTypesAll () {
    return AuthService.middleware('GET', 'mark-leaving-docs/leaving-types/show-all').then(res => res.data)
  }
}

export default new MarkLeavingTypesService()
